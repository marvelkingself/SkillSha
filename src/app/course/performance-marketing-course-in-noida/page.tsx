import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CounselingModal from '@/components/CounselingModal';
import PerformanceMarketingClient from '@/components/PerformanceMarketingClient';

export const metadata: Metadata = {
  title: 'Performance Marketing Course in Noida with Internship',
  description:
    'Learn performance marketing in Noida: paid ads, conversion tracking and campaign optimisation with a trainer-led course and internship. Book a counselling call.',
  alternates: {
    canonical: 'https://skillsha.com/course/performance-marketing-course-in-noida',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'content-language': 'en',
    author: 'SkillSha',
    publisher: 'SkillSha',
    'theme-color': '#0F172A',
    'msapplication-TileColor': '#0F172A',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha',
    title: 'Performance Marketing Course in Noida with Internship | SkillSha',
    description:
      'Trainer-led performance marketing course in Noida with internship. Learn paid ads, tracking and optimisation.',
    url: 'https://skillsha.com/course/performance-marketing-course-in-noida',
    images: [
      {
        url: 'https://skillsha.com/files/logo-icon.png',
        width: 512,
        height: 512,
        alt: 'SkillSha logo',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: 'Performance Marketing Course in Noida | SkillSha',
    description: 'Trainer-led performance marketing course in Noida with internship.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function PerformanceMarketingCoursePage() {
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://skillsha.com/#organization',
        name: 'SkillSha',
        alternateName: 'SkillSha IT Training & Placement Institute',
        url: 'https://skillsha.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://skillsha.com/files/logo-icon.png',
          width: 512,
          height: 512,
        },
        email: 'info@skillsha.com',
        telephone: '+91-7303082191',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'D-34, Sector 2',
          addressLocality: 'Noida',
          addressRegion: 'Uttar Pradesh',
          postalCode: '201301',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://skillsha.com/#website',
        url: 'https://skillsha.com',
        name: 'SkillSha',
        publisher: {
          '@id': 'https://skillsha.com/#organization',
        },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://skillsha.com/course/performance-marketing-course-in-noida#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://skillsha.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Courses',
            item: 'https://skillsha.com/courses',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Performance Marketing Course in Noida',
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://skillsha.com/course/performance-marketing-course-in-noida#webpage',
        url: 'https://skillsha.com/course/performance-marketing-course-in-noida',
        name: 'Performance Marketing Course in Noida with Internship',
        description:
          'Learn performance marketing in Noida: paid ads, conversion tracking and campaign optimisation with a trainer-led course and internship.',
        isPartOf: {
          '@id': 'https://skillsha.com/#website',
        },
        publisher: {
          '@id': 'https://skillsha.com/#organization',
        },
        breadcrumb: {
          '@id': 'https://skillsha.com/course/performance-marketing-course-in-noida#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://skillsha.com/course/performance-marketing-course-in-noida#course',
        },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'Course',
        '@id': 'https://skillsha.com/course/performance-marketing-course-in-noida#course',
        name: 'Performance Marketing Course in Noida',
        description:
          'A course in performance marketing: planning, launching, tracking and optimising paid advertising campaigns, with an internship component.',
        url: 'https://skillsha.com/course/performance-marketing-course-in-noida',
        provider: {
          '@id': 'https://skillsha.com/#organization',
        },
        inLanguage: 'en-IN',
        teaches: [
          'Paid search advertising',
          'Paid social advertising',
          'Conversion tracking and analytics',
          'Campaign optimisation and reporting',
        ],
        instructor: {
          '@type': 'Person',
          name: 'Mr. Shad',
          jobTitle: 'Performance Marketing Expert',
          worksFor: {
            '@id': 'https://skillsha.com/#organization',
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://skillsha.com/course/performance-marketing-course-in-noida#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a performance marketing course?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It teaches how to run paid advertising where results (leads, sales, installs) are tracked and optimised. Topics include campaign setup, tracking, analysis and reporting.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this course suitable for freshers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It is designed to be beginner-friendly. You should be comfortable with basic maths and spreadsheets.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the fee for the performance marketing course in Noida?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The supplied fee is ₹15,500 with a 50% offer. Admin must confirm the final payable amount, taxes and EMI terms before this answer is published.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is an internship included?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, an internship is included. Ask the counselling team for the internship duration and conditions.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who teaches the course?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mr. Shad, a Performance Marketing Expert at SkillSha with a stated specialisation in SEM and conversion rate optimisation.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long is the course?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Duration has not been confirmed for this course. Call +91 73030 82191 for the current batch schedule.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is the training online or offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SkillSha runs online, offline and hybrid formats across its programmes. Confirm the format for this batch with the counsellor.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is performance marketing different from digital marketing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Digital marketing is the broad field (SEO, content, social, email, paid). Performance marketing is the paid, outcome-measured part. See SkillSha's Digital Marketing course in Noida for the wider scope.",
            },
          },
          {
            '@type': 'Question',
            name: 'What is ROAS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Return on ad spend: revenue from ads divided by ad cost. If ₹10,000 of ads produces ₹40,000 in sales, ROAS is 4.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to know coding?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Some tracking work involves pasting code snippets, which you will be shown how to do.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need my own ad budget?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Practice with real spend teaches the most, but small budgets work. Ask what the course provides.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will I get a certificate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SkillSha says a certificate is issued on completion. Confirm completion criteria with the counsellor.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does SkillSha guarantee a job?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. SkillSha offers placement assistance (resume help, mock interviews, referrals). Outcomes depend on your effort and the job market.',
            },
          },
          {
            '@type': 'Question',
            name: 'What jobs can I get after this course?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Roles such as performance marketing executive, PPC specialist, media buyer or marketing analyst, or freelance ads management. Entry-level hiring depends on your portfolio and interview skills.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can working professionals join?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SkillSha states that it offers weekday and weekend batches. Confirm current timings for this course.',
            },
          },
          {
            '@type': 'Question',
            name: 'What payment options are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cash, card and EMI.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I switch from the Digital Marketing course to this one, or the other way?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ask the counsellor. Both exist as separate programmes with different scope.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I report an error on this page?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Email info@skillsha.com with the section and the correction.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <Header />
      <main className="pt-24 md:pt-32 min-h-screen">
        <PerformanceMarketingClient />
      </main>
      <Footer />
      <CounselingModal />
    </>
  );
}
