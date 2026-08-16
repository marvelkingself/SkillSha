import { MetadataRoute } from "next";
import { COURSE_SLUG_MAP } from "@/data/courses";
import { CITIES_LIST } from "@/data/cities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.skillsha.com";

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
    "/courses"
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // List of slugs excluded from main sitemap
  const excludedMainCourseSlugs = new Set([
    "ai-engineering-course",
    "full-stack-development-course",
    "digital-marketing-course-with-gen-ai",
    "ui-ux-design-course",
    "data-science-course",
    "product-management-course",
    "algorithmic-trading-course",
    "graphic-design-course",
    "mental-health-wellness-course",
    "ai-healthcare-doctor-course",
    "ai-clinical-nurse-course",
    "ai-finance-ca-course",
    "data-analyst-course",
    "business-analyst-course",
    "ai-ml-course",
    "software-testing-course",
    "playwright-automation-course"
  ]);

  // 2. Dynamic Course Detail Pages (Only keeping non-excluded courses)
  const coursePages = Object.values(COURSE_SLUG_MAP)
    .filter((slug) => !excludedMainCourseSlugs.has(slug))
    .map((slug) => ({
      url: `${baseUrl}/course/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  // List of slugs excluded from city sitemap
  const excludedCityCourseSlugs = new Set([
    "ai-engineering-course",
    "full-stack-development-course",
    "ui-ux-design-course",
    "data-science-course",
    "product-management-course",
    "algorithmic-trading-course",
    "graphic-design-course",
    "mental-health-wellness-course",
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
  Object.values(COURSE_SLUG_MAP)
    .filter((slug) => !excludedCityCourseSlugs.has(slug))
    .forEach((slug) => {
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
