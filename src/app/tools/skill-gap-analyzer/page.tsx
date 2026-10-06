import type { Metadata } from 'next';
import Link from 'next/link';
import SkillGapAnalyzerClient from '@/components/tools/career/SkillGapAnalyzerClient';
import { ChevronRight, Sparkles, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Skill Gap Analyzer - Identify Missing Skills for Target Jobs | Skillsha',
  description:
    'Isolate exactly what skills you lack for your target job. Get an actionable priority breakdown categorized by Must-Have, Good-to-Have, and 2-week quick wins.',
  alternates: {
    canonical: 'https://skillsha.com/tools/skill-gap-analyzer',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Skill Gap Analyzer | Skillsha Career Tools',
    description: 'Find out what skills you need to land your dream tech or business role.',
    url: 'https://skillsha.com/tools/skill-gap-analyzer',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Skill Gap Analyzer | Skillsha',
    description: 'Analyze your skillset against target job descriptions and find quick wins.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function SkillGapAnalyzerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free Skill Gap Analyzer',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool comparing current skills with target roles to isolate high-priority gaps, quick wins, and readiness percentage.',
        url: 'https://skillsha.com/tools/skill-gap-analyzer',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Skill Gap Analyzer', item: 'https://skillsha.com/tools/skill-gap-analyzer' },
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
        <span className="text-slate-900 font-bold">Skill Gap Analyzer</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • Targeted Upskilling • Actionable Gap Report
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Skill Gap <span className="text-indigo-600">Analyzer</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Compare your current skillset directly against the job market requirements for your dream job. Identify your high-priority missing skills, competitive differentiators, and 2-week quick wins.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <SkillGapAnalyzerClient />
    </div>
  );
}
