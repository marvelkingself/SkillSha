import type { Metadata } from 'next';
import Link from 'next/link';
import SalaryEstimatorClient from '@/components/tools/career/SalaryEstimatorClient';
import { ChevronRight, Sparkles, DollarSign, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Salary Estimator India - Role, Experience & City Pay Benchmarks | Skillsha',
  description:
    'Calculate realistic Indian tech and corporate salary ranges (LPA & monthly in-hand). Benchmark your compensation by experience, city, and high-demand skills.',
  alternates: {
    canonical: 'https://skillsha.com/tools/salary-estimator',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Salary Estimator India | Skillsha Career Tools',
    description: 'Calculate your true market worth across Bangalore, Pune, Mumbai, Hyderabad, and Delhi-NCR.',
    url: 'https://skillsha.com/tools/salary-estimator',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Salary Estimator India | Skillsha',
    description: 'Calculate realistic CTC & in-hand monthly salaries by role, experience, and city.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function SalaryEstimatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Free Salary Estimator India',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Free online salary estimator benchmark calculator for Indian IT, BPO, HR, Marketing, Sales, and Management roles.',
        url: 'https://skillsha.com/tools/salary-estimator',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Salary Estimator', item: 'https://skillsha.com/tools/salary-estimator' },
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
        <span className="text-slate-900 font-bold">Salary Estimator</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • Verified Indian Tech & Corporate Benchmarks
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Salary <span className="text-indigo-600">Estimator</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Benchmark your real market compensation. Estimate low, median, and high CTC packages alongside monthly in-hand net salary by role, experience tier, city, and premium skills.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <SalaryEstimatorClient />
    </div>
  );
}
