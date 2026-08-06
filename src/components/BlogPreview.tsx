import Link from "next/link";

const posts = [
  {
    title: "Building Production-Ready AI Agents with Next.js & Vercel AI SDK",
    category: "AI Engineering",
    readTime: "8 min read",
    desc: "A comprehensive guide on establishing stateful workflows, streaming text responses, and tool calls using Gemini and GPT-4o.",
  },
  {
    title: "The Shift to Framer-Level Aesthetics in Modern SaaS Products",
    category: "UI/UX Design",
    readTime: "5 min read",
    desc: "Why micro-animations, glassmorphism, and interactive feedback systems are becoming the default expectation for consumers in 2026.",
  },
  {
    title: "How to Optimize Next.js App Router for Sub-Second Initial Load Times",
    category: "Full-Stack Dev",
    readTime: "6 min read",
    desc: "Deep dive into partial pre-rendering (PPR), image optimization, script loading strategies, and database connection pooling.",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog-preview" className="mb-28 animate-reveal max-w-[1200px] mx-auto px-4 md:px-0">
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3 justify-center md:justify-start">
            <h2 className="text-[24px] md:text-4xl lg:text-[40px] font-semibold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
              From the Builder Blog
            </h2>
            <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm w-max mx-auto md:mx-0">Resources</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[15px]">Tutorials, career guides, and course comparisons from the mentor network.</p>
        </div>
        <Link href="/blog" className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-orange hover:gap-2.5 transition-all whitespace-nowrap">
          View all articles
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link
            key={i}
            href="/blog"
            className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 hover:border-brand-orange/45 transition-colors group flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">{post.category}</span>
              <span className="text-[11px] text-zinc-400">{post.readTime}</span>
            </div>
            <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>
            <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed line-clamp-3">
              {post.desc}
            </p>
          </Link>
        ))}
      </div>

      <Link href="/blog" className="md:hidden mt-6 flex items-center justify-center gap-1.5 text-[13px] font-bold text-brand-orange">
        View all articles
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
      </Link>
    </section>
  );
}
