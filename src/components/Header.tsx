"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CITIES_LIST } from "@/data/cities";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sparkSound, setSparkSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
    }

    setSparkSound(new Audio('/files/audio/spark.wav?v=6'));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const btn = e.currentTarget;
    
    // Add popping animation class
    btn.classList.add('popping');
    setTimeout(() => btn.classList.remove('popping'), 400);

    // Play spark sound & haptic vibration
    if (sparkSound) {
      try {
        sparkSound.currentTime = 0;
        sparkSound.volume = 1.0;
        sparkSound.play().catch(e => console.warn("Audio play failed:", e));
      } catch (e) {}
    }
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }

    // Disable CSS transitions during theme switch to prevent color drag flash
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { transition: none !important; }';
    document.head.appendChild(style);

    const checkDark = root.classList.contains("dark");
    if (checkDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }

    // Force browser repaint to apply transition disable, then remove it
    window.getComputedStyle(style).opacity;
    setTimeout(() => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 50);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-500 pt-5 px-6 lg:px-12">
        <div className={`w-full max-w-[1300px] mx-auto backdrop-blur-xl rounded-full px-6 md:px-8 py-2.5 flex items-center justify-between transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-black/60 border border-zinc-200 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]' 
            : 'bg-white/70 dark:bg-zinc-950/70 border border-zinc-200/50 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
        }`}>
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1 cursor-pointer group transition-transform duration-300 hover:scale-[1.02]">
            <Image src="/files/logo-icon.png" alt="SkillSha Logo" width={34} height={32} priority className="h-8 w-auto object-contain" />
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Skill<span className="text-brand-orange">Sha</span></span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">IT Training Institute</span>
            </div>
          </Link>

          {/* Navigation Links with Elegant Floating Pill Hover & Professional Dropdown */}
          <nav className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
            {/* Programs Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-zinc-100/80 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 cursor-pointer uppercase font-semibold text-xs text-zinc-500 dark:text-zinc-400 border-none outline-none">
                Programs
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full pt-3 w-[780px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Categories Grid */}
                    <div className="col-span-9 grid grid-cols-3 gap-x-4 gap-y-4">
                      
                      {/* Category: Development & AI */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">AI & Development</span>
                        <div className="space-y-1">
                          <Link href="/course/ai-engineering-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">AI Engineering</span>
                          </Link>
                          <Link href="/course/ai-ml-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">AI/ML with Gen AI</span>
                          </Link>
                          <Link href="/course/software-testing-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">Software Testing</span>
                          </Link>
                          <Link href="/course/playwright-automation-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">Playwright Automation</span>
                          </Link>
                        </div>
                      </div>

                      {/* Category: Data & Business */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">Data & Analytics</span>
                        <div className="space-y-1">
                          <Link href="/course/data-science-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">Data Science & AI</span>
                          </Link>
                          <Link href="/course/data-analyst-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">Data Analyst</span>
                          </Link>
                          <Link href="/course/business-analyst-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">Business Analyst</span>
                          </Link>
                        </div>
                      </div>

                      {/* Category: Design & Strategy */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">Design & Marketing</span>
                        <div className="space-y-1">
                          <Link href="/course/digital-marketing-course-with-gen-ai" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-amber-500/[0.04] dark:hover:bg-amber-500/[0.02] border border-amber-500/20 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-amber-500 transition-colors flex items-center gap-1.5">
                              Digital Marketing
                              <span className="px-1 text-[7px] bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded font-extrabold tracking-wider leading-normal">FLAGSHIP</span>
                            </span>
                          </Link>
                          <Link href="/course/ui-ux-design-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">UI/UX Design</span>
                          </Link>
                          <Link href="/course/graphic-design-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">Graphic Designing</span>
                          </Link>
                          <Link href="/course/product-management-course" className="group/item flex flex-col p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors">Product Management</span>
                          </Link>
                        </div>
                      </div>

                      {/* Category: Trading & Somatic */}
                      <div className="col-span-3 pt-3 border-t border-zinc-100 dark:border-white/5 grid grid-cols-2 gap-4">
                        <Link href="/course/algorithmic-trading-course" className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all text-left">
                          <span className="material-symbols-outlined text-brand-orange text-md shrink-0">trending_up</span>
                          <div>
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors block">Algorithmic Trading</span>
                            <span className="text-[9px] text-zinc-400 block normal-case">Quant models & backtesting</span>
                          </div>
                        </Link>
                        <Link href="/course/mental-health-wellness-course" className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-all text-left">
                          <span className="material-symbols-outlined text-brand-orange text-md shrink-0">favorite</span>
                          <div>
                            <span className="text-[11px] font-bold text-zinc-900 dark:text-white group-hover/item:text-brand-orange transition-colors block">Mental Health & Biohacking</span>
                            <span className="text-[9px] text-zinc-400 block normal-case">Circadian & somatic systems</span>
                          </div>
                        </Link>
                      </div>

                    </div>

                    {/* Callout Side Banner */}
                    <div className="col-span-3 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-2xl p-4 flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/20 px-2 py-0.5 rounded-md">Admissions Open</span>
                        <h5 className="text-[11px] font-bold text-zinc-900 dark:text-white mt-2 normal-case">Ready to build?</h5>
                        <p className="text-[9px] text-zinc-500 dark:text-zinc-400 normal-case mt-1 font-normal leading-relaxed">Book a 1:1 career counseling session to find the best track for your goals.</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new Event('openCounselingModal'));
                          }
                        }}
                        className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-brand-orange to-brand-red text-white text-[9px] font-bold tracking-wider uppercase hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                      >
                        Talk to Mentor
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            
            {/* Locations Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-zinc-100/80 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 cursor-pointer uppercase font-semibold text-xs text-zinc-500 dark:text-zinc-400 border-none outline-none">
                Locations
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[280px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] p-2.5 grid grid-cols-2 gap-0.5 text-left normal-case">
                  {CITIES_LIST.map((city) => (
                    <Link key={city.slug} href={`/course/ai-engineering-course/${city.slug}`} className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">{city.name}</Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/placement-report" className="px-4 py-2 rounded-full hover:bg-zinc-100/80 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300">Placements</Link>
            <Link href="/about" className="px-4 py-2 rounded-full hover:bg-zinc-100/80 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300">About</Link>
            <Link href="/blog" className="px-4 py-2 rounded-full hover:bg-zinc-100/80 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300">Blog</Link>
            <Link href="/contact" className="px-4 py-2 rounded-full hover:bg-zinc-100/80 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300">Contact</Link>
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-zinc-100/80 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 cursor-pointer uppercase font-semibold text-xs text-zinc-500 dark:text-zinc-400 border-none outline-none">
                More
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[180px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] p-2.5 flex flex-col gap-0.5 text-left normal-case">
                  <Link href="/courses" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">All Courses</Link>
                  <Link href="/fee-payment" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">Fee Payment</Link>
                  <Link href="/#alumni" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">Alumni</Link>
                  <Link href="/hiring-partners" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">Hiring Partners</Link>
                  <Link href="/#mentors" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">Mentors</Link>
                  <Link href="/events" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">Events</Link>
                  <Link href="/success-stories" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">Success Stories</Link>
                  <Link href="/roadmaps" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">Roadmaps</Link>
                  <Link href="/careers" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all">Careers</Link>
                  <Link href="/login" className="px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-all text-brand-orange">Sign In / Register 👤</Link>
                </div>
              </div>
            </div>

            <Link href="/certificate" className="px-4 py-2 rounded-full text-brand-orange animate-blink hover:bg-brand-orange/10 transition-all duration-300 cursor-pointer font-bold flex items-center gap-1.5 normal-case tracking-normal">
              Download Certificate 🎓
            </Link>
          </nav>

          {/* Actions Bar */}
          <div className="flex items-center gap-4">
            {/* Premium Bulb Toggle */}
            <button onClick={toggleTheme} aria-label="Toggle dark mode" className="bulb-btn relative p-2 rounded-full border border-zinc-200/40 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300">
              <svg className="bulb-icon w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path className="bulb-glass" d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z"/>
                <rect className="bulb-base" x="9" y="18" width="6" height="1.5" rx="0.75"/>
                <rect className="bulb-base" x="9.5" y="20" width="5" height="1.5" rx="0.75"/>
                <line className="bulb-shine" x1="9" y1="8" x2="9" y2="11" strokeLinecap="round" strokeWidth="1.5"/>
                <line className="bulb-shine" x1="11" y1="6.5" x2="11" y2="8" strokeLinecap="round" strokeWidth="1"/>
              </svg>
            </button>
            
            {/* Highly polished brand gradient action button */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('openCounselingModal'));
                }
              }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-red hover:shadow-[0_4px_20px_rgba(37,99,235,0.3)] text-white font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Apply Now
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-4 left-4 right-4 z-40 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border border-zinc-200/50 dark:border-white/5 rounded-2xl px-4 py-2.5 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300">
        <Link href="/" className="flex items-center gap-1 cursor-pointer">
          <Image src="/files/logo-icon.png" alt="SkillSha Logo" width={34} height={32} priority className="h-8 w-auto object-contain" />
          <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">Skill<span className="text-brand-orange">Sha</span></span>
        </Link>
        
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('openCounselingModal'));
              }
            }}
            className="px-3.5 py-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold text-[11px] uppercase tracking-wider active:scale-95 transition-all duration-300"
          >
            Enroll Now
          </button>
          <button onClick={toggleTheme} aria-label="Toggle dark mode" className="bulb-btn relative p-2 rounded-full border border-zinc-200/40 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-white/10 active:scale-95 transition-all duration-300">
            <svg className="bulb-icon w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path className="bulb-glass" d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z"/>
              <rect className="bulb-base" x="9" y="18" width="6" height="1.5" rx="0.75"/>
              <rect className="bulb-base" x="9.5" y="20" width="5" height="1.5" rx="0.75"/>
              <line className="bulb-shine" x1="9" y1="8" x2="9" y2="11" strokeLinecap="round" strokeWidth="1.5"/>
              <line className="bulb-shine" x1="11" y1="6.5" x2="11" y2="8" strokeLinecap="round" strokeWidth="1"/>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
