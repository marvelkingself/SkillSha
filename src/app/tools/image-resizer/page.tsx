import type { Metadata } from 'next';
import Link from 'next/link';
import ResizerClient from '@/components/tools/resizer/ResizerClient';
import ResizerFaq from '@/components/tools/resizer/ResizerFaq';
import { RESIZER_FAQS } from '@/config/resizer-faqs';
import {
  Image as ImageIcon,
  ShieldCheck,
  ChevronRight,
  Zap,
  Maximize2,
  Crop,
  Layers,
  Sparkles,
  Gauge,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online Image Resizer - Resize JPG, PNG, WebP by Pixels, % & Social Presets | Skillsha',
  description:
    'Resize images online for free without losing quality. Custom dimensions, aspect ratio lock, percentage scaling, 2026 social media presets, batch processing, and 100% private in-browser engine.',
  alternates: {
    canonical: 'https://skillsha.com/tools/image-resizer',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Online Image Resizer - Resize Images Online | Skillsha',
    description:
      'Easily resize JPG, PNG, and WebP images to exact pixel dimensions, percentage, or social media standards. 100% free, client-side, and private.',
    url: 'https://skillsha.com/tools/image-resizer',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Resizer | Skillsha Tools',
    description: 'Resize JPG, PNG, and WebP images with custom pixels, aspect ratio lock, and social presets. 100% free & private.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function ImageResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free Online Image Resizer',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online image resizer to adjust pixel dimensions, scale by percentage, or convert to Instagram, YouTube, Twitter/X, LinkedIn, and Facebook social media presets with instant in-browser canvas processing.',
        url: 'https://skillsha.com/tools/image-resizer',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Skillsha',
            item: 'https://skillsha.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Free Tools',
            item: 'https://skillsha.com/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Image Resizer',
            item: 'https://skillsha.com/tools/image-resizer',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: RESIZER_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="space-y-16">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-slate-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/tools" className="hover:text-slate-600 transition-colors">
          Tools
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Image Resizer</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Image Tools • 100% Free & Unlimited</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Free Online{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            Image Resizer
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Change image dimensions in pixels, percentage, or social media presets with aspect ratio lock and high-precision canvas scaling. Fast, private, and 100% free.
        </p>
      </div>

      {/* Main Interactive Tool App */}
      <ResizerClient />

      {/* Educational Guide & SEO In-depth Sections */}
      <section className="pt-16 border-t border-slate-200 space-y-12 max-w-4xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Image Resizing & Optimization Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Mastering Image Dimensions: Aspect Ratios, Presets & Core Web Vitals
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Resizing images to their exact target display dimensions is the single most critical step in web performance and social media engagement. Serving oversized 4000px camera photos in a 400px blog card wastes user bandwidth and harms page speed.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Maximize2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Aspect Ratio Precision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Keep the Aspect Ratio Lock engaged to preserve visual balance without awkward squishing or stretching. Use Cover or Contain to fit standard display formats seamlessly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Ready for 2026 Socials</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Instantly convert photos into recommended formats for Instagram Posts & Reels, YouTube Thumbnails, Twitter/X banners, and LinkedIn graphics with one click.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Client-Side Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your images are processed right inside your browser using HTML5 Canvas bicubic interpolation. Files are never uploaded to any remote server or stored in any database.
            </p>
          </div>
        </div>

        {/* 2026 Social Media Cheat Sheet Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm overflow-hidden">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">2026 Social Media Dimensions Cheat Sheet</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Optimal pixel resolutions and aspect ratios across major social networks to prevent auto-cropping.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Content Type</th>
                  <th className="py-3 px-4">Recommended Size</th>
                  <th className="py-3 px-4">Aspect Ratio</th>
                  <th className="py-3 px-4">Optimal Fit Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-pink-600">Instagram</td>
                  <td className="py-3.5 px-4">Square Feed Post</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">1080 × 1080 px</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">1:1</td>
                  <td className="py-3.5 px-4 text-blue-600 font-medium">Cover (Crop)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-pink-600">Instagram</td>
                  <td className="py-3.5 px-4">Portrait Feed Post (Maximum Feed Real Estate)</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">1080 × 1350 px</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">4:5</td>
                  <td className="py-3.5 px-4 text-blue-600 font-medium">Cover (Crop)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-pink-600">Instagram</td>
                  <td className="py-3.5 px-4">Story & Reel Fullscreen</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">1080 × 1920 px</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">9:16</td>
                  <td className="py-3.5 px-4 text-blue-600 font-medium">Cover (Crop)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-red-600">YouTube</td>
                  <td className="py-3.5 px-4">Video Thumbnail (Under 2MB)</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">1280 × 720 px</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">16:9</td>
                  <td className="py-3.5 px-4 text-blue-600 font-medium">Cover / Contain</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-red-600">YouTube</td>
                  <td className="py-3.5 px-4">Channel Banner</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">2560 × 1440 px</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">16:9</td>
                  <td className="py-3.5 px-4 text-blue-600 font-medium">Cover (Crop)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Twitter / X</td>
                  <td className="py-3.5 px-4">Shared Post Single Image</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">1600 × 900 px</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">16:9</td>
                  <td className="py-3.5 px-4 text-blue-600 font-medium">Cover (Crop)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-blue-700">LinkedIn</td>
                  <td className="py-3.5 px-4">Feed Post / Link Article Preview</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">1200 × 627 px</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">1.91:1</td>
                  <td className="py-3.5 px-4 text-blue-600 font-medium">Cover (Crop)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-blue-600">Facebook</td>
                  <td className="py-3.5 px-4">Shared Link & Feed Post</td>
                  <td className="py-3.5 px-4 font-mono font-semibold">1200 × 630 px</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">1.91:1</td>
                  <td className="py-3.5 px-4 text-blue-600 font-medium">Cover (Crop)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Fit Modes Comparison Explanation */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Crop className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Understanding Fit Modes: Cover vs Contain vs Fill</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Cover (Smart Crop)</span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Fills the entire target canvas while maintaining the natural aspect ratio. Excess portions on the top/bottom or sides are neatly centered and cropped. Perfect for social posts and banners.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Contain (Fit with Padding)</span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Fits the entire image inside the bounding box without cropping any pixels. Empty borders are filled with your chosen background color (White, Black, or Transparent PNG/WebP).
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Fill / Stretch</span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Forces the image to fill the exact width and height requested. Ignores original proportions. Best used when scaling by exact percentage or when dimensions share the same aspect ratio.
              </p>
            </div>
          </div>
        </div>

        {/* Resizing vs Compressing for Web Performance */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Gauge className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Image Resizing vs. Image Compression: Which Comes First?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Many developers mistakenly compress a 20-Megapixel image without resizing its resolution first. An image with 4000 × 3000 pixels still requires massive memory to decode on a smartphone, even if compressed to a smaller byte size.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
              <span className="font-bold text-blue-600 text-sm">Step 1: Resize Dimensions First</span>
              <p className="text-slate-600">
                Scale down the physical pixel dimensions to match the maximum width required by your website layout (e.g. 1200px or 1920px). This removes up to 90% of redundant pixel data immediately.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
              <span className="font-bold text-emerald-600 text-sm">Step 2: Compress Quality Next</span>
              <p className="text-slate-600">
                Use the{' '}
                <Link href="/tools/image-compressor" className="font-bold text-blue-600 underline hover:text-blue-800">
                  Skillsha Image Compressor
                </Link>{' '}
                to strip metadata and optimize quality to 75-80% WebP for the fastest possible Core Web Vitals LCP score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <ResizerFaq />
    </div>
  );
}
