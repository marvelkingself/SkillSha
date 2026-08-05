import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Success Stories | SkillSha",
  description: "Read inspiring stories of how SkillSha students switched careers, built startups, and secured premium developer jobs.",
};

export default function SuccessStoriesPage() {
  const stories = [
    {
      name: "Tushar Gupta",
      before: "Mechanical Engineer",
      after: "AI Engineer at startup",
      quote: "Before joining SkillSha, I had never written a line of Python. The project-first focus forced me to learn the runtime environment, prompting structures, and vector indexes. I built 3 production apps and landed a job before my cohort ended.",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Neha Sharma",
      before: "Freelance Graphic Designer",
      after: "Product Designer at Fintech corp",
      quote: "SkillSha's UI/UX program completely restructured how I thought about design. Moving from layouts to dynamic Framer sites and component architecture changed the game. I doubled my contract rates instantly.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Rohan Kapoor",
      before: "College Dropout",
      after: "SaaS Founder & Lead Dev",
      quote: "The mentors treat you like active coworkers, not students. That agency helped me build and ship a SaaS product to hundreds of users, giving me the confidence to raise pre-seed capital and lead product engineering.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Case Diaries</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Student <span className="text-brand-orange">Success</span> Stories.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Read how our graduates built portfolios, switch careers, and landed jobs from non-technical backgrounds.
          </p>
        </section>

        {/* Stories Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/45 transition-colors group flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden p-[2px] bg-gradient-to-b from-[#7A4B3A] to-[#2E1A14]">
                      <img src={story.img} alt={story.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight">{story.name}</h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{story.before} → <span className="text-brand-orange font-semibold">{story.after}</span></p>
                    </div>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>
                
                <div className="pt-6 mt-6 border-t border-zinc-200/60 dark:border-white/5">
                  <a 
                    href="/courses" 
                    className="text-[12px] font-bold text-brand-orange hover:underline flex items-center gap-1"
                  >
                    <span>Read full interview</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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
