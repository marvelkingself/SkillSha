import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Tools Guide | SkillSha",
  description: "Get curated playgrounds, free-tier APIs, frameworks, and tools to build, test, and host AI agents and web products for free.",
};

export default function AIToolsGuidePage() {
  const tools = [
    {
      title: "Google AI Studio & Gemini API",
      category: "LLM Provider",
      freeTier: "15 RPM / 1M tokens per day free",
      desc: "Get access to Gemini 1.5 Pro and Flash with massive 2M token context windows for zero cost using their developer API keys.",
      link: "https://aistudio.google.com"
    },
    {
      title: "Vercel & Next.js",
      category: "Hosting & Frameworks",
      freeTier: "Hobby plan with free TLS, edge functions",
      desc: "Deploy serverless Next.js web applications, prompt endpoints, and vector search pages globally in seconds.",
      link: "https://vercel.com"
    },
    {
      title: "Supabase Vector (pgvector)",
      category: "Database & Vectors",
      freeTier: "2 free projects (500MB database space)",
      desc: "Store text chunk embeddings, run semantic search operations, and manage student credentials using PostgreSQL.",
      link: "https://supabase.com"
    },
    {
      title: "LangChain & LangGraph",
      category: "Agent Frameworks",
      freeTier: "Open-source under MIT License",
      desc: "Orchestrate agentic workflows, cyclical loops, tool-calling structures, and system fallbacks with clean packages.",
      link: "https://langchain.com"
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Builder Kit</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Free <span className="text-brand-orange">AI Tools</span> Guide.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            A curated list of developer APIs, cloud databases, and hosting tiers to build AI agents and web apps at zero expense.
          </p>
        </section>

        {/* Tools Cards Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 md:p-8 hover:border-brand-orange/45 transition-colors group flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">{tool.category}</span>
                    <span className="text-[11px] font-medium text-emerald-500">{tool.freeTier}</span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between">
                  <a 
                    href={tool.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[13px] font-semibold text-zinc-400 group-hover:text-brand-orange transition-colors flex items-center gap-1.5"
                  >
                    <span>Visit tool website</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
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
