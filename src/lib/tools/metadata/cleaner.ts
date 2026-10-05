/**
 * Image Metadata Cleaner Engine
 * Supports Mode 1 (Metadata Only) and Mode 2 (Fresh Re-encode)
 */

import sharp from 'sharp';
import { CleaningOptions } from '@/types/tools';
import { CleanerResult } from './types';

export async function cleanImageMetadata(
  buffer: Buffer,
  options: CleaningOptions
): Promise<CleanerResult> {
  if (!buffer || buffer.length === 0) {
    throw new Error('Image buffer is empty.');
  }

  // 1. Inspect original format
  const originalMeta = await sharp(buffer).metadata();
  const format = (originalMeta.format || 'jpeg').toLowerCase();
  const mode = options.mode || 'metadata-only';
  const quality = Math.min(100, Math.max(50, options.quality ?? 90));

  let pipeline = sharp(buffer, { failOn: 'none' });

  // Handle image orientation to normalize pixels and discard orientation EXIF tag
  pipeline = pipeline.rotate();

  let cleanedBuffer: Buffer;
  let outFormat = format;
  let mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;

  if (mode === 'metadata-only') {
    // Mode 1: Remove metadata while preserving original pixel encoding as closely as possible
    switch (format) {
      case 'jpeg':
      case 'jpg':
        cleanedBuffer = await pipeline
          .jpeg({ quality: 100, chromaSubsampling: '4:4:4', force: false })
          .toBuffer();
        break;

      case 'png':
        cleanedBuffer = await pipeline
          .png({ compressionLevel: 6, adaptiveFiltering: true, force: false })
          .toBuffer();
        break;

      case 'webp':
        cleanedBuffer = await pipeline
          .webp({ lossless: true, force: false })
          .toBuffer();
        break;

      case 'avif':
        cleanedBuffer = await pipeline
          .avif({ lossless: true, force: false })
          .toBuffer();
        break;

      case 'tiff':
        cleanedBuffer = await pipeline
          .tiff({ compression: 'lzw', force: false })
          .toBuffer();
        break;

      default:
        cleanedBuffer = await pipeline.jpeg({ quality: 98 }).toBuffer();
        outFormat = 'jpeg';
        mimeType = 'image/jpeg';
        break;
    }
  } else {
    // Mode 2: Re-encode Image - fresh container encoding with user-selected quality
    switch (format) {
      case 'jpeg':
      case 'jpg':
        cleanedBuffer = await pipeline
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();
        break;

      case 'png':
        cleanedBuffer = await pipeline
          .png({ quality, compressionLevel: 9, effort: 7 })
          .toBuffer();
        break;

      case 'webp':
        cleanedBuffer = await pipeline
          .webp({ quality, effort: 4 })
          .toBuffer();
        break;

      case 'avif':
        cleanedBuffer = await pipeline
          .avif({ quality, effort: 4 })
          .toBuffer();
        break;

      default:
        cleanedBuffer = await pipeline
          .jpeg({ quality })
          .toBuffer();
        outFormat = 'jpeg';
        mimeType = 'image/jpeg';
        break;
    }
  }

  return {
    cleanedBuffer,
    format: outFormat,
    mimeType,
    originalSizeBytes: buffer.length,
    cleanedSizeBytes: cleanedBuffer.length,
  };
}
