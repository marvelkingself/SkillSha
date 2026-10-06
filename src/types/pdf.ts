export type PdfCompressionPreset = 'extreme' | 'balanced' | 'light';

export interface PdfCompressionSettings {
  preset: PdfCompressionPreset;
  quality: number; // 0.3 to 0.95
  stripMetadata: boolean;
}

export interface CompressedPdfItem {
  id: string;
  originalFile: File;
  name: string;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  savingsBytes: number;
  savingsPercent: number;
  status: 'pending' | 'processing' | 'done' | 'error';
  errorMsg?: string;
  pageCount?: number;
}
