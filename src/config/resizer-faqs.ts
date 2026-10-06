export interface ResizerFaqItem {
  question: string;
  answer: string;
}

export const RESIZER_FAQS: ResizerFaqItem[] = [
  {
    question: 'How do I resize an image without losing quality or getting blurriness?',
    answer:
      'To resize an image without losing quality, always resize downwards (downscaling) rather than enlarging a low-resolution image beyond its natural pixel bounds. Skillsha uses advanced bicubic interpolation algorithms directly inside your browser to resample pixels cleanly, preserving crisp edges and vibrant color gradients.',
  },
  {
    question: 'What is the difference between Cover, Contain, and Fill fit modes?',
    answer:
      'Cover scales the image proportionally so that it completely fills the target canvas, center-cropping any excess edges so the image never stretches. Contain scales the image so the entire photo fits within the bounding box without cropping, filling empty space with a clean background color. Fill stretches the image to the exact width and height, which may distort proportions if the aspect ratio differs.',
  },
  {
    question: 'What does "Lock Aspect Ratio" do?',
    answer:
      'Locking aspect ratio preserves the proportional relationship between the width and height of your original photo. When enabled, altering the width automatically recalculates the height (and vice-versa), ensuring your photo does not look squished or unnaturally stretched.',
  },
  {
    question: 'What are the recommended social media image dimensions in 2026?',
    answer:
      'The most popular dimensions are: Instagram Square (1080×1080 px, 1:1), Instagram Portrait (1080×1350 px, 4:5), Instagram Stories & Reels (1080×1920 px, 9:16), YouTube Thumbnails (1280×720 px, 16:9), Twitter/X Posts (1600×900 px, 16:9), and LinkedIn Shared Posts (1200×627 px). Our tool includes 1-click presets for all of these formats.',
  },
  {
    question: 'Can I convert my image format (e.g., PNG to WebP or JPG) while resizing?',
    answer:
      'Yes. You can keep the original format or instantly convert your resized output to Google next-gen WebP (for superior compression efficiency and faster website loading), clean JPG, or lossless PNG with full transparency support.',
  },
  {
    question: 'Is my photo private and secure when resizing on Skillsha?',
    answer:
      '100% private. All resizing operations execute locally on your device via client-side HTML5 Canvas. Your photos never get uploaded to any remote server or stored in any database. Your personal and corporate data never leaves your browser.',
  },
  {
    question: 'Can I batch resize multiple images at once?',
    answer:
      'Yes. You can drag and drop multiple images into the queue simultaneously, apply custom dimensions or social media presets across all of them in one click, and download them individually or as a complete batch.',
  },
];
