"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube API Integration
  useEffect(() => {
    if (!videoOpen) return;

    const initPlayer = () => {
      const YT = (window as any).YT;
      if (iframeRef.current && YT && YT.Player) {
        playerRef.current = new YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event: any) => {
              if (event.data === 1) {
                setIsPlaying(true);
              } else {
                setIsPlaying(false);
              }
            },
            onReady: () => {
              playerRef.current.playVideo();
            }
          }
        });
      }
    };

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      const previousCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initPlayer();
      };
    } else if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      const previousCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) { }
        playerRef.current = null;
      }
    };
  }, [videoOpen]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Counter logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.stat-counter span[data-target], .stat-counter div[data-target]').forEach(el => {
          const target = +(el.getAttribute('data-target') || 0);
          const suffix = el.getAttribute('data-suffix') || '';
          const decimal = el.getAttribute('data-decimal') === 'true';

          let t0: number | null = null;
          const tick = (ts: number) => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / 1600, 1);
            const current = (1 - Math.pow(1 - p, 3)) * target;
            el.textContent = (decimal ? current.toFixed(1) : Math.floor(current)) + (p === 1 ? suffix : '');
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        observer.disconnect(); // Only run once
      }
    }, { threshold: 0.4 });

    const el = document.getElementById('hero-stats');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="hero" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-reveal active">
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel w-fit mb-4 mt-2 md:mt-0">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">AI-Native Academy</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
            Best IT Training Institute in <span className="text-gradient">Noida</span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
            Learn future-proof skills in AI Engineering, Full-Stack Development, UI/UX Design, and more. Build real, deployed systems with mentors who&apos;ve shipped at OpenAI, Meta, and Stripe. Live cohorts running across Noida, Delhi, and 10+ other cities.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-zinc-700 dark:text-zinc-300 font-medium">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              12 Weeks
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Project-Based
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('openCounselingModal'));
              }
            }}
            className="magnetic-btn relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white font-semibold text-base overflow-hidden transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-fit shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Start Free counseling
          </button>
        </div>

        <div className="relative group perspective-1000 w-full">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-panel p-1 transform transition-all duration-700 hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] border-zinc-200 dark:border-white/10 group-hover:border-brand-orange/50">
            <div
              className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center"
            >
              {videoOpen ? (
                <div className="relative w-full h-full group/video">
                  {/* YouTube Iframe with pointer-events-none */}
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full absolute inset-0 pointer-events-none"
                    src="https://www.youtube.com/embed/sgVJPhMHnys?enablejsapi=1&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0"
                    title="Skillsha | IT Training Institute"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>

                  {/* Custom Interceptor Overlay */}
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
                  >
                    {/* Play/Pause Button Overlay */}
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-transparent border border-white/30 dark:border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-brand-orange/60 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transform ${isPlaying
                        ? "opacity-0 scale-90 group-hover/video:opacity-100 group-hover/video:scale-100"
                        : "opacity-100 scale-100"
                      }`}>
                      {isPlaying ? (
                        /* Pause icon */
                        <svg className="w-6 h-6 md:w-7 md:h-7 text-brand-orange drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        /* Play icon */
                        <svg className="w-6 h-6 md:w-7 md:h-7 text-brand-orange ml-0.5 drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setVideoOpen(true)}
                >
                  {/* <div className="absolute inset-0 bg-[url('/files/hero-placeholder.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"></div> */}

                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{
                      backgroundImage: "url('https://img.youtube.com/vi/sgVJPhMHnys/maxresdefault.jpg')"
                    }}
                  ></div>

                  {/* Play Button Center */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-transparent border border-white/30 dark:border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-brand-orange/60 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-brand-orange ml-0.5 drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-5 right-5 z-10 flex justify-between items-end pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">Build, don&apos;t spectate.</h2>
                      <p className="text-xs text-zinc-300 font-medium">Click to watch video</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof Bar */}
      <section id="hero-stats" className="mt-10 mb-2 animate-reveal delay-100 active">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="stat-counter glass-panel rounded-2xl border border-zinc-200 dark:border-white/8 p-4 md:p-5 text-center hover:border-brand-orange/30 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-0.5" data-target="500" data-suffix="+">0</div>
            <div className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Graduates</div>
          </div>
          <div className="stat-counter glass-panel rounded-2xl border border-zinc-200 dark:border-white/8 p-4 md:p-5 text-center hover:border-brand-orange/30 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-0.5"><span data-target="12" data-suffix="L+">0</span></div>
            <div className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Avg. Package</div>
          </div>
          <div className="stat-counter glass-panel rounded-2xl border border-zinc-200 dark:border-white/8 p-4 md:p-5 text-center hover:border-brand-orange/30 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-0.5"><span data-target="93" data-suffix="%">0</span></div>
            <div className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Placement Rate</div>
          </div>
          <div className="stat-counter glass-panel rounded-2xl border border-zinc-200 dark:border-white/8 p-4 md:p-5 text-center hover:border-brand-orange/30 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-0.5 flex items-center justify-center gap-1">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              <span data-target="4.9" data-suffix="" data-decimal="true">0</span>
            </div>
            <div className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Rating</div>
          </div>
        </div>
      </section>

      {/* Trusted Tech Marquee */}
      <section className="mt-6 animate-reveal delay-100 active max-w-full">
        <div className="border border-zinc-200 dark:border-white/10 rounded-[24px] p-4 md:p-8 bg-white dark:bg-white/[0.02] dark:backdrop-blur-xl shadow-sm transition-colors duration-300 overflow-hidden relative">
          <p className="text-[13px] md:text-[15px] text-zinc-500 dark:text-[#9CA3AF] mb-4 md:mb-5 font-medium pl-1 text-center md:text-left">Trusted Technologies & Industry Ecosystems</p>

          <div className="marquee-track flex gap-3 md:gap-4 select-none">
            {/* Array mapped twice for seamless infinite scroll */}
            {[1, 2].map((group) => (
              <div key={group} className="flex gap-3 md:gap-4">
                <div className="flex items-center justify-center gap-2 md:gap-2.5 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-[14px] border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#161616] shadow-sm hover:scale-[1.02] transition-transform cursor-default flex-shrink-0">
                  <img src="https://www.google.com/s2/favicons?domain=openai.com&sz=128" alt="OpenAI" className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                  <span className="text-[13px] md:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">OpenAI</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-2.5 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-[14px] border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#161616] shadow-sm hover:scale-[1.02] transition-transform cursor-default flex-shrink-0">
                  <img src="https://www.google.com/s2/favicons?domain=google.com&sz=128" alt="Google" className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                  <span className="text-[13px] md:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Google</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-2.5 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-[14px] border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#161616] shadow-sm hover:scale-[1.02] transition-transform cursor-default flex-shrink-0">
                  <img src="https://www.google.com/s2/favicons?domain=canva.com&sz=128" alt="Canva" className="h-4 md:h-6 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-2.5 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-[14px] border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#161616] shadow-sm hover:scale-[1.02] transition-transform cursor-default flex-shrink-0">
                  <img src="https://www.google.com/s2/favicons?domain=meta.com&sz=128" alt="Meta" className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                  <span className="text-[13px] md:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Meta</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-2.5 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-[14px] border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#161616] shadow-sm hover:scale-[1.02] transition-transform cursor-default flex-shrink-0">
                  <img src="https://www.google.com/s2/favicons?domain=microsoft.com&sz=128" alt="Microsoft" className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                  <span className="text-[13px] md:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Microsoft</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-2.5 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-[14px] border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#161616] shadow-sm hover:scale-[1.02] transition-transform cursor-default flex-shrink-0">
                  <img src="https://www.google.com/s2/favicons?domain=stripe.com&sz=128" alt="Stripe" className="h-6 md:h-8 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-2.5 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-[14px] border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#161616] shadow-sm hover:scale-[1.02] transition-transform cursor-default flex-shrink-0">
                  <img src="https://www.google.com/s2/favicons?domain=framer.com&sz=128" alt="Framer" className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" />
                  <span className="text-[13px] md:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Framer</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-2.5 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-[14px] border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#161616] shadow-sm hover:scale-[1.02] transition-transform cursor-default flex-shrink-0">
                  <img src="https://www.google.com/s2/favicons?domain=figma.com&sz=128" alt="Figma" className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" />
                  <span className="text-[13px] md:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Figma</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
