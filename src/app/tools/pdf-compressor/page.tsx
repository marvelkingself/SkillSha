import type { Metadata } from 'next';
import Link from 'next/link';
import PdfClient from '@/components/tools/pdf/PdfClient';
import PdfFaq from '@/components/tools/pdf/PdfFaq';
import { PDF_FAQS } from '@/config/pdf-faqs';
import {
  FileText,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Zap,
  TrendingDown,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free PDF Compressor - Reduce PDF Size Online Without Losing Quality | Skillsha',
  description:
    'Compress PDF files online for free. Reduce document file size by up to 70% while keeping text crisp and clear. In-browser engine, batch mode, 100% private.',
  alternates: {
    canonical: 'https://skillsha.com/tools/pdf-compressor',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free PDF Compressor | Skillsha Tools',
    description:
      'Reduce PDF document file size securely in your browser. Perfect for email attachments, resumes, and official applications.',
    url: 'https://skillsha.com/tools/pdf-compressor',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Compressor | Skillsha Tools',
    description: 'Compress PDF documents with maximum privacy and zero quality loss.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function PdfCompressorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free PDF Compressor',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online PDF compression tool to reduce file size with customizable quality presets, metadata stripping, batch processing, and 100% in-browser security.',
        url: 'https://skillsha.com/tools/pdf-compressor',
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
            name: 'PDF Compressor',
            item: 'https://skillsha.com/tools/pdf-compressor',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: PDF_FAQS.map((faq) => ({
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
        <span className="text-slate-900 dark:text-white font-bold">PDF Compressor</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PDF Tools • 100% Free & Unlimited</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Free Online{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            PDF Compressor
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Reduce the file size of your PDF documents by up to 70% while preserving sharp vector text and formatting.
          Lightning-fast client-side compression with total privacy.
        </p>
      </div>

      {/* Main Interactive App */}
      <PdfClient />

      {/* Educational Guide Section */}
      <section className="pt-16 border-t border-slate-200 dark:border-white/10 space-y-12 max-w-4xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Document Optimization Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Why PDF Optimization Matters for Resumes, Portals & Email
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Large PDF files frequently bounce from email servers (which cap attachments at 20MB–25MB) and get rejected by government, university, or corporate application portals.
            Compressing document streams solves these friction points immediately.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Pass Upload Limits</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Job boards and government submission portals often enforce strict 1MB or 2MB limits. Extreme compression helps your file qualify without manual editing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Vector Text Preserved</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Fonts, tables, and vector curves remain mathematical shapes, staying 100% sharp and selectable when zoomed on high-resolution displays.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Confidential & Private</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Unlike online converters that retain copies of your documents on external servers, Skillsha compresses files directly in your browser memory.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PdfFaq />
    </div>
  );
}
