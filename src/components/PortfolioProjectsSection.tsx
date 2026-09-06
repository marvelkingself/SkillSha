"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface PortfolioProjectsSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

interface MilestoneItem {
  id: number;
  labelLine1: string;
  labelLine2?: string;
  fullTitle: string;
  description: string;
  offsetClass: string;
  stemHeightClass: string;
  isHighlight?: boolean;
  icon: React.ReactNode;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: 1,
    labelLine1: "Live",
    labelLine2: "classes",
    fullTitle: "Live Classes",
    description: "Interactive sessions led by industry practitioners",
    offsetClass: "",
    stemHeightClass: "h-10",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
        <rect width="14" height="12" x="2" y="6" rx="2" />
      </svg>
    ),
  },
  {
    id: 2,
    labelLine1: "Weekly",
    labelLine2: "assignment",
    fullTitle: "Weekly Assignment",
    description: "Hands-on coding drills & graded milestone tasks",
    offsetClass: "md:-translate-y-4",
    stemHeightClass: "h-16",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a1 1 0 0 0 1 1h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    ),
  },
  {
    id: 3,
    labelLine1: "Mentor",
    labelLine2: "support",
    fullTitle: "Mentor Support",
    description: "1:1 guidance, code reviews & doubt solving",
    offsetClass: "md:-translate-y-8",
    stemHeightClass: "h-24",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 4,
    labelLine1: "Real-world",
    labelLine2: "project",
    fullTitle: "Real-World Project",
    description: "Build production-grade applications from scratch",
    offsetClass: "md:-translate-y-12",
    stemHeightClass: "h-32",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L8.6 3.3A2 2 0 0 0 6.9 2.5H4a2 2 0 0 0-2 2v13.5a2 2 0 0 0 2 2Z" />
        <circle cx="12" cy="13" r="2" />
      </svg>
    ),
  },
  {
    id: 5,
    labelLine1: "Portfolio",
    fullTitle: "Portfolio",
    description: "GitHub repositories & live deployed applications",
    offsetClass: "md:-translate-y-16",
    stemHeightClass: "h-40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 6,
    labelLine1: "Resume",
    fullTitle: "Resume",
    description: "ATS-optimized resume & professional tech profile",
    offsetClass: "md:-translate-y-20",
    stemHeightClass: "h-48",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 15h.01" />
        <path d="M16 15h.01" />
        <path d="M8 15h.01" />
        <path d="M9 11h6" />
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a1 1 0 0 0 1 1h4" />
      </svg>
    ),
  },
  {
    id: 7,
    labelLine1: "Mock",
    labelLine2: "interview",
    fullTitle: "Mock Interview",
    description: "Technical, system design & behavioral rounds",
    offsetClass: "md:-translate-y-24",
    stemHeightClass: "h-56",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 8,
    labelLine1: "Get",
    labelLine2: "Hired",
    fullTitle: "Job Preparation",
    description: "Direct hiring partner access & placement offers",
    offsetClass: "md:-translate-y-28",
    stemHeightClass: "h-60",
    isHighlight: true,
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z" />
      </svg>
    ),
  },
];

export default function PortfolioProjectsSection({
  title = "More Than Classes — A Complete Roadmap to Become Job-Ready",
  subtitle = "We don’t just provide live classes — we follow a structured, career-focused learning roadmap designed to make students job-ready. From fundamental concepts and hands-on learning to real-world projects, portfolio building, resume preparation, mock interviews, and job preparation, every step is designed to build practical, industry-relevant skills. With continuous mentor support and the right learning path, students gain the skills, confidence, and experience needed to become job-ready and make their journey toward employment easier.",
  badge = "CAREER PATHWAY",
  className = "",
}: PortfolioProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        if (progressLineRef.current) {
          gsap.set(progressLineRef.current, { width: "100%" });
        }
        gsap.set(".milestone-stem", { scaleY: 1 });
        gsap.set(".milestone-dot", { scale: 1 });
        return;
      }

      // Animate desktop horizontal progress line & stems on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (progressLineRef.current) {
        tl.to(
          progressLineRef.current,
          {
            width: "100%",
            duration: 1.2,
            ease: "power2.inOut",
          },
          0
        );
      }

      tl.from(
        ".milestone-stem",
        {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.15
      );

      tl.from(
        ".milestone-dot",
        {
          scale: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        0.25
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio-projects"
      ref={containerRef}
      className={`mt-12 sm:mt-16 mb-16 sm:mb-20 animate-reveal delay-200 w-full relative ${className}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Skillsha Clean Light Glassmorphism Card (Desktop) */
            .pp-glass-card {
              background: rgba(255, 255, 255, 0.92);
              backdrop-filter: blur(24px);
              -webkit-backdrop-filter: blur(24px);
              border: 1px solid rgba(226, 232, 240, 0.8);
              box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.06);
            }
            .dark .pp-glass-card {
              background: rgba(15, 23, 42, 0.82);
              border-color: rgba(255, 255, 255, 0.08);
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }

            /* Skillsha Royal Blue & Indigo 3D Icon Tile Styling */
            .pp-icon-3d {
              background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
              box-shadow: 
                0 10px 20px -5px rgba(79, 70, 229, 0.15),
                0 4px 6px -2px rgba(15, 23, 42, 0.04),
                inset 0 2px 4px rgba(255, 255, 255, 1);
              border: 1px solid rgba(203, 213, 225, 0.8);
              color: #4f46e5;
              display: flex !important;
              visibility: visible !important;
              opacity: 1 !important;
            }
            .dark .pp-icon-3d {
              background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
              box-shadow: 
                0 10px 20px -5px rgba(0, 0, 0, 0.5),
                0 4px 6px -2px rgba(0, 0, 0, 0.3),
                inset 0 2px 4px rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              color: #818cf8;
            }

            .pp-icon-3d-active,
            .group:hover .pp-icon-3d {
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
              color: #ffffff !important;
              box-shadow: 
                0 12px 24px -6px rgba(29, 78, 216, 0.4),
                inset 0 2px 4px rgba(255, 255, 255, 0.3) !important;
              border: none !important;
            }

            /* Skillsha Soft Blue Background Wave */
            .pp-wave-3d {
              background: linear-gradient(180deg, rgba(239, 246, 255, 0) 0%, rgba(219, 234, 254, 0.6) 100%);
              clip-path: path("M 0 160 Q 250 120, 450 135 T 850 50 T 1200 70 L 1200 350 L 0 350 Z");
            }
            .dark .pp-wave-3d {
              background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(30, 58, 138, 0.22) 100%);
            }

            @media (max-width: 768px) {
              .pp-wave-3d {
                clip-path: none;
                background: linear-gradient(180deg, rgba(239, 246, 255, 0) 0%, rgba(219, 234, 254, 0.5) 100%);
              }
              .dark .pp-wave-3d {
                background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(30, 58, 138, 0.2) 100%);
              }
            }
          `,
        }}
      />

      {/* Top Heading Section (Balanced across all screen sizes) */}
      <div className="text-center mb-8 sm:mb-10 px-4">
        <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[11px] sm:text-xs font-bold text-blue-700 dark:text-blue-400 tracking-wider uppercase shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          {badge}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 sm:mt-4 font-medium text-xs sm:text-sm md:text-base max-w-3xl md:max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-blue-100/60 dark:bg-blue-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* MOBILE EXPERIENCE (< 768px): Refined, iOS-Native Vertical Timeline Flow */}
      {/* ========================================================================= */}
      <div className="block md:hidden px-3 sm:px-4">
        <div className="relative rounded-[2rem] p-4 sm:p-5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
          {/* iOS Top Bar Pill / Status */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200/70 dark:border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-cyan-400">
                8 Step Pathway
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded-full">
              Structured Timeline
            </span>
          </div>

          {/* Vertical Steps List */}
          <div className="space-y-2">
            {MILESTONES.map((item, index) => {
              const isHighlight = !!item.isHighlight;
              const isLast = index === MILESTONES.length - 1;

              return (
                <React.Fragment key={`mobile-${item.id}`}>
                  {/* iOS Interactive Step Card */}
                  <div
                    className={`relative flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98] ${
                      isHighlight
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-md shadow-blue-500/20 border border-blue-400/40"
                        : "bg-slate-50/90 dark:bg-white/[0.04] hover:bg-slate-100/90 dark:hover:bg-white/[0.07] border border-slate-200/70 dark:border-white/[0.06] shadow-xs"
                    }`}
                  >
                    {/* 3D-styled Squircle Icon Tile */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                        isHighlight
                          ? "bg-white/20 text-white shadow-inner border border-white/30"
                          : "bg-white dark:bg-zinc-800 text-blue-600 dark:text-cyan-400 shadow-sm border border-slate-200/80 dark:border-white/10"
                      }`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className={`text-[10px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 rounded ${
                            isHighlight
                              ? "bg-white/25 text-white"
                              : "bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300"
                          }`}
                        >
                          Step 0{item.id}
                        </span>
                        {isHighlight && (
                          <span className="text-[10px] font-extrabold text-cyan-200 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping"></span>
                            Career Goal
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-[14px] sm:text-[15px] font-bold leading-tight truncate ${
                          isHighlight
                            ? "text-white"
                            : "text-zinc-900 dark:text-zinc-100"
                        }`}
                      >
                        {item.fullTitle}
                      </h4>
                      <p
                        className={`text-[11.5px] sm:text-xs leading-snug mt-0.5 line-clamp-1 ${
                          isHighlight
                            ? "text-blue-100"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Right Arrow / Completion Indicator */}
                    <div className="shrink-0 flex items-center justify-center pl-1">
                      {isHighlight ? (
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-200/70 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-zinc-400">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clean Vertical Connecting Spine & Mini Directional Arrow */}
                  {!isLast && (
                    <div className="flex items-center justify-center py-0.5">
                      <div className="flex flex-col items-center">
                        <div className="w-[1.5px] h-3 bg-gradient-to-b from-blue-500 to-indigo-500 dark:from-cyan-400 dark:to-blue-500 rounded-full" />
                        <svg
                          className="w-3 h-3 text-indigo-500 dark:text-cyan-400 -mt-1"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path d="M6 9.5L2 5.5L2.7 4.8L6 8.1L9.3 4.8L10 5.5L6 9.5Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* iOS Bottom Summary Bar */}
          <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-white/[0.08] flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-zinc-400 px-1">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Complete Job-Ready Roadmap
            </span>
            <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500">
              START → FINISH
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP EXPERIENCE (>= 768px): UNCHANGED Glassmorphism Wave & 8-Column Grid */}
      {/* ========================================================================= */}
      <div className="hidden md:block pp-glass-card relative w-full max-w-7xl mx-auto p-6 sm:p-12 rounded-[2.5rem] overflow-hidden z-10">
        {/* Brand Header Pill Inside Card */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 shadow-xs text-xs font-bold text-blue-700 dark:text-blue-400 tracking-wider uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          {badge}
        </div>

        <div className="relative mt-4 pt-8 pb-6">
          {/* Wave Accent */}
          <div className="pp-wave-3d absolute bottom-0 left-0 w-full h-72 pointer-events-none" />

          {/* Horizontal Progress Line (Desktop) */}
          <div className="hidden md:block absolute bottom-8 left-0 right-0 h-[4px] bg-slate-200/80 dark:bg-zinc-800 rounded-full">
            <div
              ref={progressLineRef}
              id="progress-line"
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-full w-0"
            />
          </div>

          {/* 8 Milestones Grid */}
          <div className="relative z-10 grid grid-cols-8 gap-2 items-end">
            {MILESTONES.map((item) => {
              const isHighlight = !!item.isHighlight;
              return (
                <div
                  key={item.id}
                  className={`milestone flex flex-col items-center text-center cursor-pointer group ${item.offsetClass}`}
                >
                  {/* 3D Icon Tile */}
                  <div
                    className={`pp-icon-3d ${
                      isHighlight ? "pp-icon-3d-active" : ""
                    } w-12 h-12 rounded-2xl items-center justify-center mb-3 transition-all duration-300 transform group-hover:scale-105`}
                  >
                    {item.icon}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`text-xs sm:text-sm transition-colors ${
                      isHighlight
                        ? "font-extrabold text-blue-700 dark:text-cyan-400"
                        : "font-bold text-slate-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    }`}
                  >
                    {item.labelLine1}
                    {item.labelLine2 && (
                      <>
                        <br />
                        {item.labelLine2}
                      </>
                    )}
                  </span>

                  {/* Desktop Rising Stem */}
                  <div
                    className={`milestone-stem w-[2px] ${item.stemHeightClass} bg-gradient-to-b from-blue-300 dark:from-blue-500 to-slate-300 dark:to-zinc-700 my-2 origin-bottom hidden md:block`}
                  />

                  {/* Desktop Dot */}
                  <div
                    className={`milestone-dot ${
                      isHighlight
                        ? "w-4 h-4 rounded-full bg-cyan-500 border-2 border-white dark:border-zinc-900 shadow-md shadow-cyan-500/50"
                        : "w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white dark:border-zinc-900 shadow-xs"
                    } z-10 hidden md:block`}
                  />
                </div>
              );
            })}
          </div>

          {/* Footer Labels (Desktop) */}
          <div
            id="footer-labels"
            className="hidden md:flex justify-between text-xs tracking-widest font-extrabold text-slate-400 dark:text-zinc-500 mt-2 px-2 border-t border-slate-200/80 dark:border-zinc-800 pt-3"
          >
            <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span> START
            </span>
            <span className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              FINISH <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
