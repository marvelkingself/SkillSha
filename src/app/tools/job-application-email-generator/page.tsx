import type { Metadata } from 'next';
import Link from 'next/link';
import JobEmailGeneratorClient from '@/components/tools/career/JobEmailGeneratorClient';
import { ChevronRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Job Application Email Generator - HR, Recruiter & Referral Emails | Skillsha',
  description:
    'Generate high-converting job application emails, cold recruiter outreach, internal referral requests, and interview follow-up emails in seconds. Free ATS and HR approved templates.',
  alternates: {
    canonical: 'https://skillsha.com/tools/job-application-email-generator',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Job Application Email Generator | Skillsha Career Tools',
    description: 'Craft cold recruiter emails, referral requests, and job application letters that get answered.',
    url: 'https://skillsha.com/tools/job-application-email-generator',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Job Application Email Generator | Skillsha',
    description: 'Generate high-open-rate recruiter emails, thank-you notes, and referral requests in seconds.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function JobApplicationEmailGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha Job Application Email Generator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online email generator creating high-converting cold recruiter outreach, referral requests, and application cover notes.',
        url: 'https://skillsha.com/tools/job-application-email-generator',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skillsha', item: 'https://skillsha.com' },
          { '@type': 'ListItem', position: 2, name: 'Career Tools', item: 'https://skillsha.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Job Application Email Generator', item: 'https://skillsha.com/tools/job-application-email-generator' },
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
        <span className="text-slate-900 font-bold">Job Application Email Generator</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free • High-Open Subjects • Direct Gmail & Mail Links
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Job Application <span className="text-indigo-600">Email Generator</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Stop getting ignored by recruiters. Generate concise, metric-driven cold emails, referral requests, and interview follow-ups that stand out in crowded inboxes.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <JobEmailGeneratorClient />
    </div>
  );
}
