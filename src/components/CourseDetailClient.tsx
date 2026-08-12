"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CounselingModal from "@/components/CounselingModal";
import { AlumniCompanies } from "@/components/Alumni";
import { CourseData, MENTORS_LIST } from "@/data/courses";

interface CourseDetailClientProps {
  id: string;
  data: CourseData;
  city?: string;
}

// ── Portfolio Shape Renderer ──────────────────────────────────
function PortfolioShape({ shape }: { shape: string }) {
  const base = "w-28 h-28";

  switch (shape) {
    // ── 4-pointed sparkle star ✦ ──────────────────────────────
    case "star4":
      return (
        <svg className={`${base} pp-shape-float`} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,5 C54,42 58,46 95,50 C58,54 54,58 50,95 C46,58 42,54 5,50 C42,46 46,42 50,5Z" />
        </svg>
      );

    // ── Sun with many radiating spines ───────────────────────
    case "starburst":
      return (
        <svg className={`${base} pp-shape-spin`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + 9 * Math.cos(rad);
            const y1 = 50 + 9 * Math.sin(rad);
            const x2 = 50 + 44 * Math.cos(rad);
            const y2 = 50 + 44 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />;
          })}
          <circle cx="50" cy="50" r="8" fill="currentColor" />
        </svg>
      );

    // ── 5 petals, each ellipse rotated around SVG centre ─────
    case "flower":
      return (
        <svg className={`${base} pp-shape-float`} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse key={i} cx="50" cy="26" rx="12" ry="22" transform={`rotate(${angle}, 50, 50)`} />
          ))}
          <circle cx="50" cy="50" r="14" />
        </svg>
      );

    // ── Archimedean spiral (parametric polyline) ─────────────
    case "spiral": {
      const turns = 2.3;
      const steps = 72;
      const r0 = 2, r1 = 41;
      const pts: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * turns * 2 * Math.PI - Math.PI / 2;
        const r = r0 + (r1 - r0) * (i / steps);
        const x = 50 + r * Math.cos(t);
        const y = 50 + r * Math.sin(t);
        pts.push(i === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return (
        <svg className={`${base} pp-shape-float`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d={pts.join(" ")} />
        </svg>
      );
    }

    // ── Smooth organic blob ───────────────────────────────────
    case "wave":
      return (
        <svg className={`${base} pp-shape-float`} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,10 C66,10 82,20 86,36 C90,52 80,66 76,76 C72,86 62,92 50,92 C38,92 28,86 24,76 C20,66 10,52 14,36 C18,20 34,10 50,10Z" />
        </svg>
      );

    // ── Concentric glowing rings ──────────────────────────────
    case "aura":
      return (
        <svg className={`${base} pp-shape-pulse`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="currentColor" fillOpacity="0.07" />
          <circle cx="50" cy="50" r="36" fill="currentColor" fillOpacity="0.12" />
          <circle cx="50" cy="50" r="26" fill="currentColor" fillOpacity="0.22" />
          <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.40" />
          <circle cx="50" cy="50" r="8"  fill="currentColor" />
        </svg>
      );

    // ── Classic cut-diamond ───────────────────────────────────
    case "diamond":
      return (
        <svg className={`${base} pp-shape-float`} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,6 90,50 50,94 10,50" />
          <polygon points="50,20 76,50 50,80 24,50" fill="white" fillOpacity="0.22" />
        </svg>
      );

    // ── 10-pointed star (default) ─────────────────────────────
    case "hexburst":
    default: {
      const outerR = 44, innerR = 19;
      const pts = Array.from({ length: 10 }).map((_, i) => {
        const a = (i * 36 - 90) * (Math.PI / 180);
        const r = i % 2 === 0 ? outerR : innerR;
        return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
      }).join(" ");
      return (
        <svg className={`${base} pp-shape-float`} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <polygon points={pts} />
        </svg>
      );
    }
  }
}

// ── Custom subcomponents for Digital Marketing with Gen AI ──────────

function DigitalMarketingWhySection({ data }: { data: CourseData }) {
  const content = data.flagshipContent?.whyChooseList;
  if (!content) return null;

  return (
    <section className="mt-16 mb-16 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
          Why Choose Skillsha?
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Why Choose Skillsha's Digital Marketing Course with Gen AI?
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-3 font-medium text-[15px] max-w-xl mx-auto leading-relaxed">
          Here is what makes Skillsha different in the crowded Digital Marketing Course market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Placement Card */}
        <div className="p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 flex flex-col justify-between hover:border-brand-orange/20 transition-all duration-300">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-orange">verified_user</span>
              100% Placement Support—Proven Results Globally
            </h3>
            <ul className="space-y-4">
              {content.placement.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-brand-orange shrink-0 mt-0.5 text-sm">check_circle</span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-300 font-medium font-sans leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-white/5 text-zinc-500 dark:text-zinc-400 text-xs italic font-medium leading-relaxed">
            Last year, 94% of Digital Marketing Course graduates secured jobs within 60 days. That's not a promise—that's our track record.
          </div>
        </div>

        {/* AI Integration Card */}
        <div className="p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 flex flex-col justify-between hover:border-brand-orange/20 transition-all duration-300">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-orange">bolt</span>
              Gen AI Integration—Your Competitive Edge
            </h3>
            <ul className="space-y-4">
              {content.ai.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-brand-orange shrink-0 mt-0.5 text-sm">bolt</span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-300 font-medium font-sans leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-white/5 text-zinc-500 dark:text-zinc-400 text-xs italic font-medium leading-relaxed">
            Every recruiter is looking for digital marketers who understand AI. Our Digital Marketing Course makes you exactly that professional.
          </div>
        </div>
      </div>

      {/* Trainers Subsection */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 text-center">Expert Trainers with Global Industry Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.trainers.map((trainer: any, idx: number) => (
            <div key={idx} className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h4 className="text-md font-bold text-brand-orange">{trainer.name}</h4>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-4">{trainer.title}</span>
                <ul className="space-y-2">
                  {trainer.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed flex items-start gap-2">
                      <span className="text-brand-orange select-none shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-white/5">
                <p className="text-xs italic text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                  Students say: &ldquo;{trainer.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Intro Card */}
      <div className="mt-8 p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 hover:border-brand-orange/20 transition-all duration-300">
        <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-4">Affordable Yet Premium Quality</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {content.pricing.slice(0, 5).map((priceLine: string, pIdx: number) => (
            <div key={pIdx} className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-brand-orange text-sm shrink-0">local_offer</span>
              <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium font-sans">{priceLine}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5 text-xs text-zinc-500 dark:text-zinc-400 italic">
          {content.pricing[5]}
        </div>
      </div>
    </section>
  );
}

function DigitalMarketingDifferencesSection({ data }: { data: CourseData }) {
  const content = data.flagshipContent?.differences;
  if (!content) return null;

  return (
    <section className="mt-12 mb-16 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
          Course USPs
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          What Makes This Digital Marketing Course Different?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {content.map((diff: any, idx: number) => (
          <div key={idx} className="p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-md font-bold text-zinc-950 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-orange shrink-0">workspace_premium</span>
                {diff.title}
              </h3>
              <ul className="space-y-3">
                {diff.bullets.map((bullet: string, bIdx: number) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-brand-orange text-xs shrink-0 mt-1">check</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DigitalMarketingToolsSection({ data }: { data: CourseData }) {
  const content = data.flagshipContent?.skills;
  if (!content) return null;

  const tools = [
    { name: "ChatGPT & Claude", category: "AI Writing & Strategy", desc: "Crafting multi-step campaign copy & hooks", icon: "terminal" },
    { name: "Midjourney", category: "AI Image Design", desc: "Generating premium ad graphics & banner designs", icon: "photo_library" },
    { name: "Meta Ads Manager", category: "Paid Traffic Acquisition", desc: "Setting up lookalike targeting & scale campaigns", icon: "ads_click" },
    { name: "Google Ads", category: "Search Ad Placement", desc: "Configuring match types and bidding algorithms", icon: "campaign" },
    { name: "Google Analytics 4", category: "Analytics & Tracking", desc: "Analyzing customer attribution conversion loops", icon: "analytics" },
    { name: "Google Tag Manager", category: "Server-Side Tagging", desc: "Deploying secure server containers for GA4 data", icon: "settings" },
    { name: "Make.com & Zapier", category: "Marketing Automation", desc: "Syncing leads dynamically from Meta/Google to CRMs", icon: "loop" },
    { name: "Clay", category: "B2B Database Scraping", desc: "Writing pipelines to crawl and enrich corporate leads", icon: "link" },
    { name: "Klaviyo", category: "Lifecycle Email Flows", desc: "Building welcome loops and cart winback automations", icon: "email" },
    { name: "Figma & Canva", category: "Visual UI Design", desc: "Drafting high-converting responsive web layouts", icon: "palette" },
    { name: "CapCut & CapCut AI", category: "Video Production", desc: "Editing hooks, adding captions and voice effects", icon: "movie" },
    { name: "SEMrush / Ahrefs", category: "SEO & GEO Discovery", desc: "Spying competitor keywords and local schemes", icon: "search" }
  ];

  return (
    <section className="mt-16 mb-16 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
          Toolkit & Skills
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Skills & Platforms You will Master
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-3 font-medium text-[15px] max-w-xl mx-auto leading-relaxed">
          Master the complete technology stack that top digital marketing agencies and companies use to run campaigns.
        </p>
      </div>

      {/* Grid of master tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {tools.map((t, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-zinc-200/80 dark:border-white/5 bg-white/40 dark:bg-zinc-900/10 hover:border-brand-orange/30 dark:hover:border-brand-orange/20 transition-all duration-300 hover:-translate-y-0.5 group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-brand-orange group-hover:scale-105 transition-transform">{t.icon}</span>
              <div>
                <h4 className="text-[14px] font-bold text-zinc-900 dark:text-white">{t.name}</h4>
                <span className="text-[10px] text-brand-orange font-semibold uppercase tracking-wider mt-0.5 block">{t.category}</span>
              </div>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-3 leading-relaxed font-sans">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Grid of detailed skills category */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {content.map((sk: any, idx: number) => (
          <div key={idx} className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10">
            <h4 className="text-sm font-bold text-zinc-955 dark:text-white mb-4 border-b border-zinc-100 dark:border-white/5 pb-2">
              {sk.category}
            </h4>
            <ul className="space-y-2">
              {sk.list.map((item: string, iIdx: number) => (
                <li key={iIdx} className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed flex items-start gap-2">
                  <span className="text-brand-orange select-none">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function DigitalMarketingPlacementSection({ data }: { data: CourseData }) {
  const content = data.flagshipContent?.placement;
  if (!content) return null;

  return (
    <section className="mt-16 mb-16 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
          Placement Support
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          100% Placement Support—How Skillsha Helps You Land Jobs
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* During Course Timeline */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10">
          <h3 className="text-md font-bold text-zinc-950 dark:text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-orange">timeline</span>
            During Your Course
          </h3>
          <ul className="space-y-4 relative pl-4 border-l border-zinc-100 dark:border-white/5">
            {content.during.map((step: string, sIdx: number) => (
              <li key={sIdx} className="relative text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-brand-orange border border-white dark:border-zinc-900"></span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* After Course Support */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-zinc-950 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-orange">work</span>
              After You Complete
            </h3>
            <ul className="space-y-3">
              {content.after.map((item: string, aIdx: number) => (
                <li key={aIdx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  <span className="text-brand-orange">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hiring Network */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-zinc-950 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-orange">handshake</span>
              Our Hiring Network
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-sans leading-relaxed">We are connected with:</p>
            <ul className="space-y-3">
              {content.network.map((net: string, nIdx: number) => (
                <li key={nIdx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  <span className="text-brand-orange">•</span>
                  <span>{net}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DigitalMarketingCareerSection({ data }: { data: CourseData }) {
  const content = data.flagshipContent?.careers;
  if (!content) return null;

  return (
    <section className="mt-16 mb-16 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
          Career Outcomes
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Career Opportunities After Your Digital Marketing Course
        </h2>
      </div>

      {/* Row list of roles */}
      <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-4">In-Demand Job Roles Worldwide</h3>
      <div className="space-y-4">
        {content.roles.map((r: any, idx: number) => (
          <div key={idx} className="p-6 rounded-2xl border border-zinc-200/80 dark:border-white/5 bg-white/40 dark:bg-zinc-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 md:max-w-xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h4 className="text-[15px] font-extrabold text-zinc-900 dark:text-white">{r.title}</h4>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 rounded-md uppercase tracking-wider">{r.availability}</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">{r.duties}</p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 block">Starting Salary Range</span>
              <span className="text-lg font-black text-brand-orange">{r.salary}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Paths grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10">
          <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-4">Career Growth Path</h3>
          <ul className="space-y-2">
            {content.growth.map((grow: string, gIdx: number) => (
              <li key={gIdx} className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed flex items-start gap-2">
                <span className="text-brand-orange">•</span>
                <span>{grow}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10">
          <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-4">Salary Growth Globally</h3>
          <ul className="space-y-2">
            {content.salaryGrowth.map((sal: string, sIdx: number) => (
              <li key={sIdx} className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed flex items-start gap-2">
                <span className="text-brand-orange">•</span>
                <span>{sal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 italic mt-6 leading-relaxed text-center font-sans">
        The digital marketing job market is growing worldwide. Companies need skilled professionals, and there's a shortage of people who understand AI-integrated marketing.
      </p>
    </section>
  );
}

function DigitalMarketingStoriesSection({ data }: { data: CourseData }) {
  const content = data.flagshipContent?.stories;
  if (!content) return null;

  const stats = [
    { label: "Placement Rate", val: "94%", desc: "Within 60 days of completion" },
    { label: "Starting Salary", val: "$2.5k-$4k", desc: "Average monthly range globally" },
    { label: "Salary Growth", val: "+50%", desc: "Common package increase" },
    { label: "Graduate Satisfaction", val: "98%", desc: "Would recommend the course" }
  ];

  return (
    <section className="mt-16 mb-16 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
          Alumni Success
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Success Stories—Digital Marketing Course Graduates Worldwide
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.map((story: any, idx: number) => (
          <div key={idx} className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 border-b border-zinc-100 dark:border-white/5 pb-2">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{story.name}</h4>
                <div className="text-[10px] text-right font-sans">
                  <span className="text-zinc-400 block">Before: {story.before}</span>
                  <span className="text-brand-orange font-bold block">After: {story.after}</span>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 italic font-sans leading-relaxed mb-4">
                &ldquo;{story.body}&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5 text-xs font-bold text-brand-orange font-sans">
              Result: {story.result}
            </div>
          </div>
        ))}
      </div>

      {/* Placement statistics bento */}
      <div className="mt-8 p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10">
        <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-6 text-center">Global Placement Statistics from Our Digital Marketing Course</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((st, idx) => (
            <div key={idx} className="text-center p-3 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-150 dark:border-white/[0.03]">
              <span className="text-2xl font-black text-brand-orange block">{st.val}</span>
              <span className="text-[10px] font-bold text-zinc-800 dark:text-white block mt-1">{st.label}</span>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block leading-tight mt-0.5">{st.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DigitalMarketingPricingSection({ data }: { data: CourseData }) {
  const content = data.flagshipContent?.pricingDetail;
  if (!content) return null;

  return (
    <section className="mt-16 mb-16 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
          Investment
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Digital Marketing Course Pricing—Flexible Payment Options
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cost comparison table */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 flex flex-col justify-between col-span-1">
          <div>
            <h3 className="text-md font-bold text-zinc-950 dark:text-white mb-6">Transparent, Affordable Pricing</h3>
            <div className="space-y-3 font-sans text-xs">
              {content.rows.map((row: any, rIdx: number) => (
                <div key={rIdx} className={`flex items-center justify-between py-2 border-b border-zinc-100 dark:border-white/5 ${rIdx === 3 ? 'text-brand-orange font-bold text-sm' : 'text-zinc-600 dark:text-zinc-400'}`}>
                  <span>{row.cost}</span>
                  <span>{row.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed font-sans">
            Currency Reference (approximate): ₹13,000 ≈ $156 USD ≈ €145 EUR. Payment accepted in multiple currencies.
          </div>
        </div>

        {/* Installments & Corporate Options */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 flex flex-col justify-between col-span-1">
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-bold text-zinc-950 dark:text-white mb-4">Installment Plans (0% Interest)</h3>
              <ul className="space-y-2">
                {content.installments.map((inst: string, iIdx: number) => (
                  <li key={iIdx} className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed flex items-start gap-2">
                    <span className="text-brand-orange">•</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-md font-bold text-zinc-950 dark:text-white mb-2">Corporate Discounts</h3>
              <ul className="space-y-2">
                {content.discounts.map((disc: string, dIdx: number) => (
                  <li key={dIdx} className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed flex items-start gap-2">
                    <span className="text-brand-orange">•</span>
                    <span>{disc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 col-span-1">
          <h3 className="text-md font-bold text-zinc-950 dark:text-white mb-4">What's Included</h3>
          <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {content.includes.map((item: string, idx: number) => (
              <li key={idx} className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed flex items-start gap-2">
                <span className="text-brand-orange select-none font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DigitalMarketingEnrollmentSection({ data }: { data: CourseData }) {
  const content = data.flagshipContent?.enrollment;
  const quickFacts = data.flagshipContent?.quickFacts;
  if (!content) return null;

  return (
    <section className="mt-16 mb-16 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
          Join Us
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          How to Enroll in Our Digital Marketing Course
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step List */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10 col-span-2 space-y-6">
          {content.map((stepObj: any, idx: number) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-16 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center font-black text-brand-orange text-sm shrink-0">
                {stepObj.step}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{stepObj.title}</h4>
                <ul className="space-y-1">
                  {stepObj.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className="text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed flex items-start gap-1.5">
                      <span className="text-brand-orange select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Prerequisites & Quick Facts */}
        <div className="col-span-1 space-y-6">
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10">
            <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-4">What You Need to Get Started</h3>
            <ul className="space-y-3 font-sans text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-orange text-sm">laptop_mac</span>
                <span>Laptop or computer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-orange text-sm">wifi</span>
                <span>Reliable internet connection</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-orange text-sm">edit_note</span>
                <span>Notebook for notes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-orange text-sm">emoji_objects</span>
                <span>Your curiosity and commitment</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/10">
            <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-4">Quick Facts</h3>
            <ul className="space-y-2 text-xs font-sans text-zinc-600 dark:text-zinc-400">
              {quickFacts.map((fact: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-brand-orange select-none">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DigitalMarketingDisclaimerSection({ data }: { data: CourseData }) {
  const disclaimer = data.flagshipContent?.disclaimer;
  if (!disclaimer) return null;

  return (
    <section className="mt-8 mb-12 w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/20 text-center">
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-sans leading-relaxed max-w-3xl mx-auto">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}

export default function CourseDetailClient({ id, data, city }: CourseDetailClientProps) {
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [openMilestoneIndex, setOpenMilestoneIndex] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastActiveTickRef = useRef(0);
  const lastHapticDotRef = useRef(-1);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const words = data.typewriter;
    const currentWord = words[typewriterIndex];

    if (!isDeleting && typewriterText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typewriterText === "") {
      isDeleting;
      setIsDeleting(false);
      setTypewriterIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setTypewriterText(
          isDeleting
            ? currentWord.substring(0, typewriterText.length - 1)
            : currentWord.substring(0, typewriterText.length + 1)
        );
      }, isDeleting ? 75 : 150);
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, typewriterIndex, data.typewriter]);

  // Audio Context auto-unlocker
  useEffect(() => {
    let audioUnlocked = false;

    const unlockAudio = () => {
      if (audioUnlocked) return;
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Play silent 1-sample buffer to unlock
        const silentBuf = ctx.createBuffer(1, 1, ctx.sampleRate);
        const silentSrc = ctx.createBufferSource();
        silentSrc.buffer = silentBuf;
        silentSrc.connect(ctx.destination);
        silentSrc.start(0);

        audioUnlocked = true;

        // Clean up listeners
        ["touchstart", "mousedown", "keydown", "scroll", "click"].forEach((evt) => {
          document.removeEventListener(evt, unlockAudio, { capture: true });
        });
      } catch (e) {}
    };

    // Attach listeners
    ["touchstart", "mousedown", "keydown", "scroll", "click"].forEach((evt) => {
      document.addEventListener(evt, unlockAudio, { capture: true, passive: true });
    });

    return () => {
      ["touchstart", "mousedown", "keydown", "scroll", "click"].forEach((evt) => {
        document.removeEventListener(evt, unlockAudio, { capture: true });
      });
    };
  }, []);

  const handleMilestoneToggle = (newIndex: number) => {
    const isOpen = openMilestoneIndex === newIndex;
    if (isOpen) {
      setOpenMilestoneIndex(null);
      return;
    }

    const cardId = `milestone-card-${newIndex}`;
    const cardElement = document.getElementById(cardId);
    
    if (cardElement) {
      const cardRect = cardElement.getBoundingClientRect();
      const currentTop = cardRect.top + window.pageYOffset;
      
      let targetScrollTop = currentTop - 100;
      if (openMilestoneIndex !== null) {
        const prevCardId = `milestone-card-${openMilestoneIndex}`;
        const prevCardElement = document.getElementById(prevCardId);
        if (prevCardElement) {
          const prevCardRect = prevCardElement.getBoundingClientRect();
          if (prevCardRect.top < cardRect.top) {
            const prevBodyElement = prevCardElement.querySelector('.mc-body');
            const collapseHeight = prevBodyElement ? prevBodyElement.scrollHeight : 0;
            targetScrollTop = currentTop - collapseHeight - 100;
          }
        }
      }
      
      setOpenMilestoneIndex(newIndex);
      
      window.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      });
      
      if (navigator.vibrate) {
        navigator.vibrate([12, 25, 12]);
      }
    } else {
      setOpenMilestoneIndex(newIndex);
    }
  };

  // Audio click player
  const playClickAudio = (isTick: boolean) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;
      const freq = isTick ? 6800 : 5400;
      const vol = isTick ? 0.08 : 0.055;
      const ringHz = freq * 2.05;

      const master = ctx.createGain();
      master.gain.setValueAtTime(vol, now);
      master.connect(ctx.destination);

      const len = Math.floor(ctx.sampleRate * 0.012);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.1));
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;

      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 4200;

      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = freq;
      bp.Q.value = 22;

      const ng = ctx.createGain();
      ng.gain.setValueAtTime(1, now);
      ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      src.connect(hp);
      hp.connect(bp);
      bp.connect(ng);
      ng.connect(master);
      src.start(now);
      src.stop(now + 0.018);

      const ring = ctx.createOscillator();
      ring.type = "sine";
      ring.frequency.setValueAtTime(ringHz, now);
      ring.frequency.exponentialRampToValueAtTime(ringHz * 0.88, now + 0.04);

      const rg = ctx.createGain();
      rg.gain.setValueAtTime(isTick ? 0.04 : 0.025, now);
      rg.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      ring.connect(rg);
      rg.connect(master);
      ring.start(now);
      ring.stop(now + 0.05);
    } catch (e) {}
  };

  // Scroll listener for SVG Progress timelines
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("curriculum");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const startThreshold = windowHeight * 0.8;
      const endThreshold = windowHeight * 0.2;

      const scrollProgress = startThreshold - rect.top;
      const scrollRange = totalHeight - (endThreshold - startThreshold);
      const percentage = Math.max(0, Math.min(100, (scrollProgress / scrollRange) * 100));

      // 1. Direct DOM Updates for ultra-smooth 60fps/120fps pixel-by-pixel rendering
      const clipRect = document.getElementById("active-ticks-clip-rect");
      if (clipRect) {
        clipRect.setAttribute("height", (percentage / 100).toFixed(4));
      }

      const bracketActive = document.getElementById("bracket-active");
      if (bracketActive) {
        bracketActive.style.opacity = percentage > 0 ? "1" : "0";
      }

      const circle = document.getElementById("progress-circle");
      if (circle) {
        const dashArray = 113.1;
        const dashOffset = dashArray - (dashArray * percentage) / 100;
        circle.style.strokeDashoffset = String(dashOffset);
      }

      const progressText = document.getElementById("progress-text");
      if (progressText) {
        progressText.textContent = `${Math.round(percentage)}%`;
      }

      let statusStr = "Not Started";
      if (percentage === 0) {
        statusStr = "Not Started";
      } else if (percentage < 25) {
        statusStr = "Foundations";
      } else if (percentage < 50) {
        statusStr = "Core Concepts";
      } else if (percentage < 75) {
        statusStr = "Workflows & APIs";
      } else if (percentage < 95) {
        statusStr = "Case Studies";
      } else {
        statusStr = "Infinity Capstone";
      }

      const progressStatusEl = document.getElementById("progress-status");
      if (progressStatusEl) {
        progressStatusEl.textContent = statusStr;
      }

      // 2. Audio ticks
      const railSvg = document.querySelector(".curr-rail-svg");
      if (railSvg) {
        const railH = railSvg.getBoundingClientRect().height;
        const usableH = Math.max(1, railH - 28);
        const segmentH = 6;
        const totalSegs = Math.floor(usableH / segmentH);
        const activeSegs = Math.floor((percentage / 100) * totalSegs);

        if (activeSegs > lastActiveTickRef.current && percentage > 0) {
          const newSegs = Math.min(activeSegs - lastActiveTickRef.current, 3);
          for (let i = 0; i < newSegs; i++) {
            const isTick = (lastActiveTickRef.current + i) % 2 === 0;
            playClickAudio(isTick);
            if (navigator.vibrate) navigator.vibrate(isTick ? 3 : 4);
          }
          lastActiveTickRef.current = activeSegs;
        } else if (activeSegs < lastActiveTickRef.current) {
          lastActiveTickRef.current = activeSegs;
        }
      }

      // 4. Haptics on Milestone card crossing
      const cards = document.querySelectorAll(".milestone-card");
      let currentActiveIndex = -1;
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top < windowHeight * 0.75) {
          currentActiveIndex = index;
        }
      });
      if (currentActiveIndex !== -1 && currentActiveIndex !== lastHapticDotRef.current) {
        lastHapticDotRef.current = currentActiveIndex;
        if (navigator.vibrate) navigator.vibrate([15, 10, 15]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    // Trigger initially
    setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const openCounseling = () => {
    window.dispatchEvent(new Event("openCounselingModal"));
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case "orange": return "bg-brand-orange text-white border-brand-orange/20";
      case "blue": return "bg-blue-500 text-white border-blue-500/20";
      case "indigo": return "bg-indigo-500 text-white border-indigo-500/20";
      case "emerald": return "bg-emerald-500 text-white border-emerald-500/20";
      case "rose": return "bg-rose-500 text-white border-rose-500/20";
      case "amber": return "bg-amber-500 text-zinc-950 border-amber-500/20";
      case "violet": return "bg-violet-500 text-white border-violet-500/20";
      case "teal": return "bg-teal-500 text-white border-teal-500/20";
      default: return "bg-brand-orange text-white border-brand-orange/20";
    }
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case "orange": return "border-brand-orange/20 dark:border-brand-orange/15 bg-brand-orange/[0.03] dark:bg-brand-orange/[0.02]";
      case "blue": return "border-blue-500/20 dark:border-blue-500/15 bg-blue-500/[0.03] dark:bg-blue-500/[0.02]";
      case "indigo": return "border-indigo-500/20 dark:border-indigo-500/15 bg-indigo-500/[0.03] dark:bg-indigo-500/[0.02]";
      case "emerald": return "border-emerald-500/20 dark:border-emerald-500/15 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.02]";
      case "rose": return "border-rose-500/20 dark:border-rose-500/15 bg-rose-500/[0.03] dark:bg-rose-500/[0.02]";
      case "amber": return "border-amber-500/20 dark:border-amber-500/15 bg-amber-500/[0.03] dark:bg-amber-500/[0.02]";
      case "violet": return "border-violet-500/20 dark:border-violet-500/15 bg-violet-500/[0.03] dark:bg-violet-500/[0.02]";
      case "teal": return "border-teal-500/20 dark:border-teal-500/15 bg-teal-500/[0.03] dark:bg-teal-500/[0.02]";
      default: return "border-brand-orange/20 dark:border-brand-orange/15 bg-brand-orange/[0.03] dark:bg-brand-orange/[0.02]";
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case "orange": return "text-brand-orange";
      case "blue": return "text-blue-500";
      case "indigo": return "text-indigo-500";
      case "emerald": return "text-emerald-500";
      case "rose": return "text-rose-500";
      case "amber": return "text-amber-500";
      case "violet": return "text-violet-500";
      case "teal": return "text-teal-500";
      default: return "text-brand-orange";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "orange": return "bg-brand-orange/10 dark:bg-brand-orange/15 text-brand-orange border-brand-orange/20";
      case "blue": return "bg-blue-500/10 dark:bg-blue-500/15 text-blue-500 border-blue-500/20";
      case "indigo": return "bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-500 border-indigo-500/20";
      case "emerald": return "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-500 border-emerald-500/20";
      case "rose": return "bg-rose-500/10 dark:bg-rose-500/15 text-rose-500 border-rose-500/20";
      case "amber": return "bg-amber-500/10 dark:bg-amber-500/15 text-amber-500 border-amber-500/20";
      case "violet": return "bg-violet-500/10 dark:bg-violet-500/15 text-violet-500 border-violet-500/20";
      case "teal": return "bg-teal-500/10 dark:bg-teal-500/15 text-teal-500 border-teal-500/20";
      default: return "bg-brand-orange/10 dark:bg-brand-orange/15 text-brand-orange border-brand-orange/20";
    }
  };

  // Localized FAQ modification
  const localizedFAQs = [...data.faqs];
  if (city) {
    localizedFAQs.unshift({
      q: `Is the ${data.title} course in ${city} offline or classroom-based?`,
      a: `Our program is 100% online with live interactive sessions, digital labs, and direct mentor support. This allows you to complete the entire course from the comfort of your home in ${city} without any daily travel overhead, while maintaining the same standard of practical training.`
    });
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 md:pt-32 pb-10 px-4 md:px-8 max-w-[1400px] mx-auto overflow-x-clip">
        <section id="hero-detail" className="pt-2 pb-6 animate-reveal active">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col text-left">
              <div className="mb-2">
                <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1 px-3 rounded shadow-sm w-max">
                  {data.title} {city ? `• ${city}` : ""}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mt-[14px] mb-4">
                Professional <br />
                <span className="text-gradient typewriter-cursor">
                  {typewriterText || "\u00A0"}
                </span>{" "}
                {city && <span className="text-zinc-900 dark:text-white block sm:inline">in {city}</span>}
              </h1>

              {id === "digital-marketing-with-gen-ai" && data.flagshipContent?.heroSubtext ? (
                <div className="text-zinc-600 dark:text-zinc-400 text-[14px] md:text-[15px] leading-relaxed mb-6 max-w-xl font-sans whitespace-pre-line">
                  {data.flagshipContent.heroSubtext}
                </div>
              ) : (
                <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed mb-6 max-w-lg font-sans">
                  {data.description} {city ? `Learn from absolute industry leaders and accelerate your career path directly from ${city}.` : ""}
                </p>
              )}

              {/* Dynamic Stats */}
              <div className="flex flex-nowrap justify-center lg:justify-start items-center gap-3 mb-6 pt-4 border-t border-zinc-200 dark:border-white/10 w-full lg:w-fit self-center lg:self-start overflow-hidden">
                <div>
                  <div className="flex items-center gap-1.5 text-lg font-bold text-zinc-900 dark:text-white mb-0.5">
                    <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-base">1.5 Lakh+</span>
                  </div>
                  <div className="text-[12px] text-zinc-500 font-medium whitespace-nowrap">Aspirants Mentored</div>
                </div>
                <div className="w-px h-8 bg-zinc-200 dark:bg-white/10"></div>
                <div>
                  <div className="flex items-center gap-1.5 text-lg font-bold text-zinc-900 dark:text-white mb-0.5">
                    <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="text-base">350+</span>
                  </div>
                  <div className="text-[12px] text-zinc-500 font-medium whitespace-nowrap">Hiring Partners</div>
                </div>
                <div className="w-px h-8 bg-zinc-200 dark:bg-white/10"></div>
                <div>
                  <div className="flex items-center gap-1.5 text-lg font-bold text-zinc-900 dark:text-white mb-0.5">
                    <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base">40+</span>
                  </div>
                  <div className="text-[12px] text-zinc-500 font-medium whitespace-nowrap">Industry Mentors</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto self-center lg:self-start">
                <button
                  onClick={openCounseling}
                  className="magnetic-btn w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white font-semibold text-[15px] hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer"
                >
                  Talk to Program Advisor
                </button>
                <button
                  onClick={() => document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#E59613] text-zinc-900 font-semibold text-[15px] transition-colors shadow-md border border-[#D58603] cursor-pointer"
                >
                  Download Curriculum
                </button>
              </div>

              {/* Mobile Mentors Marquee */}
              <div className="mt-10 lg:hidden w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                <div className="marquee-track flex gap-4 w-max">
                  {MENTORS_LIST.concat(MENTORS_LIST).map((m, i) => (
                    <div key={i} className="glass-panel p-2.5 rounded-2xl flex flex-col items-center w-32 flex-shrink-0">
                      <img src={m.img} className="w-full h-28 object-cover rounded-xl mb-3" alt={m.name} />
                      <div className="font-semibold text-[12px] text-zinc-900 dark:text-white mb-1">{m.name}</div>
                      <div className="text-[10px] font-medium text-brand-orange">{m.company}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content: Vertical Marquees (Desktop) */}
            <div className="relative h-[380px] overflow-hidden hidden lg:block" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
              <div className="flex gap-4 justify-center h-[200%] transform -translate-y-[10%]">
                <div className="marquee-vertical-track-down gap-4 w-36">
                  {MENTORS_LIST.slice(0, 10).concat(MENTORS_LIST.slice(0, 10)).map((m, i) => (
                    <div key={i} className="glass-panel p-2.5 rounded-2xl flex flex-col items-center">
                      <img src={m.img} className="w-full h-32 object-cover rounded-xl mb-3" alt={m.name} />
                      <div className="font-semibold text-[13px] text-zinc-900 dark:text-white mb-1">{m.name}</div>
                      <div className="text-[11px] font-medium text-brand-orange">{m.company}</div>
                    </div>
                  ))}
                </div>
                <div className="marquee-vertical-track-up gap-4 w-36 mt-12">
                  {MENTORS_LIST.slice(10, 20).concat(MENTORS_LIST.slice(10, 20)).map((m, i) => (
                    <div key={i} className="glass-panel p-2.5 rounded-2xl flex flex-col items-center">
                      <img src={m.img} className="w-full h-32 object-cover rounded-xl mb-3" alt={m.name} />
                      <div className="font-semibold text-[13px] text-zinc-900 dark:text-white mb-1">{m.name}</div>
                      <div className="text-[11px] font-medium text-brand-orange">{m.company}</div>
                    </div>
                  ))}
                </div>
                <div className="marquee-vertical-track-down gap-4 w-36 mt-24">
                  {MENTORS_LIST.slice(20, 30).concat(MENTORS_LIST.slice(20, 30)).map((m, i) => (
                    <div key={i} className="glass-panel p-2.5 rounded-2xl flex flex-col items-center">
                      <img src={m.img} className="w-full h-32 object-cover rounded-xl mb-3" alt={m.name} />
                      <div className="font-semibold text-[13px] text-zinc-900 dark:text-white mb-1">{m.name}</div>
                      <div className="text-[11px] font-medium text-brand-orange">{m.company}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Milestone Meta Bar */}
        <section className="mt-10 mb-8 animate-reveal delay-100 w-full relative z-20">
          <style dangerouslySetInnerHTML={{ __html: `
            /* ── SVG Animations ───────────────────────────────── */
            @keyframes svg-flag-wave {
                0%, 100% { transform: rotate(0deg) skewY(0deg); }
                50% { transform: rotate(4deg) skewY(2deg); }
            }
            @keyframes svg-clock-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes svg-globe-spin {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: 20; }
            }
            @keyframes svg-folder-open {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(0.85); }
            }
            @keyframes svg-star-shimmer {
                0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 1px rgba(245,158,11,0.3)); }
                50% { transform: scale(1.15) rotate(15deg); filter: drop-shadow(0 0 5px rgba(245,158,11,0.7)); }
            }
            .animate-svg-flag {
                animation: svg-flag-wave 3s ease-in-out infinite;
                transform-origin: 6px 15px;
            }
            .animate-svg-clock {
                animation: svg-clock-spin 12s linear infinite;
                transform-origin: 12px 12px;
            }
            .animate-svg-globe {
                stroke-dasharray: 4 2;
                animation: svg-globe-spin 6s linear infinite;
            }
            .animate-svg-folder {
                animation: svg-folder-open 3s ease-in-out infinite;
                transform-origin: 2px 20px;
            }
            .animate-svg-star {
                animation: svg-star-shimmer 2.5s ease-in-out infinite;
                transform-origin: 12px 12px;
            }

            /* ── Curriculum Section ─────────────────────────────── */
            .mc {
                background: rgba(255,255,255,0.7);
                border: 1px solid rgba(228,228,231,0.7);
                border-radius: 10px;
                transition: border-color 200ms, box-shadow 200ms;
                overflow: hidden;
            }
            .dark .mc {
                background: rgba(255,255,255,0.03);
                border-color: rgba(255,255,255,0.06);
            }
            .mc.mc-open {
                border-color: rgba(37,99,235,0.3);
                box-shadow: 0 4px 18px rgba(37,99,235,0.07);
            }
            .dark .mc.mc-open {
                border-color: rgba(37,99,235,0.35);
                box-shadow: 0 4px 22px rgba(37,99,235,0.13);
            }
            .mc-btn {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                padding: 14px 16px;
                text-align: left;
                outline: none;
                background: none;
                border: none;
                cursor: pointer;
            }
            @media (min-width: 768px) { .mc-btn { padding: 18px 22px; } }
            .mc-badge {
                display: inline-flex;
                align-items: center;
                padding: 2px 7px;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: #2563EB;
                background: rgba(37,99,235,0.08);
                border: 1px solid rgba(37,99,235,0.18);
                border-radius: 6px;
                margin-bottom: 5px;
            }
            .mc-title {
                font-size: 14px;
                font-weight: 600;
                line-height: 1.4;
                color: #18181b;
                transition: color 150ms;
                margin: 0;
            }
            .dark .mc-title { color: #fff; }
            .mc-btn:hover .mc-title { color: #2563EB; }
            .mc-chevron {
                flex-shrink: 0;
                width: 22px;
                height: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: rgba(228,228,231,0.6);
                border: 1px solid rgba(228,228,231,0.8);
                color: #a1a1aa;
                transition: background 200ms, color 200ms, transform 250ms;
            }
            .dark .mc-chevron {
                background: rgba(255,255,255,0.05);
                border-color: rgba(255,255,255,0.06);
                color: #71717a;
            }
            .mc-btn:hover .mc-chevron {
                background: #2563EB;
                border-color: transparent;
                color: #fff;
            }
            .mc.mc-open .mc-chevron { transform: rotate(90deg); background: #2563EB; border-color: transparent; color: #fff; }
            .mc-body {
                max-height: 0;
                overflow: hidden;
                transition: max-height 300ms ease;
            }
            .mc-inner {
                padding: 0 16px 14px;
                border-top: 1px solid rgba(228,228,231,0.6);
                padding-top: 12px;
            }
            @media (min-width: 768px) { .mc-inner { padding: 12px 22px 18px; } }
            .dark .mc-inner { border-top-color: rgba(255,255,255,0.05); }
            .mc-inner p {
                font-size: 12.5px;
                line-height: 1.65;
                color: #71717a;
                margin: 0;
            }
            @media (min-width: 768px) { .mc-inner p { font-size: 13.5px; } }
            .dark .mc-inner p { color: #a1a1aa; }

            /* ── LED rail ───────────────────────────────────────── */
            #bracket-active, #timeline-progress-ticks {
                filter: drop-shadow(0 0 4px rgba(37,99,235,0.8)) drop-shadow(0 0 2px rgba(30,58,138,1));
            }
            @media (max-width: 767px) {
                .curr-rail-wrap { padding-left: 26px !important; }
                .curr-rail-svg  { left: 0 !important; width: 20px !important; }
            }

            /* ── Desktop Floating Box Layout Grid ── */
            @media (min-width: 1024px) {
                .curriculum-layout-grid {
                    display: grid;
                    grid-template-columns: repeat(12, minmax(0, 1fr));
                    gap: 20px;
                    align-items: start;
                }
            }
            .curriculum-sticky-box {
                position: -webkit-sticky !important;
                position: sticky !important;
                top: 108px !important;
                align-self: start !important;
                z-index: 30;
            }
            .progress-circle-svg circle {
                transition: stroke-dashoffset 0.35s ease;
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
            }
          ` }} />

          {/* Mobile Version */}
          <div className="md:hidden border border-zinc-200 dark:border-zinc-800/80 rounded-[24px] bg-white/50 dark:bg-[#0c0c0c]/50 backdrop-blur-xl overflow-hidden max-w-[800px] mx-auto shadow-sm">
            <div className="grid grid-cols-3 border-b border-zinc-200 dark:border-zinc-800/80">
              
              <div className="p-4 border-r border-zinc-200 dark:border-zinc-800/80 flex flex-col gap-1.5 items-start justify-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold">Milestone</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 22V2C6 1.44772 5.55228 1 5 1C4.44772 1 4 1.44772 4 2V22C4 22.5523 4.44772 23 5 23C5.55228 23 6 22.5523 6 22Z" fill="#94A3B8" className="dark:fill-[#475569]"/>
                    <path d="M6 3H18.318C19.3444 3 19.9928 4.10825 19.5222 5.04944L17.5 9.09888L19.5222 13.1483C19.9928 14.0895 19.3444 15.1978 18.318 15.1978H6V3Z" fill="url(#flag-grad-mobile)" className="animate-svg-flag"/>
                    <defs>
                      <linearGradient id="flag-grad-mobile" x1="6" y1="3" x2="20" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F43F5E"/>
                        <stop offset="1" stopColor="#F97316"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[13px] truncate">{data.milestoneWord}</span>
                </div>
              </div>

              <div className="p-4 border-r border-zinc-200 dark:border-zinc-800/80 flex flex-col gap-1.5 items-start justify-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold">Duration</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="url(#clock-bg-mobile)"/>
                    <circle cx="12" cy="12" r="8" fill="#FFFFFF" className="dark:fill-[#111111]"/>
                    <path d="M12 7V12L15 15" stroke="url(#clock-hands-mobile)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-svg-clock"/>
                    <defs>
                      <linearGradient id="clock-bg-mobile" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6"/>
                        <stop offset="1" stopColor="#3B82F6"/>
                      </linearGradient>
                      <linearGradient id="clock-hands-mobile" x1="12" y1="7" x2="15" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6"/>
                        <stop offset="1" stopColor="#3B82F6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[13px] truncate">{data.duration}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-1.5 items-start justify-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold">Mode</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="url(#globe-bg-mobile)"/>
                    <path d="M2 12H22M12 2C15.5 2 18 6.5 18 12C18 17.5 15.5 22 12 22C8.5 22 6 17.5 6 12C6 6.5 8.5 2 12 2Z" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" className="animate-svg-globe"/>
                    <defs>
                      <linearGradient id="globe-bg-mobile" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10B981"/>
                        <stop offset="1" stopColor="#2563EB"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[13px] truncate">Online</span>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="p-4 border-r border-zinc-200 dark:border-zinc-800/80 flex flex-col gap-1.5 items-start justify-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold">Live Sessions</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6C20.5 7.5 21 9.5 21 12C21 14.5 20.5 16.5 19 18" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse"/>
                    <path d="M16.5 9C17.5 10 18 11 18 12C18 13 17.5 14 16.5 15" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '200ms' }}/>
                    <rect x="2" y="7" width="11" height="10" rx="3" fill="url(#camera-body-mobile)"/>
                    <path d="M13 10.5L16.2 8.1C16.8 7.65 17.5 8.08 17.5 8.83V15.17C17.5 15.92 16.8 16.35 16.2 15.9L13 13.5V10.5Z" fill="url(#camera-body-mobile)"/>
                    <circle cx="5.5" cy="10" r="1.5" fill="#EF4444" className="animate-pulse"/>
                    <defs>
                      <linearGradient id="camera-body-mobile" x1="2" y1="7" x2="17.5" y2="17" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#A855F7"/>
                        <stop offset="1" stopColor="#4F46E5"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[13px] truncate">{data.liveSessions}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-1.5 items-start justify-center">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold">Projects</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 7C2 5.34315 3.34315 4 5 4H9.17157C9.96722 4 10.7303 4.31607 11.2929 4.87868L12.7071 6.29289C13.2697 6.8555 14.0328 7.17157H19C20.6569 7.17157 22 8.51472 22 10.1716V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7Z" fill="url(#folder-back-mobile)"/>
                    <path d="M2 10.5C2 9.11929 3.11929 8 4.5 8H19.5C20.8807 8 22 9.11929 22 10.5V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V10.5Z" fill="url(#folder-front-mobile)" className="animate-svg-folder"/>
                    <defs>
                      <linearGradient id="folder-back-mobile" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F59E0B"/>
                        <stop offset="1" stopColor="#D97706"/>
                      </linearGradient>
                      <linearGradient id="folder-front-mobile" x1="2" y1="8" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FDE047"/>
                        <stop offset="1" stopColor="#F59E0B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[13px] truncate">{data.projects}</span>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center">
              <div className="w-full py-3.5 px-6 rounded-full bg-brand-orange/[0.05] dark:bg-brand-orange/[0.12] border border-brand-orange/20 relative group overflow-hidden cursor-default flex items-center justify-center gap-2.5 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-brand-red/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 relative z-10 drop-shadow-md shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#star-grad-mobile)" className="animate-svg-star"/>
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77V2Z" fill="#B45309" fillOpacity="0.3"/>
                  <defs>
                    <linearGradient id="star-grad-mobile" x1="12" y1="2" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FEF08A"/>
                      <stop offset="1" stopColor="#F59E0B"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="font-bold text-[14px] text-zinc-900 dark:text-white relative z-10">Placement Support</span>
              </div>
            </div>
          </div>

          {/* Desktop Version */}
          <div className="hidden md:block rounded-3xl border border-zinc-200/60 dark:border-white/5 bg-white/60 dark:bg-[#0d0d0d]/60 backdrop-blur-2xl shadow-xl shadow-zinc-200/10 dark:shadow-none p-5 md:p-6 md:px-8 transition-colors duration-300">
            <div className="flex flex-row items-center justify-between gap-0">
              
              <div className="flex flex-col gap-1 items-center px-4">
                <span className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Milestones</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 22V2C6 1.44772 5.55228 1 5 1C4.44772 1 4 1.44772 4 2V22C4 22.5523 4.44772 23 5 23C5.55228 23 6 22.5523 6 22Z" fill="#94A3B8" className="dark:fill-[#475569]"/>
                    <path d="M6 3H18.318C19.3444 3 19.9928 4.10825 19.5222 5.04944L17.5 9.09888L19.5222 13.1483C19.9928 14.0895 19.3444 15.1978 18.318 15.1978H6V3Z" fill="url(#flag-grad-desktop)" className="animate-svg-flag"/>
                    <defs>
                      <linearGradient id="flag-grad-desktop" x1="6" y1="3" x2="20" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F43F5E"/>
                        <stop offset="1" stopColor="#F97316"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[16px] truncate">{data.milestoneWord}</span>
                </div>
              </div>

              <div className="w-px h-8 bg-zinc-200 dark:bg-white/10 shrink-0"></div>

              <div className="flex flex-col gap-1 items-center px-4">
                <span className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Duration</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="url(#clock-bg-desktop)"/>
                    <circle cx="12" cy="12" r="8" fill="#FFFFFF" className="dark:fill-[#111111]"/>
                    <path d="M12 7V12L15 15" stroke="url(#clock-hands-desktop)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-svg-clock"/>
                    <defs>
                      <linearGradient id="clock-bg-desktop" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6"/>
                        <stop offset="1" stopColor="#3B82F6"/>
                      </linearGradient>
                      <linearGradient id="clock-hands-desktop" x1="12" y1="7" x2="15" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6"/>
                        <stop offset="1" stopColor="#3B82F6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[16px] truncate">{data.duration}</span>
                </div>
              </div>

              <div className="w-px h-8 bg-zinc-200 dark:bg-white/10 shrink-0"></div>

              <div className="flex flex-col gap-1 items-center px-4">
                <span className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Mode</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="url(#globe-bg-desktop)"/>
                    <path d="M2 12H22M12 2C15.5 2 18 6.5 18 12C18 17.5 15.5 22 12 22C8.5 22 6 17.5 6 12C6 6.5 8.5 2 12 2Z" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" className="animate-svg-globe"/>
                    <defs>
                      <linearGradient id="globe-bg-desktop" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10B981"/>
                        <stop offset="1" stopColor="#2563EB"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[16px] truncate">Online</span>
                </div>
              </div>

              <div className="w-px h-8 bg-zinc-200 dark:bg-white/10 shrink-0"></div>

              <div className="flex flex-col gap-1 items-center px-4">
                <span className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Live Sessions</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6C20.5 7.5 21 9.5 21 12C21 14.5 20.5 16.5 19 18" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse"/>
                    <path d="M16.5 9C17.5 10 18 11 18 12C18 13 17.5 14 16.5 15" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '200ms' }}/>
                    <rect x="2" y="7" width="11" height="10" rx="3" fill="url(#camera-body-desktop)"/>
                    <path d="M13 10.5L16.2 8.1C16.8 7.65 17.5 8.08 17.5 8.83V15.17C17.5 15.92 16.8 16.35 16.2 15.9L13 13.5V10.5Z" fill="url(#camera-body-desktop)"/>
                    <circle cx="5.5" cy="10" r="1.5" fill="#EF4444" className="animate-pulse"/>
                    <defs>
                      <linearGradient id="camera-body-desktop" x1="2" y1="7" x2="17.5" y2="17" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#A855F7"/>
                        <stop offset="1" stopColor="#4F46E5"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[16px] truncate">{data.liveSessions}</span>
                </div>
              </div>

              <div className="w-px h-8 bg-zinc-200 dark:bg-white/10 shrink-0"></div>

              <div className="flex flex-col gap-1 items-center px-4">
                <span className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Projects</span>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 7C2 5.34315 3.34315 4 5 4H9.17157C9.96722 4 10.7303 4.31607 11.2929 4.87868L12.7071 6.29289C13.2697 6.8555 14.0328 7.17157H19C20.6569 7.17157 22 8.51472 22 10.1716V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7Z" fill="url(#folder-back-desktop)"/>
                    <path d="M2 10.5C2 9.11929 3.11929 8 4.5 8H19.5C20.8807 8 22 9.11929 22 10.5V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V10.5Z" fill="url(#folder-front-desktop)" className="animate-svg-folder"/>
                    <defs>
                      <linearGradient id="folder-back-desktop" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F59E0B"/>
                        <stop offset="1" stopColor="#D97706"/>
                      </linearGradient>
                      <linearGradient id="folder-front-desktop" x1="2" y1="8" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FDE047"/>
                        <stop offset="1" stopColor="#F59E0B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-zinc-900 dark:text-white text-[16px] truncate">{data.projects}</span>
                </div>
              </div>

              <div className="w-px h-8 bg-zinc-200 dark:bg-white/10 shrink-0"></div>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-orange/10 to-brand-red/10 border border-brand-orange/20 relative group overflow-hidden cursor-default w-auto justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-brand-red/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 relative z-10 drop-shadow-md shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#star-grad-desktop)" className="animate-svg-star"/>
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77V2Z" fill="#B45309" fillOpacity="0.3"/>
                    <defs>
                      <linearGradient id="star-grad-desktop" x1="12" y1="2" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FEF08A"/>
                        <stop offset="1" stopColor="#F59E0B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold text-[14px] text-zinc-900 dark:text-white relative z-10">Placement Support</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {id === "digital-marketing-with-gen-ai" && (
          <>
            <DigitalMarketingWhySection data={data} />
            <DigitalMarketingDifferencesSection data={data} />
          </>
        )}

        {/* Curriculum Timeline Section */}
        <section id="curriculum" className="mt-16 mb-20 animate-reveal delay-200 w-full relative z-20">
          
          <div className="curriculum-layout-grid">
            
            {/* Left side: Timeline Progress Rail & Accordion */}
            <div className="lg:col-span-8 xl:col-span-9 relative pl-8 md:pl-14 curr-rail-wrap">
              
              <svg className="absolute left-[4px] md:left-[14px] top-2 bottom-2 w-5 md:w-14 h-[calc(100%-16px)] pointer-events-none overflow-visible curr-rail-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="ticks-inactive" width="28" height="6" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="2" x2="18" y2="2" stroke="currentColor" strokeWidth="1.5" className="text-zinc-300 dark:text-white/[0.08]" />
                  </pattern>
                  <pattern id="ticks-active" width="28" height="6" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="2" x2="18" y2="2" stroke="#2563EB" strokeWidth="1.5" />
                  </pattern>
                  <clipPath id="active-ticks-clip" clipPathUnits="objectBoundingBox">
                    <rect id="active-ticks-clip-rect" x="0" y="0" width="1" height="0" />
                  </clipPath>
                </defs>
                <g className="text-zinc-300 dark:text-white/[0.08] hidden md:block" id="bracket-inactive">
                  <line x1="0" y1="2"  x2="40" y2="2"  stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="7"  x2="40" y2="7"  stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="17" x2="40" y2="17" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" />
                </g>
                <g stroke="#2563EB" id="bracket-active" className="transition-opacity duration-150 hidden md:block opacity-0">
                  <line x1="0" y1="2"  x2="40" y2="2"  strokeWidth="1.5" />
                  <line x1="0" y1="7"  x2="40" y2="7"  strokeWidth="1.5" />
                  <line x1="0" y1="12" x2="40" y2="12" strokeWidth="1.5" />
                  <line x1="0" y1="17" x2="40" y2="17" strokeWidth="1.5" />
                  <line x1="0" y1="22" x2="40" y2="22" strokeWidth="1.5" />
                </g>
                <rect x="0" y="28" width="18" height="100%" fill="url(#ticks-inactive)"/>
                <g id="timeline-progress-ticks" clipPath="url(#active-ticks-clip)">
                  <rect x="0" y="28" width="18" height="100%" fill="url(#ticks-active)"/>
                </g>
              </svg>

              <div className="flex flex-col gap-2" id="milestones-container">
                {data.milestones.map((m, mIndex) => {
                  const isOpen = openMilestoneIndex === mIndex + 1;
                  return (
                    <div key={mIndex} id={`milestone-card-${mIndex + 1}`} className={`mc milestone-card ${isOpen ? "mc-open" : ""}`}>
                      <button className="mc-btn group" onClick={() => handleMilestoneToggle(mIndex + 1)}>
                        <div>
                          <span className="mc-badge">Milestone {m.number}</span>
                          <h3 className="mc-title">{m.title}</h3>
                        </div>
                        <div className="mc-chevron">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                      <div className="mc-body" style={{ maxHeight: isOpen ? "3000px" : "0px", transition: "max-height 300ms ease" }}>
                        <div className="mc-inner">
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 lg:gap-4 mt-6">
                            {m.modules.map((mod, modIndex) => (
                              <div key={modIndex} className={`border rounded-2xl p-5 flex flex-col shadow-sm transition-shadow hover:shadow-md ${getBorderColor(mod.color)}`}>
                                <div className="flex items-center gap-3 mb-3">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[14px] font-bold ${getBadgeColor(mod.color)}`}>
                                    {modIndex + 1}
                                  </div>
                                  <h4 className={`font-extrabold text-[16px] tracking-tight ${getTextColor(mod.color)}`}>
                                    {mod.title}
                                  </h4>
                                </div>
                                <div className={`w-full h-px mb-5 ${getTextColor(mod.color)} opacity-20`}></div>
                                <div className="space-y-3.5">
                                  {mod.bullets.map((b, bIndex) => (
                                    <div key={bIndex} className="flex items-start gap-3">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${getIconColor(mod.color)}`}>
                                        <span className="material-symbols-outlined text-[16px]">
                                          {b.icon || "check"}
                                        </span>
                                      </div>
                                      <div>
                                        <div className="text-[13px] font-bold text-zinc-800 dark:text-zinc-100 leading-snug">
                                          {b.title}
                                        </div>
                                        {b.desc && (
                                          <div className="text-[11.5px] text-zinc-500 dark:text-zinc-400 font-medium">
                                            {b.desc}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side: Sticky progress status card */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3 curriculum-sticky-box">
              <div className="bg-white/85 dark:bg-[#0f1512]/85 border border-zinc-200/80 dark:border-white/[0.05] rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-brand-orange/20 dark:bg-brand-orange/10 blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -left-16 -bottom-16 w-36 h-36 rounded-full bg-brand-red/20 dark:bg-brand-red/10 blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex items-center gap-4 pb-5 border-b border-zinc-200/60 dark:border-white/[0.06] mb-5">
                  <div className="relative flex items-center justify-center shrink-0 w-[52px] h-[52px]">
                    <svg className="w-full h-full progress-circle-svg transform -rotate-90" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-200 dark:text-white/[0.06]" />
                      <circle id="progress-circle" cx="20" cy="20" r="18" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="113.1" strokeDashoffset="113.1" strokeLinecap="round" className="transition-all duration-300" style={{ filter: "drop-shadow(0 0 3px rgba(37,99,235,0.85))" }} />
                    </svg>
                    <span id="progress-text" className="absolute font-bold text-[12px] text-zinc-900 dark:text-white">0%</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-orange/90 bg-brand-orange/10 dark:bg-brand-orange/8 border border-brand-orange/15 px-2 py-0.5 rounded-full">Syllabus Progress</span>
                    <h4 id="progress-status" className="text-sm font-bold text-zinc-900 dark:text-white mt-1 leading-none">Not Started</h4>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Program Highlights</h5>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-brand-orange/10 dark:bg-brand-orange/8 flex items-center justify-center shrink-0 mt-0.5 border border-brand-orange/15">
                      <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{data.duration} Duration</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">Intense live lectures + practical builder labs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-brand-orange/10 dark:bg-brand-orange/8 flex items-center justify-center shrink-0 mt-0.5 border border-brand-orange/15">
                      <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{data.projects} Production-Grade Projects</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">Deploy autonomous multi-agent software at scale.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-brand-orange/10 dark:bg-brand-orange/8 flex items-center justify-center shrink-0 mt-0.5 border border-brand-orange/15">
                      <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">1:1 Mentorship Reviews</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">Direct feedback from leading industry AI experts.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-brand-orange/10 dark:bg-brand-orange/8 flex items-center justify-center shrink-0 mt-0.5 border border-brand-orange/15">
                      <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">100% Placement Support</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">Mock interviews, resume profiling, & direct hiring access.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-zinc-200/60 dark:border-white/[0.06]">
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red hover:opacity-95 text-white font-bold text-sm shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.45)] transition-all duration-300 active:scale-98" onClick={openCounseling}>
                    <span>Talk to Advisor</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-white/[0.06] font-bold text-sm transition-all duration-300" onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}>
                    <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>Download Syllabus</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-center lg:hidden">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white font-semibold text-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-[0_0_18px_rgba(37,99,235,0.22)] hover:shadow-[0_0_28px_rgba(37,99,235,0.4)]" onClick={openCounseling}>
              View Full Curriculum
            </button>
          </div>
        </section>

        {id === "digital-marketing-with-gen-ai" && <DigitalMarketingToolsSection data={data} />}

        {/* Portfolio Projects Section */}
        {data.portfolioProjects && data.portfolioProjects.length > 0 && (
          <section id="portfolio-projects" className="mt-16 mb-20 animate-reveal delay-200 w-full">
            <style dangerouslySetInnerHTML={{ __html: `
              /* ── Portfolio Projects Section ──────────────────── */
              .pp-scroll-track {
                display: flex;
                gap: 20px;
                overflow-x: auto;
                padding: 12px 4px 28px;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
                cursor: grab;
              }
              .pp-scroll-track:active { cursor: grabbing; }
              .pp-scroll-track::-webkit-scrollbar { height: 5px; }
              .pp-scroll-track::-webkit-scrollbar-track { background: transparent; }
              .pp-scroll-track::-webkit-scrollbar-thumb {
                background: rgba(37,99,235,0.25);
                border-radius: 100px;
              }
              .pp-scroll-track::-webkit-scrollbar-thumb:hover {
                background: rgba(37,99,235,0.5);
              }
              .pp-card {
                flex-shrink: 0;
                width: 230px;
                border-radius: 20px;
                overflow: hidden;
                scroll-snap-align: start;
                border: 1px solid rgba(0,0,0,0.06);
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                transition: transform 0.28s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.28s cubic-bezier(0.2,0.8,0.2,1);
                position: relative;
                background: white;
              }
              .dark .pp-card {
                background: #111111;
                border-color: rgba(255,255,255,0.06);
                box-shadow: 0 4px 24px rgba(0,0,0,0.35);
              }
              .pp-card:hover {
                transform: translateY(-6px) scale(1.015);
                box-shadow: 0 16px 40px rgba(0,0,0,0.14);
              }
              .dark .pp-card:hover {
                box-shadow: 0 16px 40px rgba(0,0,0,0.5);
              }
              .pp-img {
                width: 100%;
                height: 180px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
              }
              .pp-milestone-badge {
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.05em;
                background: rgba(255,255,255,0.82);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                border: 1px solid rgba(0,0,0,0.08);
                color: #18181b;
                padding: 3px 9px;
                border-radius: 100px;
                z-index: 2;
              }
              .dark .pp-milestone-badge {
                background: rgba(0,0,0,0.5);
                border-color: rgba(255,255,255,0.12);
                color: #f4f4f5;
              }
              .pp-body {
                padding: 14px 16px 18px;
              }
              .pp-codename {
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: #2563EB;
                margin-bottom: 3px;
              }
              .pp-tagline {
                font-size: 13.5px;
                font-weight: 700;
                color: #18181b;
                line-height: 1.35;
                margin-bottom: 8px;
              }
              .dark .pp-tagline { color: #f4f4f5; }
              .pp-desc {
                font-size: 11.5px;
                color: #71717a;
                line-height: 1.6;
              }
              .dark .pp-desc { color: #a1a1aa; }

              /* Shape SVG animations */
              @keyframes pp-shape-float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-6px) rotate(2deg); }
                66% { transform: translateY(4px) rotate(-1.5deg); }
              }
              @keyframes pp-shape-spin-slow {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes pp-shape-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.06); }
              }
              .pp-shape-float { animation: pp-shape-float 6s ease-in-out infinite; }
              .pp-shape-spin { animation: pp-shape-spin-slow 20s linear infinite; transform-origin: center; }
              .pp-shape-pulse { animation: pp-shape-pulse 3s ease-in-out infinite; }

                            /* Scroll fade edges on the track wrapper */
              .pp-track-wrapper {
                position: relative;
              }
            ` }} />

            {/* Section Header */}
            <div className="text-center mb-10 px-4">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-orange/8 dark:bg-brand-orange/12 border border-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-widest">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Real-World Portfolio
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Portfolio Projects
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-3 font-medium text-[15px] max-w-lg mx-auto leading-relaxed">
                Portfolio-Ready Projects You&apos;ll Build Inside the Bootcamp
              </p>
            </div>

            {/* Scrollable Cards */}
            <div className="pp-track-wrapper px-4 md:px-0">
              <div className="pp-scroll-track" id="pp-scroll-track">
                {data.portfolioProjects.map((proj, idx) => (
                  <div key={idx} className="pp-card">
                    {/* Image area with shape */}
                    <div className="pp-img" style={{ backgroundColor: proj.bg }}>
                      <span className="pp-milestone-badge">Milestone {proj.milestone}</span>
                      <PortfolioShape shape={proj.shape} />
                    </div>
                    {/* Body */}
                    <div className="pp-body">
                      <div className="pp-codename">Project {proj.codename}</div>
                      <div className="pp-tagline">{proj.tagline}</div>
                      <div className="pp-desc">{proj.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll hint dots */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {data.portfolioProjects.slice(0, Math.min(data.portfolioProjects.length, 9)).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 transition-colors" />
              ))}
            </div>
          </section>
        )}

        {id === "digital-marketing-with-gen-ai" && <DigitalMarketingPlacementSection data={data} />}

        {/* Certificate Spotlight Section */}
        <section className="py-12 px-0 z-20 relative">
          <div className="w-full p-8 md:p-12 rounded-3xl border border-zinc-200/60 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Certificate Mockup (2/5 width on desktop) */}
              <div className="lg:col-span-2 relative flex justify-center items-center">
                {/* Soft blur glowing background spots */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-orange/10 dark:bg-brand-orange/5 rounded-full blur-3xl z-0" />
                <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-red/10 dark:bg-brand-red/5 rounded-full blur-3xl z-0" />
                
                {/* Outer Tablet Frame Container */}
                <div className="relative z-10 w-full max-w-[340px] md:max-w-[370px] aspect-[1/1.4] bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between">
                  
                  {/* Certificate Background watermark decoration */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05] z-0 flex items-center justify-center">
                    <svg className="w-56 h-56" fill="currentColor" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                    </svg>
                  </div>
                  
                  {/* Outer frame border lines */}
                  <div className="absolute inset-3 border-4 border-brand-orange/10 dark:border-brand-orange/5 rounded-2xl pointer-events-none" />
                  
                  {/* Certificate Paper Content Inner Container */}
                  <div className="border border-brand-orange/20 dark:border-brand-orange/10 p-5 h-full flex flex-col justify-between relative z-10">
                    {/* Faint corner designs */}
                    <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t border-l border-brand-orange/30" />
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t border-r border-brand-orange/30" />
                    <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b border-l border-brand-orange/30" />
                    <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b border-r border-brand-orange/30" />

                    {/* Header Logo & Stamp */}
                    <div className="flex flex-col items-center mt-2">
                      <div className="text-[14px] font-extrabold tracking-wider uppercase text-zinc-900 dark:text-white flex items-center gap-1">
                        <span className="text-brand-orange">SKILLSHA</span>
                        <span>LEARN</span>
                      </div>
                      <div className="text-[7px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                        Credential Verification
                      </div>
                    </div>

                    {/* Certificate Title */}
                    <div className="my-3 text-center">
                      <h3 className="text-md md:text-lg font-bold tracking-widest text-zinc-900 dark:text-white uppercase">
                        Certificate
                      </h3>
                      <div className="text-[8px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold mt-0.5">
                        of completion
                      </div>
                    </div>

                    {/* Certificate Body Text */}
                    <div className="text-center space-y-3">
                      <div>
                        <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                          This is to certify
                        </span>
                        <span className="text-lg md:text-xl font-serif italic font-semibold text-brand-orange mt-1 block">
                          Jane Doe
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-[8px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                          has successfully completed
                        </span>
                        <span className="text-[9px] font-bold text-zinc-700 dark:text-zinc-300 mt-0.5 block">
                          {data.duration} of
                        </span>
                      </div>

                      <div>
                        <span className="text-sm md:text-md font-extrabold tracking-tight text-brand-orange block leading-tight px-2">
                          {data.title}
                        </span>
                      </div>
                      
                      <p className="text-[8px] text-zinc-400 dark:text-zinc-500 italic max-w-[220px] mx-auto leading-relaxed">
                        Demonstrating practical proficiency across projects, labs, and campaign builds.
                      </p>
                    </div>

                    {/* Signatures & Seal */}
                    <div className="flex justify-between items-end mt-4 px-2">
                      {/* Left: Round Seal Badge */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border border-brand-orange/20 bg-brand-orange/5 flex items-center justify-center relative">
                          <svg className="w-7 h-7 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
                          </svg>
                          <svg className="w-4 h-4 text-brand-orange absolute" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-[5px] text-zinc-400 uppercase tracking-widest mt-1">Verified</span>
                      </div>

                      {/* Center Stamp Info */}
                      <div className="flex flex-col items-center">
                        <span className="text-[6px] text-zinc-500 uppercase tracking-widest">on 22 Mar 2026</span>
                      </div>

                      {/* Right: Signature */}
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-serif italic text-zinc-800 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
                          Aris Thorne
                        </span>
                        <span className="text-[5px] text-zinc-400 uppercase tracking-widest mt-0.5">President, SkillSha</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Features (3/5 width on desktop) */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-8 relative z-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                    Be in the spotlight by getting certified!
                  </h2>
                  <p className="text-[14px] md:text-[15px] font-medium text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                    Prove your skills, boost credibility, and get one step closer to your dream role.
                  </p>
                </div>

                {/* 3 Horizontal Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  
                  {/* Feature 1 */}
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/5 dark:bg-brand-orange/10 border border-brand-orange/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-zinc-900 dark:text-white">
                        Industry-Recognized Certificate
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium leading-relaxed">
                        A badge trusted by top companies.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/5 dark:bg-brand-orange/10 border border-brand-orange/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-zinc-900 dark:text-white">
                        Stand Out in the Job Market
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium leading-relaxed">
                        Turn your profile into a recruiter magnet.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/5 dark:bg-brand-orange/10 border border-brand-orange/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879-.659c1.171-.879 3.07-.879 4.242 0 1.172.879 1.172 2.303 0 3.182C13.536 21.36 11.64 21.36 10.468 20.48l-.88-.66M12 3v3m0 12v3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-zinc-900 dark:text-white">
                        Your Passport to Career Growth
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium leading-relaxed">
                        Step into better roles and higher salaries.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Advisor CTA Button */}
                <div className="pt-4 border-t border-zinc-100 dark:border-white/5">
                  <button
                    onClick={openCounseling}
                    className="magnetic-btn w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white font-semibold text-[15px] hover:scale-[1.02] active:scale-95 shadow-[0_4px_20px_rgba(37,99,235,0.3)] cursor-pointer"
                  >
                    Talk to Program Advisor
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {id === "digital-marketing-with-gen-ai" && (
          <>
            <DigitalMarketingCareerSection data={data} />
            <DigitalMarketingStoriesSection data={data} />
            <DigitalMarketingPricingSection data={data} />
            <DigitalMarketingEnrollmentSection data={data} />
          </>
        )}

        {/* FAQs Accordion */}
        <section id="faqs" className="mt-8 mb-24 max-w-[800px] mx-auto px-4 md:px-0">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
              Everything you need to know about the {data.title} track.
            </p>
          </div>

          <div className="space-y-4">
            {localizedFAQs.map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div key={index} className="border border-zinc-200 dark:border-white/5 rounded-xl overflow-hidden bg-white dark:bg-white/[0.01]">
                  <button
                    onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-zinc-900 dark:text-white pr-4">
                      {faq.q}
                    </span>
                    <span className={`material-symbols-outlined text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-orange" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                    style={{ maxHeight: isOpen ? "200px" : "0px" }}
                  >
                    <div className="p-5 pt-0 text-zinc-600 dark:text-zinc-400 text-[14px] border-t border-zinc-100 dark:border-white/5">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <AlumniCompanies />

        {id === "digital-marketing-with-gen-ai" && <DigitalMarketingDisclaimerSection data={data} />}
      </main>

      <Footer />
      <CounselingModal />
    </>
  );
}
