import type { Metadata } from 'next';
import Link from 'next/link';
import CareerPathFinderClient from '@/components/tools/career/CareerPathFinderClient';
import { ChevronRight, Sparkles, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Path Finder - Map Your Career Trajectory & Roles | Skillsha',
  description:
    'Identify the top 3 high-growth career paths for your current skillset. Compare transition difficulty, salary growth potential, and required bridge competencies.',
  alternates: {
    canonical: 'https://skillsha.com/tools/career-path-finder',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Career Path Finder | Skillsha Career Tools',
    description: 'Map out your next promotion or career switch based on your current skills and experience.',
    url: 'https://skillsha.com/tools/career-path-finder',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Career Path Finder | Skillsha',
    description: 'Discover your best next career moves and bridge skills needed to transition.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function CareerPathFinderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Career Path Finder',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online career planning tool mapping current roles to future high-growth career options, ease of transition, and bridge skills.',
        url: 'https://skillsha.com/tools/career-path-finder',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Career Path Finder', item: 'https://skillsha.com/tools/career-path-finder' },
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
        <span className="text-slate-900 font-bold">Career Path Finder</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • Data-Driven Career Trajectories • Bridge Skills Map
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Career Path <span className="text-indigo-600">Finder</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Wondering what your next career step should be? Enter your current role or degree to discover the top 3 high-paying career trajectories, transition timelines, and bridge skills to learn.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <CareerPathFinderClient />
    </div>
  );
}
