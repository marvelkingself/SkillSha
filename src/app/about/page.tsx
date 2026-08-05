import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SkillSha",
  description: "Learn about India's leading AI-native academy, our mission to redefine technical education, and the team driving builder education forward.",
};

export default function AboutUsPage() {
  const pillars = [
    {
      title: "AI-Native Workflows",
      description: "We believe AI isn't just a tool; it's a new runtime. We integrate LLMs, prompt engineering, and automated agents into every discipline.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Project-First Pedagogy",
      description: "No dry slideshows or multiple-choice questions. You learn by building production-ready apps, campaigns, and systems that solve real problems.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Active Operators",
      description: "Our instructors are currently building at top technology startups and industry-leading teams, ensuring you learn state-of-the-art tools and patterns.",
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36 min-h-screen max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 text-center max-w-[900px] mx-auto animate-reveal">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Our Mission</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Redefining <span className="text-brand-orange">Technical</span> Education.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            SkillSha is India&apos;s leading AI-native academy, built to bridge the gap between traditional engineering curricula and modern tech company workflows.
          </p>
        </section>

        {/* Story Section */}
        <section className="py-8 md:py-12 border-t border-zinc-200 dark:border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] border border-zinc-200/80 dark:border-white/5 shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                alt="Builders collaborating" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-[28px] md:text-[36px] font-bold text-zinc-900 dark:text-white tracking-tight mb-5 leading-tight">
                Why SkillSha Exists
              </h2>
              <div className="space-y-4 text-[14px] md:text-[16px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                <p>
                  Traditional degrees focus heavily on syntax and theoretical computer science. Meanwhile, production-level engineering has shifted to high-leverage frameworks, system architecture, and AI-assisted workflows.
                </p>
                <p>
                  We started SkillSha to empower developers, creators, and professionals with active building skills. By focusing entirely on what matters on day one at a modern startup or enterprise, we cut the fluff and speed up path-to-impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="py-16 md:py-24 border-t border-zinc-200 dark:border-white/5">
          <div className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="text-[28px] md:text-[36px] font-bold text-zinc-900 dark:text-white mb-4">Our Core Pillars</h2>
            <p className="text-[14px] md:text-[16px] text-zinc-500 dark:text-[#9CA3AF]">
              Three fundamental ideas shape how we build courses and nurture students.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 md:p-8 flex flex-col hover:border-brand-orange/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6 border border-brand-orange/20">
                  {pillar.icon}
                </div>
                <h3 className="text-[18px] font-semibold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                  {pillar.description}
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
