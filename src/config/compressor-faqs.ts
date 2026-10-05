export interface CompressorFaqItem {
  question: string;
  answer: string;
}

export const COMPRESSOR_FAQS: CompressorFaqItem[] = [
  {
    question: 'How does image compression work?',
    answer:
      'Image compression reduces file weight by identifying redundant image data and optimizing color information. Lossy compression removes subtle pixel nuances that the human eye cannot distinguish (quantization), while lossless algorithms optimize repetitive patterns and entropy encoding without altering visual details.',
  },
  {
    question: 'What is the difference between lossy and lossless compression?',
    answer:
      'Lossless compression preserves 100% of the original pixel data, allowing exact bit-for-bit reconstruction (ideal for PNG graphics, vector art, and screenshots). Lossy compression strategically discards imperceptible chromatic data to achieve drastic file size cuts (typically 60% to 90% reduction), making it optimal for web photographs, hero banners, and blog posts.',
  },
  {
    question: 'Why should I convert my images to WebP format?',
    answer:
      'WebP is a modern next-generation image format developed by Google that provides superior lossy and lossless compression. WebP images are typically 26% smaller than PNGs and 25-34% smaller than comparable JPEGs at equivalent visual quality, while supporting 24-bit RGB color with transparency (alpha channel).',
  },
  {
    question: 'Will compressing my images visibly reduce their quality?',
    answer:
      'With our "Balanced" (75% quality) and "Light" (90% quality) presets, visual quality loss is virtually invisible to the naked eye under standard screen viewing. The "Maximum Compression" preset (55%) prioritizes aggressive byte reduction for mobile users or speed-critical landing pages, with minimal chromatic softening.',
  },
  {
    question: 'How does image compression improve Google Core Web Vitals and SEO?',
    answer:
      'Heavy uncompressed images are the #1 cause of poor Largest Contentful Paint (LCP) scores and slow page load times. Compressing images shrinks page weight, decreases server bandwidth, accelerates time-to-first-meaningful-paint on 4G/5G mobile networks, and boosts search rankings by satisfying Google PageSpeed benchmarks.',
  },
  {
    question: 'Is there a file size limit, and are my images uploaded to any server?',
    answer:
      'Skillsha Image Compressor executes primarily in your web browser using HTML5 Canvas and WebAssembly graphics engines. Because processing happens locally on your computer or phone, there are no strict 4.5MB server limits, zero network upload latency, and 100% complete privacy: your photos never leave your device.',
  },
  {
    question: 'Can I compress multiple images simultaneously?',
    answer:
      'Yes! You can drag and drop multiple images simultaneously. The compressor processes them concurrently in the browser queue and allows you to download each optimized image individually or all at once.',
  },
  {
    question: 'Which image formats are supported?',
    answer:
      'We support JPEG (.jpg, .jpeg), PNG (.png), and WebP (.webp) inputs, and you can export your optimized files as WebP, JPEG, PNG, or maintain their original file format.',
  },
];
