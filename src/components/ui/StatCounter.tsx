"use client";

import { useEffect, useState, useRef } from "react";

interface StatCounterProps {
  target: number;
  suffix: string;
  decimal?: boolean;
  label: string;
  hasStar?: boolean;
}

export default function StatCounter({
  target,
  suffix,
  decimal = false,
  label,
  hasStar = false,
}: StatCounterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setDisplayValue("0");
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let t0: number | null = null;
          const tick = (ts: number) => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / 1600, 1);
            const current = (1 - Math.pow(1 - p, 3)) * target;

            const formatted = decimal ? current.toFixed(1) : Math.floor(current).toString();
            setDisplayValue(formatted + (p === 1 ? suffix : ""));

            if (p < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isMounted, target, suffix, decimal]);

  const serverValue = (decimal ? target.toFixed(1) : Math.floor(target).toString()) + suffix;

  return (
    <div
      ref={containerRef}
      className="stat-counter glass-panel rounded-2xl border border-zinc-200 dark:border-white/8 p-4 md:p-5 text-center hover:border-brand-orange/30 transition-all duration-300"
    >
      <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-0.5 flex items-center justify-center gap-1">
        {hasStar && (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )}
        <span>{isMounted ? displayValue : serverValue}</span>
      </div>
      <div className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
