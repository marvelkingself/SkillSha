/**
 * WebP Format Inspector & RIFF Chunk Analysis
 */

export interface WebpChunk {
  fourCC: string;
  offset: number;
  length: number;
}

export function isWebp(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;
  return (
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  );
}

export function scanWebpChunks(buffer: Buffer): WebpChunk[] {
  const chunks: WebpChunk[] = [];
  if (!isWebp(buffer)) return chunks;

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const fourCC = buffer.toString('ascii', offset, offset + 4);
    const length = buffer.readUInt32LE(offset + 4);
    chunks.push({ fourCC, offset: offset + 8, length });

    // WebP chunks are padded to even number of bytes
    const paddedLength = length + (length % 2);
    offset += 8 + paddedLength;
  }

  return chunks;
}

export function detectWebpC2pa(buffer: Buffer): { detected: boolean; boxType?: string; details?: string } {
  const chunks = scanWebpChunks(buffer);
  for (const chunk of chunks) {
    if (chunk.fourCC === 'JUMB' || chunk.fourCC === 'c2pa') {
      return {
        detected: true,
        boxType: `WebP chunk (${chunk.fourCC})`,
        details: `Found C2PA provenance manifest in WebP '${chunk.fourCC}' chunk.`,
      };
    }
  }

  const c2paIdx = buffer.indexOf(Buffer.from('c2pa', 'ascii'));
  const jumbIdx = buffer.indexOf(Buffer.from('jumb', 'ascii'));
  if (c2paIdx !== -1 && jumbIdx !== -1 && Math.abs(c2paIdx - jumbIdx) < 256) {
    return {
      detected: true,
      boxType: 'JUMBF box',
      details: 'Detected C2PA manifest box signature within WebP container.',
    };
  }

  return { detected: false };
}
