import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export default function ToolsFooter() {
  return (
    <footer className="mt-24 border-t border-zinc-200/80 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md pt-16 pb-12 px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-1.5 cursor-pointer">
              <Image
                src="/files/logo-icon.png"
                alt="SkillSha Logo"
                width={32}
                height={30}
                className="h-7 w-auto object-contain"
              />
              <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                Skill<span className="text-brand-orange">Sha</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              Skillsha Free Tools provides simple, powerful, and secure browser utilities for creators, marketers, developers, and digital professionals.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 px-3 py-2 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Zero-Storage Guarantee: 100% In-Browser Privacy.</span>
            </div>
          </div>

          {/* Column 1: Image Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Image Tools
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/tools/ai-image-metadata-remover"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  AI Metadata Remover
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/image-compressor"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/image-resizer"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  Image Resizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Marketing & SEO */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Marketing & SEO
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/tools/qr-generator"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/utm-builder"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  UTM Campaign Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/seo-meta-generator"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  SEO Meta Tag Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer & PDF */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Dev & PDF Tools
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/tools/json-formatter"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/pdf-compressor"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  PDF Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/ai-interview-preparation"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  AI Interview Prep
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-brand-orange dark:hover:text-white transition-colors font-semibold text-blue-600 dark:text-blue-400"
                >
                  View All Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Skillsha Platform */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Skillsha
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 hover:text-brand-orange dark:hover:text-white transition-colors"
                >
                  <span>Main Website</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-orange dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange dark:hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-orange dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-brand-orange dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} SkillSha. All rights reserved. Free tools for the digital ecosystem.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" /> by SkillSha
          </p>
        </div>
      </div>
    </footer>
  );
}
