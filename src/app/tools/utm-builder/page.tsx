import type { Metadata } from 'next';
import Link from 'next/link';
import UtmClient from '@/components/tools/utm/UtmClient';
import UtmFaq from '@/components/tools/utm/UtmFaq';
import { UTM_FAQS } from '@/config/utm-faqs';
import {
  Link2,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  BarChart3,
  Layers,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free UTM Campaign Builder - Google Analytics 4 Link Generator | Skillsha',
  description:
    'Generate accurate Google Analytics UTM tracking links for marketing campaigns, ads, newsletters, and social media. 1-click presets, batch matrix, and 100% free.',
  alternates: {
    canonical: 'https://skillsha.com/tools/utm-builder',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free UTM Campaign Builder | Skillsha Tools',
    description:
      'Build clean, sanitized UTM tracking parameters for GA4. Generate links for Google Ads, Meta Ads, LinkedIn, and Email campaigns.',
    url: 'https://skillsha.com/tools/utm-builder',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UTM Campaign Builder | Skillsha Tools',
    description: 'Track ad campaigns accurately with standardized Google Analytics UTM URLs.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function UtmBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free UTM Campaign Link Builder',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online UTM link builder tool supporting Google Analytics 4, multi-channel batch link generation, auto-sanitization, and channel presets.',
        url: 'https://skillsha.com/tools/utm-builder',
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
            name: 'UTM Campaign Builder',
            item: 'https://skillsha.com/tools/utm-builder',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: UTM_FAQS.map((faq) => ({
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
        <span className="text-slate-900 dark:text-white font-bold">UTM Campaign Builder</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Marketing Tools • 100% Free & Private</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Free UTM{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            Campaign Builder
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Create properly formatted, sanitized UTM tracking URLs for Google Analytics 4 (GA4).
          Use 1-click channel presets, enforce lowercase standards, and generate multi-channel batch matrices in seconds.
        </p>
      </div>

      {/* Main Interactive App */}
      <UtmClient />

      {/* Educational Guide Section */}
      <section className="pt-16 border-t border-slate-200 dark:border-white/10 space-y-12 max-w-4xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Analytics Strategy Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            The Ultimate Guide to Google Analytics 4 (GA4) UTM Tracking
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Without consistent UTM parameters, Google Analytics dumps incoming traffic into generic "Direct" or "Unassigned" buckets.
            Standardizing your parameters ensures precise ROI tracking and accurate channel attribution.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">GA4 Traffic Attribution</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Correctly populates the <em>First User Source / Medium</em> and <em>Session Campaign</em> dimensions in GA4 acquisition reports.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Batch Multi-Channel</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Generate links for Google Ads, Facebook, Instagram, LinkedIn, and Email in a single action instead of filling forms one by one.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Auto-Sanitization</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Enforces lowercase formatting and clean hyphens, preventing fragmented reports caused by accidental capitalization or space encoding.
            </p>
          </div>
        </div>

        {/* Naming Conventions Matrix */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm overflow-hidden">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Standard GA4 UTM Conventions Cheat Sheet
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
              <thead className="bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold uppercase text-[11px] border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="py-3 px-4">Channel / Medium</th>
                  <th className="py-3 px-4">utm_source</th>
                  <th className="py-3 px-4">utm_medium</th>
                  <th className="py-3 px-4">Example Campaign Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono text-xs">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-blue-600">Google Search Ads (PPC)</td>
                  <td className="py-3 px-4">google</td>
                  <td className="py-3 px-4 text-emerald-600">cpc</td>
                  <td className="py-3 px-4">data_analytics_pune</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-blue-600">Facebook / Instagram Ads</td>
                  <td className="py-3 px-4">facebook / instagram</td>
                  <td className="py-3 px-4 text-emerald-600">paid-social</td>
                  <td className="py-3 px-4">festive_discount_2026</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-blue-600">LinkedIn Sponsored Feed</td>
                  <td className="py-3 px-4">linkedin</td>
                  <td className="py-3 px-4 text-emerald-600">paid-social</td>
                  <td className="py-3 px-4">b2b_executive_hiring</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-blue-600">Email Drip Campaign</td>
                  <td className="py-3 px-4">newsletter</td>
                  <td className="py-3 px-4 text-emerald-600">email</td>
                  <td className="py-3 px-4">weekly_digest_issue42</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-blue-600">YouTube Video Description</td>
                  <td className="py-3 px-4">youtube</td>
                  <td className="py-3 px-4 text-emerald-600">video</td>
                  <td className="py-3 px-4">python_tutorial_part1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <UtmFaq />
    </div>
  );
}
