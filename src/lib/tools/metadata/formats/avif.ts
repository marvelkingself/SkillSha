/**
 * AVIF Format Inspector & ISOBMFF Box Analysis
 */

export function isAvif(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;
  const ftyp = buffer.toString('ascii', 4, 8);
  if (ftyp !== 'ftyp') return false;
  const brand = buffer.toString('ascii', 8, 12);
  return brand === 'avif' || brand === 'avis';
}

export function detectAvifC2pa(buffer: Buffer): { detected: boolean; boxType?: string; details?: string } {
  if (!isAvif(buffer)) return { detected: false };

  const c2paIdx = buffer.indexOf(Buffer.from('c2pa', 'ascii'));
  const jumbIdx = buffer.indexOf(Buffer.from('jumb', 'ascii'));

  if (jumbIdx !== -1) {
    return {
      detected: true,
      boxType: 'ISOBMFF jumb box',
      details: 'Detected C2PA / JUMBF box inside AVIF container.',
    };
  }

  if (c2paIdx !== -1) {
    return {
      detected: true,
      boxType: 'ISOBMFF c2pa box',
      details: 'Detected C2PA provenance box inside AVIF container.',
    };
  }

  return { detected: false };
}
