"use client";

import React from "react";

interface JourneyPathProps {
  isMobile: boolean;
  pathRef: React.RefObject<SVGPathElement | null>;
  glowPathRef: React.RefObject<SVGPathElement | null>;
}

// Fixed path strings to ensure pixel-perfect curves and calculations
export const DESKTOP_PATH = "M 45 295 C 90 295, 120 280, 120 255 C 120 230, 90 220, 90 195 C 90 170, 250 190, 250 165 C 250 140, 170 120, 170 95 C 170 70, 230 45, 295 45";
export const MOBILE_PATH = "M 120 440 C 80 410, 60 390, 60 360 C 60 330, 180 310, 180 280 C 180 250, 70 230, 70 200 C 70 170, 170 150, 170 120 C 170 90, 140 70, 120 50";

export function JourneyPath({
  isMobile,
  pathRef,
  glowPathRef,
}: JourneyPathProps) {
  const pathD = isMobile ? MOBILE_PATH : DESKTOP_PATH;

  return (
    <g>
      <defs>
        {/* Glow and Neon Blur Filters for paths */}
        <filter id="path-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
        </filter>
        <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* 1. Underlying Inactive Track (Grey dash/glowing backdrop) */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="dark:stroke-white/[0.06] stroke-zinc-200"
      />
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="3"
        strokeDasharray="4,6"
        strokeLinecap="round"
        className="dark:stroke-white/[0.04] stroke-zinc-300"
      />

      {/* 2. Glow overlay (large blur) */}
      <path
        ref={glowPathRef}
        d={pathD}
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#path-blur)"
        opacity="0.4"
        style={{
          transition: "stroke-dashoffset 0.15s ease-out",
        }}
      />

      {/* 3. Foreground Illuminated Completed Track */}
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.15s ease-out",
        }}
      />

      {/* 4. Live Energy Dash flow line overlay */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth="1.8"
        strokeDasharray="10 32"
        strokeLinecap="round"
        style={{
          animation: "dash-flow 4.5s linear infinite",
        }}
        className="opacity-75 dark:opacity-90 pointer-events-none"
      />

      {/* Global CSS inject for keyframes */}
      <style jsx global>{`
        @keyframes dash-flow {
          0% {
            stroke-dashoffset: 168;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </g>
  );
}
