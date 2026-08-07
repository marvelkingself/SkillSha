"use client";

import React from "react";
import { motion } from "framer-motion";

interface JourneyAvatarProps {
  isMoving: boolean;
  angle?: number; // path angle in degrees for tilting in movement direction
  style?: React.CSSProperties;
}

export const JourneyAvatar = React.forwardRef<HTMLDivElement, JourneyAvatarProps>(
  ({ isMoving, angle = 0, style }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute w-14 h-14 -left-7 -top-7 pointer-events-none z-30 select-none origin-center"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          ...style,
        }}
      >
        {/* Hologram Ground Shadow/Base Ring */}
        <div className="absolute top-[44px] left-[11px] w-8 h-2.5 bg-brand-orange/15 rounded-full blur-[1px] border border-brand-orange/30 flex items-center justify-center">
          <div className="w-5 h-1 bg-brand-orange/40 rounded-full animate-ping" />
        </div>

        {/* Hologram Projector Light Ray Cone */}
        <svg 
          className="absolute top-[18px] left-[19px] w-[16px] h-[28px] text-brand-orange/15 pointer-events-none z-10" 
          viewBox="0 0 20 25"
        >
          <polygon points="10,0 0,25 20,25" fill="currentColor" />
          <line x1="10" y1="0" x2="10" y2="25" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="0.8" strokeDasharray="2 3" />
        </svg>

        {/* Floating Avatar Body */}
        <motion.div
          animate={{
            y: isMoving ? [-3, 3, -3] : [-5, 5, -5],
            rotateY: isMoving ? [0, 15, -15, 0] : [0, 8, -8, 0],
            skewX: isMoving ? [-2, 2, -2] : [0, 0, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: isMoving ? 0.35 : 2.8,
              ease: "easeInOut",
            },
            rotateY: {
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
            },
            skewX: {
              repeat: Infinity,
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            rotate: angle, // Tilts in the direction of path movement
            transition: "rotate 0.12s ease-out",
          }}
        >
          {/* Holographic Glowing Outer Blur Orb */}
          <div className="absolute inset-1.5 bg-gradient-to-tr from-brand-orange/50 via-brand-red/30 to-blue-500/40 rounded-full blur-[10px] opacity-75 animate-pulse" />

          {/* Student Silhouette / Capsule Structure */}
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] border-2 border-brand-orange/80 shadow-[0_0_25px_rgba(249,115,22,0.55),inset_0_0_12px_rgba(249,115,22,0.2)] flex items-center justify-center overflow-hidden">
            {/* Inner holographic scanlines */}
            <div 
              className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.15)_1px,transparent_1px)] bg-[size:100%_4px]"
              style={{
                animation: "scanline 1.8s linear infinite",
              }}
            />

            {/* Glowing Hologram Icon (Silhouette head and shoulders) */}
            <svg
              className="w-5.5 h-5.5 text-brand-orange/90 drop-shadow-[0_0_6px_rgba(249,115,22,0.7)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Silhouette head */}
              <circle cx="12" cy="7.5" r="3.5" />
              {/* Silhouette shoulders */}
              <path d="M12 13.5c-4 0-7 2-7 4.5v1h14v-1c0-2.5-3-4.5-7-4.5z" />
            </svg>
            
            {/* Hologram Light Ray from bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-brand-orange/40 via-brand-red/10 to-transparent pointer-events-none" />
          </div>

          {/* Holographic Orbit Rings with 3D Ellipse Particle Nodes */}
          <div className="absolute w-13 h-13 border border-brand-orange/15 rounded-full rotate-x-[75deg] rotate-y-[15deg] animate-[spin_10s_linear_infinite] pointer-events-none flex items-center justify-center">
            <span className="absolute top-0 w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_#f97316] animate-pulse" />
          </div>
          <div className="absolute w-11 h-11 border border-blue-500/15 rounded-full rotate-x-[55deg] rotate-y-[-25deg] animate-[spin_7s_linear_infinite_reverse] pointer-events-none flex items-center justify-center">
            <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
          </div>
        </motion.div>

        {/* Global Keyframes CSS Inject for Scanline */}
        <style jsx global>{`
          @keyframes scanline {
            0% { background-position: 0 0; }
            100% { background-position: 0 100%; }
          }
        `}</style>
      </div>
    );
  }
);

JourneyAvatar.displayName = "JourneyAvatar";
