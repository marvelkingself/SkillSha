/**
 * AI Image Generation Metadata Detector
 * Inspects EXIF, XMP, and PNG text chunks for known AI model prompts and parameter signatures
 */

import { AiMetadataReport, MetadataField } from '@/types/tools';
import { extractPngTextChunks, isPng } from './formats/png';

export function scanAiMetadata(
  buffer: Buffer,
  format: string,
  exifSoftware?: string,
  xmpCreatorTool?: string
): AiMetadataReport {
  const fields: MetadataField[] = [];
  let detected = false;
  let generator: string | undefined;
  let promptDetected = false;
  let promptSnippet: string | undefined;
  let parametersFound = false;

  const rawAscii = buffer.toString('binary', 0, Math.min(buffer.length, 128 * 1024)); // scan first 128KB where metadata lives

  // 1. Check EXIF Software and XMP CreatorTool
  const tools = [exifSoftware, xmpCreatorTool].filter(Boolean).map((s) => s!.toLowerCase());

  if (tools.some((t) => t.includes('midjourney'))) {
    detected = true;
    generator = 'Midjourney';
    fields.push({ label: 'AI Generator', value: 'Midjourney' });
  } else if (tools.some((t) => t.includes('stable diffusion') || t.includes('automatic1111') || t.includes('comfyui') || t.includes('invokeai'))) {
    detected = true;
    generator = 'Stable Diffusion Ecosystem';
    fields.push({ label: 'AI Generator', value: 'Stable Diffusion' });
  } else if (tools.some((t) => t.includes('dall-e') || t.includes('dalle') || t.includes('chatgpt'))) {
    detected = true;
    generator = 'DALL-E / OpenAI';
    fields.push({ label: 'AI Generator', value: 'DALL-E / OpenAI' });
  } else if (tools.some((t) => t.includes('firefly'))) {
    detected = true;
    generator = 'Adobe Firefly';
    fields.push({ label: 'AI Generator', value: 'Adobe Firefly' });
  }

  // 2. Check PNG chunks if format is PNG
  if (isPng(buffer)) {
    const pngTexts = extractPngTextChunks(buffer);
    for (const entry of pngTexts) {
      const keyLower = entry.key.toLowerCase();
      if (
        keyLower === 'parameters' ||
        keyLower === 'prompt' ||
        keyLower === 'workflow' ||
        keyLower === 'sd-metadata' ||
        keyLower === 'generation_data'
      ) {
        detected = true;
        promptDetected = true;
        parametersFound = true;
        if (!generator) generator = 'Stable Diffusion / ComfyUI';
        promptSnippet = entry.value.slice(0, 160).replace(/\r?\n/g, ' ');
        fields.push({
          label: `PNG Chunk [${entry.key}]`,
          value: entry.value.slice(0, 120) + (entry.value.length > 120 ? '...' : ''),
        });
      }
    }
  }

  // 3. Scan for common generation parameter blocks (Steps, Sampler, CFG scale, Model hash)
  if (!parametersFound) {
    const paramMatch = rawAscii.match(/Steps:\s*\d+,\s*Sampler:[^,]+,\s*CFG scale:\s*[\d.]+/i);
    if (paramMatch) {
      detected = true;
      parametersFound = true;
      if (!generator) generator = 'Stable Diffusion / WebUI';
      fields.push({ label: 'AI Generation Parameters', value: 'Steps / Sampler / CFG parameters detected' });
    }
  }

  // 4. Scan for Midjourney job IDs or signature strings
  if (!detected) {
    if (rawAscii.includes('mj_') || rawAscii.includes('Midjourney') || rawAscii.includes('seed=')) {
      if (rawAscii.includes('--v 5') || rawAscii.includes('--v 6') || rawAscii.includes('--ar ') || rawAscii.includes('job_id')) {
        detected = true;
        generator = 'Midjourney';
        fields.push({ label: 'AI Prompt / Parameters', value: 'Midjourney command parameters detected' });
      }
    }
  }

  // 5. Scan for DALL-E signatures
  if (!detected) {
    if (rawAscii.includes('dall-e') || rawAscii.includes('DALL·E')) {
      detected = true;
      generator = 'DALL-E';
      fields.push({ label: 'AI Generator Tag', value: 'DALL-E metadata record detected' });
    }
  }

  return {
    detected,
    generator,
    promptDetected,
    promptSnippet,
    parametersFound,
    fields,
  };
}
