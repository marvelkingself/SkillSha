import type { Metadata } from 'next';
import Link from 'next/link';
import CompressorClient from '@/components/tools/compressor/CompressorClient';
import CompressorFaq from '@/components/tools/compressor/CompressorFaq';
import { COMPRESSOR_FAQS } from '@/config/compressor-faqs';
import {
  Image as ImageIcon,
  ShieldCheck,
  ChevronRight,
  Zap,
  TrendingDown,
  Layers,
  Sparkles,
  Gauge,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online Image Compressor - Reduce JPG, PNG, WebP Size | Skillsha',
  description:
    'Compress JPG, PNG, and WebP images online for free without losing quality. Fast in-browser compression, batch mode, next-gen WebP conversion, and 100% private.',
  alternates: {
    canonical: 'https://skillsha.com/tools/image-compressor',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Online Image Compressor - Reduce Image Size | Skillsha',
    description:
      'Reduce file size of your photos and graphics by up to 80% without visible quality loss. Instant client-side engine with zero upload lag.',
    url: 'https://skillsha.com/tools/image-compressor',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Compressor | Skillsha Tools',
    description: 'Compress JPEG, PNG, and WebP images quickly. 100% free, private, and unlimited.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function ImageCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free Online Image Compressor',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to compress JPEG, PNG, and WebP images with customizable quality presets, WebP conversion, batch queue, and instant client-side processing.',
        url: 'https://skillsha.com/tools/image-compressor',
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
            name: 'Image Compressor',
            item: 'https://skillsha.com/tools/image-compressor',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: COMPRESSOR_FAQS.map((faq) => ({
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
        <span className="text-slate-900 font-bold">Image Compressor</span>
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
            Image Compressor
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Reduce the file size of your JPG, PNG, and WebP images by up to 80% without losing visual clarity.
          Lightning-fast in-browser compression with zero server upload delay.
        </p>
      </div>

      {/* Main Interactive Tool App */}
      <CompressorClient />

      {/* Educational Guide & SEO In-depth Sections */}
      <section className="pt-16 border-t border-slate-200 space-y-12 max-w-4xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Image Optimization Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Image Compression Matters for Web Performance & SEO
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Images account for over 60% of total webpage payload on modern websites. Optimizing image weight directly
            translates to lightning-fast load times, lower bounce rates, and higher Google search rankings.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Google Core Web Vitals</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Uncompressed banner images are the primary cause of slow <strong>Largest Contentful Paint (LCP)</strong>.
              Compressing photos accelerates LCP under the critical 2.5-second threshold.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Reduced Bandwidth Costs</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Shrink your asset sizes by 60% to 85%. This slashes CDN bandwidth charges and provides seamless browsing
              for users on limited 4G and 5G cellular plans.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Client-Side Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unlike cloud-based tools that send your photos to external servers, Skillsha compresses images locally
              in your browser using modern Web Canvas APIs. Your images never leave your computer.
            </p>
          </div>
        </div>

        {/* Format Comparison Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm overflow-hidden">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Image Formats Compared: Which Should You Use?</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Understanding the trade-offs between JPEG, PNG, and WebP formats.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4">Best Suited For</th>
                  <th className="py-3 px-4">Compression Type</th>
                  <th className="py-3 px-4">Transparency</th>
                  <th className="py-3 px-4">Relative Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-blue-600">WebP</td>
                  <td className="py-3.5 px-4">Modern websites, eCommerce, blogs</td>
                  <td className="py-3.5 px-4">Lossy & Lossless</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-semibold">Yes (Alpha)</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">Smallest (-30% vs JPG)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">JPEG / JPG</td>
                  <td className="py-3.5 px-4">Photographs, complex gradients</td>
                  <td className="py-3.5 px-4">Lossy</td>
                  <td className="py-3.5 px-4 text-red-500">No</td>
                  <td className="py-3.5 px-4">Compact</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">PNG</td>
                  <td className="py-3.5 px-4">Logos, UI icons, diagrams, text screenshots</td>
                  <td className="py-3.5 px-4">Lossless</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-semibold">Yes (Alpha)</td>
                  <td className="py-3.5 px-4 text-amber-700 font-medium">Larger</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Compression Presets Guide */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50/40 border border-blue-100 space-y-4">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Recommended Compression Preset Guide</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="bg-white/80 rounded-xl p-4 border border-blue-100/60">
              <span className="font-bold text-slate-900 block mb-1">Balanced (75%)</span>
              <p className="text-slate-600 text-xs">
                Ideal for general website usage, landing pages, and portfolio showcases. Offers ~70% space savings with zero
                perceptible loss in detail.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-4 border border-blue-100/60">
              <span className="font-bold text-slate-900 block mb-1">Max Reduction (55%)</span>
              <p className="text-slate-600 text-xs">
                Perfect when maximum page speed or tiny file sizes are critical (e.g. mobile apps, email newsletters, and
                chat thumbnails).
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-4 border border-blue-100/60">
              <span className="font-bold text-slate-900 block mb-1">Light (90%)</span>
              <p className="text-slate-600 text-xs">
                Best for high-end photography, print-ready graphics, and retina displays where every subtle nuance matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <CompressorFaq />
    </div>
  );
}
