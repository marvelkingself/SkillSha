/**
 * Image Metadata Cleaner Engine
 * High-performance pure-JS container stripping with dynamic Sharp re-encoding fallback
 */

import { CleaningOptions } from '@/types/tools';
import { CleanerResult } from './types';

// Pure JS PNG Chunk Stripper
function stripPngMetadata(buffer: Buffer): Buffer {
  if (buffer.length < 8) return buffer;
  const chunks: Buffer[] = [buffer.subarray(0, 8)];
  let offset = 8;
  // Keep strictly pixel, palette, color, and termination chunks
  const keepTypes = new Set(['IHDR', 'PLTE', 'IDAT', 'tRNS', 'sRGB', 'gAMA', 'cHRM', 'sBIT', 'IEND']);

  while (offset + 12 <= buffer.length) {
    const len = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const chunkTotalLen = 12 + len;

    if (keepTypes.has(type)) {
      chunks.push(buffer.subarray(offset, Math.min(offset + chunkTotalLen, buffer.length)));
    }

    offset += chunkTotalLen;
    if (type === 'IEND') break;
  }

  return Buffer.concat(chunks);
}

// Pure JS JPEG Segment Stripper
function stripJpegMetadata(buffer: Buffer): Buffer {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return buffer;
  const chunks: Buffer[] = [Buffer.from([0xff, 0xd8])];
  let offset = 2;

  while (offset < buffer.length - 1) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buffer[offset + 1];
    offset += 2;

    if (marker === 0xd9) {
      // EOI
      chunks.push(Buffer.from([0xff, 0xd9]));
      break;
    }

    if (marker === 0xda) {
      // SOS (Start of Scan) - rest of file is entropy image data
      chunks.push(buffer.subarray(offset - 2));
      break;
    }

    if (offset + 2 > buffer.length) break;
    const len = buffer.readUInt16BE(offset);

    // Discard APP1 (0xE1: EXIF/XMP), APP11 (0xEB: C2PA/JUMBF), APP13 (0xED: Photoshop/IPTC), COM (0xFE)
    const isMetadata = marker === 0xe1 || marker === 0xeb || marker === 0xed || marker === 0xfe;
    if (!isMetadata) {
      chunks.push(buffer.subarray(offset - 2, Math.min(offset + len, buffer.length)));
    }

    offset += len;
  }

  return Buffer.concat(chunks);
}

// Pure JS WebP Chunk Stripper
function stripWebpMetadata(buffer: Buffer): Buffer {
  if (
    buffer.length < 12 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    return buffer;
  }

  const chunks: Buffer[] = [];
  let offset = 12;
  const omitFourCC = new Set(['EXIF', 'XMP ', 'JUMB', 'c2pa']);

  while (offset + 8 <= buffer.length) {
    const fourCC = buffer.toString('ascii', offset, offset + 4);
    const len = buffer.readUInt32LE(offset + 4);
    const paddedLen = len + (len % 2);
    const chunkTotal = 8 + paddedLen;

    if (!omitFourCC.has(fourCC)) {
      chunks.push(buffer.subarray(offset, Math.min(offset + chunkTotal, buffer.length)));
    }

    offset += chunkTotal;
  }

  const payload = Buffer.concat(chunks);
  const header = Buffer.alloc(12);
  header.write('RIFF', 0);
  header.writeUInt32LE(4 + payload.length, 4);
  header.write('WEBP', 8);

  return Buffer.concat([header, payload]);
}

export async function cleanImageMetadata(
  buffer: Buffer,
  options: CleaningOptions
): Promise<CleanerResult> {
  if (!buffer || buffer.length === 0) {
    throw new Error('Image buffer is empty.');
  }

  // Detect format
  let format = 'jpeg';
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    format = 'png';
  } else if (
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    format = 'webp';
  }

  const mode = options.mode || 'metadata-only';
  const quality = Math.min(100, Math.max(50, options.quality ?? 90));

  // If Mode 2 (Re-encode) was requested, try dynamic sharp
  if (mode === 're-encode') {
    try {
      const sharp = (await import('sharp')).default;
      let pipeline = sharp(buffer, { failOn: 'none' }).rotate();
      let cleanedBuffer: Buffer;

      if (format === 'png') {
        cleanedBuffer = await pipeline.png({ quality, compressionLevel: 9 }).toBuffer();
      } else if (format === 'webp') {
        cleanedBuffer = await pipeline.webp({ quality }).toBuffer();
      } else {
        cleanedBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
      }

      return {
        cleanedBuffer,
        format,
        mimeType: `image/${format === 'jpg' ? 'jpeg' : format}`,
        originalSizeBytes: buffer.length,
        cleanedSizeBytes: cleanedBuffer.length,
      };
    } catch (e) {
      // If sharp is not present, fall through to lossless chunk stripping
      console.warn('Sharp re-encode unavailable, using pure JS segment stripper');
    }
  }

  // Mode 1: Pure JavaScript Lossless Metadata Stripper
  let cleanedBuffer: Buffer;
  if (format === 'png') {
    cleanedBuffer = stripPngMetadata(buffer);
  } else if (format === 'webp') {
    cleanedBuffer = stripWebpMetadata(buffer);
  } else {
    cleanedBuffer = stripJpegMetadata(buffer);
  }

  return {
    cleanedBuffer,
    format,
    mimeType: `image/${format === 'jpg' ? 'jpeg' : format}`,
    originalSizeBytes: buffer.length,
    cleanedSizeBytes: cleanedBuffer.length,
  };
}
