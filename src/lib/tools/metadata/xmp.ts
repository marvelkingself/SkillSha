/**
 * XMP Metadata Parser
 * Extracts Dublin Core, Adobe XMP, Photoshop metadata from XMP XML buffer
 */

import { XmpReport, MetadataField } from '@/types/tools';

export function parseXmp(buffer?: Buffer): XmpReport {
  if (!buffer || buffer.length === 0) {
    return {
      detected: false,
      fields: [],
    };
  }

  try {
    const xml = buffer.toString('utf8');
    if (!xml.includes('x:xmpmeta') && !xml.includes('rdf:RDF') && !xml.includes('http://ns.adobe.com/')) {
      return { detected: false, fields: [] };
    }

    const fields: MetadataField[] = [];

    // Helper to extract tag text or attribute
    const extractXmlValue = (regex: RegExp): string | undefined => {
      const match = xml.match(regex);
      if (match && match[1]) {
        return match[1].trim().replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
      }
      return undefined;
    };

    const creatorTool =
      extractXmlValue(/<xmp:CreatorTool>([^<]+)<\/xmp:CreatorTool>/i) ||
      extractXmlValue(/xmp:CreatorTool="([^"]+)"/i);

    const createDate =
      extractXmlValue(/<xmp:CreateDate>([^<]+)<\/xmp:CreateDate>/i) ||
      extractXmlValue(/xmp:CreateDate="([^"]+)"/i);

    const modifyDate =
      extractXmlValue(/<xmp:ModifyDate>([^<]+)<\/xmp:ModifyDate>/i) ||
      extractXmlValue(/xmp:ModifyDate="([^"]+)"/i);

    const creator =
      extractXmlValue(/<dc:creator>[\s\S]*?<rdf:li>([^<]+)<\/rdf:li>[\s\S]*?<\/dc:creator>/i) ||
      extractXmlValue(/<dc:creator>([^<]+)<\/dc:creator>/i);

    const description =
      extractXmlValue(/<dc:description>[\s\S]*?<rdf:li[^>]*>([^<]+)<\/rdf:li>[\s\S]*?<\/dc:description>/i) ||
      extractXmlValue(/<dc:description>([^<]+)<\/dc:description>/i);

    const rights =
      extractXmlValue(/<dc:rights>[\s\S]*?<rdf:li[^>]*>([^<]+)<\/rdf:li>[\s\S]*?<\/dc:rights>/i) ||
      extractXmlValue(/<dc:rights>([^<]+)<\/dc:rights>/i);

    if (creatorTool) fields.push({ label: 'Creator Tool', value: creatorTool });
    if (creator) fields.push({ label: 'Creator', value: creator });
    if (createDate) fields.push({ label: 'Creation Date', value: createDate });
    if (modifyDate) fields.push({ label: 'Modified Date', value: modifyDate });
    if (description) fields.push({ label: 'Description', value: description.slice(0, 120) });
    if (rights) fields.push({ label: 'Copyright Notice', value: rights });

    return {
      detected: true,
      creator,
      creatorTool,
      createDate,
      modifyDate,
      description,
      rights,
      fields: fields.length > 0 ? fields : [{ label: 'XMP Data Block', value: `${buffer.length} bytes XML` }],
    };
  } catch (err) {
    return {
      detected: true,
      fields: [{ label: 'XMP Data', value: `${buffer.length} bytes` }],
    };
  }
}
