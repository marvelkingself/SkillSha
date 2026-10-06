import type { Metadata } from 'next';
import Link from 'next/link';
import ResumeBuilderClient from '@/components/tools/career/ResumeBuilderClient';
import { ChevronRight, FileText, Sparkles, CheckCircle2, ShieldCheck, Download, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Resume Builder - ATS Friendly Resume Maker | Skillsha',
  description:
    'Build professional, ATS-compliant resumes online for free. Clean layouts, auto-enhanced bullet points, live preview, and instant PDF/Print download.',
  alternates: {
    canonical: 'https://skillsha.com/tools/ai-resume-builder',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free AI Resume Builder - ATS Friendly Resume Maker | Skillsha',
    description:
      'Build ATS-compliant professional resumes in minutes. Clean typography, quantified achievements, and instant PDF download.',
    url: 'https://skillsha.com/tools/ai-resume-builder',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Resume Builder | Skillsha Career Tools',
    description: 'Create an ATS-friendly resume for free. Clean layout, zero sign-up required, and print/PDF ready.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function AiResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha AI Resume Builder',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online ATS resume maker with clean layout, live preview, quantifiable bullet formatting, and PDF export.',
        url: 'https://skillsha.com/tools/ai-resume-builder',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'AI Resume Builder', item: 'https://skillsha.com/tools/ai-resume-builder' },
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
        <span className="text-slate-900 font-bold">AI Resume Builder</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • ATS-Compliant • No Sign-Up Required
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          AI Resume <span className="text-indigo-600">Builder</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Create a clean, ATS-compliant professional resume in minutes. Live formatting, quantifiable bullet points, zero graphic bloat, and instant PDF download.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <ResumeBuilderClient />

      {/* ATS Best Practices Guide */}
      <section className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Why ATS-Friendly Resumes Get 3x More Interviews</h2>
          <p className="text-slate-600 text-sm">
            Over 95% of Fortune 500 companies and top tech firms use Applicant Tracking Systems (ATS) like Workday, Greenhouse, and Lever to filter resumes before human recruiters read them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Clean Single-Column Hierarchy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Two-column designs, tables, icons, and text boxes confuse ATS parsers. Our clean hierarchy guarantees 100% data extraction accuracy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Action Verbs & Impact Metrics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use high-impact verbs (Architected, Engineered, Optimized) and quantifiable outcomes (%, $, hours saved) rather than generic duty lists.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Standard Section Headers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ATS parsers scan for exact labels: &quot;Professional Summary&quot;, &quot;Experience&quot;, &quot;Skills&quot;, and &quot;Education&quot;. Avoid fancy custom headings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
