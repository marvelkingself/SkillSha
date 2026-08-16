import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Roadmaps | SkillSha",
  description: "Explore step-by-step curriculum maps to become a competent AI Engineer, Full-Stack Developer, or UI/UX designer.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function RoadmapsPage() {
  const roadmaps = [
    {
      title: "AI Systems Engineer",
      duration: "20 Weeks",
      steps: [
        "Python & API Foundations",
        "Prompt Engineering & Vector Databases",
        "RAG Architecture & Document Parsing",
        "Autonomous Agent Orchestration (LangGraph)",
        "Enterprise Deployment & API Rate-limiting"
      ]
    },
    {
      title: "Product Design (UI/UX) Operator",
      duration: "16 Weeks",
      steps: [
        "Figma Mechanics & Auto-Layout",
        "UX Research & User Personas",
        "Component Architectures & Design Systems",
        "Interactive Prototyping & Motion",
        "Developer Hand-off & Framer Deployment"
      ]
    },
    {
      title: "Full-Stack Software Developer",
      duration: "20 Weeks",
      steps: [
        "Modern Javascript & React",
        "Next.js App Router & Server Actions",
        "Database Architecture (Postgres/Prisma)",
        "APIs, Auth (Clerk), and Stripe Checkout",
        "Docker, CI/CD, and AWS Cloud Deployment"
      ]
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Syllabus maps</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Career <span className="text-brand-orange">Roadmaps</span>.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Structured, step-by-step guides showing the projects and languages needed to transition into premium tech jobs.
          </p>
        </section>

        {/* Roadmaps Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/45 transition-colors group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white group-hover:text-brand-orange transition-colors">
                      {roadmap.title}
                    </h3>
                    <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">{roadmap.duration}</span>
                  </div>
                  
                  <div className="space-y-4">
                    {roadmap.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                          {idx + 1}
                        </div>
                        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 mt-8 border-t border-zinc-200/60 dark:border-white/5">
                  <a 
                    href="/courses" 
                    className="w-full text-center block py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
                  >
                    View Class Schedule
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
