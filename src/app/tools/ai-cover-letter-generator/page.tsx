import type { Metadata } from 'next';
import Link from 'next/link';
import CoverLetterClient from '@/components/tools/career/CoverLetterClient';
import { ChevronRight, Sparkles, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Cover Letter Generator - Role & Company Specific | Skillsha',
  description:
    'Generate customized, professional cover letters in seconds. Tailored to your job description and resume with professional, results-driven, and modern styles.',
  alternates: {
    canonical: 'https://skillsha.com/tools/ai-cover-letter-generator',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free AI Cover Letter Generator | Skillsha Career Tools',
    description:
      'Generate high-converting cover letters matching your target role and company. 3 styles, instant PDF export, 100% free.',
    url: 'https://skillsha.com/tools/ai-cover-letter-generator',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Cover Letter Generator | Skillsha',
    description: 'Create customized cover letters matching your company and role in 30 seconds.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function CoverLetterGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha AI Cover Letter Generator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online cover letter generator crafting tailored letters matching company name, role, and achievements with 3 distinct styles.',
        url: 'https://skillsha.com/tools/ai-cover-letter-generator',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'AI Cover Letter Generator', item: 'https://skillsha.com/tools/ai-cover-letter-generator' },
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
        <span className="text-slate-900 font-bold">AI Cover Letter Generator</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • Company-Specific • Instant PDF & Copy
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          AI Cover Letter <span className="text-indigo-600">Generator</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Create compelling, high-converting cover letters tailored to your target company and role. Choose between Results-Driven, Corporate, or Short formats.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <CoverLetterClient />

      {/* Best Practices Section */}
      <section className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">What Makes a Winning Cover Letter in 2026?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Lead with Quantifiable Impact</h3>
            <p className="leading-relaxed">
              Skip generic pleasantries. Hook the recruiter in paragraph one with your most impressive achievement (e.g., &quot;scaled app to 50k users&quot; or &quot;grew sales by 40%&quot;).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Mention Specific Company Context</h3>
            <p className="leading-relaxed">
              Show that this isn&apos;t a copy-pasted blast. Reference their mission, product releases, or technical challenges you are eager to help solve.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Keep It Under 300 Words</h3>
            <p className="leading-relaxed">
              Hiring managers review hundreds of applications. A concise 3-paragraph letter is 4x more likely to be read in its entirety than a 2-page essay.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
