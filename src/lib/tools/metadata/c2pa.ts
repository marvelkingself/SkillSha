/**
 * C2PA / JUMBF Provenance Metadata Detection Module
 */

import { C2paReport } from '@/types/tools';
import { detectJpegC2pa } from './formats/jpeg';
import { detectPngC2pa } from './formats/png';
import { detectWebpC2pa } from './formats/webp';
import { detectAvifC2pa } from './formats/avif';
import { detectHeicC2pa } from './formats/heic';

export function scanC2pa(buffer: Buffer, format: string): C2paReport {
  let detection: { detected: boolean; boxType?: string; details?: string } = { detected: false };

  const normFormat = format.toLowerCase();

  if (normFormat === 'jpeg' || normFormat === 'jpg') {
    detection = detectJpegC2pa(buffer);
  } else if (normFormat === 'png') {
    detection = detectPngC2pa(buffer);
  } else if (normFormat === 'webp') {
    detection = detectWebpC2pa(buffer);
  } else if (normFormat === 'avif') {
    detection = detectAvifC2pa(buffer);
  } else if (normFormat === 'heic' || normFormat === 'heif') {
    detection = detectHeicC2pa(buffer);
  } else {
    // Generic fallback scan for JUMBF / c2pa signatures
    const jumbIdx = buffer.indexOf(Buffer.from('jumb', 'ascii'));
    const c2paIdx = buffer.indexOf(Buffer.from('c2pa', 'ascii'));
    if (jumbIdx !== -1 || c2paIdx !== -1) {
      detection = {
        detected: true,
        boxType: 'JUMBF / C2PA signature',
        details: 'Found provenance signature in binary file stream.',
      };
    }
  }

  if (detection.detected) {
    const removalSupported = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(normFormat);
    return {
      status: 'present',
      detected: true,
      boxType: detection.boxType,
      manifestPresent: true,
      details: detection.details || 'C2PA / JUMBF digital manifest container detected.',
      removalSupported,
    };
  }

  return {
    status: 'absent',
    detected: false,
    removalSupported: true,
  };
}
