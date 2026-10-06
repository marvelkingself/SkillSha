import type { Metadata } from 'next';
import Link from 'next/link';
import AtsCheckerClient from '@/components/tools/career/AtsCheckerClient';
import { ChevronRight, Sparkles, CheckCircle2, ShieldCheck, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker - Calculate Resume Score & Fix Errors | Skillsha',
  description:
    'Check your resume ATS compatibility score (0-100) instantly. Scan for missing keywords, weak action verbs, formatting errors, and recruiter guidelines.',
  alternates: {
    canonical: 'https://skillsha.com/tools/ats-resume-checker',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free ATS Resume Checker - Calculate Resume Score & Fix Errors | Skillsha',
    description:
      'Check if your resume can pass automated Applicant Tracking Systems. Instant score, action verbs audit, and missing sections detector.',
    url: 'https://skillsha.com/tools/ats-resume-checker',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free ATS Resume Checker | Skillsha Career Tools',
    description: 'Instant 0-100 ATS resume score, keyword analysis, and actionable improvement recommendations.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function AtsResumeCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free ATS Resume Checker',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online ATS resume scanner calculating 0-100 score, section audit, impact verbs check, and missing recruiter keywords.',
        url: 'https://skillsha.com/tools/ats-resume-checker',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'ATS Resume Checker', item: 'https://skillsha.com/tools/ats-resume-checker' },
        ],
      },
    ],
  };

  return (
    <div className="space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
        <span className="text-slate-900 font-bold">ATS Resume Checker</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • Automated Parsing Audit • Zero Sign-Up
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          ATS Resume <span className="text-indigo-600">Checker</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Scan your resume against modern Applicant Tracking System (ATS) parsing rules. Calculate your 0–100 compatibility score, discover missing keywords, and eliminate weak action verbs.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <AtsCheckerClient />

      {/* Guidance Section */}
      <section className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">How Our ATS Scoring Algorithm Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-600 text-sm">1. Section Hierarchy (25%)</span>
            <p className="text-slate-600 leading-relaxed">
              Scans for Contact Info, Professional Summary, Work History, Skills, and Education.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-600 text-sm">2. Quantified Impact (25%)</span>
            <p className="text-slate-600 leading-relaxed">
              Detects percentages (%), monetary numbers, metrics, and scalable team impact.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-600 text-sm">3. Action Verbs (20%)</span>
            <p className="text-slate-600 leading-relaxed">
              Rewards strong industry verbs while penalizing passive clichés like &quot;responsible for&quot;.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-600 text-sm">4. Readability & Length (30%)</span>
            <p className="text-slate-600 leading-relaxed">
              Verifies optimal word count (350–900 words), contact completeness, and clear layout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
