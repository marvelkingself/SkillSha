import {
  MetadataScanResult,
  CleaningOptions,
  VerificationReport,
  SupportedImageFormat,
} from '@/types/tools';

export interface FileValidationResult {
  valid: boolean;
  format?: SupportedImageFormat;
  mimeType?: string;
  error?: string;
  fileSizeBytes: number;
}

export interface FormatScanner {
  detectC2PA(buffer: Buffer): { detected: boolean; boxType?: string; details?: string };
  extractChunks?(buffer: Buffer): { name: string; length: number }[];
}

export interface CleanerResult {
  cleanedBuffer: Buffer;
  mimeType: string;
  format: string;
  originalSizeBytes: number;
  cleanedSizeBytes: number;
}

export interface VerificationContext {
  beforeScan: MetadataScanResult;
  afterScan: MetadataScanResult;
  cleanedBuffer: Buffer;
  options: CleaningOptions;
  originalSizeBytes: number;
}
