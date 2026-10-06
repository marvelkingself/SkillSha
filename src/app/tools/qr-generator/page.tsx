import type { Metadata } from 'next';
import Link from 'next/link';
import QrClient from '@/components/tools/qr/QrClient';
import QrFaq from '@/components/tools/qr/QrFaq';
import { QR_FAQS } from '@/config/qr-faqs';
import {
  QrCode,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Zap,
  Printer,
  Smartphone,
  Palette,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free QR Code Generator - Custom Colors, Logos, Wi-Fi & vCard | Skillsha',
  description:
    'Generate free custom QR codes online for URLs, Wi-Fi networks, contacts (vCard), text, and emails. Download high-resolution PNG and vector SVG. 100% private and permanent.',
  alternates: {
    canonical: 'https://skillsha.com/tools/qr-generator',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free QR Code Generator - High-Resolution PNG & Vector SVG | Skillsha',
    description:
      'Create permanent QR codes for marketing, business cards, Wi-Fi, and links. Customize colors, add logos, and export vector SVG with zero tracking.',
    url: 'https://skillsha.com/tools/qr-generator',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator | Skillsha Tools',
    description: 'Instant client-side QR code generator with custom colors, logos, and vector SVG exports.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function QrGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free QR Code Generator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online QR code generator supporting URLs, Wi-Fi access, vCards, SMS, emails, custom colors, brand logos, and vector SVG downloads.',
        url: 'https://skillsha.com/tools/qr-generator',
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
            name: 'QR Code Generator',
            item: 'https://skillsha.com/tools/qr-generator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: QR_FAQS.map((faq) => ({
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
        <span className="text-slate-900 dark:text-white font-bold">QR Code Generator</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Marketing Tools • 100% Free & Permanent</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Free Online{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            QR Code Generator
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Create custom QR codes for website URLs, Wi-Fi connections, contact cards (vCard), text, and emails.
          Customize colors, embed your brand logo, and download print-ready PNG and vector SVG files.
        </p>
      </div>

      {/* Main Interactive App */}
      <QrClient />

      {/* Educational Guide Section */}
      <section className="pt-16 border-t border-slate-200 dark:border-white/10 space-y-12 max-w-4xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            QR Code Optimization Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Best Practices for Designing & Printing Reliable QR Codes
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            A poorly formatted QR code can cause scanning failures, frustrated customers, and wasted print runs.
            Follow these proven engineering guidelines to ensure flawless scan rates across all smartphones and lighting conditions.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Vector SVG for Print</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Never use low-res raster images on printed posters or business cards. Export our lossless Vector SVG to preserve crisp edges at any physical billboard scale.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">High Contrast Rule</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Smartphone camera sensors require dark foreground modules on a light background. Avoid inverted schemes (white dots on black background) on reflective physical media.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Permanent & Safe</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Unlike third-party "free trials" that hijack your links after 14 days, Skillsha codes are static and direct. They will continue working for as long as your website exists.
            </p>
          </div>
        </div>

        {/* Print Sizing Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm overflow-hidden">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Recommended Physical Print Sizing by Scanning Distance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
              <thead className="bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold uppercase text-[11px] border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="py-3 px-4">Application / Medium</th>
                  <th className="py-3 px-4">Typical Scanning Distance</th>
                  <th className="py-3 px-4">Minimum Physical Size</th>
                  <th className="py-3 px-4">Recommended ECC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-blue-600">Business Cards / Badges</td>
                  <td className="py-3 px-4">10 – 20 cm (close hand)</td>
                  <td className="py-3 px-4 font-mono font-semibold">2.0 × 2.0 cm</td>
                  <td className="py-3 px-4">Medium (15%)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-blue-600">Flyers, Brochures & Menus</td>
                  <td className="py-3 px-4">30 – 50 cm (table distance)</td>
                  <td className="py-3 px-4 font-mono font-semibold">3.0 × 3.0 cm</td>
                  <td className="py-3 px-4">Medium (15%)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-blue-600">Posters, Roll-up Banners</td>
                  <td className="py-3 px-4">1 – 2 meters</td>
                  <td className="py-3 px-4 font-mono font-semibold">10 × 10 cm</td>
                  <td className="py-3 px-4">High (30%)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-blue-600">Billboards & Window Decals</td>
                  <td className="py-3 px-4">5+ meters</td>
                  <td className="py-3 px-4 font-mono font-semibold">50 × 50 cm or larger</td>
                  <td className="py-3 px-4">High (30%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <QrFaq />
    </div>
  );
}
