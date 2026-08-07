"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, GraduationCap, ChevronRight } from "lucide-react";

interface Step {
  title: string;
  desc: string;
  badge: string;
  glowColor: string;
  duration?: string;
  skills?: string[];
  status?: string;
}

interface JourneyDetailsCardProps {
  step: Step;
  onClickCTA: (e: React.MouseEvent) => void;
}

export function JourneyDetailsCard({
  step,
  onClickCTA,
}: JourneyDetailsCardProps) {
  const duration = step.duration || "2 Weeks";
  const skills = step.skills || ["Systems", "Architecture", "Clean Code"];
  const status = step.status || "On-Track";

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={step.title}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="w-full h-[340px] bg-slate-950/45 dark:bg-[#080808]/40 border border-white/10 dark:border-white/5 rounded-3xl p-5 md:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between"
      >
        {/* Sleek Dynamic Backglow inside the card */}
        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${step.glowColor} rounded-full blur-[70px] pointer-events-none -z-10 opacity-30`} />

        {/* Top: Header with badge and status */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-brand-orange bg-brand-orange/15 px-2.5 py-1 rounded-md">
            {step.badge}
          </span>
          <span className="flex items-center gap-1 text-[9px] font-extrabold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {status}
          </span>
        </div>

        {/* Middle: Title and Description */}
        <div className="space-y-2 my-2">
          <h3 className="font-heading text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
            {step.title}
          </h3>
          <p className="text-[12px] text-zinc-400 leading-relaxed font-medium line-clamp-3 md:line-clamp-2">
            {step.desc}
          </p>
        </div>

        {/* Bottom: Metrics & CTA button */}
        <div className="space-y-4 pt-3.5 border-t border-white/[0.05]">
          <div className="flex flex-col gap-2">
            {/* Duration Metric */}
            <div className="flex items-center gap-2 text-zinc-400 font-medium text-[11px]">
              <Clock className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span>Duration: <strong className="text-zinc-200">{duration}</strong></span>
            </div>

            {/* Skills Metric */}
            <div className="flex items-start gap-2 text-zinc-400 font-medium text-[11px]">
              <GraduationCap className="w-3.5 h-3.5 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 3).map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="flex items-center gap-1 px-2 py-0.5 bg-white/5 dark:bg-white/[0.02] border border-white/5 rounded-md text-[8.5px] text-zinc-300 font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-orange/60" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA Button with diagonal shine sweep animation */}
          <button
            onClick={onClickCTA}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-[10px] font-extrabold tracking-widest uppercase hover:scale-[1.02] active:scale-[0.97] transition-all shadow-[0_4px_15px_rgba(249,115,22,0.2)] cursor-pointer overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out"
          >
            <span className="relative z-10">Explore Modules</span>
            <ChevronRight className="w-4 h-4 relative z-10" strokeWidth={3.5} />
          </button>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
