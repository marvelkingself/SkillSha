"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  title: string;
  desc: string;
  badge: string;
  glowColor: string;
}

interface JourneySidebarProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  completedSteps: number[];
  isMoving: boolean;
}

export function JourneySidebar({
  steps,
  activeStep,
  setActiveStep,
  completedSteps,
  isMoving,
}: JourneySidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active item into view on mobile swiper
  useEffect(() => {
    if (activeBtnRef.current && containerRef.current) {
      const container = containerRef.current;
      const button = activeBtnRef.current;
      
      const containerWidth = container.offsetWidth;
      const buttonWidth = button.offsetWidth;
      const buttonLeft = button.offsetLeft;
      
      container.scrollTo({
        left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeStep]);

  return (
    <div className="w-full space-y-4">
      {/* Label for Assistive Tech */}
      <span id="journey-steps-label" className="sr-only">
        Career journey milestones. Select a step to view detailed roadmap.
      </span>

      {/* Desktop Layout: Vertical Stack */}
      <ol 
        className="hidden md:flex flex-col gap-2 w-full"
        aria-labelledby="journey-steps-label"
      >
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isCompleted = completedSteps.includes(idx) && idx < activeStep;
          
          return (
            <li key={idx} className="w-full">
              <button
                ref={isActive ? activeBtnRef : null}
                onClick={() => !isMoving && setActiveStep(idx)}
                disabled={isMoving}
                className={`w-full text-left p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-brand-orange/50 ${
                  isActive
                    ? "border-transparent scale-[1.02]"
                    : "border-zinc-200/80 dark:border-white/5 bg-white/50 dark:bg-[#0c0c0c]/30 hover:border-zinc-300 dark:hover:border-white/10 hover:scale-[1.01]"
                } ${isMoving ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Active Sliding glass pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarPill"
                    className="absolute inset-0 bg-gradient-to-r from-brand-orange/[0.08] to-brand-red/[0.02] dark:from-white/[0.04] dark:to-white/[0.01] border border-brand-orange/30 dark:border-white/10 rounded-xl -z-10 shadow-[0_4px_20px_rgba(249,115,22,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  />
                )}

                <div className="flex items-center gap-3 relative z-10 w-full pr-2">
                  <div className="relative">
                    {/* Number box with morphing shape & active outline */}
                    <motion.div
                      animate={{
                        borderRadius: isActive ? "10px" : "14px",
                        scale: isActive ? 1.05 : 1.0,
                        backgroundColor: isActive 
                          ? "#f97316" // brand-orange
                          : isCompleted 
                            ? "#10b981" // emerald-500
                            : "rgba(255,255,255,0.05)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-7.5 h-7.5 font-mono text-[12px] font-bold flex items-center justify-center border transition-all ${
                        isActive
                          ? "border-brand-orange text-white shadow-[0_0_12px_rgba(249,115,22,0.35)]"
                          : isCompleted
                            ? "border-emerald-500 text-white"
                            : "border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-white/10"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white animate-[draw_0.25s_ease-out]" strokeWidth={3} />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </motion.div>
                    
                    {/* Ripple/pulse effect under active number */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg bg-brand-orange/30 animate-ping -z-10" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[13px] font-bold tracking-tight block truncate transition-colors ${
                        isActive 
                          ? "text-zinc-900 dark:text-white" 
                          : "text-zinc-600 dark:text-[#9CA3AF] group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block truncate font-medium mt-0.5">
                      {step.badge}
                    </span>
                  </div>
                </div>

                <svg
                  className={`w-4 h-4 text-zinc-400 transition-all flex-shrink-0 relative z-10 ${
                    isActive 
                      ? "rotate-90 text-brand-orange translate-x-0.5" 
                      : "group-hover:translate-x-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Mobile Layout: Horizontal Swipeable List */}
      <div 
        ref={containerRef}
        className="flex md:hidden overflow-x-auto pb-4 gap-3 scrollbar-none snap-x snap-mandatory px-1 w-full"
        aria-labelledby="journey-steps-label"
      >
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isCompleted = completedSteps.includes(idx) && idx < activeStep;
          
          return (
            <button
              key={idx}
              ref={isActive ? activeBtnRef : null}
              onClick={() => !isMoving && setActiveStep(idx)}
              disabled={isMoving}
              className={`snap-center flex-shrink-0 min-w-[210px] max-w-[240px] text-left p-3.5 rounded-xl border flex items-center gap-3 snap-always relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-orange ${
                isActive
                  ? "border-brand-orange/45 bg-gradient-to-r from-brand-orange/[0.04] to-transparent shadow-md"
                  : "border-zinc-200/80 dark:border-white/5 bg-white/50 dark:bg-[#0c0c0c]/40"
              }`}
            >
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center border transition-all ${
                    isActive
                      ? "bg-brand-orange border-brand-orange text-white"
                      : isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-brand-orange/30 animate-ping -z-10" />
                )}
              </div>

              <div className="min-w-0">
                <div
                  className={`text-[13px] font-bold tracking-tight truncate ${
                    isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                  {step.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
