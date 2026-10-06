import type { Metadata } from 'next';
import Link from 'next/link';
import RoadmapGeneratorClient from '@/components/tools/career/RoadmapGeneratorClient';
import { ChevronRight, Sparkles, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Roadmap Generator - 3, 6 & 12 Month Study Plans | Skillsha',
  description:
    'Generate structured learning roadmaps for IT, Data, Marketing, and Management roles. Includes weekly topics, portfolio project milestones, and progress tracking.',
  alternates: {
    canonical: 'https://skillsha.com/tools/career-roadmap-generator',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Career Roadmap Generator | Skillsha Career Tools',
    description: 'Build a step-by-step career upskilling roadmap with monthly project deliverables.',
    url: 'https://skillsha.com/tools/career-roadmap-generator',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Career Roadmap Generator | Skillsha',
    description: 'Generate 3, 6, or 12-month study roadmaps tailored to your career transition.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function CareerRoadmapGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Career Roadmap Generator',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool creating custom 3, 6, and 12-month career learning roadmaps with weekly topics and portfolio deliverables.',
        url: 'https://skillsha.com/tools/career-roadmap-generator',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Career Roadmap Generator', item: 'https://skillsha.com/tools/career-roadmap-generator' },
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
        <span className="text-slate-900 font-bold">Career Roadmap Generator</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • Milestone-Driven • Capstone Projects
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Career Roadmap <span className="text-indigo-600">Generator</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Transform your career transition into a clear, structured curriculum. Generate 3, 6, or 12-month study roadmaps complete with weekly milestones and portfolio projects.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <RoadmapGeneratorClient />
    </div>
  );
}
