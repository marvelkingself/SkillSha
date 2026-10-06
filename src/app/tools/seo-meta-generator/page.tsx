import type { Metadata } from 'next';
import Link from 'next/link';
import MetaClient from '@/components/tools/seo/MetaClient';
import MetaFaq from '@/components/tools/seo/MetaFaq';
import { SEO_META_FAQS } from '@/config/seo-meta-faqs';
import {
  Globe,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Search,
  Code2,
  Share2,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free SEO Meta Tag Generator - HTML & Next.js Metadata with Live SERP Preview | Skillsha',
  description:
    'Generate accurate SEO title tags, meta descriptions, OpenGraph social cards, Twitter cards, and Next.js Metadata snippets. Real-time Google SERP simulation.',
  alternates: {
    canonical: 'https://skillsha.com/tools/seo-meta-generator',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free SEO Meta Tag Generator | Skillsha Tools',
    description:
      'Create and test meta tags with live Google SERP and Social Card previews. Export clean HTML or Next.js Metadata objects.',
    url: 'https://skillsha.com/tools/seo-meta-generator',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Meta Tag Generator | Skillsha Tools',
    description: 'Design perfect SEO snippets and social cards with instant live previews.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function SeoMetaGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free SEO Meta Tag Generator',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online SEO meta tag generator with live Google SERP preview, Open Graph cards, Twitter cards, character length calculators, and Next.js Metadata exports.',
        url: 'https://skillsha.com/tools/seo-meta-generator',
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
            name: 'SEO Meta Tag Generator',
            item: 'https://skillsha.com/tools/seo-meta-generator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: SEO_META_FAQS.map((faq) => ({
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
        <span className="text-slate-900 dark:text-white font-bold">SEO Meta Tag Generator</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SEO Tools • 100% Free & Interactive</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Free SEO{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            Meta Tag Generator
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Create optimized search title tags, meta descriptions, Open Graph, and Twitter Cards with real-time Google SERP simulation.
          Copy standard HTML head code or modern Next.js Metadata objects with one click.
        </p>
      </div>

      {/* Main Interactive App */}
      <MetaClient />

      {/* Educational Guide Section */}
      <section className="pt-16 border-t border-slate-200 dark:border-white/10 space-y-12 max-w-4xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Search Optimization Strategy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How Meta Tags Impact Google Rankings & Click-Through Rates (CTR)
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Your title tag and meta description are your digital storefront on Google search.
            Crafting precise, benefit-driven snippets that avoid awkward truncation directly boosts organic CTR and visitor trust.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Pixel-Accurate SERP</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Google truncates titles wider than ~600px (~60 chars). Our live simulator previews both Desktop and Mobile layouts in real time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">High-CTR Social Cards</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Open Graph and Twitter Card tags ensure your links generate large, vibrant cards when shared on WhatsApp, LinkedIn, X, and Facebook.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Next.js Ready Snippets</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Export native TypeScript <code>Metadata</code> objects directly compatible with Next.js 13, 14, 15, and 16 App Router architectures.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <MetaFaq />
    </div>
  );
}
