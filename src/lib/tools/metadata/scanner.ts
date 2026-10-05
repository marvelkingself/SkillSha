/**
 * Unified Image Metadata Scanner
 */

import sharp, { Metadata } from 'sharp';
import { MetadataScanResult, ImageInfo } from '@/types/tools';
import { parseExif } from './exif';
import { parseGps } from './gps';
import { parseXmp } from './xmp';
import { parseIptc } from './iptc';
import { scanC2pa } from './c2pa';
import { scanAiMetadata } from './ai-metadata';

export async function scanImageMetadata(buffer: Buffer): Promise<MetadataScanResult> {
  if (!buffer || buffer.length === 0) {
    throw new Error('Image buffer is empty or missing.');
  }

  let meta: Metadata;
  try {
    meta = await sharp(buffer).metadata();
  } catch (err: any) {
    throw new Error(`Unable to read image file. It may be corrupt or an unsupported format: ${err?.message || 'Unknown error'}`);
  }

  const format = meta.format ? String(meta.format) : 'unknown';
  const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;

  const imageInfo: ImageInfo = {
    format,
    mimeType,
    width: meta.width,
    height: meta.height,
    sizeBytes: buffer.length,
    hasAlpha: meta.hasAlpha,
    colorSpace: meta.space,
  };

  // Run individual scanners
  const exif = parseExif(meta.exif);
  const gps = parseGps(meta.exif);
  const xmp = parseXmp(meta.xmp);
  const iptc = parseIptc(meta.iptc);
  const c2pa = scanC2pa(buffer, format);
  const aiMetadata = scanAiMetadata(buffer, format, exif.software, xmp.creatorTool);

  const rawFieldCount =
    exif.fields.length +
    gps.fields.length +
    xmp.fields.length +
    iptc.fields.length +
    aiMetadata.fields.length +
    (c2pa.detected ? 1 : 0);

  const hasAnyMetadata =
    exif.detected ||
    gps.detected ||
    xmp.detected ||
    iptc.detected ||
    c2pa.detected ||
    aiMetadata.detected ||
    !!meta.icc;

  return {
    imageInfo,
    hasAnyMetadata,
    exif,
    gps,
    xmp,
    iptc,
    c2pa,
    aiMetadata,
    rawFieldCount,
  };
}
