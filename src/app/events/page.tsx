import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webinars & Events | SkillSha",
  description: "Join live technical webinars, system build walkthroughs, and Q&A events hosted by OpenAI, Meta, and Stripe operators.",
};

export default function EventsPage() {
  const events = [
    {
      title: "Building & Deploying Custom GPT-4o Voice Agents",
      date: "Thursday, May 28 • 7:00 PM IST",
      speaker: "Ayaan Malik (AI Systems Operator)",
      status: "Upcoming",
      desc: "Learn to handle real-time voice streaming pipelines, system instructions, and dynamic tool calls safely."
    },
    {
      title: "Design Systems in Figma: Managing Auto-Layout & Theme Tokens",
      date: "Saturday, June 02 • 4:00 PM IST",
      speaker: "Ibrahim Khan (Product Designer)",
      status: "Upcoming",
      desc: "A hands-on workshop on establishing responsive component tokens, variable definitions, and dev handoff sheets."
    },
    {
      title: "How to Build and Deploy a SaaS from scratch in 3 Hours",
      date: "Recorded Session",
      speaker: "Zaid Rahman (Full-Stack Operator)",
      status: "Recorded",
      desc: "Step-by-step walkthrough of scaffolding Next.js, database models, Clerk authentication, and Stripe payments."
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Live Workshops</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Webinars & <span className="text-brand-orange">Events</span>.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Interactive masterclasses, build walkthroughs, and career Q&As hosted by active engineering and design operators.
          </p>
        </section>

        {/* Events List */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <div className="space-y-6">
            {events.map((event, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between hover:border-brand-orange/45 transition-colors group"
              >
                <div className="flex-1 md:pr-10 mb-6 md:mb-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      event.status === 'Upcoming' ? 'text-brand-orange bg-brand-orange/10' : 'text-zinc-400 bg-zinc-100 dark:bg-white/5'
                    }`}>
                      {event.status}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">{event.date}</span>
                  </div>
                  <h3 className="text-[18px] md:text-[21px] font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-brand-orange transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs md:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Hosted by {event.speaker}</p>
                  <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">{event.desc}</p>
                </div>
                
                <div className="shrink-0">
                  {event.status === 'Upcoming' ? (
                    <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-brand-orange/20">
                      Reserve My Seat (Free)
                    </button>
                  ) : (
                    <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors">
                      Watch Recording
                    </button>
                  )}
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
