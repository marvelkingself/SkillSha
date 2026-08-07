"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    step: "01",
    title: "Training",
    desc: "Live, mentor-led SkillSha sessions covering fundamentals to advanced concepts, with recordings available for every class.",
    icon: (
      <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Projects",
    desc: "Build deployed, portfolio-ready projects at every milestone — real work you can showcase to hiring managers.",
    icon: (
      <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Interview Prep",
    desc: "Get resume reviews, mock interviews, and system-design practice with SkillSha mentors before any real interview.",
    icon: (
      <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Placement",
    desc: "Receive direct referrals into SkillSha's 500+ hiring partner network, supported until you sign your offer.",
    icon: (
      <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.093 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
    ),
  },
];

export default function PlacementProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackPathRef = useRef<SVGLineElement>(null);
  const glowPathRef = useRef<SVGLineElement>(null);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileConnectorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackPathRef.current || !glowPathRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const line = trackPathRef.current!;
      const glow = glowPathRef.current!;
      const length = line.getTotalLength();
      const fills = fillRefs.current.filter((m): m is HTMLDivElement => m !== null);
      const numbers = numberRefs.current.filter((m): m is HTMLSpanElement => m !== null);
      const mobileFills = mobileFillRefs.current.filter((m): m is HTMLDivElement => m !== null);
      const mobileNumbers = mobileNumberRefs.current.filter((m): m is HTMLSpanElement => m !== null);
      const mobileConnectors = mobileConnectorRefs.current.filter((m): m is HTMLDivElement => m !== null);

      gsap.set([line, glow], { strokeDasharray: length, strokeDashoffset: reduceMotion ? 0 : length });

      if (reduceMotion) {
        // Skip scroll-driven drawing; show the completed state directly.
        gsap.set([...fills, ...mobileFills], { opacity: 1, scale: 1 });
        gsap.set([...numbers, ...mobileNumbers], { color: "#fff" });
        gsap.set(mobileConnectors, { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      tl.to([line, glow], { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

      fills.forEach((fill, i) => {
        const at = i / (fills.length - 1);
        const start = Math.max(0, Math.min(at, 1 - 0.14));
        tl.to(
          [fill, mobileFills[i]],
          { opacity: 1, scale: 1, duration: 0.14, ease: "back.out(2.2)" },
          start
        ).to(
          [numbers[i], mobileNumbers[i]],
          { color: "#fff", duration: 0.08 },
          start
        );
        if (mobileConnectors[i - 1]) {
          tl.to(mobileConnectors[i - 1], { scaleY: 1, duration: 0.14, ease: "none" }, start);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="placement-process" ref={sectionRef} className="mb-28 animate-reveal max-w-[1200px] mx-auto px-4 md:px-0">
      <div className="mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3 justify-center md:justify-start">
          <h2 className="text-[24px] md:text-4xl lg:text-[40px] font-semibold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
            From Zero to Placed — SkillSha&apos;s Career Pipeline
          </h2>
          <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm w-max mx-auto md:mx-0">Process</span>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[15px]">Our career support pipeline, end to end.</p>
      </div>

      {/* Scroll-driven progress track connecting the four steps (desktop only) — sits directly on top of the card row it belongs to */}
      <div className="hidden lg:block relative pt-2">
        <svg className="absolute inset-x-0 top-[18px] w-full h-3 overflow-visible pointer-events-none" viewBox="0 0 100 2" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stepperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-brand-orange)" />
              <stop offset="100%" stopColor="var(--color-brand-red)" />
            </linearGradient>
            <filter id="stepperGlow" x="-20%" y="-800%" width="140%" height="1700%">
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
          </defs>
          <line x1="0" y1="1" x2="100" y2="1" className="stroke-zinc-200 dark:stroke-white/10" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <line ref={glowPathRef} x1="0" y1="1" x2="100" y2="1" stroke="url(#stepperGrad)" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" filter="url(#stepperGlow)" opacity="0.45" />
          <line ref={trackPathRef} x1="0" y1="1" x2="100" y2="1" stroke="url(#stepperGrad)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="relative grid grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-8 h-8 rounded-full bg-white dark:bg-[#0c0c0c] border-2 border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-sm overflow-hidden">
                <div
                  ref={(el) => { fillRefs.current[i] = el; }}
                  className="absolute inset-0 rounded-full bg-brand-orange opacity-0 scale-50"
                />
                <span
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="relative z-10 text-[12px] font-bold text-zinc-400 dark:text-zinc-500"
                >
                  {i + 1}
                </span>
              </div>
              {/* Connector tick docking the marker into its card below */}
              <div className="w-px h-4 bg-zinc-200 dark:bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-4 gap-5">
        {STEPS.map((s, i) => (
          <div key={i} className="p-5 md:p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <span className="text-[11px] font-black text-zinc-300 dark:text-zinc-700 tracking-wide">{s.step}</span>
            </div>
            <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-1.5">{s.title}</h3>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Mobile/tablet: vertical scroll-driven path down the left of the stacked steps */}
      <div className="lg:hidden flex flex-col">
        {STEPS.map((s, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="relative w-8 h-8 rounded-full bg-white dark:bg-[#0c0c0c] border-2 border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
                <div
                  ref={(el) => { mobileFillRefs.current[i] = el; }}
                  className="absolute inset-0 rounded-full bg-brand-orange opacity-0 scale-50"
                />
                <span
                  ref={(el) => { mobileNumberRefs.current[i] = el; }}
                  className="relative z-10 text-[12px] font-bold text-zinc-400 dark:text-zinc-500"
                >
                  {i + 1}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 my-1 bg-zinc-200 dark:bg-white/10 relative overflow-hidden min-h-[2.5rem]">
                  <div
                    ref={(el) => { mobileConnectorRefs.current[i] = el; }}
                    className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-brand-orange to-brand-red origin-top scale-y-0"
                  />
                </div>
              )}
            </div>
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] flex-1 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  {s.icon}
                </div>
                <span className="text-[11px] font-black text-zinc-300 dark:text-zinc-700 tracking-wide">{s.step}</span>
              </div>
              <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-1.5">{s.title}</h3>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
