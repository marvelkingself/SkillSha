import { MetadataRoute } from "next";
import { COURSE_SLUG_MAP } from "@/data/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://skillsha.com";

  // 1. Static Pages (Home, About, Contact, Privacy, Disclaimer, Return/Refund, Placements, Courses, Terms)
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/disclaimer",
    "/refund-policy",
    "/placement-report",
    "/courses",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Course Detail Pages (All individual course detail pages, including Noida)
  const coursePages = Object.values(COURSE_SLUG_MAP).map((slug) => ({
    url: `${baseUrl}/course/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...coursePages];
}
