import { MetadataRoute } from "next";
import { COURSE_SLUG_MAP, getCourseSlugById } from "@/data/courses";
import { CITIES_LIST } from "@/data/cities";
import { blogFileManager } from "@/lib/blog-agent/file-manager";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://skillsha.com";

  // 1. All Static Pages (Excluding the ones requested to be removed)
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/disclaimer",
    "/refund-policy",
    "/terms-and-conditions",
    "/placement-report",
    "/courses",
    "/case-studies"
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // List of slugs excluded from main sitemap
  const excludedMainCourseSlugs = new Set([
    "ai-engineering-course-with-gen-ai",
    "full-stack-development-course-with-gen-ai",
    "digital-marketing-course-with-gen-ai",
    "ui-ux-design-course-with-gen-ai",
    "product-management-course-with-gen-ai",
    "algorithmic-trading-course-with-gen-ai",
    "graphic-design-course-with-gen-ai",
    "ai-healthcare-doctor-course-with-gen-ai",
    "ai-clinical-nurse-course-with-gen-ai",
    "ai-finance-ca-course-with-gen-ai",
    "data-analyst-course-with-gen-ai",
    "business-analyst-course-with-gen-ai",
    "ai-ml-course-with-gen-ai",
    "software-testing-course-with-gen-ai",
    "playwright-automation-course-with-gen-ai"
  ]);

  // 2. Dynamic Course Detail Pages (Only keeping non-excluded courses)
  const coursePages = Object.keys(COURSE_SLUG_MAP)
    .map((id) => getCourseSlugById(id))
    .filter((slug) => !excludedMainCourseSlugs.has(slug))
    .map((slug) => ({
      url: `${baseUrl}/course/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  // List of base course names excluded from city sitemap
  const excludedCityCourseBaseSlugs = new Set([
    "ai-engineering-course",
    "full-stack-development-course",
    "ui-ux-design-course",
    "data-science-course",
    "product-management-course",
    "algorithmic-trading-course",
    "graphic-design-course",
    "ai-healthcare-doctor-course",
    "ai-clinical-nurse-course",
    "ai-finance-ca-course",
    "data-analyst-course",
    "business-analyst-course",
    "ai-ml-course",
    "software-testing-course",
    "playwright-automation-course"
  ]);

  // 3. Dynamic Localized City Course Pages (Only keeping non-excluded courses)
  const cityCoursePages: any[] = [];
  Object.keys(COURSE_SLUG_MAP)
    .filter((id) => {
      if (id === "digital-marketing") {
        return false;
      }
      const baseSlug = COURSE_SLUG_MAP[id]
        .replace("-with-gen-ai", "")
        .replace("-standard", "");
      return !excludedCityCourseBaseSlugs.has(baseSlug);
    })
    .forEach((id) => {
      CITIES_LIST.forEach((city) => {
        cityCoursePages.push({
          url: `${baseUrl}/course/${getCourseSlugById(id, city.slug)}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        });
      });
    });

  // 4. Dynamic AI-Generated Local Blog Pages (Fetched from Supabase DB)
  const blogPages: any[] = [];
  try {
    const publishedBlogs = await blogFileManager.getBlogsAsync(false);
    publishedBlogs.forEach((blog: any) => {
      blogPages.push({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.publishedAt || blog.createdAt || Date.now()),
        changeFrequency: "daily" as const,
        priority: 0.8,
      });
    });
  } catch (e) {
    console.error("Failed to read sitemap blogs from Supabase DB:", e);
  }

  return [...staticPages, ...coursePages, ...cityCoursePages, ...blogPages];
}
