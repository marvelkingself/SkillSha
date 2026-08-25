import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | SkillSha",
  description: "Explore detailed product build logs, marketing funnel optimizations, and codebase case studies shipped by SkillSha builders.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function CaseStudiesPage() {
  const cases = [
    {
      title: "How a Data Science Student Built an End-to-End ML Project From Scratch",
      metrics: "Placement-Ready Portfolio",
      category: "AI & Data Science",
      desc: "A walkthrough of how one of our Data Science cohort students learned data cleaning, model building, and deployment — turning classroom concepts into a working, portfolio-ready machine learning application.",
      impact: "Completed a full project pipeline and added it directly to their placement portfolio."
    },
    {
      title: "Running a Real Ad Campaign — Lessons From Our Digital Marketing Cohort",
      metrics: "Live Campaign Experience",
      category: "Digital Marketing",
      desc: "How our marketing students planned targeted audience segments, tested ad creatives, and analyzed performance metrics as part of hands-on, mentor-guided campaign training.",
      impact: "Gained hands-on experience with real campaign planning and analytics tools."
    },
    {
      title: "From Manual Testing to Automation — A Student's Testing Journey",
      metrics: "Industry-Standard Tooling",
      category: "Software & Automation Testing",
      desc: "A breakdown of how a Software Testing student progressed from manual test cases to writing automated test scripts using industry-standard tools taught in the SkillSha curriculum.",
      impact: "Built working automation scripts using tools used by real QA teams."
    }
  ];

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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Real Impact</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Proven <span className="text-brand-orange">Success</span> Stories.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            In-depth breakdowns of real projects, career switches, and campaigns built by SkillSha students during and after their training.
          </p>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <div className="grid grid-cols-1 gap-8">
            {cases.map((item, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/45 transition-colors group flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">{item.category}</span>
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">{item.metrics}</span>
                  </div>
                  <h3 className="text-[18px] md:text-[22px] font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-brand-orange transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-semibold text-xs md:text-sm">
                    <span className="material-symbols-outlined text-[18px] text-emerald-500">trending_up</span>
                    <span>Result: {item.impact}</span>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center md:border-l md:border-zinc-200/60 dark:border-white/5 md:pl-10">
                  <button className="w-full md:w-auto px-5 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold tracking-wide hover:scale-[1.02] active:scale-95 transition-all">
                    Read Build Log
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
