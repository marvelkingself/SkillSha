/**
 * PNG Format Inspector & Chunk Analysis
 */

export interface PngChunk {
  type: string;
  offset: number;
  length: number;
  dataOffset: number;
}

export function isPng(buffer: Buffer): boolean {
  if (buffer.length < 8) return false;
  return (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  );
}

export function scanPngChunks(buffer: Buffer): PngChunk[] {
  const chunks: PngChunk[] = [];
  if (!isPng(buffer)) return chunks;

  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const dataOffset = offset + 8;

    chunks.push({ type, offset, length, dataOffset });

    // Length of data + 4 bytes length + 4 bytes type + 4 bytes CRC
    const nextOffset = offset + 12 + length;
    if (nextOffset > buffer.length) break;
    offset = nextOffset;

    if (type === 'IEND') break;
  }

  return chunks;
}

export function extractPngTextChunks(buffer: Buffer): { key: string; value: string }[] {
  const chunks = scanPngChunks(buffer);
  const textEntries: { key: string; value: string }[] = [];

  for (const chunk of chunks) {
    if (chunk.type === 'tEXt') {
      const data = buffer.subarray(chunk.dataOffset, chunk.dataOffset + chunk.length);
      const nullIdx = data.indexOf(0);
      if (nullIdx !== -1) {
        const key = data.toString('latin1', 0, nullIdx);
        const value = data.toString('latin1', nullIdx + 1);
        textEntries.push({ key, value });
      }
    } else if (chunk.type === 'iTXt') {
      const data = buffer.subarray(chunk.dataOffset, chunk.dataOffset + chunk.length);
      const nullIdx = data.indexOf(0);
      if (nullIdx !== -1) {
        const key = data.toString('utf8', 0, nullIdx);
        // iTXt has compression flag and method at nullIdx + 1, nullIdx + 2
        // then language tag, translated keyword, then text
        let cursor = nullIdx + 3;
        const langNull = data.indexOf(0, cursor);
        if (langNull !== -1) {
          cursor = langNull + 1;
          const transNull = data.indexOf(0, cursor);
          if (transNull !== -1) {
            cursor = transNull + 1;
            const value = data.toString('utf8', cursor);
            textEntries.push({ key, value });
          }
        }
      }
    }
  }

  return textEntries;
}

export function detectPngC2pa(buffer: Buffer): { detected: boolean; boxType?: string; details?: string } {
  const chunks = scanPngChunks(buffer);
  for (const chunk of chunks) {
    if (chunk.type === 'caTX' || chunk.type === 'c2pa' || chunk.type === 'jumb') {
      return {
        detected: true,
        boxType: `PNG chunk (${chunk.type})`,
        details: `Found C2PA provenance manifest in PNG '${chunk.type}' chunk.`,
      };
    }
  }

  const c2paIdx = buffer.indexOf(Buffer.from('c2pa', 'ascii'));
  const jumbIdx = buffer.indexOf(Buffer.from('jumb', 'ascii'));
  if (c2paIdx !== -1 && jumbIdx !== -1 && Math.abs(c2paIdx - jumbIdx) < 256) {
    return {
      detected: true,
      boxType: 'JUMBF box',
      details: 'Detected C2PA manifest box signature within PNG structure.',
    };
  }

  return { detected: false };
}
