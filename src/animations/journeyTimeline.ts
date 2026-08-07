import { gsap } from "gsap";

interface IntroAnimProps {
  pathRef: React.RefObject<SVGPathElement | null>;
  nodesRef: React.RefObject<(SVGGElement | null)[]>;
  avatarRef: React.RefObject<HTMLDivElement | null>;
  onComplete?: () => void;
}

export function playIntroAnimation({
  pathRef,
  nodesRef,
  avatarRef,
  onComplete,
}: IntroAnimProps) {
  const tl = gsap.timeline({
    onComplete,
  });

  // Reset/Set initial states
  if (avatarRef.current) {
    gsap.set(avatarRef.current, { scale: 0, opacity: 0 });
  }
  
  if (nodesRef.current) {
    nodesRef.current.forEach((node) => {
      if (node) {
        gsap.set(node, { scale: 0, opacity: 0 });
      }
    });
  }

  // 1. Draw SVG Path
  if (pathRef.current) {
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    
    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power3.inOut",
    });
  }

  // 2. Sequentially pop nodes
  if (nodesRef.current && nodesRef.current.length > 0) {
    const validNodes = nodesRef.current.filter((node): node is SVGGElement => node !== null);
    tl.to(
      validNodes,
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.8)",
      },
      "-=1.0" // overlap with path drawing
    );
  }

  // 3. Materialize holographic avatar
  if (avatarRef.current) {
    tl.to(
      avatarRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1.1, 0.6)",
      },
      "-=0.4"
    );
  }

  return tl;
}
