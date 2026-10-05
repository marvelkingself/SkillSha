export type CompressionPreset = 'balanced' | 'aggressive' | 'light' | 'custom';

export type OutputFormat = 'original' | 'webp' | 'jpeg' | 'png';

export interface CompressionSettings {
  quality: number; // 10 to 100
  format: OutputFormat;
  maxWidth: number; // 0 means keep original resolution
}

export interface CompressedItem {
  id: string;
  originalFile: File;
  originalName: string;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  savingsBytes: number;
  savingsPercent: number;
  originalPreviewUrl: string;
  compressedPreviewUrl: string | null;
  width: number;
  height: number;
  outputFormat: string;
  status: 'pending' | 'compressing' | 'done' | 'error';
  errorMsg?: string;
}
