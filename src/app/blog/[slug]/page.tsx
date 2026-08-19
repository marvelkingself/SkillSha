import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogFileManager } from "@/lib/blog-agent/file-manager";
import { formatBlogContent } from "@/lib/blog-agent/html-formatter";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Read blog data from Supabase DB (with local file fallback)
async function getBlogData(slug: string) {
  return await blogFileManager.getBlogBySlugAsync(slug);
}

// Generate metadata for page SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogData(slug);
  if (!blog) return { title: "Blog Post Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.skillsha.com";

  return {
    title: `${blog.metaTitle || blog.title} | SkillSha Blog`,
    description: blog.metaDescription || blog.excerpt,
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      url: `${baseUrl}/blog/${slug}`,
      type: "article",
      publishedTime: blog.publishedAt || blog.createdAt,
      images: [
        {
          url: blog.featuredImageBase64 || `${baseUrl}${blog.featuredImage}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [blog.featuredImageBase64 || `${baseUrl}${blog.featuredImage}`],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog || blog.status !== "published") {
    notFound();
  }

  // Generate structured schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.featuredImageBase64 || `https://www.skillsha.com${blog.featuredImage}`,
    "datePublished": blog.publishedAt || blog.createdAt,
    "dateModified": blog.updatedAt || blog.publishedAt || blog.createdAt,
    "author": {
      "@type": "Organization",
      "name": "SkillSha Writer",
      "url": "https://www.skillsha.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillSha",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.skillsha.com/icon.png",
      },
    },
    "description": blog.metaDescription || blog.excerpt,
  };

  const faqJsonLd = blog.faqs && blog.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blog.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  } : null;

  return (
    <>
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Header />

      <main className="pt-28 md:pt-36 min-h-screen bg-[#FAF9F6] dark:bg-[#050505] transition-colors duration-300">
        <article className="max-w-[800px] mx-auto px-4 md:px-6 pb-20">

          {/* Category & Read Time */}
          <div className="flex items-center gap-3 mb-5 select-none">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              {blog.category || "AI Engineering"}
            </span>
            <span className="text-[11px] text-zinc-400 font-medium">
              •   {blog.contentHtml ? Math.max(2, Math.ceil(blog.contentHtml.split(" ").length / 200)) : 5} min read
            </span>
          </div>

          {/* Heading Title */}
          <h1 className="text-[32px] md:text-[48px] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6">
            {blog.title}
          </h1>

          {/* Excerpt intro */}
          <p className="text-[16px] md:text-[18px] text-zinc-550 dark:text-[#9CA3AF] leading-relaxed mb-8 font-medium italic border-l-2 border-blue-500 pl-4">
            {blog.excerpt}
          </p>

          {/* Author/Date Info */}
          <div className="flex items-center gap-3 border-y border-zinc-200 dark:border-white/5 py-4 mb-8">
            <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-500 text-sm select-none">
              SW
            </div>
            <div>
              <p className="text-[12.5px] font-bold text-zinc-800 dark:text-white leading-none">SkillSha Writer</p>
              <p className="text-[10.5px] text-zinc-400 mt-1.5">
                Published on {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Featured Image (Base64 / URL) */}
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 bg-zinc-150 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-white/5 select-none">
            <img
              src={blog.featuredImageBase64 || blog.featuredImage}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Article HTML Content body */}
          <div className="prose dark:prose-invert max-w-none text-[15px] md:text-[16px] text-zinc-850 dark:text-zinc-300 leading-relaxed font-sans space-y-6">

            {/* Introduction paragraph */}
            <div
              className="prose-li:list-disc prose-a:text-blue-500 hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.introduction) }}
            />

            {/* Sections mapped dynamic */}
            {blog.sections && blog.sections.map((sec: any, sIdx: number) => (
              <div key={sIdx} className="pt-6 space-y-3.5">
                {sec.level === 3 ? (
                  <h3 className="text-[18px] md:text-[20px] font-extrabold text-zinc-900 dark:text-white tracking-tight pt-2">
                    {sec.heading}
                  </h3>
                ) : (
                  <h2 className="text-[22px] md:text-[26px] font-bold text-zinc-900 dark:text-white tracking-tight border-b border-zinc-100 dark:border-white/5 pb-2 pt-4">
                    {sec.heading}
                  </h2>
                )}
                <div
                  className="prose-li:list-disc prose-tables:border prose-a:text-blue-500 hover:prose-a:underline leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatBlogContent(sec.content) }}
                />
              </div>
            ))}

            {/* Conclusion text */}
            {blog.conclusion && (
              <div className="pt-8 border-t border-zinc-200 dark:border-white/5 mt-10">
                <h2 className="text-[22px] font-bold text-zinc-900 dark:text-white tracking-tight mb-3">
                  Summary &amp; Takeaways
                </h2>
                <div
                  className="prose-li:list-disc prose-a:text-blue-500 hover:prose-a:underline leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.conclusion) }}
                />
              </div>
            )}

            {/* Call to Action card */}
            {blog.ctaText && (
              <div className="relative group overflow-hidden rounded-3xl p-6 md:p-8 bg-zinc-900 dark:bg-zinc-950 border border-blue-500/30 text-white mt-12 shadow-xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
                <h4 className="text-[18px] md:text-[20px] font-black tracking-tight text-white mb-2 relative z-10">
                  Ready to Advance Your Skills?
                </h4>
                <p className="text-[12.5px] md:text-[13.5px] text-zinc-300 leading-relaxed mb-6 max-w-xl relative z-10 font-sans">
                  Join our immersive, live mentor-led IT training programs. Get certified, build real-world systems, and secure top-tier placements.
                </p>
                <a
                  href="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-[12px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all select-none relative z-10 cursor-pointer"
                >
                  {blog.ctaText}
                </a>
              </div>
            )}

          </div>

          {/* FAQs Accordion section */}
          {blog.faqs && blog.faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-zinc-200 dark:border-white/5">
              <h2 className="text-[24px] md:text-[28px] font-black text-zinc-900 dark:text-white tracking-tight mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {blog.faqs.map((faq: any, fIdx: number) => (
                  <div
                    key={fIdx}
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-white/5 shadow-sm hover:border-zinc-300 dark:hover:border-white/10 transition-colors"
                  >
                    <h4 className="text-[14.5px] font-bold text-zinc-900 dark:text-white mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-[13px] text-zinc-550 dark:text-[#9CA3AF] leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </article>
      </main>

      <Footer />
    </>
  );
}
