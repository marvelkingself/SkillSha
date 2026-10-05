/**
 * EXIF Metadata Parser
 */

import { ExifReport, MetadataField } from '@/types/tools';

export function parseExif(buffer?: Buffer): ExifReport {
  if (!buffer || buffer.length < 14) {
    return {
      detected: false,
      fields: [],
    };
  }

  try {
    let tiffOffset = 0;
    if (buffer.toString('ascii', 0, 4) === 'Exif') {
      tiffOffset = 6;
    }

    if (tiffOffset + 8 > buffer.length) {
      return { detected: false, fields: [] };
    }

    const isLE = buffer.readUInt16LE(tiffOffset) === 0x4949;
    const isBE = buffer.readUInt16BE(tiffOffset) === 0x4d4d;
    if (!isLE && !isBE) {
      return { detected: false, fields: [] };
    }

    const readU16 = (off: number) => (isLE ? buffer.readUInt16LE(off) : buffer.readUInt16BE(off));
    const readU32 = (off: number) => (isLE ? buffer.readUInt32LE(off) : buffer.readUInt32BE(off));

    const ifd0Offset = tiffOffset + readU32(tiffOffset + 4);
    if (ifd0Offset >= buffer.length - 2) {
      return { detected: true, fields: [] };
    }

    const fields: MetadataField[] = [];
    let make: string | undefined;
    let model: string | undefined;
    let lensModel: string | undefined;
    let dateTime: string | undefined;
    let software: string | undefined;
    let orientation: number | undefined;
    let exposureTime: string | undefined;
    let fNumber: number | undefined;
    let iso: number | undefined;
    let focalLength: string | undefined;

    function readTagValue(type: number, count: number, valOffset: number): any {
      if (valOffset >= buffer!.length) return undefined;
      if (type === 2) {
        // ASCII
        return buffer!.toString('utf8', valOffset, Math.min(valOffset + count, buffer!.length)).replace(/\0+$/, '');
      }
      if (type === 3) return readU16(valOffset);
      if (type === 4) return readU32(valOffset);
      if (type === 5) {
        // Rational (num / denom)
        if (valOffset + 8 <= buffer!.length) {
          const num = readU32(valOffset);
          const den = readU32(valOffset + 4);
          return den !== 0 ? num / den : 0;
        }
      }
      return undefined;
    }

    function parseIFD(offset: number) {
      if (offset >= buffer!.length - 2) return;
      const count = readU16(offset);
      let exifSubIfd = 0;

      for (let i = 0; i < count; i++) {
        const entryOffset = offset + 2 + i * 12;
        if (entryOffset + 12 > buffer!.length) break;

        const tag = readU16(entryOffset);
        const type = readU16(entryOffset + 2);
        const len = readU32(entryOffset + 4);

        let valOffset = entryOffset + 8;
        if (len > 4 || (type === 2 && len > 4) || type === 5) {
          valOffset = tiffOffset + readU32(entryOffset + 8);
        }

        const val = readTagValue(type, len, valOffset);
        if (val !== undefined && val !== '') {
          switch (tag) {
            case 0x010f:
              make = String(val);
              fields.push({ label: 'Camera Make', value: make });
              break;
            case 0x0110:
              model = String(val);
              fields.push({ label: 'Camera Model', value: model });
              break;
            case 0x0112:
              orientation = Number(val);
              fields.push({ label: 'Orientation', value: orientation });
              break;
            case 0x0131:
              software = String(val);
              fields.push({ label: 'Software', value: software });
              break;
            case 0x0132:
              dateTime = String(val);
              fields.push({ label: 'Date/Time', value: dateTime });
              break;
            case 0x8769:
              exifSubIfd = tiffOffset + Number(val);
              break;
            case 0xa434:
              lensModel = String(val);
              fields.push({ label: 'Lens Model', value: lensModel });
              break;
            case 0x829a:
              exposureTime = String(val);
              fields.push({ label: 'Exposure Time', value: exposureTime });
              break;
            case 0x829d:
              fNumber = Number(val);
              fields.push({ label: 'F-Number', value: fNumber });
              break;
            case 0x8827:
              iso = Number(val);
              fields.push({ label: 'ISO Speed', value: iso });
              break;
            case 0x920a:
              focalLength = `${val} mm`;
              fields.push({ label: 'Focal Length', value: focalLength });
              break;
            case 0x9003:
              fields.push({ label: 'Date Original', value: String(val) });
              break;
            case 0x9286:
              fields.push({ label: 'User Comment', value: String(val).slice(0, 100) });
              break;
          }
        }
      }

      if (exifSubIfd > 0 && exifSubIfd < buffer!.length) {
        parseIFD(exifSubIfd);
      }
    }

    parseIFD(ifd0Offset);

    return {
      detected: true,
      make,
      model,
      lensModel,
      dateTime,
      software,
      orientation,
      exposureTime,
      fNumber,
      iso,
      focalLength,
      fields,
    };
  } catch (err) {
    // If parsing fails but buffer exists, report presence
    return {
      detected: true,
      fields: [{ label: 'Raw EXIF Data Block', value: `${buffer.length} bytes` }],
    };
  }
}
