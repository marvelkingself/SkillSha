import React from "react";

export default function WhyChooseSkillsha() {
  return (
    <section id="why-choose-skillsha" className="mt-20 mb-24 max-w-full px-1 md:px-0">
      {/* Redesigned Premium Section Header */}
      <div className="text-center max-w-[800px] mx-auto mb-16 animate-reveal">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 dark:bg-white/5 border border-brand-orange/20 dark:border-white/10 mb-5">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-orange dark:text-zinc-300">
            Pedagogical Framework
          </span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-5 leading-[1.1]">
          Designed for <span className="text-gradient">Builders</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          We strip away the academic overhead and focus entirely on the workflows, systems, and practical tools used by high-performance tech companies.
        </p>
      </div>

      {/* Futuristic Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20 animate-reveal delay-100">
        
        {/* Card 1: Live Projects (2/3 Width) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 lg:p-10 flex flex-col md:flex-row justify-between gap-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500 group relative overflow-hidden">
          {/* Subtle Backglow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/[0.03] dark:bg-brand-orange/[0.015] rounded-full blur-[80px] pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="flex flex-col justify-between max-w-sm md:w-[45%]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 dark:bg-brand-orange/15 flex items-center justify-center mb-6 border border-brand-orange/20 text-brand-orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                Shipped Code, Not Theory
              </h3>
              <p className="text-[13px] md:text-sm text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6 font-medium">
                Work on live, production-grade products deployed to cloud infrastructures. Build an active commit history on GitHub that proves you can build real software under team workflows.
              </p>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1">
              Live Projects <span className="text-zinc-300 dark:text-zinc-700">|</span> Real-world Deployments
            </span>
          </div>

          {/* Interactive Mock Code Terminal */}
          <div className="flex-1 md:w-[50%] h-[240px] md:h-auto bg-[#070708] border border-zinc-200/50 dark:border-white/10 rounded-2xl p-5 font-mono text-[11px] text-zinc-400 overflow-hidden relative shadow-lg flex flex-col justify-between group-hover:border-brand-orange/30 transition-colors duration-500">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold select-none">bash - skillsha-deploy</span>
            </div>

            {/* Terminal Body */}
            <div className="space-y-2.5 leading-normal flex-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-600 font-bold">~</span>
                <span className="text-zinc-100">git push origin main</span>
              </div>
              <div className="text-zinc-500">Enumerating objects: 18, done.</div>
              <div className="text-zinc-500">Writing objects: 100% (18/18), 1.43 KiB ...</div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>✓ auth-session verified [jose jwt]</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>✓ db-migrations synced [supabase postgres]</span>
              </div>
              <div className="flex items-center gap-2 text-brand-orange font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping"></span>
                <span>deploying to vercel-edge...</span>
              </div>
            </div>

            {/* Build Stats Footer */}
            <div className="border-t border-white/[0.06] pt-3 mt-auto flex items-center justify-between text-[9px] text-zinc-600 font-bold">
              <span>REF: MAIN-48F5DFB</span>
              <span className="text-emerald-500">✓ VERCEL ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Card 2: Placement Assistance (1/3 Width) */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 lg:p-10 flex flex-col justify-between hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500 group relative overflow-hidden h-full min-h-[380px]">
          {/* Backglow */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange/[0.02] dark:bg-brand-orange/[0.01] rounded-full blur-[60px] pointer-events-none -z-10" />

          <div>
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 dark:bg-brand-orange/15 flex items-center justify-center mb-6 border border-brand-orange/20 text-brand-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-3">
              Direct Referral Pipeline
            </h3>
            <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6 font-medium">
              Graduate straight into our network. Get targeted resume optimization, strict mock reviews with active engineers, and direct referrals to our 350+ partner platforms.
            </p>
          </div>

          {/* Overlapping Mock Kanban / Pipeline items */}
          <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-white/5 mt-auto">
            <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] transform -translate-y-1 hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">Portfolio & Resume Audit</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-500">DONE</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] transform -translate-y-0.5 hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">System Design Mock</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-500">PASSED</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-brand-orange/20 bg-brand-orange/[0.03] shadow-[0_4px_20px_rgba(37,99,235,0.06)]">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping"></span>
                <span className="text-[12px] font-bold text-zinc-900 dark:text-white">Active Referral matching</span>
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-orange px-2 py-0.5 bg-brand-orange/10 rounded-md">PIPELINE</span>
            </div>
          </div>
        </div>

        {/* Card 3: Certified Trainers (1/3 Width) */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 lg:p-10 flex flex-col justify-between hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500 group relative overflow-hidden h-full min-h-[380px]">
          {/* Backglow */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange/[0.02] dark:bg-brand-orange/[0.01] rounded-full blur-[60px] pointer-events-none -z-10" />

          <div>
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 dark:bg-brand-orange/15 flex items-center justify-center mb-6 border border-brand-orange/20 text-brand-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-3">
              Led by Industry Operators
            </h3>
            <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6 font-medium">
              Learn directly from active software architects, senior engineers, and growth directors who ship production systems daily instead of outdated course syllabus academics.
            </p>
          </div>

          {/* Overlapping Company Logos representing industry origins */}
          <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-zinc-100 dark:border-white/5">
            <p className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-zinc-400 dark:text-zinc-500 mb-2">OPERATORS PREVIOUSLY AT</p>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-zinc-800 dark:text-zinc-300">
              <div className="p-2.5 rounded-xl border border-zinc-200/60 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.04] transition-colors flex flex-col items-center gap-1.5 justify-center">
                <img loading="lazy" src="https://www.google.com/s2/favicons?domain=google.com&sz=128" alt="Google" className="w-5 h-5 rounded-md" />
                <span className="text-[10px] leading-none">Google</span>
              </div>
              <div className="p-2.5 rounded-xl border border-zinc-200/60 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.04] transition-colors flex flex-col items-center gap-1.5 justify-center">
                <img loading="lazy" src="https://www.google.com/s2/favicons?domain=zoho.com&sz=128" alt="Zoho" className="w-5 h-5 rounded-md" />
                <span className="text-[10px] leading-none">Zoho</span>
              </div>
              <div className="p-2.5 rounded-xl border border-zinc-200/60 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.04] transition-colors flex flex-col items-center gap-1.5 justify-center">
                <img loading="lazy" src="https://www.google.com/s2/favicons?domain=zomato.com&sz=128" alt="Zomato" className="w-5 h-5 rounded-md" />
                <span className="text-[10px] leading-none">Zomato</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Flexible Batches (2/3 Width) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 lg:p-10 flex flex-col md:flex-row justify-between gap-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.08)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500 group relative overflow-hidden">
          {/* Backglow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/[0.03] dark:bg-brand-orange/[0.015] rounded-full blur-[80px] pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="flex flex-col justify-between max-w-sm md:w-[45%]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 dark:bg-brand-orange/15 flex items-center justify-center mb-6 border border-brand-orange/20 text-brand-orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                Engineered for Your Schedule
              </h3>
              <p className="text-[13px] md:text-sm text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6 font-medium">
                Choose week day, weekend, or specialized night schedules tailored for working professionals, full-time university students, and active developers.
              </p>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1">
              Flexible Batches <span className="text-zinc-300 dark:text-zinc-700">|</span> Weekday & Weekend Slots
            </span>
          </div>

          {/* Interactive Schedule matrix representation */}
          <div className="flex-1 md:w-[50%] bg-[#080809] border border-zinc-200/50 dark:border-white/10 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group-hover:border-brand-orange/30 transition-colors duration-500 shadow-md">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400">Class timings</span>
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 text-[9px] font-extrabold">
                <span className="px-2 py-0.5 rounded-md bg-brand-orange text-white">LIVE</span>
                <span className="px-2 py-0.5 text-zinc-500 uppercase tracking-widest">RECORDED</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 transition-colors duration-300">
                <span className="text-[11px] font-bold text-zinc-300">Weekday Track</span>
                <span className="text-[10px] font-extrabold text-brand-orange">Mon - Thu (8 - 10 PM)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 transition-colors duration-300">
                <span className="text-[11px] font-bold text-zinc-300">Weekend Track</span>
                <span className="text-[10px] font-extrabold text-brand-orange">Sat - Sun (10 AM - 1 PM)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 transition-colors duration-300">
                <span className="text-[11px] font-bold text-zinc-300">Self-Paced Track</span>
                <span className="text-[10px] font-extrabold text-emerald-500">24/7 Sandbox + Mentor Support</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
