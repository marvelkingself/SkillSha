import { COURSES_DATA, COURSE_SLUG_MAP, getCourseIdBySlug } from "@/data/courses";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/CourseDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return Object.values(COURSE_SLUG_MAP).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = getCourseIdBySlug(slug);
  const data = id ? COURSES_DATA[id] : null;
  if (!data) {
    return {
      title: "Course Not Found | SkillSha",
    };
  }

  // 1. Noida Special Case
  if (slug === "digital-marketing-course-in-noida-with-gen-ai") {
    return {
      title: "Digital Marketing Course in Noida with Gen AI | 100% Job Placement Support | SkillSha",
      description: "Master digital marketing with Generative AI in Noida. Learn SEO, Google & Meta Ads, content marketing, email automation, and analytics using ChatGPT, Claude & Midjourney. 24-week live/self-paced course with 12+ real projects, GitHub portfolio, and 100% placement support in NCR.",
      keywords: "digital marketing course in noida, digital marketing course with Gen AI noida, digital marketing certification noida, SEO training noida, Google Ads course noida, Meta Ads course noida, AI marketing tools noida, digital marketing institute Sector 62, SkillSha Noida",
      alternates: {
        canonical: "https://www.skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
        languages: {
          "en": "https://www.skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
          "x-default": "https://www.skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
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
        title: "Digital Marketing Course in Noida with Gen AI | Certification Training | SkillSha",
        description: "Master digital marketing with Generative AI in Noida. Learn SEO, Google & Meta Ads, content marketing, email automation, and analytics using ChatGPT, Claude & Midjourney. 24-week course with 12+ real projects and placement support in NCR.",
        url: "https://www.skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
        images: [
          {
            url: "https://www.skillsha.com/files/logo-icon.png",
            width: 512,
            height: 512,
            alt: "SkillSha - Digital Marketing with Gen AI Course in Noida",
          }
        ],
        locale: "en_IN",
        alternateLocale: ["en_US"]
      },
      twitter: {
        card: "summary_large_image",
        title: "Digital Marketing Course in Noida with Gen AI | SkillSha",
        description: "Learn SEO, Google & Meta Ads, content marketing, email automation and analytics powered by Generative AI in Noida. 24-week live or self-paced course with real projects and placement support.",
        images: ["https://www.skillsha.com/files/logo-icon.png"],
      }
    };
  }

  // 2. Digital Marketing Flagship Special Case
  if (slug === "digital-marketing-course-with-gen-ai" || slug === "digital-marketing-course") {
    return {
      title: "Digital Marketing Course with Gen AI | Certification Training | SkillSha",
      description: "Master digital marketing with Generative AI. Learn SEO, Google & Meta Ads, content marketing, email automation, and analytics using ChatGPT, Claude & Midjourney. 24-week live/self-paced course with 12+ real projects, GitHub portfolio, and placement support.",
      keywords: "digital marketing course, digital marketing course with Gen AI, generative AI marketing course, digital marketing certification, SEO training, Google Ads course, Meta Ads course, AI marketing tools, ChatGPT for marketing, marketing automation course, SkillSha digital marketing",
      alternates: {
        canonical: "https://www.skillsha.com/course/digital-marketing-course-with-gen-ai",
        languages: {
          "en": "https://www.skillsha.com/course/digital-marketing-course-with-gen-ai",
          "x-default": "https://www.skillsha.com/course/digital-marketing-course-with-gen-ai",
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
        title: "Digital Marketing Course with Gen AI | Certification Training | SkillSha",
        description: "Master digital marketing with Generative AI. Learn SEO, Google & Meta Ads, content marketing, email automation, and analytics using ChatGPT, Claude & Midjourney. 24-week course with 12+ real projects and placement support.",
        url: "https://www.skillsha.com/course/digital-marketing-course-with-gen-ai",
        images: [
          {
            url: "https://www.skillsha.com/files/logo-icon.png",
            width: 512,
            height: 512,
            alt: "SkillSha - Digital Marketing with Gen AI Course",
          }
        ],
        locale: "en_IN",
        alternateLocale: ["en_US"]
      },
      twitter: {
        card: "summary_large_image",
        title: "Digital Marketing Course with Gen AI | SkillSha",
        description: "Learn SEO, Google & Meta Ads, content marketing, email automation and analytics powered by Generative AI. 24-week live or self-paced course with real projects and placement support.",
        images: ["https://www.skillsha.com/files/logo-icon.png"],
      }
    };
  }

  // 3. Dynamic Metadata for any other flagship courses
  if (data.flagshipContent) {
    const title = `${data.title} Course with Gen AI | Certification Training | SkillSha`;
    const description = `Master ${data.title.toLowerCase()} with Generative AI. Learn ${data.typewriter.slice(0, 3).join(", ")}, and analytics using ChatGPT, Claude & Midjourney. Live/self-paced course with real projects, GitHub portfolio, and placement support.`;
    const keywords = `${data.title.toLowerCase()} course, ${data.title.toLowerCase()} course with Gen AI, generative AI ${data.title.toLowerCase()} course, ${data.title.toLowerCase()} certification, AI ${data.title.toLowerCase()} tools, SkillSha ${data.title.toLowerCase()}`;
    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `https://www.skillsha.com/course/${slug}`,
        languages: {
          "en": `https://www.skillsha.com/course/${slug}`,
          "x-default": `https://www.skillsha.com/course/${slug}`,
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
        title,
        description,
        url: `https://www.skillsha.com/course/${slug}`,
        images: [
          {
            url: "https://www.skillsha.com/files/logo-icon.png",
            width: 512,
            height: 512,
            alt: `SkillSha - ${data.title} with Gen AI Course`,
          }
        ],
        locale: "en_IN",
        alternateLocale: ["en_US"]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://www.skillsha.com/files/logo-icon.png"],
      }
    };
  }

  // 4. Default Fallback
  return {
    title: `${data.title} Certification | SkillSha`,
    description: data.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const id = getCourseIdBySlug(slug);
  const data = id ? COURSES_DATA[id] : null;

  if (!id || !data) {
    notFound();
  }

  const isNoidaFlagship = slug === "digital-marketing-course-in-noida-with-gen-ai";
  const isDMFlagship = slug === "digital-marketing-course-with-gen-ai" || slug === "digital-marketing-course";
  const isOtherFlagship = !isNoidaFlagship && !isDMFlagship && !!data.flagshipContent;

  const dynamicCourseSchema = isOtherFlagship ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${data.title} with Gen AI`,
    "description": data.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "SkillSha",
      "sameAs": "https://www.skillsha.com"
    },
    "url": `https://www.skillsha.com/course/${slug}`,
    "inLanguage": "en",
    "educationalCredentialAwarded": `Certificate of Completion in ${data.title} with Gen AI`,
    "coursePrerequisites": "No prior coding or experience required; beginner-friendly curriculum.",
    "hasCourseInstance": [
      {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT45H",
        "duration": data.duration === "24 Weeks" ? "P24W" : "P16W",
        "instructor": data.flagshipContent?.whyChooseList?.trainers?.map((t: any) => ({
          "@type": "Person",
          "name": t.name,
          "jobTitle": t.title
        })) || []
      }
    ],
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "price": "13000",
      "priceCurrency": "INR",
      "url": `https://www.skillsha.com/course/${slug}`,
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    }
  } : null;

  const dynamicFaqSchema = isOtherFlagship ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  return (
    <>
      {/* 1. Original DM Flagship Schemas */}
      {isDMFlagship && (
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
                    "name": "Digital Marketing with Gen AI Course",
                    "item": "https://www.skillsha.com/course/digital-marketing-course-with-gen-ai"
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
                "name": "Digital Marketing with Gen AI",
                "description": "A 24-week digital marketing training program combining core growth marketing fundamentals — SEO, paid advertising, content marketing, email/marketing automation, and analytics — with practical use of Generative AI tools such as ChatGPT, Claude, and Midjourney for campaign copy, ad creative, and workflow automation.",
                "provider": {
                  "@type": "EducationalOrganization",
                  "name": "SkillSha",
                  "sameAs": "https://www.skillsha.com"
                },
                "url": "https://www.skillsha.com/course/digital-marketing-course-with-gen-ai",
                "inLanguage": "en",
                "educationalCredentialAwarded": "Certificate of Completion in Digital Marketing with Gen AI",
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
                  "url": "https://www.skillsha.com/course/digital-marketing-course-with-gen-ai",
                  "availability": "https://schema.org/InStock",
                  "validFrom": "2024-01-01"
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
                    "name": "What's the difference between Skillsha's Digital Marketing Course and other programs?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Unlike standard theory-based programs, SkillSha's course integrates Generative AI into every marketing module. You gain live campaign experience with real budgets, build a professional GitHub portfolio, and receive direct introductions to 500+ global hiring partners."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do I need prior technical or coding experience?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. The course is beginner-friendly, and we teach technical skills (like Google Tag Manager, simple tracking scripts, and analytics dashboards) step-by-step."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I request a refund if the course doesn't suit me?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we offer a 14-day hassle-free refund policy from the date of your first session if you're not satisfied."
                    }
                  }
                ]
              })
            }}
          />
        </>
      )}

      {/* 2. Original Noida Flagship Schemas */}
      {isNoidaFlagship && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "SkillSha Noida",
                "url": "https://www.skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
                "logo": "https://www.skillsha.com/files/logo-icon.png",
                "description": "SkillSha Noida provides high-end, AI-powered digital marketing courses designed to produce top-tier growth marketers in Sector 62 and NCR.",
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
                    "name": "Digital Marketing Noida",
                    "item": "https://www.skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai"
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
                "name": "Digital Marketing Noida with Gen AI",
                "description": "A 24-week digital marketing training in Noida combining traditional marketing fundamentals with practical use of Generative AI tools.",
                "provider": {
                  "@type": "EducationalOrganization",
                  "name": "SkillSha Noida",
                  "sameAs": "https://www.skillsha.com"
                },
                "url": "https://www.skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
                "inLanguage": "en",
                "educationalCredentialAwarded": "Certificate of Completion in Digital Marketing Noida with Gen AI",
                "coursePrerequisites": "No prior experience required; beginner-friendly curriculum.",
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
                  "url": "https://www.skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
                  "availability": "https://schema.org/InStock",
                  "validFrom": "2024-01-01"
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
                    "name": "What's the difference between Skillsha's Digital Marketing Course in Noida and other courses?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "SkillSha highlights practitioner-led trainers, a strong focus on AI integration, and structured placement support as its main differentiators."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is the Digital Marketing Course in Noida updated regularly?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, the course is updated quarterly to reflect new tools, platforms, and AI capabilities, and alumni receive lifetime access to these updates."
                    }
                  }
                ]
              })
            }}
          />
        </>
      )}

      {/* 3. Dynamic Schemas for other flagships */}
      {isOtherFlagship && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "SkillSha",
                "url": `https://www.skillsha.com/course/${slug}`,
                "logo": "https://www.skillsha.com/files/logo-icon.png",
                "description": "SkillSha is an AI-native academy offering project-based, mentor-led training programs.",
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
                    "name": `${data.title} Course`,
                    "item": `https://www.skillsha.com/course/${slug}`
                  }
                ]
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(dynamicCourseSchema)
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(dynamicFaqSchema)
            }}
          />
        </>
      )}

      <CourseDetailClient id={id} data={data} />
    </>
  );
}
