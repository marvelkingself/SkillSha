/**
 * JPEG Format Inspector & Segment Analysis
 */

export interface JpegSegment {
  marker: number;
  offset: number;
  length: number;
  name: string;
}

export function isJpeg(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;
  return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[buffer.length - 2] === 0xff && buffer[buffer.length - 1] === 0xd9;
}

export function scanJpegSegments(buffer: Buffer): JpegSegment[] {
  const segments: JpegSegment[] = [];
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return segments;
  }

  let offset = 2;
  while (offset < buffer.length - 1) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;

    // Standalone markers without length: SOI (0xD8), EOI (0xD9), RST0-RST7 (0xD0-0xD7)
    if (marker === 0xd9) break; // EOI
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      continue;
    }

    // Markers with length (2 bytes Big Endian)
    if (offset + 2 > buffer.length) break;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) break;

    let name = 'UNKNOWN';
    if (marker === 0xe1) name = 'APP1 (EXIF/XMP)';
    else if (marker === 0xed) name = 'APP13 (Photoshop/IPTC)';
    else if (marker === 0xeb) name = 'APP11 (JUMBF/C2PA)';
    else if (marker === 0xee) name = 'APP14 (Adobe)';
    else if (marker === 0xe0) name = 'APP0 (JFIF)';
    else if (marker === 0xe2) name = 'APP2 (ICC)';
    else if (marker === 0xfe) name = 'COM (Comment)';
    else if (marker === 0xda) {
      name = 'SOS (Start of Scan)';
      segments.push({ marker, offset, length, name });
      break; // Entropy-coded image data follows
    }

    segments.push({ marker, offset, length, name });
    offset += length;
  }

  return segments;
}

export function detectJpegC2pa(buffer: Buffer): { detected: boolean; boxType?: string; details?: string } {
  const segments = scanJpegSegments(buffer);
  for (const seg of segments) {
    if (seg.marker === 0xeb) {
      // APP11 marker
      const payload = buffer.subarray(seg.offset + 2, seg.offset + seg.length);
      const str = payload.toString('binary', 0, Math.min(payload.length, 64));
      if (str.includes('JP2C') || str.includes('jumb') || str.includes('c2pa')) {
        return {
          detected: true,
          boxType: 'APP11 / JUMBF',
          details: 'Found C2PA / JUMBF provenance manifest container in JPEG APP11 segment.',
        };
      }
    }
  }

  // Also check raw byte scan for JUMBF signature in case wrapped differently
  const jumbIndex = buffer.indexOf(Buffer.from('jumb', 'ascii'));
  const c2paIndex = buffer.indexOf(Buffer.from('c2pa', 'ascii'));
  if (jumbIndex !== -1 && c2paIndex !== -1 && Math.abs(jumbIndex - c2paIndex) < 256) {
    return {
      detected: true,
      boxType: 'JUMBF box',
      details: 'Detected C2PA manifest box signature within image structure.',
    };
  }

  return { detected: false };
}
