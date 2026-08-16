import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Mentors from "@/components/Mentors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Mentors | SkillSha",
  description: "Learn from top operators who have built products at OpenAI, Meta, Stripe, Framer, and Github. Live mentor reviews, Q&As, and support.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function MentorsPage() {
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Expert Instructors</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Learn from <span className="text-brand-orange">Active</span> Operators.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Our mentors don&apos;t read from slides. They are currently building systems and products at companies like OpenAI, Meta, Stripe, and Framer.
          </p>
        </section>

        {/* Mentors Showcase Section */}
        <div className="py-6 border-t border-zinc-200 dark:border-white/5">
          <Mentors />
        </div>

        {/* Mentorship Structure Section */}
        <section className="py-16 border-t border-zinc-200 dark:border-white/5 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-[28px] md:text-[34px] font-bold text-zinc-900 dark:text-white mb-5 tracking-tight">
                How Mentorship Works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 text-brand-orange font-bold text-[18px]">1</div>
                  <div>
                    <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white mb-1.5">Weekly Live Sessions</h3>
                    <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                      Attend interactive masterclasses, watch live build walkthroughs, and participate in collaborative debugging sessions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 text-brand-orange font-bold text-[18px]">2</div>
                  <div>
                    <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white mb-1.5">Async Code & Design Reviews</h3>
                    <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                      Submit your projects and receive screen-recorded loom feedback and pull-request comments directly from industry experts.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 text-brand-orange font-bold text-[18px]">3</div>
                  <div>
                    <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white mb-1.5">Exclusive Discord Channels</h3>
                    <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                      Chat directly with mentors, ask technical questions, seek advice on your startup ideas, and explore career referrals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full"></div>
              <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mb-4">Want to mentor builders?</h3>
              <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6">
                We are always looking for senior developers, product designers, growth marketers, and engineering leaders to join our mentor network. Make a difference in the next generation of builders.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-[13px] font-semibold tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
              >
                Apply as a Mentor
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
