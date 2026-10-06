import { COURSES_DATA, COURSE_SLUG_MAP, getCourseIdBySlug, getCourseSlugById, getCourseAndCityFromSlug } from "@/data/courses";
import { CITIES_LIST } from "@/data/cities";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/CourseDetailClient";
import DataAnalyticsCityPage from "@/components/course/DataAnalyticsCityPage";
import { getAnalyticsCityData } from "@/data/data-analytics-course";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const paths: Array<{ slug: string }> = [];

  // 1. Core course pages
  Object.keys(COURSES_DATA).forEach((id) => {
    paths.push({ slug: getCourseSlugById(id) });
  });

  // 2. Localized city course pages
  Object.keys(COURSES_DATA).forEach((id) => {
    CITIES_LIST.forEach((city) => {
      paths.push({ slug: getCourseSlugById(id, city.slug) });
    });
  });

  return paths;
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

  const rawMetadata = await (async (): Promise<Metadata> => {
    // Data Analytics Course with Gen AI
    if (id === "data-analytics-with-gen-ai") {
      const { city: citySlug } = getCourseAndCityFromSlug(slug);
      const cityAnalytics = getAnalyticsCityData(citySlug);
      const title = `Data Analytics Course in ${cityAnalytics.city} with Gen AI | Skillsha`;
      const description = `Skillsha Data Analytics with Gen AI course in ${cityAnalytics.city} runs for 6-7 months with dedicated career and placement assistance. Enroll now for top-tier analytics.`;
      const keywords = `data analytics course in ${cityAnalytics.city.toLowerCase()}, data analytics training in ${cityAnalytics.city.toLowerCase()}, data analytics course in ${cityAnalytics.city.toLowerCase()} with placement, data analyst course in ${cityAnalytics.city.toLowerCase()}, Gen AI for data analytics`;

      return {
        title,
        description,
        keywords,
        alternates: {
          canonical: `https://skillsha.com/course/${slug}`,
          languages: {
            en: `https://skillsha.com/course/${slug}`,
            "x-default": `https://skillsha.com/course/${slug}`,
          },
        },
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
        other: {
          "content-language": "en",
          author: "SkillSha",
          publisher: "SkillSha",
          "theme-color": "#0F172A",
          "msapplication-TileColor": "#0F172A",
        },
        openGraph: {
          type: "website",
          siteName: "SkillSha",
          title,
          description: `Master data analytics and Gen AI in ${cityAnalytics.city} with live sessions and career support from Skillsha.`,
          url: `https://skillsha.com/course/${slug}`,
          images: [
            {
              url: "https://skillsha.com/files/logo-icon.png",
              width: 512,
              height: 512,
              alt: `Data Analytics Course in ${cityAnalytics.city} with Gen AI student learning analytics at Skillsha`,
            },
          ],
          locale: "en_IN",
          alternateLocale: ["en_US"],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description: `Master data analytics and Gen AI in ${cityAnalytics.city} with live sessions and career support from Skillsha.`,
          images: ["https://skillsha.com/files/logo-icon.png"],
        },
      };
    }

    // 1. Noida Special Case
    if (slug === "digital-marketing-course-in-noida-with-gen-ai") {
      return {
        title: "Digital Marketing Course in Noida with Gen AI | 100% Job Placement Support | SkillSha",
        description: "Master digital marketing with Generative AI in Noida. Learn SEO, Google & Meta Ads, content marketing, email automation, and analytics using ChatGPT, Claude & Midjourney. 24-week live/self-paced course with 12+ real projects, GitHub portfolio, and 100% placement support in NCR.",
        keywords: "digital marketing course in noida, digital marketing course with Gen AI noida, digital marketing certification noida, SEO training noida, Google Ads course noida, Meta Ads course noida, AI marketing tools noida, digital marketing institute Sector 62, SkillSha Noida",
        alternates: {
          canonical: "https://skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
          languages: {
            "en": "https://skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
            "x-default": "https://skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
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
          url: "https://skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
          images: [
            {
              url: "https://skillsha.com/files/logo-icon.png",
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
          images: ["https://skillsha.com/files/logo-icon.png"],
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
          canonical: "https://skillsha.com/course/digital-marketing-course-with-gen-ai",
          languages: {
            "en": "https://skillsha.com/course/digital-marketing-course-with-gen-ai",
            "x-default": "https://skillsha.com/course/digital-marketing-course-with-gen-ai",
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
          url: "https://skillsha.com/course/digital-marketing-course-with-gen-ai",
          images: [
            {
              url: "https://skillsha.com/files/logo-icon.png",
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
          images: ["https://skillsha.com/files/logo-icon.png"],
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
          canonical: `https://skillsha.com/course/${slug}`,
          languages: {
            "en": `https://skillsha.com/course/${slug}`,
            "x-default": `https://skillsha.com/course/${slug}`,
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
          url: `https://skillsha.com/course/${slug}`,
          images: [
            {
              url: "https://skillsha.com/files/logo-icon.png",
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
          images: ["https://skillsha.com/files/logo-icon.png"],
        }
      };
    }

    // 4. Default Fallback
    return {
      title: `${data.title} Certification | SkillSha`,
      description: data.description,
      alternates: {
        canonical: `https://skillsha.com/course/${slug}`,
        languages: {
          "en": `https://skillsha.com/course/${slug}`,
          "x-default": `https://skillsha.com/course/${slug}`,
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
      openGraph: {
        type: "website",
        siteName: "SkillSha",
        title: `${data.title} Certification | SkillSha`,
        description: data.description,
        url: `https://skillsha.com/course/${slug}`,
        images: [
          {
            url: "https://skillsha.com/files/logo-icon.png",
            width: 512,
            height: 512,
            alt: `SkillSha - ${data.title}`,
          }
        ],
        locale: "en_IN",
        alternateLocale: ["en_US"]
      },
      twitter: {
        card: "summary_large_image",
        title: `${data.title} Certification | SkillSha`,
        description: data.description,
        images: ["https://skillsha.com/files/logo-icon.png"],
      }
    };
  })();

  return rawMetadata;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { id, city } = getCourseAndCityFromSlug(slug);
  const data = id ? COURSES_DATA[id] : null;
  const cityInfo = city ? CITIES_LIST.find((c) => c.slug === city) : undefined;

  if (!id || !data) {
    notFound();
  }

  // Special Handler: Data Analytics with Gen AI (City Blueprint Page)
  if (id === "data-analytics-with-gen-ai") {
    const cityAnalytics = getAnalyticsCityData(city);
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": `Data Analytics Course in ${cityAnalytics.city} with Gen AI`,
      "description": `Comprehensive 6-7 months Data Analytics with Gen AI course for learners in ${cityAnalytics.city} featuring 150+ hours of content, 90+ live sessions, 15+ tools, and dedicated career and placement assistance.`,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Skillsha",
        "url": "https://skillsha.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "D-34, Sector - 2, Near Noida Sector 16 and 15 Metro Station",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201301",
          "addressCountry": "IN"
        }
      },
      "offers": {
        "@type": "Offer",
        "price": "25370",
        "priceCurrency": "INR",
        "category": "Paid",
        "availability": "https://schema.org/InStock",
        "url": `https://skillsha.com/course/${slug}`
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": cityAnalytics.isNoidaCentre ? "Blended" : "Online",
        "courseWorkload": "PT150H",
        "duration": "P7M"
      }
    };

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Skillsha",
      "url": "https://skillsha.com",
      "logo": "https://skillsha.com/files/logo-icon.png",
      "telephone": "+91 73030 82191",
      "email": "info@skillsha.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "D-34, Sector - 2, Near Noida Sector 16 and 15 Metro Station",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201301",
        "addressCountry": "IN"
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://skillsha.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Courses",
          "item": "https://skillsha.com/courses"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `Data Analytics Course in ${cityAnalytics.city} with Gen AI`,
          "item": `https://skillsha.com/course/${slug}`
        }
      ]
    };

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `Data Analytics Course in ${cityAnalytics.city} with Gen AI | Skillsha`,
      "url": `https://skillsha.com/course/${slug}`,
      "description": `Skillsha Data Analytics with Gen AI course in ${cityAnalytics.city} runs for 6-7 months with dedicated career and placement assistance. Enroll now for top-tier analytics.`,
      "author": {
        "@type": "Person",
        "name": "Mr. Gufran"
      },
      "reviewedBy": {
        "@type": "Person",
        "name": "Mr. Irshad Khan",
        "jobTitle": "Technical Reviewer at Skillsha"
      },
      "dateModified": "2026-10-06"
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Data Analytics with Gen AI course at Skillsha?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Data Analytics with Gen AI course is a 6-7 months comprehensive training program. It provides 150+ hours of content across 90+ live sessions covering Excel, SQL, Python, Power BI, and generative AI. Learners build portfolio projects and receive dedicated career and placement assistance."
          }
        },
        {
          "@type": "Question",
          "name": `What is the fee of the data analytics course in ${cityAnalytics.city}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The course fee is ₹21,500 plus 18% GST, totaling ₹25,370. This comprehensive tuition covers all 150+ hours of content, 90+ live sessions, project evaluations, and dedicated career and placement assistance. Flexible monthly installment plans are available starting at ₹4,622 per month for six months. Fee verified by Admin Department, reviewed 6 October 2026.`
          }
        },
        {
          "@type": "Question",
          "name": `Is EMI available for the data analytics course in ${cityAnalytics.city}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, monthly EMI options are available starting at ₹4,622 per month for six months. Learners can divide the total tuition of ₹25,370 into manageable installments rather than paying upfront. Specific installment terms and payment schedules are confirmed during enrollment. Fee verified by Admin Department, reviewed 6 October 2026.`
          }
        },
        {
          "@type": "Question",
          "name": `How long is the data analytics course in ${cityAnalytics.city}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The program duration is 6-7 months of comprehensive interactive learning. During this period, students complete 150+ hours of content delivered through 90+ live sessions. The structured schedule allows college students and working professionals to balance training commitments alongside their daily routines effectively.`
          }
        },
        {
          "@type": "Question",
          "name": `Does Skillsha have a centre in ${cityAnalytics.city}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": cityAnalytics.q5Answer
          }
        },
        {
          "@type": "Question",
          "name": "Do I need coding knowledge to join?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No prior coding knowledge or technical programming background is required to enroll. The curriculum begins with fundamental spreadsheet formulas and introductory SQL queries before gradually progressing to Python scripting. All you need is a laptop, stable internet connection, basic mathematics familiarity, and a willingness to practice analytical concepts."
          }
        },
        {
          "@type": "Question",
          "name": "Which tools and software will I learn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You will master 15+ tools and software across analysis, databases, programming, visualization, and generative AI. The curriculum covers Excel, Google Sheets, MySQL, PostgreSQL, Python, Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebook, Power BI, Tableau, Looker Studio, Git, GitHub, ChatGPT, Claude, and Gemini for end-to-end data reporting workflows."
          }
        },
        {
          "@type": "Question",
          "name": "What salary can a fresher expect after this course?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A fresher data analyst in India can realistically expect a starting salary between ₹3–6 LPA. Strong freshers possessing well-documented project portfolios and sharp SQL skills can target ₹6–10 LPA, while internship stipends typically range from ₹10k–30k/month. Exact compensation depends on candidate skills, project depth, and hiring company policies."
          }
        },
        {
          "@type": "Question",
          "name": `Does Skillsha provide placement assistance for ${cityAnalytics.city} learners?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, Skillsha provides dedicated career and placement assistance to all eligible ${cityAnalytics.city} learners. Career support includes one-on-one resume reviews, GitHub portfolio optimization, mock technical interviews, and connections to corporate hiring drives across our network of 100+ hiring partners. Source: Skillsha internal placement records, reviewed 6 October 2026.`
          }
        },
        {
          "@type": "Question",
          "name": "How many live sessions and content hours are included?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The course includes 150+ hours of content and 90+ live interactive sessions. Instruction is delivered live by corporate trainers who solve realistic datasets in real time. Students participate in live discussions, ask questions directly, and work through hands-on assignments to ensure thorough comprehension of analytical tools and methods."
          }
        },
        {
          "@type": "Question",
          "name": "Who verified the information on this page?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This page copy was written by Mr. Gufran and verified by Mr. Farman and Mr. Irshad Khan. Technical details and final checks were completed by Mr. Irshad Khan, Technical Reviewer at Skillsha. Fee details were verified by the Admin Department, and placement data was confirmed from internal placement records."
          }
        },
        {
          "@type": "Question",
          "name": "When do the next batches start?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Skillsha launches 8+ new batches every month with convenient weekday and weekend schedule options. Batches are organized to accommodate both full-time college students and working professionals across ${cityAnalytics.city}. To confirm the immediate upcoming batch dates, connect directly with a Skillsha program advisor today.`
          }
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <DataAnalyticsCityPage cityData={cityAnalytics} />
      </>
    );
  }

  const isNoidaFlagship = slug === "digital-marketing-course-in-noida-with-gen-ai";
  const isDMFlagship = slug === "digital-marketing-course-with-gen-ai" || slug === "digital-marketing-course";
  const isOtherFlagship = !isNoidaFlagship && !isDMFlagship && !!data.flagshipContent;

  const dynamicCourseSchema = isOtherFlagship ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": data.certificateTitle || (data.title.includes("with Gen AI") ? data.title : `${data.title} with Gen AI`),
    "description": data.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "SkillSha",
      "sameAs": "https://skillsha.com"
    },
    "url": `https://skillsha.com/course/${slug}`,
    "inLanguage": "en",
    "educationalCredentialAwarded": `Certificate of Completion in ${data.certificateTitle || data.title}`,
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
      "url": `https://skillsha.com/course/${slug}`,
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
                "url": "https://skillsha.com",
                "logo": "https://skillsha.com/files/logo-icon.png",
                "description": "SkillSha is an AI-native academy offering project-based, mentor-led training programs in digital marketing, AI engineering, UI/UX design, data science, product management, algorithmic trading, and graphic design.",
                "sameAs": [
                  "https://skillsha.com/about",
                  "https://skillsha.com/placement-report"
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
                "url": "https://skillsha.com"
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
                    "item": "https://skillsha.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Digital Marketing with Gen AI Course",
                    "item": "https://skillsha.com/course/digital-marketing-course-with-gen-ai"
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
                  "sameAs": "https://skillsha.com"
                },
                "url": "https://skillsha.com/course/digital-marketing-course-with-gen-ai",
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
                  "url": "https://skillsha.com/course/digital-marketing-course-with-gen-ai",
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
                "url": "https://skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
                "logo": "https://skillsha.com/files/logo-icon.png",
                "description": "SkillSha Noida provides high-end, AI-powered digital marketing courses designed to produce top-tier growth marketers in Sector 62 and NCR.",
                "sameAs": [
                  "https://skillsha.com/about",
                  "https://skillsha.com/placement-report"
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
                    "item": "https://skillsha.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Digital Marketing Noida",
                    "item": "https://skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai"
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
                  "sameAs": "https://skillsha.com"
                },
                "url": "https://skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
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
                  "url": "https://skillsha.com/course/digital-marketing-course-in-noida-with-gen-ai",
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
                "url": `https://skillsha.com/course/${slug}`,
                "logo": "https://skillsha.com/files/logo-icon.png",
                "description": "SkillSha is an AI-native academy offering project-based, mentor-led training programs.",
                "sameAs": [
                  "https://skillsha.com/about",
                  "https://skillsha.com/placement-report"
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
                    "item": "https://skillsha.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": `${data.title} Course`,
                    "item": `https://skillsha.com/course/${slug}`
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

      <CourseDetailClient id={id} data={data} city={cityInfo?.name} />
    </>
  );
}
