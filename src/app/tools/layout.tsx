import { ReactNode } from 'react';
import type { Metadata } from 'next';
import ToolsNavbar from '@/components/tools/ToolsNavbar';
import ToolsFooter from '@/components/tools/ToolsFooter';

export const metadata: Metadata = {
  title: 'Free Online Tools | Skillsha',
  description:
    'Free online tools for digital marketers, creators, developers and professionals by Skillsha. Fast, private, browser-based utilities with zero server data retention.',
  alternates: {
    canonical: 'https://skillsha.com/tools',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'Free Online Tools | Skillsha',
    description:
      'Simple, powerful, and private online tools for creators, developers, and marketers.',
    url: 'https://skillsha.com/tools',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
};

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-[#080808] text-zinc-900 dark:text-zinc-100 transition-colors">
      <ToolsNavbar />
      <main className="flex-1 pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto w-full">
        {children}
      </main>
      <ToolsFooter />
    </div>
  );
}
