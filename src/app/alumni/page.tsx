import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Alumni, { AlumniCompanies } from "@/components/Alumni";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni Network | SkillSha",
  description: "Connect with SkillSha graduates working at Google, Amazon, Microsoft, Meta, and leading high-growth startups globally.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function AlumniPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36 min-h-screen max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Page Hero */}
        <section className="relative py-12 md:py-20 text-center max-w-[900px] mx-auto animate-reveal">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Global Network</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Our Alumni <span className="text-brand-orange">Build</span> the Future.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            From funding startups to working directly with founders, our graduates are driving impact across tech hubs worldwide.
          </p>
        </section>

        {/* Alumni Base Component */}
        <div className="py-6 border-t border-zinc-200 dark:border-white/5">
          <Alumni />
        </div>

        {/* Company Logos & Placement Stats */}
        <div className="py-6 border-t border-zinc-200 dark:border-white/5">
          <AlumniCompanies />
        </div>

        {/* Success Stories Callout */}
        <section className="py-16 border-t border-zinc-200 dark:border-white/5 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-[28px] md:text-[34px] font-bold text-zinc-900 dark:text-white mb-5 tracking-tight">
                An Active Community For Life
              </h2>
              <p className="text-[14px] md:text-[16px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6">
                Graduating from SkillSha isn&apos;t the end of your journey. It&apos;s your entry ticket to a lifelong network of peers, mentors, and partners. Our alumni host regional meetups, share career opportunities, collaborate on open-source products, and co-found new ventures together.
              </p>
              <div className="flex gap-8">
                <div>
                  <h4 className="text-[22px] font-bold text-zinc-900 dark:text-white">1,200+</h4>
                  <p className="text-xs text-zinc-400 mt-1">Active Alumni</p>
                </div>
                <div>
                  <h4 className="text-[22px] font-bold text-zinc-900 dark:text-white">15+</h4>
                  <p className="text-xs text-zinc-400 mt-1">Founder Teams</p>
                </div>
                <div>
                  <h4 className="text-[22px] font-bold text-zinc-900 dark:text-white">10+</h4>
                  <p className="text-xs text-zinc-400 mt-1">Cities Represented</p>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-8 relative overflow-hidden">
              <span className="material-symbols-outlined text-[48px] text-brand-orange/45 mb-4">hub</span>
              <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mb-3">Join the Builder Ranks</h3>
              <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6">
                Are you looking to accelerate your growth, build high-leverage products, and build alongside top creators and engineers? Explore our project-based cohorts today.
              </p>
              <a 
                href="/courses" 
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-[13px] font-semibold tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-brand-orange/20"
              >
                Explore Programs
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
