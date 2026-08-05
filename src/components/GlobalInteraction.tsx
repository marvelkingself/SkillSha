"use client";

import { useEffect } from "react";

export default function GlobalInteraction() {
  useEffect(() => {
    // 1. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.01 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-reveal').forEach((el) => {
      observer.observe(el);
    });

    // MutationObserver to observe dynamically added elements (e.g. after Suspense resolves)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.classList && el.classList.contains('animate-reveal')) {
              observer.observe(el);
            }
            el.querySelectorAll('.animate-reveal').forEach((child) => {
              observer.observe(child);
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // 2. Ambient Floating Orbs Mouse Parallax Tracking
    const orbs = document.querySelectorAll('.glow-orb') as NodeListOf<HTMLElement>;
    const handleMouseMoveOrbs = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((orb, i) => {
        const factor = i === 0 ? 40 : -40;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    if (orbs.length > 0) {
      window.addEventListener('mousemove', handleMouseMoveOrbs, { passive: true });
    }

    // 3. Interactive Cursor Glow Spotlight (interpolated spring)
    const glow = document.getElementById('interactive-bg-glow');
    let animationFrameId: number;
    let handleMouseMoveGlow: (e: MouseEvent) => void;

    if (glow && window.matchMedia('(pointer: fine)').matches) {
      let mouseX = 0, mouseY = 0;
      let glowX = 0, glowY = 0;

      glow.classList.remove('opacity-0');
      glow.classList.add('opacity-100');

      const innerGlow = glow.firstElementChild as HTMLElement;

      handleMouseMoveGlow = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };
      window.addEventListener('mousemove', handleMouseMoveGlow, { passive: true });

      const updateGlow = () => {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        if (innerGlow) {
          innerGlow.style.left = `${glowX}px`;
          innerGlow.style.top = `${glowY}px`;
        }

        animationFrameId = requestAnimationFrame(updateGlow);
      };
      updateGlow();
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      if (orbs.length > 0) {
        window.removeEventListener('mousemove', handleMouseMoveOrbs);
      }
      if (glow && handleMouseMoveGlow) {
        window.removeEventListener('mousemove', handleMouseMoveGlow);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return null;
}
