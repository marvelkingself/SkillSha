import { MetadataRoute } from "next";
import { COURSE_SLUG_MAP } from "@/data/courses";
import { CITIES_LIST } from "@/data/cities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.skillsha.com";

  // 1. All Static Pages
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
    "/blog",
    "/mentors",
    "/roadmaps",
    "/success-stories",
    "/careers",
    "/hiring-partners",
    "/alumni",
    "/ai-tools-guide",
    "/events",
    "/case-studies",
    "/press",
    "/team",
    "/community",
    "/certificate",
    "/fee-payment"
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Course Detail Pages (19 main course pages)
  const coursePages = Object.values(COURSE_SLUG_MAP).map((slug) => ({
    url: `${baseUrl}/course/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 3. Dynamic Localized City Course Pages (19 courses * 14 cities = 266 city landing pages)
  const cityCoursePages: any[] = [];
  Object.values(COURSE_SLUG_MAP).forEach((slug) => {
    CITIES_LIST.forEach((city) => {
      cityCoursePages.push({
        url: `${baseUrl}/course/${slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    });
  });

  return [...staticPages, ...coursePages, ...cityCoursePages];
}
