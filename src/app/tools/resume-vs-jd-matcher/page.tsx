import type { Metadata } from 'next';
import Link from 'next/link';
import ResumeJdMatcherClient from '@/components/tools/career/ResumeJdMatcherClient';
import { ChevronRight, Sparkles, Puzzle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume vs Job Description Matcher - Free Keyword Gap Tool | Skillsha',
  description:
    'Compare your resume against any job description to discover your match percentage, identified skills, and missing critical keywords needed to pass recruiter filters.',
  alternates: {
    canonical: 'https://skillsha.com/tools/resume-vs-jd-matcher',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Resume vs Job Description Matcher | Skillsha Career Tools',
    description: 'Calculate resume match % against any JD. Identify missing skills and boost interview chances.',
    url: 'https://skillsha.com/tools/resume-vs-jd-matcher',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume vs JD Matcher | Skillsha',
    description: 'Compare your CV against job postings and find keyword gaps instantly.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function ResumeJdMatcherPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Resume vs Job Description Matcher',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool comparing resume text and job postings to output match score, missing keywords, and experience alignment.',
        url: 'https://skillsha.com/tools/resume-vs-jd-matcher',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Resume vs JD Matcher', item: 'https://skillsha.com/tools/resume-vs-jd-matcher' },
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
        <span className="text-slate-900 font-bold">Resume vs JD Matcher</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • Dual Keyword Comparator • Zero Sign-Up
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Resume vs JD <span className="text-indigo-600">Matcher</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Compare your resume against the target job posting before you submit your application. Discover your exact keyword match percentage and missing technical requirements.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <ResumeJdMatcherClient />
    </div>
  );
}
