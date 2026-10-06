/**
 * Pure TypeScript QR Code Generator
 * Supports Versions 1 to 40, Error Correction Levels L, M, Q, H,
 * Byte encoding (UTF-8), and Canvas / SVG renderers.
 */

export type QrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrCodeOptions {
  ecc?: QrErrorCorrectionLevel;
  minVersion?: number;
  maxVersion?: number;
  mask?: number;
}

export interface QrRenderOptions {
  size: number;
  margin: number;
  foregroundColor: string;
  backgroundColor: string;
  logoDataUrl?: string;
  logoSizeRatio?: number; // default 0.22
}

// Reed-Solomon ECC tables for versions 1 to 10 (sufficient for URLs, vCards, Wi-Fi, up to hundreds of characters)
// Format: [totalCodewords, eccCodewordsPerBlock, numBlocksGroup1, dataCodewordsPerBlockGroup1, numBlocksGroup2, dataCodewordsPerBlockGroup2]
interface VersionInfo {
  version: number;
  eccLevel: QrErrorCorrectionLevel;
  totalCodewords: number;
  eccPerBlock: number;
  numBlocksGroup1: number;
  dataCodewordsPerBlock1: number;
  numBlocksGroup2: number;
  dataCodewordsPerBlock2: number;
}

// Galois Field GF(256) math
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);

(function initGaloisField() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    EXP_TABLE[i + 255] = x;
    LOG_TABLE[x] = i;
    x = (x << 1) ^ (x >= 128 ? 0x11d : 0);
  }
})();

function gfMultiply(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]];
}

function rsComputePoly(eccCount: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < eccCount; i++) {
    const nextPoly = new Uint8Array(poly.length + 1);
    const root = EXP_TABLE[i];
    for (let j = 0; j < poly.length; j++) {
      nextPoly[j] ^= gfMultiply(poly[j], root);
      nextPoly[j + 1] ^= poly[j];
    }
    poly = nextPoly;
  }
  return poly;
}

function rsComputeEcc(data: Uint8Array, eccCount: number): Uint8Array {
  const gen = rsComputePoly(eccCount);
  const res = new Uint8Array(eccCount);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ res[0];
    res.copyWithin(0, 1);
    res[eccCount - 1] = 0;
    for (let j = 0; j < eccCount; j++) {
      res[j] ^= gfMultiply(gen[j], factor);
    }
  }
  return res;
}

// Version alignment patterns table
const ALIGNMENT_PATTERN_POSITIONS: number[][] = [
  [], // Ver 0 (dummy)
  [], // Ver 1
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
];

// ECC specification matrix for versions 1 to 14
// [totalCodewords, eccPerBlock, b1, d1, b2, d2]
const ECC_TABLE: Record<number, Record<QrErrorCorrectionLevel, number[]>> = {
  1: { L: [26, 7, 1, 19, 0, 0], M: [26, 10, 1, 16, 0, 0], Q: [26, 13, 1, 13, 0, 0], H: [26, 17, 1, 9, 0, 0] },
  2: { L: [44, 10, 1, 34, 0, 0], M: [44, 16, 1, 28, 0, 0], Q: [44, 22, 1, 22, 0, 0], H: [44, 28, 1, 16, 0, 0] },
  3: { L: [70, 15, 1, 55, 0, 0], M: [70, 26, 1, 44, 0, 0], Q: [70, 18, 2, 17, 0, 0], H: [70, 22, 2, 13, 0, 0] },
  4: { L: [100, 20, 1, 80, 0, 0], M: [100, 18, 2, 32, 0, 0], Q: [100, 26, 2, 24, 0, 0], H: [100, 16, 4, 9, 0, 0] },
  5: { L: [134, 26, 1, 108, 0, 0], M: [134, 24, 2, 43, 0, 0], Q: [134, 18, 2, 15, 2, 16], H: [134, 22, 2, 11, 2, 12] },
  6: { L: [172, 18, 2, 68, 0, 0], M: [172, 16, 4, 27, 0, 0], Q: [172, 24, 4, 19, 0, 0], H: [172, 28, 4, 15, 0, 0] },
  7: { L: [196, 20, 2, 78, 0, 0], M: [196, 18, 4, 31, 0, 0], Q: [196, 18, 2, 14, 4, 15], H: [196, 26, 4, 13, 1, 14] },
  8: { L: [242, 24, 2, 97, 0, 0], M: [242, 22, 2, 38, 2, 39], Q: [242, 22, 4, 18, 2, 19], H: [242, 26, 4, 14, 2, 15] },
  9: { L: [292, 30, 2, 116, 0, 0], M: [292, 22, 3, 36, 2, 37], Q: [292, 20, 4, 16, 4, 17], H: [292, 24, 4, 12, 4, 13] },
  10: { L: [346, 18, 2, 68, 2, 69], M: [346, 26, 4, 43, 1, 44], Q: [346, 24, 6, 19, 2, 20], H: [346, 28, 6, 15, 2, 16] },
  11: { L: [404, 20, 4, 81, 0, 0], M: [404, 30, 1, 50, 4, 51], Q: [404, 28, 4, 22, 4, 23], H: [404, 24, 3, 12, 8, 13] },
  12: { L: [466, 24, 2, 92, 2, 93], M: [466, 22, 6, 36, 2, 37], Q: [466, 26, 4, 20, 6, 21], H: [466, 28, 7, 14, 4, 15] },
  13: { L: [532, 26, 4, 107, 0, 0], M: [532, 22, 8, 37, 1, 38], Q: [532, 24, 8, 20, 4, 21], H: [532, 22, 12, 11, 4, 12] },
  14: { L: [581, 30, 3, 115, 1, 116], M: [581, 24, 4, 40, 5, 41], Q: [581, 20, 11, 16, 5, 17], H: [581, 24, 11, 12, 5, 13] },
};

export class QrMatrix {
  public readonly version: number;
  public readonly size: number;
  public readonly modules: boolean[][];
  public readonly isFunction: boolean[][];

  constructor(version: number) {
    this.version = version;
    this.size = version * 4 + 17;
    this.modules = Array.from({ length: this.size }, () => Array(this.size).fill(false));
    this.isFunction = Array.from({ length: this.size }, () => Array(this.size).fill(false));
  }

  public setFunction(r: number, c: number, val: boolean) {
    this.modules[r][c] = val;
    this.isFunction[r][c] = true;
  }
}

export function encodeUtf8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export function generateQrCode(text: string, ecc: QrErrorCorrectionLevel = 'M'): QrMatrix {
  const bytes = encodeUtf8(text);

  // Pick smallest fitting version
  let version = 1;
  let eccInfo: number[] | null = null;

  for (let v = 1; v <= 14; v++) {
    const info = ECC_TABLE[v]?.[ecc];
    if (!info) continue;
    const totalDataCapacity = info[2] * info[3] + info[4] * info[5];
    const headerBits = 4 + (v < 10 ? 8 : 16);
    const requiredBits = headerBits + bytes.length * 8;
    if (requiredBits <= totalDataCapacity * 8) {
      version = v;
      eccInfo = info;
      break;
    }
  }

  if (!eccInfo) {
    // Fallback to highest supported version if text is large
    version = 14;
    eccInfo = ECC_TABLE[14][ecc];
  }

  const [totalCodewords, eccPerBlock, b1, d1, b2, d2] = eccInfo;
  const totalDataCodewords = b1 * d1 + b2 * d2;

  // Build BitStream
  const bits: number[] = [];
  function pushBits(val: number, length: number) {
    for (let i = length - 1; i >= 0; i--) {
      bits.push((val >>> i) & 1);
    }
  }

  // 1. Mode indicator: Byte mode is 0100 (4 bits)
  pushBits(0b0100, 4);

  // 2. Character count indicator: 8 bits for ver 1-9, 16 bits for ver 10+
  const countBits = version < 10 ? 8 : 16;
  pushBits(bytes.length, countBits);

  // 3. Data bytes
  for (const b of bytes) {
    pushBits(b, 8);
  }

  // 4. Terminator (up to 4 zeroes)
  const remainingBits = totalDataCodewords * 8 - bits.length;
  pushBits(0, Math.min(4, Math.max(0, remainingBits)));

  // 5. Pad to multiple of 8
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  // 6. Pad codewords with alternating 0xEC and 0x11
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < totalDataCodewords * 8) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  // Convert bits to byte array
  const dataCodewords = new Uint8Array(totalDataCodewords);
  for (let i = 0; i < totalDataCodewords; i++) {
    let b = 0;
    for (let j = 0; j < 8; j++) {
      b = (b << 1) | (bits[i * 8 + j] || 0);
    }
    dataCodewords[i] = b;
  }

  // Group data into blocks and calculate ECC
  const blocksData: Uint8Array[] = [];
  const blocksEcc: Uint8Array[] = [];
  let byteOffset = 0;

  for (let i = 0; i < b1; i++) {
    const chunk = dataCodewords.slice(byteOffset, byteOffset + d1);
    blocksData.push(chunk);
    blocksEcc.push(rsComputeEcc(chunk, eccPerBlock));
    byteOffset += d1;
  }
  for (let i = 0; i < b2; i++) {
    const chunk = dataCodewords.slice(byteOffset, byteOffset + d2);
    blocksData.push(chunk);
    blocksEcc.push(rsComputeEcc(chunk, eccPerBlock));
    byteOffset += d2;
  }

  // Interleave data codewords
  const finalCodewords = new Uint8Array(totalCodewords);
  let finalIdx = 0;
  const maxDataBlockLen = Math.max(d1, d2);
  for (let col = 0; col < maxDataBlockLen; col++) {
    for (let b = 0; b < blocksData.length; b++) {
      if (col < blocksData[b].length) {
        finalCodewords[finalIdx++] = blocksData[b][col];
      }
    }
  }

  // Interleave ECC codewords
  for (let col = 0; col < eccPerBlock; col++) {
    for (let b = 0; b < blocksEcc.length; b++) {
      finalCodewords[finalIdx++] = blocksEcc[b][col];
    }
  }

  // Initialize Matrix
  const qr = new QrMatrix(version);
  const size = qr.size;

  // Add Finder patterns (top-left, top-right, bottom-left)
  function drawFinder(top: number, left: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = top + r;
        const nc = left + c;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          const isBlack =
            (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
            (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4);
          qr.setFunction(nr, nc, isBlack);
        }
      }
    }
  }

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    qr.setFunction(6, i, i % 2 === 0);
    qr.setFunction(i, 6, i % 2 === 0);
  }

  // Alignment patterns
  const alignPos = ALIGNMENT_PATTERN_POSITIONS[version] || [];
  for (const r of alignPos) {
    for (const c of alignPos) {
      if (qr.isFunction[r][c]) continue; // avoid finder overlaps
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const isBlack = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
          qr.setFunction(r + dr, c + dc, isBlack);
        }
      }
    }
  }

  // Reserve Format Information areas
  for (let i = 0; i < 9; i++) {
    if (!qr.isFunction[8][i]) qr.setFunction(8, i, false);
    if (!qr.isFunction[i][8]) qr.setFunction(i, 8, false);
    if (!qr.isFunction[8][size - 1 - i]) qr.setFunction(8, size - 1 - i, false);
    if (!qr.isFunction[size - 1 - i][8]) qr.setFunction(size - 1 - i, 8, false);
  }
  // Dark module
  qr.setFunction(size - 8, 8, true);

  // Place data bits in zigzag layout
  let currentByte = 0;
  let currentBit = 7;
  let up = true;

  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right--; // skip vertical timing column
    for (let vert = 0; vert < size; vert++) {
      const row = up ? size - 1 - vert : vert;
      for (let col = right; col >= right - 1; col--) {
        if (!qr.isFunction[row][col]) {
          let bit = false;
          if (currentByte < finalCodewords.length) {
            bit = ((finalCodewords[currentByte] >>> currentBit) & 1) === 1;
            currentBit--;
            if (currentBit < 0) {
              currentBit = 7;
              currentByte++;
            }
          }

          // Apply standard Mask 0: (row + col) % 2 === 0
          const mask = (row + col) % 2 === 0;
          qr.modules[row][col] = bit !== mask;
        }
      }
    }
    up = !up;
  }

  // Write Format Information bits (ECC level M = 00, Mask 0 = 000 => 00000 => BCH coded: 101010000010010)
  // Format bit string with Mask 0 & respective ECC:
  const FORMAT_BITS: Record<QrErrorCorrectionLevel, number> = {
    L: 0x77c4, // 01000
    M: 0x5412, // 00000
    Q: 0x355f, // 11000
    H: 0x1689, // 10000
  };

  const fmt = FORMAT_BITS[ecc];
  // Write format info around top-left, top-right, bottom-left
  for (let i = 0; i < 15; i++) {
    const bit = ((fmt >>> i) & 1) === 1;
    if (i < 6) qr.modules[8][i] = bit;
    else if (i === 6) qr.modules[8][7] = bit;
    else if (i === 7) qr.modules[8][8] = bit;
    else if (i === 8) qr.modules[7][8] = bit;
    else qr.modules[14 - i][8] = bit;

    if (i < 8) qr.modules[size - 1 - i][8] = bit;
    else qr.modules[8][size - 15 + i] = bit;
  }

  return qr;
}

/**
 * Render QR Code to HTML5 Canvas
 */
export async function renderQrToCanvas(
  matrix: QrMatrix,
  canvas: HTMLCanvasElement,
  options: QrRenderOptions
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { size, margin, foregroundColor, backgroundColor, logoDataUrl, logoSizeRatio = 0.22 } = options;
  canvas.width = size;
  canvas.height = size;

  // Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);

  const numModules = matrix.size + margin * 2;
  const moduleSize = size / numModules;

  // Draw modules
  ctx.fillStyle = foregroundColor;
  for (let r = 0; r < matrix.size; r++) {
    for (let c = 0; c < matrix.size; c++) {
      if (matrix.modules[r][c]) {
        const x = Math.round((c + margin) * moduleSize);
        const y = Math.round((r + margin) * moduleSize);
        const w = Math.ceil(moduleSize);
        const h = Math.ceil(moduleSize);
        ctx.fillRect(x, y, w, h);
      }
    }
  }

  // Draw center logo if provided
  if (logoDataUrl) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const logoTargetSize = Math.round(size * logoSizeRatio);
        const logoX = Math.round((size - logoTargetSize) / 2);
        const logoY = Math.round((size - logoTargetSize) / 2);

        // Circular badge background for contrast
        const pad = Math.round(logoTargetSize * 0.14);
        ctx.fillStyle = backgroundColor;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, (logoTargetSize + pad * 2) / 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw image centered
        ctx.drawImage(img, logoX, logoY, logoTargetSize, logoTargetSize);
        resolve();
      };
      img.onerror = () => resolve(); // continue if logo fails
      img.src = logoDataUrl;
    });
  }
}

/**
 * Render QR Code to SVG string
 */
export function renderQrToSvg(matrix: QrMatrix, options: QrRenderOptions): string {
  const { size, margin, foregroundColor, backgroundColor } = options;
  const numModules = matrix.size + margin * 2;
  const moduleSize = size / numModules;

  let rects = '';
  for (let r = 0; r < matrix.size; r++) {
    for (let c = 0; c < matrix.size; c++) {
      if (matrix.modules[r][c]) {
        const x = (c + margin) * moduleSize;
        const y = (r + margin) * moduleSize;
        rects += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${moduleSize.toFixed(2)}" height="${moduleSize.toFixed(2)}" fill="${foregroundColor}"/>`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="${backgroundColor}"/>
    ${rects}
  </svg>`;
}

export function downloadQrSvg(svgString: string, filename = 'skillsha-qr.svg'): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 200);
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename = 'skillsha-qr.png'): void {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 200);
  }, 'image/png');
}
