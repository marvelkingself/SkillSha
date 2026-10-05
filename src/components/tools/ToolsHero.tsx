'use client';

import { Sparkles, ShieldCheck, Zap, Lock } from 'lucide-react';

interface ToolsHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalTools: number;
}

export default function ToolsHero({ searchQuery, onSearchChange, totalTools }: ToolsHeroProps) {
  return (
    <section className="relative pt-12 pb-10 text-center space-y-6 max-w-4xl mx-auto px-4">
      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
        <Sparkles className="w-3.5 h-3.5" />
        <span>SkillSha Utility Suite</span>
      </div>

      {/* Main Title */}
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Free Online <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-brand-orange bg-clip-text text-transparent">Tools</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Simple, powerful tools for marketers, creators, developers and digital professionals. Fast, ad-free, and privacy-first.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>100% Free Forever</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5">
          <Lock className="w-3.5 h-3.5 text-blue-500" />
          <span>No Sign-up Required</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Zero Server Storage</span>
        </div>
      </div>

      {/* Centered Search Bar */}
      <div className="pt-4 max-w-xl mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search ${totalTools} tools (e.g. metadata, compressor, qr, seo)...`}
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
          <div className="absolute left-4 text-zinc-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
