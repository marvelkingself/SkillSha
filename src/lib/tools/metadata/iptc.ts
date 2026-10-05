/**
 * IPTC-IIM Metadata Parser
 */

import { IptcReport, MetadataField } from '@/types/tools';

export function parseIptc(buffer?: Buffer): IptcReport {
  if (!buffer || buffer.length < 5) {
    return {
      detected: false,
      fields: [],
    };
  }

  try {
    const fields: MetadataField[] = [];
    const keywords: string[] = [];
    let creator: string | undefined;
    let copyright: string | undefined;
    let headline: string | undefined;
    let caption: string | undefined;
    let city: string | undefined;
    let country: string | undefined;

    let offset = 0;
    while (offset + 5 <= buffer.length) {
      if (buffer[offset] !== 0x1c) {
        offset++;
        continue;
      }

      const recordNumber = buffer[offset + 1];
      const datasetNumber = buffer[offset + 2];
      const size = buffer.readUInt16BE(offset + 3);
      offset += 5;

      if (offset + size > buffer.length) break;

      if (recordNumber === 2) {
        const val = buffer.toString('utf8', offset, offset + size).trim();
        switch (datasetNumber) {
          case 80: // By-line
            creator = val;
            fields.push({ label: 'Creator', value: creator });
            break;
          case 116: // Copyright
            copyright = val;
            fields.push({ label: 'Copyright', value: copyright });
            break;
          case 105: // Headline
            headline = val;
            fields.push({ label: 'Headline', value: headline });
            break;
          case 120: // Caption
            caption = val;
            fields.push({ label: 'Caption', value: caption.slice(0, 100) });
            break;
          case 25: // Keywords
            keywords.push(val);
            break;
          case 90: // City
            city = val;
            fields.push({ label: 'City', value: city });
            break;
          case 101: // Country
            country = val;
            fields.push({ label: 'Country', value: country });
            break;
        }
      }

      offset += size;
    }

    if (keywords.length > 0) {
      fields.push({ label: 'Keywords', value: keywords.join(', ') });
    }

    return {
      detected: true,
      creator,
      copyright,
      headline,
      caption,
      keywords: keywords.length > 0 ? keywords : undefined,
      city,
      country,
      fields: fields.length > 0 ? fields : [{ label: 'IPTC Data Block', value: `${buffer.length} bytes` }],
    };
  } catch (err) {
    return {
      detected: true,
      fields: [{ label: 'IPTC Block', value: `${buffer.length} bytes` }],
    };
  }
}
