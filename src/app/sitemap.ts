import { MetadataRoute } from "next";
import { COURSE_SLUG_MAP } from "@/data/courses";
import { CITIES_LIST } from "@/data/cities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://skillsha.com";

  // 1. Static Pages
  const staticPages = [
    "",
    "/about",
    "/courses",
    "/blog",
    "/careers",
    "/case-studies",
    "/certificate",
    "/community",
    "/contact",
    "/disclaimer",
    "/events",
    "/fee-payment",
    "/hiring-partners",
    "/mentors",
    "/placement-report",
    "/press",
    "/privacy-policy",
    "/refund-policy",
    "/roadmaps",
    "/success-stories",
    "/team",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Course Detail Pages (e.g. /course/digital-marketing-course-with-gen-ai)
  const coursePages = Object.values(COURSE_SLUG_MAP).map((slug) => ({
    url: `${baseUrl}/course/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 3. Dynamic Course City Pages (e.g. /course/digital-marketing-course-with-gen-ai/delhi)
  const cityPages: MetadataRoute.Sitemap = [];
  Object.values(COURSE_SLUG_MAP).forEach((slug) => {
    // Avoid creating city-level subpages for location-specific courses themselves
    if (slug.includes("-in-noida-")) return;

    CITIES_LIST.forEach((city) => {
      cityPages.push({
        url: `${baseUrl}/course/${slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    });
  });

  return [...staticPages, ...coursePages, ...cityPages];
}
