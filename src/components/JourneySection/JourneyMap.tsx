"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { JourneyPath, DESKTOP_PATH, MOBILE_PATH } from "./JourneyPath";
import { JourneyNode } from "./JourneyNode";
import { JourneyAvatar } from "./JourneyAvatar";
import { playIntroAnimation } from "@/animations/journeyTimeline";

interface Step {
  title: string;
  desc: string;
  badge: string;
  glowColor: string;
  duration?: string;
  skills?: string[];
  status?: string;
}

interface JourneyMapProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  completedSteps: number[];
  isMoving: boolean;
  setIsMoving: (moving: boolean) => void;
}

// Nodes coordinate system mapping
export const DESKTOP_NODES = [
  { x: 45, y: 295 },
  { x: 120, y: 255 },
  { x: 90, y: 195 },
  { x: 250, y: 165 },
  { x: 170, y: 95 },
  { x: 295, y: 45 },
];

export const MOBILE_NODES = [
  { x: 120, y: 440 },
  { x: 60, y: 360 },
  { x: 180, y: 280 },
  { x: 70, y: 200 },
  { x: 170, y: 120 },
  { x: 120, y: 50 },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

export function JourneyMap({
  steps,
  activeStep,
  setActiveStep,
  completedSteps,
  isMoving,
  setIsMoving,
}: JourneyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(SVGGElement | null)[]>([]);
  const avatarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState({ width: 340, height: 340 });
  const [avatarPos, setAvatarPos] = useState({ x: 45, y: 295, angle: 0 });
  const [isIntroPlaying, setIsIntroPlaying] = useState<boolean>(true);

  // Responsive switch & Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setDimensions({ width: 240, height: 500 });
      } else {
        setIsMobile(false);
        setDimensions({ width: 340, height: 340 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nodes = isMobile ? MOBILE_NODES : DESKTOP_NODES;

  // Initialize nodes Ref array
  useEffect(() => {
    nodesRef.current = nodesRef.current.slice(0, nodes.length);
  }, [nodes]);

  // Particle list and animation loop
  const particlesRef = useRef<Particle[]>([]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(updateParticles);
    };

    animId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Trigger celebration particle burst
  const triggerBurst = (x: number, y: number, colorGrad: string) => {
    const colors = colorGrad.includes("orange") 
      ? ["#f97316", "#fdba74", "#ef4444", "#ffffff"] 
      : colorGrad.includes("red") 
        ? ["#ef4444", "#f87171", "#ec4899", "#ffffff"]
        : ["#10b981", "#34d399", "#3b82f6", "#ffffff"];

    const newParticles: Particle[] = [];
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // slight upward float
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.5 + Math.random() * 3,
        alpha: 1.0,
        decay: 0.015 + Math.random() * 0.02,
      });
    }
    particlesRef.current.push(...newParticles);
  };

  // Pre-calculate path offset values for milestones on mount/resize
  const [pathOffsets, setPathOffsets] = useState<number[]>([]);
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const offsets: number[] = [];

    nodes.forEach((node) => {
      let minDistance = Infinity;
      let closestOffset = 0;
      const samples = 300;

      for (let i = 0; i <= samples; i++) {
        const offset = (i / samples) * totalLength;
        const pt = path.getPointAtLength(offset);
        const dist = Math.hypot(pt.x - node.x, pt.y - node.y);

        if (dist < minDistance) {
          minDistance = dist;
          closestOffset = offset;
        }
      }
      offsets.push(closestOffset);
    });

    setPathOffsets(offsets);

    // Initial positioning of avatar
    const startPt = path.getPointAtLength(offsets[activeStep] || 0);
    setAvatarPos({ x: startPt.x, y: startPt.y, angle: 0 });

    // Set paths' progress drawing
    const activeOffset = offsets[activeStep] || 0;
    gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: totalLength - activeOffset });
    if (glowPathRef.current) {
      gsap.set(glowPathRef.current, { strokeDasharray: totalLength, strokeDashoffset: totalLength - activeOffset });
    }
  }, [nodes, dimensions]);

  // Page-load Intro Animation trigger
  useEffect(() => {
    if (pathOffsets.length === 0) return;

    setIsIntroPlaying(true);
    const tl = playIntroAnimation({
      pathRef,
      nodesRef,
      avatarRef,
      onComplete: () => {
        setIsIntroPlaying(false);
        // Sync active stroke dash offset
        const path = pathRef.current;
        if (path) {
          const totalLength = path.getTotalLength();
          const activeOffset = pathOffsets[activeStep] || 0;
          gsap.set(path, { strokeDashoffset: totalLength - activeOffset });
          if (glowPathRef.current) {
            gsap.set(glowPathRef.current, { strokeDashoffset: totalLength - activeOffset });
          }
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [pathOffsets]);

  // Track previous step to handle step navigation animations
  const prevStepRef = useRef<number>(0);

  // Avatar path traversal animation
  useEffect(() => {
    if (isIntroPlaying || pathOffsets.length === 0 || !pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const startOffset = pathOffsets[prevStepRef.current] || 0;
    const endOffset = pathOffsets[activeStep] || 0;

    const animObj = { offset: startOffset };
    setIsMoving(true);

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsMoving(false);
        prevStepRef.current = activeStep;
        
        // Trigger explosion burst at node
        const activeNode = nodes[activeStep];
        triggerBurst(activeNode.x, activeNode.y, steps[activeStep].glowColor);
      },
    });

    // 1. Move Avatar
    timeline.to(animObj, {
      offset: endOffset,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        const pt = path.getPointAtLength(animObj.offset);
        
        // Calculate tangent angle for head turns
        const delta = 1.5;
        const isForward = endOffset >= startOffset;
        const queryOffset = isForward 
          ? Math.min(totalLength, animObj.offset + delta)
          : Math.max(0, animObj.offset - delta);
          
        const nextPt = path.getPointAtLength(queryOffset);
        
        const angleRad = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x);
        let angleDeg = (angleRad * 180) / Math.PI;

        // Apply a slight dampening rotation based on moving state
        // If moving backwards, avatar doesn't flip entirely upside down
        if (!isForward) {
          angleDeg += 180;
        }

        setAvatarPos({ x: pt.x, y: pt.y, angle: angleDeg });

        // Sync drawing path behind avatar
        gsap.set(path, { strokeDashoffset: totalLength - animObj.offset });
        if (glowPathRef.current) {
          gsap.set(glowPathRef.current, { strokeDashoffset: totalLength - animObj.offset });
        }
      },
    });
  }, [activeStep, pathOffsets, isIntroPlaying]);

  // Camera Pan and Zoom positions based on active node
  const activeNode = nodes[activeStep] || { x: 40, y: 180 };
  const cameraScale = isMobile ? 1.05 : 1.15;
  const cameraX = dimensions.width / 2 - activeNode.x * cameraScale;
  const cameraY = dimensions.height / 2 - activeNode.y * cameraScale;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[340px] bg-[#030303] border border-white/5 dark:border-white/[0.03] rounded-[32px] overflow-hidden shadow-2xl flex items-center justify-center group"
    >
      {/* 1. Cinematic Background Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Floating background gradient light rays */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-brand-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Camera Viewport Wrapper */}
      <motion.div
        animate={{
          x: cameraX,
          y: cameraY,
          scale: cameraScale,
        }}
        transition={{
          type: "spring",
          stiffness: 85,
          damping: 20,
        }}
        className="relative origin-center select-none"
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        {/* SVG Maps Canvas (Path lines and nodes) */}
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className="absolute inset-0 z-10 overflow-visible"
        >
          {/* Glowing bezier paths */}
          <JourneyPath
            isMobile={isMobile}
            pathRef={pathRef}
            glowPathRef={glowPathRef}
          />

          {/* Milestone Nodes */}
          {nodes.map((node, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = completedSteps.includes(idx);
            return (
              <JourneyNode
                key={idx}
                x={node.x}
                y={node.y}
                index={idx}
                isActive={isActive}
                isCompleted={isCompleted}
                onClick={() => !isMoving && setActiveStep(idx)}
                title={steps[idx].title}
                ref={(el) => {
                  nodesRef.current[idx] = el;
                }}
              />
            );
          })}
        </svg>

        {/* Canvas for rendering high performance particles explosion */}
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 z-20 pointer-events-none overflow-visible"
        />

        {/* Dynamic Holographic Avatar */}
        <JourneyAvatar
          ref={avatarRef}
          isMoving={isMoving}
          angle={avatarPos.angle}
          style={{
            left: avatarPos.x,
            top: avatarPos.y,
          }}
        />

      </motion.div>
    </div>
  );
}
