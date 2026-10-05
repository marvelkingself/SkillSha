/**
 * GPS Metadata Parser
 * Detects location information embedded in EXIF GPSInfo IFD
 */

import { GpsReport, MetadataField } from '@/types/tools';

export function parseGps(buffer?: Buffer): GpsReport {
  if (!buffer || buffer.length < 14) {
    return {
      detected: false,
      hasCoordinates: false,
      fields: [],
    };
  }

  try {
    let tiffOffset = 0;
    if (buffer.toString('ascii', 0, 4) === 'Exif') {
      tiffOffset = 6;
    }

    if (tiffOffset + 8 > buffer.length) {
      return { detected: false, hasCoordinates: false, fields: [] };
    }

    const isLE = buffer.readUInt16LE(tiffOffset) === 0x4949;
    const isBE = buffer.readUInt16BE(tiffOffset) === 0x4d4d;
    if (!isLE && !isBE) {
      return { detected: false, hasCoordinates: false, fields: [] };
    }

    const readU16 = (off: number) => (isLE ? buffer.readUInt16LE(off) : buffer.readUInt16BE(off));
    const readU32 = (off: number) => (isLE ? buffer.readUInt32LE(off) : buffer.readUInt32BE(off));

    const ifd0Offset = tiffOffset + readU32(tiffOffset + 4);
    if (ifd0Offset >= buffer.length - 2) {
      return { detected: false, hasCoordinates: false, fields: [] };
    }

    // Find GPSInfo IFD Pointer (Tag 0x8825)
    let gpsIfdOffset = 0;
    const count = readU16(ifd0Offset);

    for (let i = 0; i < count; i++) {
      const entryOffset = ifd0Offset + 2 + i * 12;
      if (entryOffset + 12 > buffer.length) break;
      const tag = readU16(entryOffset);
      if (tag === 0x8825) {
        gpsIfdOffset = tiffOffset + readU32(entryOffset + 8);
        break;
      }
    }

    if (gpsIfdOffset === 0 || gpsIfdOffset >= buffer.length - 2) {
      return { detected: false, hasCoordinates: false, fields: [] };
    }

    const gpsCount = readU16(gpsIfdOffset);
    let latRef: string | undefined;
    let lonRef: string | undefined;
    let latVal: number | undefined;
    let lonVal: number | undefined;
    let altitude: number | undefined;
    let dateStamp: string | undefined;

    function readRationals(valOffset: number, numRationals: number): number[] {
      const results: number[] = [];
      for (let r = 0; r < numRationals; r++) {
        const off = valOffset + r * 8;
        if (off + 8 <= buffer!.length) {
          const num = readU32(off);
          const den = readU32(off + 4);
          results.push(den !== 0 ? num / den : 0);
        }
      }
      return results;
    }

    for (let i = 0; i < gpsCount; i++) {
      const entryOffset = gpsIfdOffset + 2 + i * 12;
      if (entryOffset + 12 > buffer.length) break;

      const tag = readU16(entryOffset);
      const type = readU16(entryOffset + 2);
      const len = readU32(entryOffset + 4);

      let valOffset = entryOffset + 8;
      if (len > 4 || (type === 2 && len > 4) || type === 5) {
        valOffset = tiffOffset + readU32(entryOffset + 8);
      }

      if (valOffset < buffer.length) {
        if (tag === 0x0001 && type === 2) {
          latRef = buffer.toString('ascii', valOffset, valOffset + 1);
        } else if (tag === 0x0002 && type === 5) {
          const dms = readRationals(valOffset, 3);
          if (dms.length === 3) {
            latVal = dms[0] + dms[1] / 60 + dms[2] / 3600;
          }
        } else if (tag === 0x0003 && type === 2) {
          lonRef = buffer.toString('ascii', valOffset, valOffset + 1);
        } else if (tag === 0x0004 && type === 5) {
          const dms = readRationals(valOffset, 3);
          if (dms.length === 3) {
            lonVal = dms[0] + dms[1] / 60 + dms[2] / 3600;
          }
        } else if (tag === 0x0006 && type === 5) {
          const alt = readRationals(valOffset, 1);
          if (alt.length === 1) altitude = alt[0];
        } else if (tag === 0x001d && type === 2) {
          dateStamp = buffer.toString('ascii', valOffset, Math.min(valOffset + len, buffer.length)).replace(/\0+$/, '');
        }
      }
    }

    if (latRef === 'S' && latVal !== undefined) latVal = -latVal;
    if (lonRef === 'W' && lonVal !== undefined) lonVal = -lonVal;

    const fields: MetadataField[] = [
      { label: 'GPS Location Data', value: 'Geotag detected in image', sensitive: true },
    ];

    if (latVal !== undefined && lonVal !== undefined) {
      // Sensitive coordinates - masked by default for privacy
      fields.push({
        label: 'Coordinates (Masked)',
        value: `${latVal.toFixed(2)}° N/S, ${lonVal.toFixed(2)}° E/W`,
        sensitive: true,
      });
    }

    if (altitude !== undefined) {
      fields.push({ label: 'Altitude', value: `${Math.round(altitude)} m` });
    }

    if (dateStamp) {
      fields.push({ label: 'GPS Date', value: dateStamp });
    }

    return {
      detected: true,
      hasCoordinates: latVal !== undefined && lonVal !== undefined,
      latitude: latVal,
      longitude: lonVal,
      altitude,
      dateStamp,
      fields,
    };
  } catch (err) {
    return {
      detected: true,
      hasCoordinates: true,
      fields: [{ label: 'GPS Geotag Block', value: 'Present in metadata', sensitive: true }],
    };
  }
}
