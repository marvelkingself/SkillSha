import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hiring Partners | SkillSha",
  description: "Hire world-class technical talent, developers, UI/UX designers, and product leaders trained in modern AI-native engineering workflows.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function HiringPartnersPage() {
  const statistics = [
    { value: "500+", label: "Hiring Partners" },
    { value: "14 Days", label: "Avg. Time to Hire" },
    { value: "93%", label: "Placement Success" },
    { value: "₹8.9 LPA", label: "Avg. Starting Package" }
  ];

  const valueProps = [
    {
      title: "Vetted Builders",
      description: "Our students go through intensive project-based building, ensuring they have deep execution skills, not just theory.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "AI-First Mindset",
      description: "Every SkillSha graduate is trained to leverage AI workflows (LLMs, prompt engineering, automation) to write code and deliver output 3x faster.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "No Placement Fees",
      description: "We charge zero placement fees. Our goal is simply to bridge the gap and help companies connect with top-tier technical operators.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Talent Network</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Hire Vetted <span className="text-brand-orange">Technical</span> Builders.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Connect with ready-to-deploy developers, design operators, and product builders trained in modern AI-native development workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/contact" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-sm font-semibold hover:scale-[1.02] transition-transform shadow-md shadow-brand-orange/20">
              Request Candidate Portfolios
            </a>
            <a href="/contact" className="px-6 py-3.5 rounded-xl bg-white dark:bg-white/5 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-white/10 transition-colors">
              Post a Job Opening
            </a>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 text-center">
                <div className="text-[28px] md:text-[36px] font-bold text-brand-orange tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-zinc-500 dark:text-[#9CA3AF] font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Prop Cards */}
        <section className="py-16 md:py-24 border-t border-zinc-200 dark:border-white/5">
          <div className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="text-[28px] md:text-[36px] font-bold text-zinc-900 dark:text-white mb-4">Why Companies Hire From SkillSha</h2>
            <p className="text-[14px] md:text-[16px] text-zinc-500 dark:text-[#9CA3AF]">
              We train students to build production systems that match modern software standards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueProps.map((prop, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 md:p-8 flex flex-col hover:border-brand-orange/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6 border border-brand-orange/20">
                  {prop.icon}
                </div>
                <h3 className="text-[18px] font-semibold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
                  {prop.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
