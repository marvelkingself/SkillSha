"use client";
import React, { useState, useEffect } from 'react';

export default function ApplicationCTA() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) return;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft({ days, hours, mins });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-14 animate-reveal delay-300 max-w-full">
      <div className="border border-zinc-200 dark:border-white/10 rounded-[24px] p-6 md:p-10 lg:p-12 bg-[#0a0f0d] shadow-sm relative overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-40 md:opacity-60 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop" alt="Presentation Scene" className="w-full h-full object-cover mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d] via-[#0a0f0d]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col w-full min-h-[400px]">
          
          <div className="border-l-[1.5px] border-white/20 pl-4 md:pl-5 mb-10 md:mb-12 max-w-[800px]">
            <p className="text-[13px] md:text-[15px] text-zinc-400 font-medium mb-3">AI & Product focus</p>
            <h2 className="text-2xl md:text-3xl lg:text-[38px] font-semibold text-white leading-[1.2] tracking-tight">
              Build real AI products,<br className="hidden md:block" /> launch on product hunt<br className="hidden md:block" /> and get 100 paying<br className="hidden md:block" /> customers
            </h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-5 mb-8 md:mb-12 pb-4 md:pb-0 w-full xl:grid xl:grid-cols-4">
            
            <div className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] xl:w-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-[20px] p-4 flex items-center gap-4 shadow-2xl hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)] transition-all duration-300 group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
                <svg className="w-6 h-6 text-zinc-300 group-hover:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white text-[15px] md:text-[16px] font-semibold leading-tight tracking-tight mb-0.5 whitespace-nowrap">150 Hours AI Curriculum</h3>
                <p className="text-zinc-400 text-[12px] md:text-[13px] leading-snug whitespace-nowrap">From no-code to fine-tuning</p>
              </div>
            </div>

            <div className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] xl:w-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-[20px] p-4 flex items-center gap-4 shadow-2xl hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)] transition-all duration-300 group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
                <svg className="w-6 h-6 text-zinc-300 group-hover:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white text-[15px] md:text-[16px] font-semibold leading-tight tracking-tight mb-0.5 whitespace-nowrap">25+ AI Tools</h3>
                <p className="text-zinc-400 text-[12px] md:text-[13px] leading-snug whitespace-nowrap">That you will gain expertise in</p>
              </div>
            </div>

            <div className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] xl:w-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-[20px] p-4 flex items-center gap-4 shadow-2xl hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)] transition-all duration-300 group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
                <svg className="w-6 h-6 text-zinc-300 group-hover:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white text-[15px] md:text-[16px] font-semibold leading-tight tracking-tight mb-0.5 whitespace-nowrap">Build Automation Agents</h3>
                <p className="text-zinc-400 text-[12px] md:text-[13px] leading-snug whitespace-nowrap">Automating startup workflows</p>
              </div>
            </div>

            <div className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] xl:w-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-[20px] p-4 flex items-center gap-4 shadow-2xl hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)] transition-all duration-300 group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
                <svg className="w-6 h-6 text-zinc-300 group-hover:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white text-[15px] md:text-[16px] font-semibold leading-tight tracking-tight mb-0.5 whitespace-nowrap">Product Building Blocks</h3>
                <p className="text-zinc-400 text-[12px] md:text-[13px] leading-snug whitespace-nowrap">Learn UI, APIs, and databases.</p>
              </div>
            </div>

          </div>

          <div className="mt-auto relative z-10 w-full pt-2 flex flex-col sm:flex-row gap-5 sm:gap-4 items-center sm:items-center justify-between">
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('openCounselingModal'));
                }
              }}
              className="bg-gradient-to-r from-brand-orange to-brand-red text-white font-semibold px-8 py-3.5 rounded-[12px] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 w-full sm:w-auto text-[14px] tracking-wide"
            >
              APPLY NOW
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto gap-3 sm:gap-5 md:ml-auto">
              <div className="flex items-center gap-2 text-zinc-400 text-[11px] uppercase tracking-[0.15em] font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
                Next Cohort Starts
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl w-[52px] h-[52px] backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.15)] relative overflow-hidden group-hover:border-brand-orange/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
                  <div className="text-white font-bold text-[18px] leading-none relative z-10">{timeLeft.days.toString().padStart(2, '0')}</div>
                  <div className="text-zinc-400 text-[9px] uppercase tracking-widest mt-1.5 font-medium relative z-10">Days</div>
                </div>
                <div className="text-zinc-600 font-bold text-[18px] self-center mb-1 animate-pulse">:</div>
                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl w-[52px] h-[52px] backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.15)] relative overflow-hidden group-hover:border-brand-orange/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
                  <div className="text-white font-bold text-[18px] leading-none relative z-10">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-zinc-400 text-[9px] uppercase tracking-widest mt-1.5 font-medium relative z-10">Hrs</div>
                </div>
                <div className="text-zinc-600 font-bold text-[18px] self-center mb-1 animate-pulse">:</div>
                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl w-[52px] h-[52px] backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.15)] relative overflow-hidden group-hover:border-brand-orange/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
                  <div className="text-white font-bold text-[18px] leading-none relative z-10">{timeLeft.mins.toString().padStart(2, '0')}</div>
                  <div className="text-zinc-400 text-[9px] uppercase tracking-widest mt-1.5 font-medium relative z-10">Min</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
