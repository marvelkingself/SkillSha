import { CompressionSettings, OutputFormat } from '@/types/compressor';

export interface CompressionResult {
  blob: Blob;
  width: number;
  height: number;
  outputFormat: string;
  outputName: string;
  size: number;
  savingsBytes: number;
  savingsPercent: number;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function determineTargetMime(originalType: string, format: OutputFormat): string {
  if (format === 'webp') return 'image/webp';
  if (format === 'jpeg') return 'image/jpeg';
  if (format === 'png') return 'image/png';

  // Original format selected
  if (originalType.includes('png')) return 'image/png';
  if (originalType.includes('webp')) return 'image/webp';
  return 'image/jpeg';
}

export function getFileExtension(mimeType: string): string {
  switch (mimeType) {
    case 'image/webp':
      return '.webp';
    case 'image/png':
      return '.png';
    case 'image/jpeg':
    default:
      return '.jpg';
  }
}

export function getOptimizedFilename(originalName: string, mimeType: string): string {
  const dotIndex = originalName.lastIndexOf('.');
  const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
  const ext = getFileExtension(mimeType);
  return `${baseName}-skillsha-optimized${ext}`;
}

export async function compressImageInBrowser(
  file: File,
  settings: CompressionSettings
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image data.'));
      img.onload = () => {
        try {
          let targetWidth = img.naturalWidth || img.width;
          let targetHeight = img.naturalHeight || img.height;

          // Scale dimensions if maxWidth is specified and image is larger
          if (settings.maxWidth > 0 && targetWidth > settings.maxWidth) {
            const ratio = settings.maxWidth / targetWidth;
            targetWidth = Math.round(settings.maxWidth);
            targetHeight = Math.round(targetHeight * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d', { alpha: true });

          if (!ctx) {
            return reject(new Error('HTML5 Canvas 2D context not available.'));
          }

          const targetMime = determineTargetMime(file.type, settings.format);

          // If converting to JPEG, draw a clean white background first to prevent transparent areas turning black
          if (targetMime === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          const qualityFactor = Math.max(0.1, Math.min(1.0, settings.quality / 100));

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return reject(new Error('Failed to compress image into blob.'));
              }

              const compressedSize = blob.size;
              const savingsBytes = file.size - compressedSize;
              const savingsPercent =
                file.size > 0 ? Math.round(((file.size - compressedSize) / file.size) * 100) : 0;

              const outputName = getOptimizedFilename(file.name, targetMime);

              resolve({
                blob,
                width: targetWidth,
                height: targetHeight,
                outputFormat: targetMime,
                outputName,
                size: compressedSize,
                savingsBytes,
                savingsPercent,
              });
            },
            targetMime,
            qualityFactor
          );
        } catch (err: unknown) {
          reject(err instanceof Error ? err : new Error('Unexpected error during canvas compression.'));
        }
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
