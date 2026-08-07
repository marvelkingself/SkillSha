"use client";

import React from "react";
import Link from "next/link";
import { CITIES_LIST } from "@/data/cities";
import { COURSES_DATA } from "@/data/courses";
import { JourneySection } from "@/components/JourneySection/JourneySection";

export default function CareerSuccessSection() {
  const defaultCourseId = Object.keys(COURSES_DATA)[0] || "ai-engineering";

  const triggerCounselingModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("openCounselingModal"));
    }
  };

  return (
    <section id="career-success" className="mt-20 mb-24 max-w-full px-1 md:px-0 space-y-24">

      {/* ── Sub-section 1: Cities & Local SEO ─────────────────────── */}
      <div className="relative overflow-hidden rounded-[32px] border border-zinc-200/80 dark:border-white/5 bg-white/50 dark:bg-white/[0.01] backdrop-blur-xl p-8 md:p-12 shadow-sm animate-reveal">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-orange/[0.04] dark:bg-brand-orange/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="text-center max-w-[800px] mx-auto mb-10">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 dark:bg-white/5 border border-brand-orange/20 dark:border-white/10 mb-4">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-brand-orange dark:text-zinc-300">
              Local Career Centers
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4 leading-tight">
            IT Training Courses Available In
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Find your nearest city and start your journey with Skillsha's industry-focused IT training programs.
          </p>
        </div>

        {/* City Chips Wrap */}
        <nav className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {CITIES_LIST.map((city) => (
            <Link
              key={city.slug}
              href={`/${defaultCourseId}/${city.slug}`}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-white/10 hover:border-brand-orange/45 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_8px_20px_rgba(37,99,235,0.05)] transition-all duration-300 group font-semibold text-[12px] md:text-sm text-zinc-800 dark:text-zinc-200"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-orange"></span>
              </span>
              {city.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Sub-section 2: Interactive Career Journey ────────────── */}
      <div className="space-y-8 animate-reveal delay-100">
        <div className="text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 dark:bg-white/5 border border-brand-orange/20 dark:border-white/10 mb-2">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-brand-orange dark:text-zinc-300">
              The Path to Growth
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-2 leading-tight">
            Your Journey to a Successful Tech Career
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            Click on each milestone step below to preview how we align your training to actual industry standards.
          </p>
        </div>

        {/* Modular Animated Career Journey Map */}
        <JourneySection />
      </div>

      {/* ── Sub-section 3: Learning Comparison ──────────────────── */}
      <div className="space-y-12 animate-reveal delay-200">
        <div className="text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 dark:bg-white/5 border border-brand-orange/20 dark:border-white/10 mb-4">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-brand-orange dark:text-zinc-300">
              Why Skillsha?
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4 leading-tight">
            Why Skillsha Instead of Free Learning?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Traditional tutorials fail because they lack direction and active feedback. Here is how we build structured career leaps.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Learning Alone (Muted) */}
          <article className="bg-zinc-50/80 dark:bg-white/[0.005] border border-zinc-200/50 dark:border-white/5 rounded-[32px] p-8 md:p-10 flex flex-col justify-between opacity-70 hover:opacity-100 transition-opacity duration-300">
            <div>
              <h3 className="font-heading text-xl font-bold text-zinc-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                Learning Alone
              </h3>
              <ul className="space-y-4" aria-label="Learning Alone Problems">
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 text-sm mt-0.5" aria-hidden="true">✗</span>
                  <span className="text-[13px] md:text-sm text-zinc-500">Random tutorials (No structured roadmap)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 text-sm mt-0.5" aria-hidden="true">✗</span>
                  <span className="text-[13px] md:text-sm text-zinc-500">Information overload without direction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 text-sm mt-0.5" aria-hidden="true">✗</span>
                  <span className="text-[13px] md:text-sm text-zinc-500">No active mentors (Stuck for hours on single bugs)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 text-sm mt-0.5" aria-hidden="true">✗</span>
                  <span className="text-[13px] md:text-sm text-zinc-500">Only sandbox exercises (Fails recruiter resume checks)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 text-sm mt-0.5" aria-hidden="true">✗</span>
                  <span className="text-[13px] md:text-sm text-zinc-500">No interview prep loops or system design mock reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 text-sm mt-0.5" aria-hidden="true">✗</span>
                  <span className="text-[13px] md:text-sm text-zinc-500">Sending cold resumes to blackhole inbox threads</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Learning with Skillsha (Vibrant) */}
          <article className="bg-white dark:bg-[#0c0c0c] border border-brand-orange/20 dark:border-brand-orange/30 rounded-[32px] p-8 md:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            {/* Backglow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/[0.04] dark:bg-brand-orange/[0.02] rounded-full blur-[80px] pointer-events-none -z-10 group-hover:scale-115 transition-transform duration-500" />
            
            <div>
              <h3 className="font-heading text-xl font-bold text-zinc-950 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span>
                Learning with Skillsha
              </h3>
              <ul className="space-y-4" aria-label="Learning with Skillsha Benefits">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-sm font-bold mt-0.5" aria-hidden="true">✓</span>
                  <span className="text-[13px] md:text-sm text-zinc-800 dark:text-zinc-200 font-semibold">Structured, fast-tracked curriculum</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-sm font-bold mt-0.5" aria-hidden="true">✓</span>
                  <span className="text-[13px] md:text-sm text-zinc-800 dark:text-zinc-200 font-semibold">1-on-1 industry mentor review calls</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-sm font-bold mt-0.5" aria-hidden="true">✓</span>
                  <span className="text-[13px] md:text-sm text-zinc-800 dark:text-zinc-200 font-semibold">8+ Live product builds on cloud servers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-sm font-bold mt-0.5" aria-hidden="true">✓</span>
                  <span className="text-[13px] md:text-sm text-zinc-800 dark:text-zinc-200 font-semibold">Mock reviews with company architects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-sm font-bold mt-0.5" aria-hidden="true">✓</span>
                  <span className="text-[13px] md:text-sm text-zinc-800 dark:text-zinc-200 font-semibold">ATS-optimized engineering profile builders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 text-sm font-bold mt-0.5" aria-hidden="true">✓</span>
                  <span className="text-[13px] md:text-sm text-zinc-800 dark:text-zinc-200 font-semibold">Direct placement pipeline to 350+ partners</span>
                </li>
              </ul>
            </div>
          </article>

        </div>
      </div>

      {/* ── Sub-section 4: Configurable Batches Module ────────────── */}
      <div className="relative overflow-hidden rounded-[32px] border border-brand-orange/20 dark:border-white/5 bg-white/60 dark:bg-[#0c0c0c]/30 backdrop-blur-xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-2xl animate-reveal delay-300 group">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/[0.04] dark:bg-brand-orange/[0.02] rounded-full blur-[80px] pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />

        <div className="mb-8">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 dark:bg-white/5 border border-brand-orange/20 dark:border-white/10 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-orange dark:text-zinc-300">
              Admissions Live
            </span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">
            Upcoming Batch Enrollment
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            Reserve your slot today. Cohorts are limited in size to ensure high mentor bandwidth for all candidates.
          </p>
        </div>

        {/* Details Wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-left">
          <div className="p-4 rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-extrabold">Next Batch</div>
              <div className="text-[13px] md:text-sm font-bold text-zinc-900 dark:text-white">15 September 2026</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-extrabold">Availability</div>
              <div className="text-[13px] md:text-sm font-bold text-zinc-900 dark:text-white">Limited Seats Left</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={triggerCounselingModal}
          className="magnetic-btn w-full sm:w-fit inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold text-base hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(37,99,235,0.35)] cursor-pointer"
        >
          Reserve Your Seat
        </button>
      </div>

    </section>
  );
}
