export type ResizeMode = 'dimensions' | 'percentage' | 'preset';

export type FitMode = 'cover' | 'contain' | 'fill';

export type OutputFormat = 'original' | 'webp' | 'jpeg' | 'png';

export interface SocialPreset {
  id: string;
  category: 'Instagram' | 'YouTube' | 'Twitter / X' | 'LinkedIn' | 'Facebook' | 'Standard';
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export interface ResizeSettings {
  mode: ResizeMode;
  width: number;
  height: number;
  percentage: number; // 10 to 500
  lockAspectRatio: boolean;
  fit: FitMode;
  backgroundColor: string; // Hex e.g. '#ffffff' or 'transparent'
  format: OutputFormat;
  quality: number; // 10 to 100
  selectedPresetId?: string;
}

export interface ResizedItem {
  id: string;
  originalFile: File;
  originalName: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalPreviewUrl: string;
  resizedBlob: Blob | null;
  resizedSize: number;
  resizedWidth: number;
  resizedHeight: number;
  resizedPreviewUrl: string | null;
  outputFormat: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  errorMsg?: string;
}
