"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCourseSlugById } from '@/data/courses';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr.replace(' ', 'T'));
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
}

function estimateReadTime(content: string): string {
  try {
    const words = content ? content.split(/\s+/).length : 0;
    const time = Math.max(1, Math.ceil(words / 200));
    return `${time} min read`;
  } catch (e) {
    return "5 min read";
  }
}

function getCategoryFromPost(post: any): string {
  const text = `${post.title} ${post.excerpt || ''}`.toLowerCase();
  if (text.includes("ai") || text.includes("llm") || text.includes("agent") || text.includes("prompt") || text.includes("learning") || text.includes("gpt") || text.includes("ml")) {
    return "AI Engineering";
  }
  if (text.includes("design") || text.includes("ui") || text.includes("ux") || text.includes("framer") || text.includes("marketing") || text.includes("seo") || text.includes("ads") || text.includes("growth")) {
    return "UI/UX Design";
  }
  if (text.includes("next.js") || text.includes("react") || text.includes("stack") || text.includes("code") || text.includes("developer") || text.includes("api") || text.includes("backend") || text.includes("testing") || text.includes("automation")) {
    return "Full-Stack Dev";
  }
  return "AI Engineering"; // Default category
}

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = FALLBACK_IMAGE;
};

const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 animate-pulse flex flex-col h-full min-h-[350px]">
    <div className="relative aspect-video rounded-xl bg-zinc-200 dark:bg-zinc-800 mb-4"></div>
    <div className="flex items-center justify-between mb-4">
      <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
      <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
    </div>
    <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-3"></div>
    <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded mb-4"></div>
    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-2"></div>
    <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded mb-6"></div>
    <div className="flex items-center gap-2.5 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="flex-1">
        <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded mb-1"></div>
        <div className="h-2 w-10 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
      </div>
    </div>
  </div>
);

const FeaturedSkeleton = () => (
  <div className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] overflow-hidden animate-pulse grid grid-cols-1 lg:grid-cols-12 min-h-[350px] mb-12">
    <div className="lg:col-span-6 bg-zinc-200 dark:bg-zinc-800 min-h-[250px] lg:min-h-[350px]"></div>
    <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
        <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
      </div>
      <div className="h-8 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-4"></div>
      <div className="h-8 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-4"></div>
      <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded mb-6"></div>
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
        <div>
          <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded mb-1"></div>
          <div className="h-2.5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-200 dark:border-white/5 rounded-3xl px-4">
    <span className="material-symbols-outlined text-[48px] text-zinc-400 mb-4 animate-bounce">article</span>
    <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mb-2">No Articles Available</h3>
    <p className="text-[14px] text-zinc-500 dark:text-[#9CA3AF] max-w-[400px]">Check back later for tutorials, deep-dives, and guides from our mentors.</p>
  </div>
);

const ErrorState = ({ message, retry }: { message: string, retry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-rose-500/20 bg-rose-500/[0.02] rounded-3xl px-6">
    <span className="material-symbols-outlined text-[48px] text-rose-500 mb-4">error_outline</span>
    <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mb-2">Failed to Load Articles</h3>
    <p className="text-[14px] text-zinc-500 dark:text-[#9CA3AF] max-w-[450px] mb-4">We encountered an issue loading latest blog posts: {message}. The rest of the site remains fully operational.</p>
    <button onClick={retry} className="px-5 py-2.5 bg-brand-orange text-white rounded-xl text-xs font-bold shadow-md shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">
      Retry Fetching
    </button>
  </div>
);

export default function BlogClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI Engineering', 'UI/UX Design', 'Full-Stack Dev'];

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch WordPress posts
      let wpPosts = [];
      try {
        const res = await fetch('https://www.skillsha.com/blogs/my-posts-api.php?per_page=20');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.posts)) {
            wpPosts = data.posts;
          }
        }
      } catch (err) {
        console.error("WordPress posts fetch failed:", err);
      }

      // 2. Fetch local AI blog posts
      let localPosts = [];
      try {
        const localRes = await fetch('/api/blog-posts');
        if (localRes.ok) {
          const localData = await localRes.json();
          if (localData.success && Array.isArray(localData.posts)) {
            localPosts = localData.posts.map((post: any) => ({
              id: `local-${post.slug}`,
              title: post.title,
              excerpt: post.excerpt,
              content: post.introduction + " " + (post.sections ? post.sections.map((s: any) => s.content).join(" ") : ""),
              image: post.featuredImageBase64 || post.featuredImage,
              link: `/blog/${post.slug}`,
              date: post.publishedAt || post.createdAt,
              isLocal: true,
            }));
          }
        }
      } catch (err) {
        console.error("Local blogs fetch failed:", err);
      }

      // Combine and sort by date descending
      const combined = [...localPosts, ...wpPosts].sort((a: any, b: any) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      setPosts(combined);
    } catch (err: any) {
      setError(err.message || 'Unknown network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 1 ? posts.slice(1) : [];

  const filteredPosts = activeCategory === 'All'
    ? regularPosts
    : regularPosts.filter(post => getCategoryFromPost(post) === activeCategory);

  return (
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
        {loading ? (
          <FeaturedSkeleton />
        ) : error ? (
          null // Errors are displayed in the main grid section below
        ) : featuredPost ? (() => {
          const CardContent = () => (
            <>
              <div className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[250px] overflow-hidden">
                <img 
                  src={featuredPost.image || FALLBACK_IMAGE} 
                  alt={featuredPost.title} 
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                />
              </div>
              <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">
                    {getCategoryFromPost(featuredPost)}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {estimateReadTime(featuredPost.content)}
                  </span>
                </div>
                <h2 className="text-[22px] md:text-[28px] font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-brand-orange transition-colors leading-tight text-left">
                  {featuredPost.title}
                </h2>
                <p className="text-[14px] text-zinc-500 dark:text-[#9CA3AF] mb-6 leading-relaxed line-clamp-3 text-left">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-200/60 dark:border-white/5 text-left">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center font-bold text-brand-orange text-xs">SW</div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">SkillSha Writer</p>
                    <p className="text-[10px] text-zinc-400">{formatDate(featuredPost.date)}</p>
                  </div>
                </div>
              </div>
            </>
          );

          const className = "block bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] overflow-hidden shadow-sm hover:border-brand-orange/45 transition-colors group cursor-pointer grid grid-cols-1 lg:grid-cols-12 min-h-[350px]";

          return featuredPost.isLocal ? (
            <Link href={featuredPost.link} className={className}>
              <CardContent />
            </Link>
          ) : (
            <a href={featuredPost.link} target="_blank" rel="noopener noreferrer" className={className}>
              <CardContent />
            </a>
          );
        })() : null}
      </section>

      {/* Regular Posts Grid */}
      <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 select-none">
          <h2 className="text-[20px] md:text-[24px] font-bold text-zinc-900 dark:text-white tracking-tight text-left">Latest Articles</h2>
          
          {/* Category Tabs Selector */}
          <div className="flex justify-start items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-brand-orange/20 scale-[1.02]'
                      : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/50 dark:border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : error ? (
          <ErrorState message={error} retry={fetchPosts} />
        ) : posts.length === 0 ? (
          <EmptyState />
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[15px] text-zinc-500 dark:text-zinc-400 font-medium">No articles found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map((post: any) => {
              const CardContent = () => (
                <>
                  {/* Article Image */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-zinc-100 dark:bg-zinc-900 select-none">
                    <img 
                      src={post.image || FALLBACK_IMAGE} 
                      alt={post.title}
                      onError={handleImageError}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">
                      {getCategoryFromPost(post)}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {estimateReadTime(post.content)}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors line-clamp-2 leading-tight text-left">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] mb-6 leading-relaxed line-clamp-3 text-left">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2.5 mt-auto pt-4 border-t border-zinc-200/60 dark:border-white/5 text-left">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center font-bold text-zinc-650 dark:text-zinc-300 text-[10px]">
                      SW
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-white leading-none">SkillSha Writer</p>
                      <p className="text-[9px] text-zinc-400 mt-1">{formatDate(post.date)}</p>
                    </div>
                  </div>
                </>
              );

              const className = "bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 hover:border-brand-orange/45 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full";

              return post.isLocal ? (
                <Link key={post.id} href={post.link} className={className}>
                  <CardContent />
                </Link>
              ) : (
                <a 
                  key={post.id} 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  <CardContent />
                </a>
              );
            })}
          </div>
        )}
      </section>

    </main>
  );
}
