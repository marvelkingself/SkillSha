import type { Metadata } from 'next';
import Link from 'next/link';
import JsonClient from '@/components/tools/json/JsonClient';
import JsonFaq from '@/components/tools/json/JsonFaq';
import { JSON_FAQS } from '@/config/json-faqs';
import {
  Code,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Zap,
  Wrench,
  FolderTree,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator - Beautify, Minify & Auto-Repair JSON | Skillsha',
  description:
    'Format, validate, beautify, minify, and auto-repair JSON online. Interactive collapsible tree view, real-time syntax error locator, 100% private in-browser tool.',
  alternates: {
    canonical: 'https://skillsha.com/tools/json-formatter',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free JSON Formatter & Validator | Skillsha Tools',
    description:
      'Validate, beautify, and repair JSON online with instant syntax feedback, key sorting, and interactive tree view.',
    url: 'https://skillsha.com/tools/json-formatter',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter & Validator | Skillsha Tools',
    description: 'Format, validate, and minify complex JSON files with real-time error markers.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function JsonFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free JSON Formatter & Validator',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free developer tool to validate, beautify, minify, sort keys, and auto-repair JSON documents with real-time syntax error detection and tree visualization.',
        url: 'https://skillsha.com/tools/json-formatter',
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
            name: 'JSON Formatter & Validator',
            item: 'https://skillsha.com/tools/json-formatter',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: JSON_FAQS.map((faq) => ({
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
        <span className="text-slate-900 dark:text-white font-bold">JSON Formatter</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Developer Tools • 100% Free & In-Browser</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Free JSON{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            Formatter & Validator
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Beautify, minify, sort keys, and auto-repair JSON structures with real-time RFC 8259 syntax validation.
          Includes interactive collapsible tree view, character statistics, and 100% private client-side processing.
        </p>
      </div>

      {/* Main Interactive App */}
      <JsonClient />

      {/* Educational Guide Section */}
      <section className="pt-16 border-t border-slate-200 dark:border-white/10 space-y-12 max-w-4xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Developer Reference Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Mastering JSON Syntax: RFC 8259 Rules & Common Pitfalls
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            JSON (JavaScript Object Notation) is the universal language of modern REST APIs, GraphQL payloads, and microservices.
            Understanding strict serialization standards prevents runtime API exceptions and broken integrations.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Smart Auto-Repair</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Fixes pesky syntax mistakes like trailing commas, single-quoted strings, and unquoted object keys with a single click.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <FolderTree className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Interactive Tree View</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Explore deeply nested arrays and objects with collapsible branches and color-coded data types (strings, numbers, booleans).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Zero Server Transmission</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Your API responses, JWT tokens, and database schemas remain strictly in your browser memory. Nothing is ever sent to our servers.
            </p>
          </div>
        </div>

        {/* Common Syntax Errors Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm overflow-hidden">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Common Invalid JSON Patterns vs Correct RFC 8259 Standard
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
              <thead className="bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold uppercase text-[11px] border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="py-3 px-4">Mistake Type</th>
                  <th className="py-3 px-4 text-red-500">Invalid Pattern</th>
                  <th className="py-3 px-4 text-emerald-600">Valid RFC 8259 JSON</th>
                  <th className="py-3 px-4">Why It Breaks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono text-xs">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-slate-900 dark:text-white">Trailing Comma</td>
                  <td className="py-3 px-4 text-red-500">{`{"a": 1, "b": 2,}`}</td>
                  <td className="py-3 px-4 text-emerald-600">{`{"a": 1, "b": 2}`}</td>
                  <td className="py-3 px-4 font-sans text-slate-500">JSON grammar requires commas strictly between elements.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-slate-900 dark:text-white">Single Quotes</td>
                  <td className="py-3 px-4 text-red-500">{'{\'name\': \'Skillsha\'}'}</td>
                  <td className="py-3 px-4 text-emerald-600">{`{"name": "Skillsha"}`}</td>
                  <td className="py-3 px-4 font-sans text-slate-500">JSON only recognizes double quotes for strings.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-slate-900 dark:text-white">Unquoted Keys</td>
                  <td className="py-3 px-4 text-red-500">{`{title: "DevOps"}`}</td>
                  <td className="py-3 px-4 text-emerald-600">{`{"title": "DevOps"}`}</td>
                  <td className="py-3 px-4 font-sans text-slate-500">All object property names must be double-quoted strings.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-sans font-bold text-slate-900 dark:text-white">Comments</td>
                  <td className="py-3 px-4 text-red-500">// API config</td>
                  <td className="py-3 px-4 text-emerald-600">(Remove comments)</td>
                  <td className="py-3 px-4 font-sans text-slate-500">JSON specification intentionally does not support comments.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <JsonFaq />
    </div>
  );
}
