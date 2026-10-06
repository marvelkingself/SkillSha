import type { Metadata } from 'next';
import Link from 'next/link';
import LinkedinOptimizerClient from '@/components/tools/career/LinkedinOptimizerClient';
import { ChevronRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free LinkedIn Profile Optimizer - Headlines, About Bios & Keywords | Skillsha',
  description:
    'Optimize your LinkedIn headline, About summary, and recruiter keywords. Increase your profile views and recruiter outreach with AI-backed templates.',
  alternates: {
    canonical: 'https://skillsha.com/tools/linkedin-profile-optimizer',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free LinkedIn Profile Optimizer | Skillsha Career Tools',
    description: 'Generate high-CTR LinkedIn headlines, story-driven bios, and recruiter search keywords.',
    url: 'https://skillsha.com/tools/linkedin-profile-optimizer',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free LinkedIn Profile Optimizer | Skillsha',
    description: 'Transform your LinkedIn profile into a recruiter magnet with high-CTR headlines and optimized summaries.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function LinkedinOptimizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha LinkedIn Profile Optimizer',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online LinkedIn optimizer generating high-converting headlines, storytelling summaries, and recruiter search keywords.',
        url: 'https://skillsha.com/tools/linkedin-profile-optimizer',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'LinkedIn Profile Optimizer', item: 'https://skillsha.com/tools/linkedin-profile-optimizer' },
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
        <span className="text-slate-900 font-bold">LinkedIn Profile Optimizer</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • High-CTR Headlines • Recruiter Keywords
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          LinkedIn Profile <span className="text-blue-600">Optimizer</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Craft search-optimized headlines, compelling personal story bios, and strategic keyword clusters to rank higher in recruiter searches and land 3x more interview inbounds.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <LinkedinOptimizerClient />
    </div>
  );
}
