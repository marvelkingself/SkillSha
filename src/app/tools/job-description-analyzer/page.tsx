import type { Metadata } from 'next';
import Link from 'next/link';
import JdAnalyzerClient from '@/components/tools/career/JdAnalyzerClient';
import { ChevronRight, Sparkles, Target, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Job Description Analyzer - Extract Skills & Keywords | Skillsha',
  description:
    'Paste any job posting to extract must-have technical skills, soft skills, hidden requirements, seniority clues, and high-impact keywords for your resume.',
  alternates: {
    canonical: 'https://skillsha.com/tools/job-description-analyzer',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Job Description Analyzer | Skillsha Career Tools',
    description:
      'Extract critical technical skills, keywords, and salary clues from any job description in seconds.',
    url: 'https://skillsha.com/tools/job-description-analyzer',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Job Description Analyzer | Skillsha',
    description: 'Paste any job posting to isolate must-have skills and top resume keywords.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function JdAnalyzerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Job Description Analyzer',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to extract skills, seniority requirements, salary clues, and resume keywords from raw job descriptions.',
        url: 'https://skillsha.com/tools/job-description-analyzer',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Job Description Analyzer', item: 'https://skillsha.com/tools/job-description-analyzer' },
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
        <span className="text-slate-900 font-bold">Job Description Analyzer</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • Instant Skill Extraction • Zero Sign-Up
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Job Description <span className="text-indigo-600">Analyzer</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Paste any job posting from LinkedIn, Naukri, or Indeed. Extract core tech stack requirements, culture expectations, seniority benchmarks, and high-ranking ATS keywords.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <JdAnalyzerClient />
    </div>
  );
}
