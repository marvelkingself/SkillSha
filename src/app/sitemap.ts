import { MetadataRoute } from "next";
import { COURSES_DATA, getCourseSlugById } from "@/data/courses";
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
    "/case-studies",
    "/careers",
    "/roadmaps",
    "/success-stories",
    "/hiring-partners"
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Course Detail Pages (All active live courses)
  const courseSlugsSet = new Set<string>();
  const coursePages: any[] = [];
  Object.keys(COURSES_DATA).forEach((id) => {
    const slug = getCourseSlugById(id);
    if (!courseSlugsSet.has(slug)) {
      courseSlugsSet.add(slug);
      coursePages.push({
        url: `${baseUrl}/course/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      });
    }
  });

  // 3. Dynamic Localized City Course Pages
  const cityCoursePages: any[] = [];
  Object.keys(COURSES_DATA).forEach((id) => {
    CITIES_LIST.forEach((city) => {
      const slug = getCourseSlugById(id, city.slug);
      if (!courseSlugsSet.has(slug)) {
        courseSlugsSet.add(slug);
        cityCoursePages.push({
          url: `${baseUrl}/course/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        });
      }
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
