import { ToolCategory, ToolConfig } from '@/types/tools';

export const TOOL_CATEGORIES: ToolCategory[] = [
  'Image Tools',
  'SEO Tools',
  'Marketing Tools',
  'Developer Tools',
  'Productivity Tools',
  'PDF Tools',
];

export const TOOLS_CONFIG: ToolConfig[] = [
  {
    slug: 'ai-image-metadata-remover',
    name: 'AI Image Metadata Remover',
    shortDescription: 'Scan and clean supported EXIF, GPS, XMP, IPTC, and C2PA metadata from images.',
    category: 'Image Tools',
    iconName: 'Sparkles',
    route: '/tools/ai-image-metadata-remover',
    status: 'active',
    badge: '100% Free',
    seoTitle: 'AI Image Metadata Remover - Remove EXIF, GPS & XMP | Skillsha',
    seoDescription: 'Free online image metadata remover by Skillsha. Scan and clean supported EXIF, GPS, XMP, IPTC and C2PA metadata from images.',
    keywords: [
      'image metadata remover',
      'remove exif data',
      'remove gps from photo',
      'strip xmp metadata',
      'c2pa metadata removal',
      'ai prompt remover',
    ],
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    shortDescription: 'Compress JPEG, PNG, and WebP images with optimal quality-to-size balance.',
    category: 'Image Tools',
    iconName: 'Image',
    route: '/tools/image-compressor',
    status: 'active',
    badge: 'Popular',
    seoTitle: 'Free Online Image Compressor - Reduce Image Size | Skillsha',
    seoDescription: 'Compress JPEG, PNG, and WebP images online without losing quality. Fast browser compression, 100% free and private.',
    keywords: ['image compressor', 'compress png', 'compress jpg', 'reduce photo size', 'compress webp', 'online image optimizer'],
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    shortDescription: 'Resize images to custom pixel dimensions, percentage scale, or social media presets.',
    category: 'Image Tools',
    iconName: 'Maximize2',
    route: '/tools/image-resizer',
    status: 'active',
    badge: 'Popular',
    seoTitle: 'Free Online Image Resizer - Resize Photo Dimensions & Social Presets | Skillsha',
    seoDescription: 'Resize images online for free. Custom pixel dimensions, percentage scaling, aspect ratio lock, and ready presets for Instagram, YouTube, and LinkedIn.',
    keywords: [
      'image resizer',
      'resize photo online',
      'crop image for social media',
      'resize image in kb',
      'instagram photo resizer',
      'youtube thumbnail resizer',
      'free photo dimensions editor',
    ],
  },
  {
    slug: 'qr-generator',
    name: 'QR Code Generator',
    shortDescription: 'Create custom QR codes for URLs, Wi-Fi passwords, contacts, and marketing campaigns.',
    category: 'Marketing Tools',
    iconName: 'QrCode',
    route: '/tools/qr-generator',
    status: 'coming-soon',
    badge: 'Coming Soon',
    seoTitle: 'Free QR Code Generator | Skillsha',
    seoDescription: 'Generate high-resolution custom QR codes for your marketing and business needs.',
    keywords: ['qr code generator', 'free qr maker', 'wifi qr code'],
  },
  {
    slug: 'utm-builder',
    name: 'UTM Campaign Builder',
    shortDescription: 'Build tracking URLs with standard Google Analytics UTM parameters and presets.',
    category: 'Marketing Tools',
    iconName: 'Link2',
    route: '/tools/utm-builder',
    status: 'coming-soon',
    badge: 'Coming Soon',
    seoTitle: 'Free UTM Campaign Link Builder | Skillsha',
    seoDescription: 'Generate properly formatted UTM tracking links for marketing campaigns and ad tracking.',
    keywords: ['utm builder', 'campaign url builder', 'google analytics utm link'],
  },
  {
    slug: 'seo-meta-generator',
    name: 'SEO Meta Tag Generator',
    shortDescription: 'Generate OpenGraph, Twitter Cards, and canonical meta tags with live SERP preview.',
    category: 'SEO Tools',
    iconName: 'Globe',
    route: '/tools/seo-meta-generator',
    status: 'coming-soon',
    badge: 'Coming Soon',
    seoTitle: 'Free SEO Meta Tag Generator | Skillsha',
    seoDescription: 'Create accurate SEO title tags, meta descriptions, and OpenGraph tags with live previews.',
    keywords: ['seo meta tag generator', 'opengraph tags generator', 'twitter card maker'],
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDescription: 'Format, validate, beautify, and minify complex JSON structures with syntax check.',
    category: 'Developer Tools',
    iconName: 'Code',
    route: '/tools/json-formatter',
    status: 'coming-soon',
    badge: 'Coming Soon',
    seoTitle: 'Free JSON Formatter & Validator | Skillsha',
    seoDescription: 'Clean and validate JSON data instantly with syntax highlighting and tree visualization.',
    keywords: ['json formatter', 'json beautifier', 'json validator'],
  },
  {
    slug: 'pdf-compressor',
    name: 'PDF Compressor',
    shortDescription: 'Reduce PDF document file size while preserving high visual quality and typography.',
    category: 'PDF Tools',
    iconName: 'FileText',
    route: '/tools/pdf-compressor',
    status: 'coming-soon',
    badge: 'Coming Soon',
    seoTitle: 'Free PDF Compressor | Skillsha',
    seoDescription: 'Compress PDF files online securely and quickly without installing software.',
    keywords: ['pdf compressor', 'reduce pdf size', 'compress pdf online'],
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return TOOLS_CONFIG.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolConfig[] {
  return TOOLS_CONFIG.filter((tool) => tool.category === category);
}

export function getActiveTools(): ToolConfig[] {
  return TOOLS_CONFIG.filter((tool) => tool.status === 'active');
}
