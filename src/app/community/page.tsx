import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Forum | SkillSha",
  description: "Join the SkillSha builder community. Connect with 5,000+ developer, design, and growth operators, share feedback, and find referrals.",
};

export default function CommunityPage() {
  const initiatives = [
    {
      title: "Interactive Discord Server",
      desc: "Instant text and voice support channels. Share your repositories, request UI feedback, or chat async with active industry mentors.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.196.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
        </svg>
      )
    },
    {
      title: "Weekend Build Jams",
      desc: "Collaborate with other students to build responsive micro-apps and tools in 48 hours. Winners receive custom merchandise and ecosystem credits.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      title: "Job Referral Database",
      desc: "Get access to exclusive job postings and direct referrals from our alumni working inside target companies like Zomato, Razorpay, and Google.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Builder Network</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            The SkillSha <span className="text-brand-orange">Community</span>.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            A network of 5,000+ ambitious developers, UI/UX designers, and tech operators sharing feedback and building products together.
          </p>
        </section>

        {/* Community Initiatives Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initiatives.map((item, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/45 transition-colors group flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6 border border-brand-orange/20">
                    {item.icon}
                  </div>
                  <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                <div className="pt-6 mt-6 border-t border-zinc-200/60 dark:border-white/5">
                  <a 
                    href="https://discord.gg" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full text-center block py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
                  >
                    Join the Space
                  </a>
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
