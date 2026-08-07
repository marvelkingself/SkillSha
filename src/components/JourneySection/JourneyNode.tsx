"use client";

import React from "react";
import { motion } from "framer-motion";

interface JourneyNodeProps {
  x: number;
  y: number;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  title: string;
}

export const JourneyNode = React.forwardRef<SVGGElement, JourneyNodeProps>(
  ({ x, y, index, isActive, isCompleted, onClick, title }, ref) => {
    // Glow filter ID for uniqueness
    const glowFilterId = `node-glow-${index}`;

    return (
      <g 
        ref={ref}
        className="cursor-pointer select-none"
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`Milestone ${index + 1}: ${title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
      <defs>
        {/* Glow Filter */}
        <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Large Ripple Circles for Active/Completed nodes */}
      {isActive && (
        <>
          <circle
            cx={x}
            cy={y}
            r="28"
            className="fill-brand-orange/5 stroke-brand-orange/20"
            strokeWidth="1"
          />
          <motion.circle
            cx={x}
            cy={y}
            r="24"
            className="fill-none stroke-brand-orange/40"
            strokeWidth="1.5"
            animate={{ r: [16, 32], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          />
          <motion.circle
            cx={x}
            cy={y}
            r="20"
            className="fill-none stroke-brand-orange/30"
            strokeWidth="1"
            animate={{ r: [16, 28], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.7, ease: "easeOut" }}
          />
        </>
      )}

      {/* 2. Completion Ripples */}
      {isCompleted && !isActive && (
        <circle
          cx={x}
          cy={y}
          r="18"
          className="fill-emerald-500/5 stroke-emerald-500/10"
          strokeWidth="1"
        />
      )}

      {/* 3. Outer spinning dashed dial */}
      <motion.circle
        cx={x}
        cy={y}
        r={isActive ? 22 : 18}
        className="fill-none"
        stroke={
          isActive
            ? "url(#activeBorderGrad)"
            : isCompleted
              ? "rgba(16, 185, 129, 0.45)"
              : "rgba(255, 255, 255, 0.12)"
        }
        strokeWidth="1.2"
        strokeDasharray="4 6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, delay: index * 0.5, ease: "linear" }}
        style={{ originX: `${x}px`, originY: `${y}px` }}
      />

      {/* 4. Frosted Glass Inner Ring */}
      <circle
        cx={x}
        cy={y}
        r={isActive ? 16 : 13}
        className="fill-[#080808]/85 stroke-white/[0.08]"
        strokeWidth="1"
      />

      {/* 5. Core Solid Circle with Volumetric Glow */}
      <motion.circle
        cx={x}
        cy={y}
        r={isActive ? 10 : 8.5}
        animate={{
          fill: isActive
            ? "#f97316"
            : isCompleted
              ? "#10b981"
              : "rgba(255, 255, 255, 0.04)",
          stroke: isActive
            ? "#ffffff"
            : isCompleted
              ? "#ffffff"
              : "rgba(255, 255, 255, 0.18)",
        }}
        transition={{ duration: 0.35 }}
        strokeWidth={1.5}
        style={{
          filter: isActive
            ? `url(#${glowFilterId})`
            : isCompleted
              ? "drop-shadow(0 0 5px rgba(16, 185, 129, 0.6))"
              : "none",
        }}
      />

      {/* 5. Center Icon or Step Number */}
      <g transform={`translate(${x - 4}, ${y - 4.5})`}>
        {isCompleted && !isActive ? (
          // Draw checkmark path
          <path
            d="M2.5 4.5 L4.5 6.5 L8.5 2.5"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          // Show step index number
          <text
            x="4.2"
            y="8.5"
            textAnchor="middle"
            className="fill-white font-mono text-[9px] font-bold select-none pointer-events-none"
          >
            {index + 1}
          </text>
        )}
      </g>

      {/* Linear Gradient for Active Node Border */}
      <defs>
        <linearGradient id="activeBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </g>
  );
});

JourneyNode.displayName = "JourneyNode";
