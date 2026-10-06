'use client';

import { useState, useMemo } from 'react';
import {
  UtmParams,
  UtmFormatOptions,
  UTM_PRESETS,
  buildUtmUrl,
  generateBatchChannels,
} from '@/lib/tools/utm/utm-engine';
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  Settings2,
  CheckCircle2,
  QrCode,
  Share2,
} from 'lucide-react';
import Link from 'next/link';

export default function UtmClient() {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');

  // Input states
  const [baseUrl, setBaseUrl] = useState('https://skillsha.com/courses');
  const [source, setSource] = useState('google');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('spring_bootcamp_2026');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');

  // Formatting options
  const [autoLowercase, setAutoLowercase] = useState(true);
  const [spaceReplacement, setSpaceReplacement] = useState<'hyphen' | 'underscore' | 'plus'>('hyphen');

  const [copied, setCopied] = useState(false);
  const [batchCopied, setBatchCopied] = useState<string | null>(null);

  const formatOptions: UtmFormatOptions = useMemo(
    () => ({ autoLowercase, spaceReplacement }),
    [autoLowercase, spaceReplacement]
  );

  // Computed URL
  const { fullUrl, isValid, error } = useMemo(() => {
    return buildUtmUrl(
      {
        baseUrl,
        source,
        medium,
        campaign,
        term,
        content,
      },
      formatOptions
    );
  }, [baseUrl, source, medium, campaign, term, content, formatOptions]);

  // Batch URLs
  const batchList = useMemo(() => {
    return generateBatchChannels(baseUrl, campaign, formatOptions);
  }, [baseUrl, campaign, formatOptions]);

  const handleCopySingle = async () => {
    if (!fullUrl) return;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyBatchItem = async (urlToCopy: string, channel: string) => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setBatchCopied(channel);
      setTimeout(() => setBatchCopied(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyAllBatch = async () => {
    const allText = batchList.map((item) => `${item.channel}:\n${item.url}\n`).join('\n');
    try {
      await navigator.clipboard.writeText(allText);
      setBatchCopied('all');
      setTimeout(() => setBatchCopied(null), 2000);
    } catch {
      // fallback
    }
  };

  const applyPreset = (presetId: string) => {
    const found = UTM_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setSource(found.source);
      setMedium(found.medium);
    }
  };

  return (
    <div className="space-y-8">
      {/* Mode Switcher */}
      <div className="flex justify-center">
        <div className="p-1 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 inline-flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('single')}
            className={`py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'single'
                ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            Single Link Builder
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('batch')}
            className={`py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'batch'
                ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Channel Batch Matrix</span>
          </button>
        </div>
      </div>

      {/* Main Single Builder */}
      {activeTab === 'single' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Base Website URL */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-blue-600" />
                  <span>Website Landing Page URL</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://yoursite.com/landing-page"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Presets Grid */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Channel Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {UTM_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer bg-slate-50/60 dark:bg-zinc-800/60"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* UTM Parameters Inputs */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Campaign Tracking Parameters</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Source */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                    Campaign Source (<code className="text-blue-600">utm_source</code>) *
                  </label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="google, newsletter, linkedin"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm font-mono text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400">Where the traffic originates</span>
                </div>

                {/* Medium */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                    Campaign Medium (<code className="text-blue-600">utm_medium</code>) *
                  </label>
                  <input
                    type="text"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    placeholder="cpc, email, paid-social"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm font-mono text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400">Marketing medium or channel type</span>
                </div>
              </div>

              {/* Campaign Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                  Campaign Name (<code className="text-blue-600">utm_campaign</code>) *
                </label>
                <input
                  type="text"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  placeholder="spring_sale_2026, webinar_ai"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm font-mono text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400">Product promo or event slogan</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
                {/* Term */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                    Campaign Term (<code className="text-slate-500">utm_term</code>)
                  </label>
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="data-analytics-course"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm font-mono text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400">Optional: Paid search target keyword</span>
                </div>

                {/* Content */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                    Campaign Content (<code className="text-slate-500">utm_content</code>)
                  </label>
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="blue_button, banner_300x250"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm font-mono text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400">Optional: Creative A/B test variant</span>
                </div>
              </div>
            </div>

            {/* Sanitization & Formatting Options */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Auto-Sanitization Settings</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={autoLowercase}
                    onChange={(e) => setAutoLowercase(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enforce Lowercase (Recommended for GA4)</span>
                </label>

                <div>
                  <span className="font-bold text-slate-700 dark:text-zinc-300 block mb-1">Space Replacement</span>
                  <div className="flex gap-2">
                    {[
                      { id: 'hyphen', label: 'Hyphen (-)' },
                      { id: 'underscore', label: 'Underscore (_)' },
                      { id: 'plus', label: 'Plus (+)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSpaceReplacement(opt.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                          spaceReplacement === opt.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Output & Actions (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated URL</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Ready to Track
                </span>
              </div>

              {/* URL Display Area */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-white/5 space-y-3">
                <div className="break-all font-mono text-xs text-slate-800 dark:text-zinc-200 leading-relaxed">
                  {fullUrl || 'Complete the required fields above to generate tracking link.'}
                </div>

                {/* Parameter Tag Badges */}
                {isValid && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-white/5">
                    {source && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono">
                        source:{source}
                      </span>
                    )}
                    {medium && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-mono">
                        medium:{medium}
                      </span>
                    )}
                    {campaign && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-mono">
                        campaign:{campaign}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  disabled={!isValid}
                  onClick={handleCopySingle}
                  className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Copied Tracking Link!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Campaign Link</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={isValid ? fullUrl : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Test Link</span>
                  </a>

                  <Link
                    href={`/tools/qr-generator`}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-blue-600" />
                    <span>Create QR</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Multi-Channel Batch Mode */
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multi-Channel Campaign Matrix</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Generate distinct tracking links for Google Ads, Facebook, Instagram, LinkedIn, and Email simultaneously.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyAllBatch}
                className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {batchCopied === 'all' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>Copy All Channel Links</span>
              </button>
            </div>

            <div className="space-y-4">
              {batchList.map((item) => {
                const isItemCopied = batchCopied === item.channel;
                return (
                  <div
                    key={item.channel}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-white/5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-blue-600 dark:text-blue-400">{item.channel}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.source} / {item.medium}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 font-mono text-xs text-slate-700 dark:text-zinc-300 break-all select-all">
                        {item.url}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyBatchItem(item.url, item.channel)}
                        className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {isItemCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
