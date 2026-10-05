export type ToolCategory =
  | 'Image Tools'
  | 'SEO Tools'
  | 'Marketing Tools'
  | 'Developer Tools'
  | 'Productivity Tools'
  | 'PDF Tools';

export type ToolStatus = 'active' | 'beta' | 'coming-soon';

export interface ToolConfig {
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  iconName: string;
  route: string;
  status: ToolStatus;
  badge?: string;
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
}

export type SupportedImageFormat = 'jpeg' | 'jpg' | 'png' | 'webp' | 'avif' | 'heic' | 'heif' | 'tiff';

export interface MetadataField {
  label: string;
  value: string | number | boolean;
  sensitive?: boolean;
}

export interface ExifReport {
  detected: boolean;
  make?: string;
  model?: string;
  lensModel?: string;
  dateTime?: string;
  software?: string;
  orientation?: string | number;
  exposureTime?: string;
  fNumber?: number;
  iso?: number;
  focalLength?: string;
  fields: MetadataField[];
}

export interface GpsReport {
  detected: boolean;
  hasCoordinates: boolean;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  dateStamp?: string;
  fields: MetadataField[];
}

export interface XmpReport {
  detected: boolean;
  creator?: string;
  creatorTool?: string;
  createDate?: string;
  modifyDate?: string;
  description?: string;
  rights?: string;
  fields: MetadataField[];
}

export interface IptcReport {
  detected: boolean;
  creator?: string;
  copyright?: string;
  headline?: string;
  caption?: string;
  keywords?: string[];
  city?: string;
  country?: string;
  fields: MetadataField[];
}

export interface C2paReport {
  status: 'present' | 'absent' | 'unsupported' | 'unreadable';
  detected: boolean;
  boxType?: string;
  manifestPresent?: boolean;
  details?: string;
  removalSupported: boolean;
}

export interface AiMetadataReport {
  detected: boolean;
  generator?: string;
  promptDetected: boolean;
  promptSnippet?: string;
  parametersFound?: boolean;
  fields: MetadataField[];
}

export interface ImageInfo {
  format: string;
  mimeType: string;
  width?: number;
  height?: number;
  sizeBytes: number;
  hasAlpha?: boolean;
  colorSpace?: string;
}

export interface MetadataScanResult {
  imageInfo: ImageInfo;
  hasAnyMetadata: boolean;
  exif: ExifReport;
  gps: GpsReport;
  xmp: XmpReport;
  iptc: IptcReport;
  c2pa: C2paReport;
  aiMetadata: AiMetadataReport;
  rawFieldCount: number;
}

export type CleaningMode = 'metadata-only' | 're-encode';

export interface CleaningOptions {
  mode: CleaningMode;
  quality?: number; // 70 to 100 for re-encode mode, default 90
  stripAll?: boolean;
}

export type TagRemovalStatus = 'Removed' | 'Not Found' | 'Could not remove' | 'Unsupported' | 'Intact';

export interface FieldComparison {
  category: 'EXIF' | 'GPS' | 'XMP' | 'IPTC' | 'C2PA' | 'AI Metadata';
  before: 'Found' | 'Not Found' | 'Present' | 'Absent';
  after: 'Present' | 'Absent';
  status: TagRemovalStatus;
  notes?: string;
}

export interface VerificationReport {
  timestamp: string;
  originalSizeBytes: number;
  cleanedSizeBytes: number;
  sizeSavingsBytes: number;
  sizeSavingsPercent: number;
  modeUsed: CleaningMode;
  comparisons: FieldComparison[];
  allCleanedSuccessfully: boolean;
}

export interface CleanApiResponse {
  success: boolean;
  error?: string;
  data?: {
    cleanedImageBase64: string;
    mimeType: string;
    filename: string;
    beforeScan: MetadataScanResult;
    afterScan: MetadataScanResult;
    verification: VerificationReport;
  };
}

export interface ScanApiResponse {
  success: boolean;
  error?: string;
  data?: MetadataScanResult;
}
