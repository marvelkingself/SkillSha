import { COURSES_DATA, COURSE_SLUG_MAP, getCourseIdBySlug } from "@/data/courses";
import { CITIES_LIST } from "@/data/cities";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/CourseDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const paths: Array<{ slug: string; city: string }> = [];
  
  Object.values(COURSE_SLUG_MAP).forEach((slug) => {
    CITIES_LIST.forEach((city) => {
      paths.push({ slug, city: city.slug });
    });
  });
  
  return paths;
}

interface PageProps {
  params: Promise<{ slug: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city } = await params;
  const id = getCourseIdBySlug(slug);
  const data = id ? COURSES_DATA[id] : null;
  const cityInfo = CITIES_LIST.find((c) => c.slug === city);
  
  if (!data || !cityInfo) {
    return {
      title: "Course Not Found | SkillSha",
    };
  }

  const rawMetadata = await (async (): Promise<Metadata> => {
    if (slug === "digital-marketing-course-with-gen-ai") {
      return {
        title: `Best Digital Marketing Course with Gen AI in ${cityInfo.name} | Certification | SkillSha`,
        description: `Enroll in the top professional Digital Marketing Course with Gen AI in ${cityInfo.name}. Learn SEO, Google & Meta Ads, content marketing, email automation, and analytics using ChatGPT, Claude & Midjourney with placement support.`,
        keywords: `digital marketing course in ${cityInfo.name}, digital marketing course with Gen AI in ${cityInfo.name}, SEO training in ${cityInfo.name}, Google Ads course in ${cityInfo.name}, SkillSha ${cityInfo.name}`,
        alternates: {
          canonical: `https://www.skillsha.com/course/digital-marketing-course-with-gen-ai/${city}`,
          languages: {
            "en": `https://www.skillsha.com/course/digital-marketing-course-with-gen-ai/${city}`,
            "x-default": `https://www.skillsha.com/course/digital-marketing-course-with-gen-ai/${city}`,
          }
        },
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        },
        other: {
          "content-language": "en",
          "author": "SkillSha",
          "publisher": "SkillSha",
          "theme-color": "#0F172A",
          "msapplication-TileColor": "#0F172A",
        },
        openGraph: {
          type: "website",
          siteName: "SkillSha",
          title: `Best Digital Marketing Course with Gen AI in ${cityInfo.name} | Certification | SkillSha`,
          description: `Enroll in the top professional Digital Marketing Course with Gen AI in ${cityInfo.name}. Learn SEO, Google & Meta Ads, content marketing, email automation, and analytics using ChatGPT, Claude & Midjourney with placement support.`,
          url: `https://www.skillsha.com/course/digital-marketing-course-with-gen-ai/${city}`,
          images: [
            {
              url: "https://www.skillsha.com/files/logo-icon.png",
              width: 512,
              height: 512,
              alt: `SkillSha - Digital Marketing with Gen AI Course in ${cityInfo.name}`,
            }
          ],
          locale: "en_IN",
          alternateLocale: ["en_US"]
        },
        twitter: {
          card: "summary_large_image",
          title: `Digital Marketing Course with Gen AI in ${cityInfo.name} | SkillSha`,
          description: `Learn SEO, Google & Meta Ads, content marketing, email automation and analytics powered by Generative AI in ${cityInfo.name}.`,
          images: ["https://www.skillsha.com/files/logo-icon.png"],
        }
      };
    }

    return {
      title: `Best ${data.title} Certification Course in ${cityInfo.name} | SkillSha`,
      description: `Enroll in the top professional ${data.title} certification program in ${cityInfo.name}. ${data.description}`,
    };
  })();

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

  if (excludedCityCourseSlugs.has(slug)) {
    rawMetadata.robots = {
      index: false,
      follow: false,
    };
  }

  return rawMetadata;
}

export default async function CityCoursePage({ params }: PageProps) {
  const { slug, city } = await params;
  const id = getCourseIdBySlug(slug);
  const data = id ? COURSES_DATA[id] : null;
  const cityInfo = CITIES_LIST.find((c) => c.slug === city);

  if (!id || !data || !cityInfo) {
    notFound();
  }

  const isDigitalMarketingFlagship = slug === "digital-marketing-course-with-gen-ai";

  return (
    <>
      {isDigitalMarketingFlagship && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "SkillSha",
                "url": "https://www.skillsha.com",
                "logo": "https://www.skillsha.com/files/logo-icon.png",
                "description": "SkillSha is an AI-native academy offering project-based, mentor-led training programs in digital marketing, AI engineering, UI/UX design, data science, product management, algorithmic trading, and graphic design.",
                "sameAs": [
                  "https://www.skillsha.com/about",
                  "https://www.skillsha.com/placement-report"
                ]
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "SkillSha",
                "url": "https://www.skillsha.com"
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.skillsha.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Courses",
                    "item": "https://www.skillsha.com/courses"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": `Digital Marketing Course with Gen AI in ${cityInfo.name}`,
                    "item": `https://www.skillsha.com/course/digital-marketing-course-with-gen-ai/${city}`
                  }
                ]
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Course",
                "name": `Digital Marketing with Gen AI - ${cityInfo.name}`,
                "description": `A 24-week digital marketing training program in ${cityInfo.name} combining core growth marketing fundamentals — SEO, paid advertising, content marketing, email/marketing automation, and analytics — with practical use of Generative AI tools such as ChatGPT, Claude, and Midjourney.`,
                "provider": {
                  "@type": "EducationalOrganization",
                  "name": "SkillSha",
                  "sameAs": "https://www.skillsha.com"
                },
                "url": `https://www.skillsha.com/course/digital-marketing-course-with-gen-ai/${city}`,
                "inLanguage": "en",
                "educationalCredentialAwarded": `Certificate of Completion in Digital Marketing with Gen AI in ${cityInfo.name}`,
                "coursePrerequisites": "No prior marketing experience required; beginner-friendly curriculum.",
                "hasCourseInstance": [
                  {
                    "@type": "CourseInstance",
                    "courseMode": "online",
                    "courseWorkload": "PT45H",
                    "duration": "P24W",
                    "instructor": [
                      {
                        "@type": "Person",
                        "name": "Mr. Shad",
                        "jobTitle": "Performance Marketing Specialist"
                      },
                      {
                        "@type": "Person",
                        "name": "Mr. Akshay Mishra",
                        "jobTitle": "Social Media & Brand Strategy Expert"
                      },
                      {
                        "@type": "Person",
                        "name": "Ms. Hema",
                        "jobTitle": "Email & Marketing Automation Expert"
                      }
                    ]
                  }
                ],
                "offers": {
                  "@type": "Offer",
                  "category": "Paid",
                  "price": "13000",
                  "priceCurrency": "INR",
                  "availability": "https://schema.org/InStock",
                  "url": `https://www.skillsha.com/course/digital-marketing-course-with-gen-ai/${city}`
                }
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Do I need prior marketing experience for this Digital Marketing Course?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Not at all. The course is designed for complete beginners and starts from fundamentals. Prior experience is helpful but not required."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much time should I dedicate weekly to this Digital Marketing Course?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "SkillSha recommends 5-6 hours per week for live classes plus assignments. Self-paced learners can distribute this flexibly. Most students complete the course in about 6 months."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Will this Digital Marketing Course help me get a job internationally?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, the skills taught are universally applicable and graduates work with international brands, multinationals, and agencies worldwide, though visa requirements depend on individual country policies."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is AI going to replace me after I learn this Digital Marketing Course?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. The course teaches AI as a tool that enhances marketing work rather than replacing marketers, and covers when to use AI versus human judgment."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What if I want to specialize in one area after the Digital Marketing Course?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The course covers all core areas and students can deepen any specialty afterward, such as advanced SEO or performance marketing, with guidance on specialization paths."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is the certification from this Digital Marketing Course recognized by employers?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "SkillSha's certificate is recognized by companies hiring digital marketers, and the portfolio of real projects built during the course supports employability."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What's the refund policy for this Digital Marketing Course?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A 7-day money-back guarantee applies if unsatisfied within the first week. After 7 days, course pause options are available but refunds are not offered."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I access the Digital Marketing Course materials after completion?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, students get lifetime access to course materials and future content updates."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Will this Digital Marketing Course make me independent for freelancing?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Many graduates use the practical skills and portfolio built during the course to work as freelancers or agency owners."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does this Digital Marketing Course differ from free resources online?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The course offers a structured, current curriculum taught by active professionals, includes real projects, and provides placement support, unlike scattered free resources."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I get a job while taking this Digital Marketing Course?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, many students work part-time or full-time while taking the course, and the flexible self-paced option supports employed professionals."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What's the time commitment to get placed after this Digital Marketing Course?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The average time from course completion to job offer is 30-45 days, supported by mock interviews and portfolio building during the course."
                    }
                  }
                ]
              })
            }}
          />
        </>
      )}
      <CourseDetailClient id={id} data={data} city={cityInfo.name} />
    </>
  );
}

