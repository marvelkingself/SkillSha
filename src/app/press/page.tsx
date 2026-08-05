import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Media | SkillSha",
  description: "Find the latest news, press releases, media assets, and official announcements from SkillSha.",
};

export default function PressMediaPage() {
  const newsItems = [
    {
      date: "May 15, 2026",
      title: "SkillSha Launches First AI-Native Systems cohort in Noida",
      snippet: "Redefining developer curricula to focus exclusively on AI agent orchestration, predictive analysis, and system integrations."
    },
    {
      date: "April 10, 2026",
      title: "Bridging the Technical Gap: 93% of SkillSha Graduates Placed Within 90 Days",
      snippet: "Reports confirm that project-based educational frameworks produce higher immediate workforce output than traditional theoretical programs."
    },
    {
      date: "March 01, 2026",
      title: "SkillSha Welcomes Former OpenAI and Meta Operators to Mentor Network",
      snippet: "Strengthening the practical focus of our programs by bringing in builders actively working on next-generation AI platforms."
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Newsroom</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Press & <span className="text-brand-orange">Media</span>.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Stay up to date with the latest press releases, system updates, company announcements, and brand resources from SkillSha.
          </p>
        </section>

        {/* Press Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left: Press Releases */}
            <div className="lg:col-span-8 space-y-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-zinc-900 dark:text-white tracking-tight mb-6">Latest Announcements</h2>
              <div className="space-y-6">
                {newsItems.map((item, i) => (
                  <article key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 hover:border-brand-orange/40 transition-colors group cursor-pointer">
                    <span className="text-[11px] font-medium text-brand-orange uppercase tracking-wider">{item.date}</span>
                    <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mt-2 mb-3 group-hover:text-brand-orange transition-colors">{item.title}</h3>
                    <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">{item.snippet}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Right: Media Assets & Press Contact */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6">
                <span className="material-symbols-outlined text-[32px] text-brand-orange mb-3">download</span>
                <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white mb-2">Media Kit</h3>
                <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6">
                  Download high-resolution SkillSha brand marks, logos, partner assets, and leadership portraits.
                </p>
                <button className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:scale-[1.02] active:scale-95 transition-all">
                  Download Assets (.ZIP)
                </button>
              </div>

              <div className="bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6">
                <span className="material-symbols-outlined text-[32px] text-brand-orange mb-3">contact_mail</span>
                <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white mb-2">Press Contact</h3>
                <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-4">
                  For press inquiries, interview requests, or speaker invitations, email our media relations desk.
                </p>
                <p className="text-xs font-semibold text-brand-orange">press@skillsha.com</p>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
