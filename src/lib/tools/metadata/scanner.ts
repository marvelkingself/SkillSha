/**
 * Unified Image Metadata Scanner
 * Uses pure JavaScript chunk/segment analysis with optional dynamic sharp enhancement
 */

import { MetadataScanResult, ImageInfo } from '@/types/tools';
import { parseExif } from './exif';
import { parseGps } from './gps';
import { parseXmp } from './xmp';
import { parseIptc } from './iptc';
import { scanC2pa } from './c2pa';
import { scanAiMetadata } from './ai-metadata';

// Pure JS Format & Dimension Extractor
function getFormatAndDimensions(buffer: Buffer): {
  format: string;
  width?: number;
  height?: number;
  exifBuf?: Buffer;
  xmpBuf?: Buffer;
  iptcBuf?: Buffer;
} {
  if (buffer.length < 12) return { format: 'unknown' };

  // 1. JPEG
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let width: number | undefined;
    let height: number | undefined;
    let exifBuf: Buffer | undefined;
    let xmpBuf: Buffer | undefined;
    let iptcBuf: Buffer | undefined;

    let offset = 2;
    while (offset < buffer.length - 1) {
      if (buffer[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buffer[offset + 1];
      offset += 2;
      if (marker === 0xd9 || marker === 0xda) break; // EOI or SOS
      if (offset + 2 > buffer.length) break;

      const len = buffer.readUInt16BE(offset);
      if (len < 2 || offset + len > buffer.length) break;

      // SOF0 (0xC0), SOF2 (0xC2)
      if ((marker === 0xc0 || marker === 0xc2) && offset + 7 <= buffer.length) {
        height = buffer.readUInt16BE(offset + 3);
        width = buffer.readUInt16BE(offset + 5);
      } else if (marker === 0xe1) {
        // APP1 (EXIF or XMP)
        const payload = buffer.subarray(offset + 2, offset + len);
        if (payload.toString('ascii', 0, 4) === 'Exif') {
          exifBuf = payload;
        } else if (payload.toString('utf8', 0, 30).includes('http://ns.adobe.com')) {
          xmpBuf = payload;
        }
      } else if (marker === 0xed) {
        // APP13 (Photoshop / IPTC)
        iptcBuf = buffer.subarray(offset + 2, offset + len);
      }

      offset += len;
    }

    return { format: 'jpeg', width, height, exifBuf, xmpBuf, iptcBuf };
  }

  // 2. PNG
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    let width: number | undefined;
    let height: number | undefined;
    let exifBuf: Buffer | undefined;
    let xmpBuf: Buffer | undefined;

    if (buffer.length >= 24) {
      width = buffer.readUInt32BE(16);
      height = buffer.readUInt32BE(20);
    }

    let offset = 8;
    while (offset + 12 <= buffer.length) {
      const len = buffer.readUInt32BE(offset);
      const type = buffer.toString('ascii', offset + 4, offset + 8);
      const dataOffset = offset + 8;
      const dataEnd = Math.min(dataOffset + len, buffer.length);

      if (type === 'eXIf') {
        exifBuf = buffer.subarray(dataOffset, dataEnd);
      } else if (type === 'iTXt') {
        const chunkData = buffer.subarray(dataOffset, dataEnd);
        if (chunkData.toString('utf8', 0, 30).includes('XML:com.adobe.xmp')) {
          xmpBuf = chunkData;
        }
      }

      offset += 12 + len;
      if (type === 'IEND') break;
    }

    return { format: 'png', width, height, exifBuf, xmpBuf };
  }

  // 3. WebP
  if (
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    let width: number | undefined;
    let height: number | undefined;
    let exifBuf: Buffer | undefined;
    let xmpBuf: Buffer | undefined;

    let offset = 12;
    while (offset + 8 <= buffer.length) {
      const fourCC = buffer.toString('ascii', offset, offset + 4);
      const len = buffer.readUInt32LE(offset + 4);
      const dataOffset = offset + 8;
      const dataEnd = Math.min(dataOffset + len, buffer.length);

      if (fourCC === 'EXIF') {
        exifBuf = buffer.subarray(dataOffset, dataEnd);
      } else if (fourCC === 'XMP ') {
        xmpBuf = buffer.subarray(dataOffset, dataEnd);
      } else if (fourCC === 'VP8 ' && dataOffset + 10 <= buffer.length) {
        width = buffer.readUInt16LE(dataOffset + 6) & 0x3fff;
        height = buffer.readUInt16LE(dataOffset + 8) & 0x3fff;
      } else if (fourCC === 'VP8X' && dataOffset + 10 <= buffer.length) {
        width = 1 + (buffer[dataOffset + 4] | (buffer[dataOffset + 5] << 8) | (buffer[dataOffset + 6] << 16));
        height = 1 + (buffer[dataOffset + 7] | (buffer[dataOffset + 8] << 8) | (buffer[dataOffset + 9] << 16));
      }

      const paddedLen = len + (len % 2);
      offset += 8 + paddedLen;
    }

    return { format: 'webp', width, height, exifBuf, xmpBuf };
  }

  // 4. AVIF / HEIC
  if (buffer.toString('ascii', 4, 8) === 'ftyp') {
    const brand = buffer.toString('ascii', 8, 12).toLowerCase();
    if (brand === 'avif' || brand === 'avis') return { format: 'avif' };
    return { format: 'heic' };
  }

  return { format: 'unknown' };
}

export async function scanImageMetadata(buffer: Buffer): Promise<MetadataScanResult> {
  if (!buffer || buffer.length === 0) {
    throw new Error('Image buffer is empty or missing.');
  }

  const { format, width, height, exifBuf, xmpBuf, iptcBuf } = getFormatAndDimensions(buffer);
  const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;

  // Check if buffer contains raw XMP or EXIF anywhere in header
  let activeExifBuf = exifBuf;
  let activeXmpBuf = xmpBuf;
  let activeIptcBuf = iptcBuf;

  if (!activeXmpBuf) {
    const xmpIdx = buffer.indexOf(Buffer.from('<x:xmpmeta', 'utf8'));
    if (xmpIdx !== -1) {
      const xmpEnd = buffer.indexOf(Buffer.from('</x:xmpmeta>', 'utf8'), xmpIdx);
      if (xmpEnd !== -1) {
        activeXmpBuf = buffer.subarray(xmpIdx, xmpEnd + 12);
      }
    }
  }

  // Try dynamic sharp if available for additional color space & alpha details
  let hasAlpha: boolean | undefined;
  let colorSpace: string | undefined;
  try {
    const sharp = (await import('sharp')).default;
    const meta = await sharp(buffer, { failOn: 'none' }).metadata();
    hasAlpha = meta.hasAlpha;
    colorSpace = meta.space;
    if (!activeExifBuf && meta.exif) activeExifBuf = meta.exif;
    if (!activeXmpBuf && meta.xmp) activeXmpBuf = meta.xmp;
    if (!activeIptcBuf && meta.iptc) activeIptcBuf = meta.iptc;
  } catch (e) {
    // Sharp optional; pure JS extraction already succeeded
  }

  const imageInfo: ImageInfo = {
    format,
    mimeType,
    width,
    height,
    sizeBytes: buffer.length,
    hasAlpha,
    colorSpace,
  };

  // Run individual scanners
  const exif = parseExif(activeExifBuf);
  const gps = parseGps(activeExifBuf);
  const xmp = parseXmp(activeXmpBuf);
  const iptc = parseIptc(activeIptcBuf);
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
    aiMetadata.detected;

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
