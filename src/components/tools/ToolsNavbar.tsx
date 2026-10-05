'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sun, Moon, Sparkles, Wrench } from 'lucide-react';
import { TOOL_CATEGORIES } from '@/config/tools';

export default function ToolsNavbar() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains('dark');
    if (isCurrentlyDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-4 px-4 sm:px-6 lg:px-10">
      <div
        className={`w-full max-w-[1340px] mx-auto rounded-2xl md:rounded-full px-5 py-3 flex items-center justify-between transition-all duration-300 backdrop-blur-xl ${
          isScrolled
            ? 'bg-white/85 dark:bg-zinc-950/85 border border-zinc-200/80 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
            : 'bg-white/70 dark:bg-zinc-950/70 border border-zinc-200/50 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
        }`}
      >
        {/* Brand Logo & Tools Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 group cursor-pointer">
            <Image
              src="/files/logo-icon.png"
              alt="SkillSha Logo"
              width={30}
              height={28}
              priority
              className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                Skill<span className="text-brand-orange">Sha</span>
              </span>
            </div>
          </Link>

          <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          <Link
            href="/tools"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            <Wrench className="w-3 h-3" />
            <span>FREE TOOLS</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          <Link
            href="/tools"
            className="px-3.5 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            All Tools
          </Link>
          {TOOL_CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat}
              href={`/tools?category=${encodeURIComponent(cat)}`}
              className="px-3.5 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {cat}
            </Link>
          ))}
          <Link
            href="/tools/ai-image-metadata-remover"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors border border-amber-200 dark:border-amber-800/40"
          >
            <Sparkles className="w-3 h-3 text-brand-orange" />
            <span>Metadata Remover</span>
          </Link>
        </nav>

        {/* Actions: Theme Toggle & Back to Skillsha */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>

          {/* Back to Skillsha Main Site CTA */}
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/15 transition-all duration-200 shadow-sm"
          >
            <span>Skillsha Main Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5"
            >
              All Tools
            </Link>
            <Link
              href="/tools/ai-image-metadata-remover"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-orange bg-brand-orange/5 dark:bg-brand-orange/10 flex items-center justify-between"
            >
              <span>AI Image Metadata Remover</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-orange text-white">Active</span>
            </Link>
            {TOOL_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/tools?category=${encodeURIComponent(cat)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-white/5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/15 transition-colors"
            >
              <span>Back to Skillsha Main Site</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
