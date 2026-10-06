import { ResizeSettings, OutputFormat, SocialPreset } from '@/types/resizer';

export const SOCIAL_PRESETS: SocialPreset[] = [
  // Instagram
  { id: 'ig-square', category: 'Instagram', name: 'Square Post', width: 1080, height: 1080, aspectRatio: '1:1' },
  { id: 'ig-portrait', category: 'Instagram', name: 'Portrait Post', width: 1080, height: 1350, aspectRatio: '4:5' },
  { id: 'ig-story', category: 'Instagram', name: 'Story / Reel', width: 1080, height: 1920, aspectRatio: '9:16' },
  { id: 'ig-landscape', category: 'Instagram', name: 'Landscape Post', width: 1080, height: 566, aspectRatio: '1.91:1' },

  // YouTube
  { id: 'yt-thumb', category: 'YouTube', name: 'Thumbnail', width: 1280, height: 720, aspectRatio: '16:9' },
  { id: 'yt-banner', category: 'YouTube', name: 'Channel Banner', width: 2560, height: 1440, aspectRatio: '16:9' },
  { id: 'yt-profile', category: 'YouTube', name: 'Profile Avatar', width: 800, height: 800, aspectRatio: '1:1' },

  // Twitter / X
  { id: 'tw-post', category: 'Twitter / X', name: 'Shared Post', width: 1600, height: 900, aspectRatio: '16:9' },
  { id: 'tw-header', category: 'Twitter / X', name: 'Header Banner', width: 1500, height: 500, aspectRatio: '3:1' },
  { id: 'tw-profile', category: 'Twitter / X', name: 'Profile Picture', width: 400, height: 400, aspectRatio: '1:1' },

  // LinkedIn
  { id: 'li-post', category: 'LinkedIn', name: 'Feed Image', width: 1200, height: 627, aspectRatio: '1.91:1' },
  { id: 'li-banner', category: 'LinkedIn', name: 'Profile Banner', width: 1584, height: 396, aspectRatio: '4:1' },
  { id: 'li-company', category: 'LinkedIn', name: 'Company Banner', width: 1128, height: 191, aspectRatio: '5.9:1' },

  // Facebook
  { id: 'fb-post', category: 'Facebook', name: 'Feed Post', width: 1200, height: 630, aspectRatio: '1.91:1' },
  { id: 'fb-cover', category: 'Facebook', name: 'Cover Photo', width: 820, height: 312, aspectRatio: '2.6:1' },
  { id: 'fb-story', category: 'Facebook', name: 'Story', width: 1080, height: 1920, aspectRatio: '9:16' },

  // Standard Displays & Docs
  { id: 'std-fhd', category: 'Standard', name: 'Full HD 1080p', width: 1920, height: 1080, aspectRatio: '16:9' },
  { id: 'std-4k', category: 'Standard', name: '4K Ultra HD', width: 3840, height: 2160, aspectRatio: '16:9' },
  { id: 'std-passport', category: 'Standard', name: 'Passport / ID', width: 600, height: 600, aspectRatio: '1:1' },
  { id: 'std-blog', category: 'Standard', name: 'Blog Header', width: 1200, height: 675, aspectRatio: '16:9' },
];

export interface ResizeResult {
  blob: Blob;
  width: number;
  height: number;
  outputFormat: string;
  outputName: string;
  size: number;
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

export function getResizedFilename(
  originalName: string,
  width: number,
  height: number,
  mimeType: string
): string {
  const dotIndex = originalName.lastIndexOf('.');
  const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
  const ext = getFileExtension(mimeType);
  return `${baseName}-${width}x${height}${ext}`;
}

export async function getImageNaturalDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth || img.width, height: img.naturalHeight || img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image to calculate natural dimensions.'));
    };
    img.src = url;
  });
}

export async function resizeImageInBrowser(
  file: File,
  settings: ResizeSettings
): Promise<ResizeResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image data.'));
      img.onload = () => {
        try {
          const origW = img.naturalWidth || img.width;
          const origH = img.naturalHeight || img.height;

          let targetW = settings.width;
          let targetH = settings.height;

          // If mode is percentage
          if (settings.mode === 'percentage') {
            const factor = Math.max(1, settings.percentage) / 100;
            targetW = Math.max(1, Math.round(origW * factor));
            targetH = Math.max(1, Math.round(origH * factor));
          }

          // Guard against invalid 0 or negative dimensions
          targetW = Math.max(1, Math.round(targetW || origW));
          targetH = Math.max(1, Math.round(targetH || origH));

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d', { alpha: true });

          if (!ctx) {
            return reject(new Error('HTML5 Canvas 2D context not available.'));
          }

          const targetMime = determineTargetMime(file.type, settings.format);

          // Background fill if JPEG or requested contain background color
          if (targetMime === 'image/jpeg' || (settings.fit === 'contain' && settings.backgroundColor !== 'transparent')) {
            ctx.fillStyle = settings.backgroundColor || '#FFFFFF';
            ctx.fillRect(0, 0, targetW, targetH);
          }

          // Configure high quality scaling
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Apply Fit logic: 'cover' | 'contain' | 'fill'
          if (settings.fit === 'fill') {
            // Exact stretch to fill canvas
            ctx.drawImage(img, 0, 0, targetW, targetH);
          } else if (settings.fit === 'contain') {
            // Proportional contain within bounding box, centered
            const hRatio = targetW / origW;
            const vRatio = targetH / origH;
            const ratio = Math.min(hRatio, vRatio);

            const drawW = Math.round(origW * ratio);
            const drawH = Math.round(origH * ratio);
            const offsetX = Math.round((targetW - drawW) / 2);
            const offsetY = Math.round((targetH - drawH) / 2);

            ctx.drawImage(img, 0, 0, origW, origH, offsetX, offsetY, drawW, drawH);
          } else {
            // 'cover' - Proportional cover, center cropped
            const hRatio = targetW / origW;
            const vRatio = targetH / origH;
            const ratio = Math.max(hRatio, vRatio);

            const srcCropW = Math.round(targetW / ratio);
            const srcCropH = Math.round(targetH / ratio);
            const srcCropX = Math.round((origW - srcCropW) / 2);
            const srcCropY = Math.round((origH - srcCropH) / 2);

            ctx.drawImage(
              img,
              srcCropX,
              srcCropY,
              srcCropW,
              srcCropH,
              0,
              0,
              targetW,
              targetH
            );
          }

          const qualityFactor = Math.max(0.1, Math.min(1.0, settings.quality / 100));

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return reject(new Error('Failed to encode resized image into target format.'));
              }

              const outputName = getResizedFilename(file.name, targetW, targetH, targetMime);

              resolve({
                blob,
                width: targetW,
                height: targetH,
                outputFormat: targetMime.replace('image/', ''),
                outputName,
                size: blob.size,
              });
            },
            targetMime,
            qualityFactor
          );
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Unknown canvas resizing error.';
          reject(new Error(msg));
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
  setTimeout(() => URL.revokeObjectURL(url), 200);
}
