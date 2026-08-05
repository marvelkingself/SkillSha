import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | SkillSha",
  description: "Read technical tutorials, deep-dives into LLM architectures, UI/UX systems, and success stories from SkillSha operators.",
};

export default function BlogPage() {
  const posts = [
    {
      title: "Building Production-Ready AI Agents with Next.js & Vercel AI SDK",
      category: "AI Engineering",
      readTime: "8 min read",
      date: "May 18, 2026",
      desc: "A comprehensive guide on establishing stateful workflows, streaming text responses, and tool calls using Gemini and GPT-4o.",
      author: "Ayaan Malik"
    },
    {
      title: "The Shift to Framer-Level Aesthetics in Modern SaaS Products",
      category: "UI/UX Design",
      readTime: "5 min read",
      date: "May 12, 2026",
      desc: "Why micro-animations, glassmorphism, and interactive feedback systems are becoming the default expectation for consumers in 2026.",
      author: "Ibrahim Khan"
    },
    {
      title: "How to Optimize Next.js App Router for Sub-Second Initial Load Times",
      category: "Full-Stack Dev",
      readTime: "6 min read",
      date: "April 29, 2026",
      desc: "Deep dive into partial pre-rendering (PPR), image optimization, script loading strategies, and database connection pooling.",
      author: "Zaid Rahman"
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Our Publication</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            The <span className="text-brand-orange">Builder</span> Blog.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Articles, building tutorials, product logs, and systems design guides from the SkillSha mentor network.
          </p>
        </section>

        {/* Featured Post Card */}
        <section className="pb-12 border-t border-zinc-200 dark:border-white/5">
          <div className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] overflow-hidden shadow-sm hover:border-brand-orange/45 transition-colors group cursor-pointer grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[250px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" 
                alt="AI generation abstract" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
              />
            </div>
            <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">AI Engineering</span>
                <span className="text-xs text-zinc-400">10 min read</span>
              </div>
              <h2 className="text-[22px] md:text-[28px] font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-brand-orange transition-colors leading-tight">
                Architecting Multi-Agent Systems for Enterprise Database Orchestration
              </h2>
              <p className="text-[14px] text-zinc-500 dark:text-[#9CA3AF] mb-6 leading-relaxed">
                How we built a secure, rate-limited, and human-in-the-loop SQL execution agent that converts natural language questions into database reports safely.
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-200/60 dark:border-white/5">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center font-bold text-brand-orange text-xs">AM</div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Ayaan Malik</p>
                  <p className="text-[10px] text-zinc-400">May 20, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regular Posts Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <h2 className="text-[20px] md:text-[24px] font-bold text-zinc-900 dark:text-white tracking-tight mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <article key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 hover:border-brand-orange/45 transition-colors group cursor-pointer flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-[11px] text-zinc-400">{post.readTime}</span>
                </div>
                <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] mb-6 leading-relaxed line-clamp-3">
                  {post.desc}
                </p>
                <div className="flex items-center gap-2.5 mt-auto pt-4 border-t border-zinc-200/60 dark:border-white/5">
                  <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 text-[10px]">
                    {post.author.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800 dark:text-white leading-none">{post.author}</p>
                    <p className="text-[9px] text-zinc-400 mt-1">{post.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
