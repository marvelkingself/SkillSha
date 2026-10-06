'use client';

import { useState, useMemo } from 'react';
import {
  SeoMetaState,
  generateHtmlMetaTags,
  generateNextJsMetadataSnippet,
} from '@/lib/tools/seo/meta-generator';
import {
  Globe,
  Share2,
  Code2,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from 'lucide-react';

export default function MetaClient() {
  const [form, setForm] = useState<SeoMetaState>({
    title: 'Data Analytics Course in Pune with Gen AI | Skillsha',
    description:
      'Master Data Analytics in Pune with Python, SQL, Power BI, and Generative AI. 100% placement support, live real-world capstones, and industry mentorship.',
    canonicalUrl: 'https://skillsha.com/course/data-analytics-course-in-pune-with-gen-ai',
    keywords: 'data analytics course pune, python data analytics, gen ai for analysts',
    author: 'Skillsha Institute',
    siteName: 'Skillsha',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: '',
    ogDescription: '',
    ogImage: 'https://skillsha.com/files/logo-icon.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterHandle: '@skillsha',
  });

  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [activePreviewTab, setActivePreviewTab] = useState<'google' | 'social'>('google');
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'nextjs'>('html');
  const [copied, setCopied] = useState(false);

  // Character calculations
  const titleLen = form.title.length;
  const descLen = form.description.length;

  const htmlCode = useMemo(() => generateHtmlMetaTags(form), [form]);
  const nextJsCode = useMemo(() => generateNextJsMetadataSnippet(form), [form]);

  const handleCopy = async () => {
    const textToCopy = activeCodeTab === 'html' ? htmlCode : nextJsCode;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Form Controls (6 Cols) */}
      <div className="lg:col-span-6 space-y-6">
        {/* Core Search Metadata */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Core Search Engine Metadata</h2>
          </div>

          {/* Title Tag */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 dark:text-zinc-300">Page Title (&lt;title&gt;) *</label>
              <span
                className={`font-mono text-[11px] font-bold ${
                  titleLen > 60 ? 'text-red-500' : titleLen < 30 ? 'text-amber-500' : 'text-emerald-600'
                }`}
              >
                {titleLen}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Full Stack Web Development Bootcamp | Skillsha"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            {/* Length Progress Meter */}
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  titleLen > 60 ? 'bg-red-500' : titleLen < 30 ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (titleLen / 60) * 100)}%` }}
              />
            </div>
          </div>

          {/* Meta Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 dark:text-zinc-300">
                Meta Description *
              </label>
              <span
                className={`font-mono text-[11px] font-bold ${
                  descLen > 160 ? 'text-red-500' : descLen < 70 ? 'text-amber-500' : 'text-emerald-600'
                }`}
              >
                {descLen}/160 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter a compelling summary of the page with relevant keywords and a clear call to action..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  descLen > 160 ? 'bg-red-500' : descLen < 70 ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (descLen / 160) * 100)}%` }}
              />
            </div>
          </div>

          {/* Canonical URL */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Canonical URL</label>
            <input
              type="url"
              value={form.canonicalUrl}
              onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
              placeholder="https://skillsha.com/courses/data-analytics"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm font-mono text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Site / Brand Name</label>
              <input
                type="text"
                value={form.siteName}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                placeholder="Skillsha"
                className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Author / Publisher</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Skillsha Editorial"
                className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Share & Open Graph */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Social Media & OpenGraph (OG)</h2>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
              Social Featured Image URL (<code className="text-blue-600">og:image</code>)
            </label>
            <input
              type="url"
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              placeholder="https://yoursite.com/images/og-banner-1200x630.jpg"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm font-mono text-slate-900 dark:text-white"
            />
            <span className="text-[10px] text-slate-400">Recommended dimension: 1200 × 630 px</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Twitter Card Format</label>
              <select
                value={form.twitterCard}
                onChange={(e) => setForm({ ...form, twitterCard: e.target.value as any })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
              >
                <option value="summary_large_image">Large Image Card (Recommended)</option>
                <option value="summary">Small Square Summary</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Twitter / X Handle</label>
              <input
                type="text"
                value={form.twitterHandle}
                onChange={(e) => setForm({ ...form, twitterHandle: e.target.value })}
                placeholder="@skillsha"
                className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Robots Directives */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Search Robots Directives</h3>
          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700 dark:text-zinc-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.robotsIndex}
                onChange={(e) => setForm({ ...form, robotsIndex: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Allow Indexing (index)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.robotsFollow}
                onChange={(e) => setForm({ ...form, robotsFollow: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Follow Links (follow)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Column: Previews & Code Generator (6 Cols) */}
      <div className="lg:col-span-6 sticky top-24 space-y-6">
        {/* Previews Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActivePreviewTab('google')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activePreviewTab === 'google'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Google SERP</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewTab('social')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activePreviewTab === 'social'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Social Card</span>
              </button>
            </div>

            {/* Desktop / Mobile Switcher for SERP */}
            {activePreviewTab === 'google' && (
              <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500">
                <button
                  type="button"
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1 rounded cursor-pointer ${
                    devicePreview === 'desktop' ? 'bg-white dark:bg-zinc-900 text-blue-600 shadow-xs' : ''
                  }`}
                  aria-label="Desktop view"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDevicePreview('mobile')}
                  className={`p-1 rounded cursor-pointer ${
                    devicePreview === 'mobile' ? 'bg-white dark:bg-zinc-900 text-blue-600 shadow-xs' : ''
                  }`}
                  aria-label="Mobile view"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Google SERP Preview Box */}
          {activePreviewTab === 'google' ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f8f9fa] dark:bg-zinc-950 border border-slate-200 dark:border-white/5 space-y-1.5 text-left font-sans">
              <div className="flex items-center gap-2 text-xs text-[#202124] dark:text-zinc-400">
                <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center text-[9px] font-bold">
                  S
                </div>
                <div className="truncate text-xs">
                  <span className="font-semibold text-slate-900 dark:text-zinc-200">{form.siteName || 'Skillsha'}</span>
                  <span className="text-slate-400 mx-1">›</span>
                  <span className="text-slate-500 font-mono text-[11px] truncate">
                    {form.canonicalUrl ? form.canonicalUrl.replace(/^https?:\/\//, '') : 'skillsha.com'}
                  </span>
                </div>
              </div>

              <div
                className={`font-normal hover:underline cursor-pointer leading-snug ${
                  devicePreview === 'desktop' ? 'text-lg text-[#1a0dab] dark:text-[#8ab4f8]' : 'text-base text-[#1a0dab] dark:text-[#8ab4f8]'
                }`}
              >
                {form.title || 'Enter a page title...'}
              </div>

              <div className="text-xs sm:text-[13px] text-[#4d5156] dark:text-zinc-300 leading-relaxed line-clamp-2">
                {form.description || 'Enter a meta description to see how your snippet appears in search engine results...'}
              </div>
            </div>
          ) : (
            /* Social Card Preview Box */
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-zinc-950 shadow-sm text-left">
              <div className="relative aspect-[1200/630] bg-slate-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                {form.ogImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.ogImage}
                    alt="Social preview banner"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-xs text-slate-400 font-mono">No Image Provided (1200 × 630)</div>
                )}
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[11px] uppercase font-bold text-slate-400 font-mono">
                  {form.canonicalUrl ? new URL(form.canonicalUrl.startsWith('http') ? form.canonicalUrl : `https://${form.canonicalUrl}`).hostname : 'skillsha.com'}
                </span>
                <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {form.ogTitle || form.title}
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {form.ogDescription || form.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Code Output Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveCodeTab('html')}
                className={`py-1.5 px-3 rounded-lg cursor-pointer ${
                  activeCodeTab === 'html'
                    ? 'bg-white dark:bg-zinc-900 text-blue-600 shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400'
                }`}
              >
                HTML &lt;head&gt;
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeTab('nextjs')}
                className={`py-1.5 px-3 rounded-lg cursor-pointer ${
                  activeCodeTab === 'nextjs'
                    ? 'bg-white dark:bg-zinc-900 text-blue-600 shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400'
                }`}
              >
                Next.js Metadata
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[300px] leading-relaxed border border-white/5 select-all">
            {activeCodeTab === 'html' ? htmlCode : nextJsCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
