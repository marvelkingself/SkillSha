export interface RoadmapMilestone {
  period: string; // e.g. "Month 1 (Weeks 1–4)"
  title: string;
  theme: string;
  keyTopics: string[];
  portfolioDeliverable: string;
  learningHoursPerWeek: number;
}

export interface CareerRoadmapResult {
  roleName: string;
  durationMonths: number;
  totalHours: number;
  summary: string;
  milestones: RoadmapMilestone[];
  recommendedCertifications: string[];
  capstoneProject: {
    title: string;
    description: string;
    keyDeliverables: string[];
  };
}

export function generateCareerRoadmap(
  targetRole: string,
  experienceLevel: string,
  durationMonths: number = 6,
  hoursPerWeek: number = 10
): CareerRoadmapResult {
  const roleLower = (targetRole || 'Full Stack Developer').toLowerCase();

  let milestones: RoadmapMilestone[] = [];
  let capstoneProject = {
    title: 'Enterprise Multi-tenant SaaS Platform',
    description: 'Production-ready web application with authentication, database indexing, payment processing, and CI/CD deployment.',
    keyDeliverables: [
      'Role-based access control (RBAC) & OAuth 2.0',
      'Optimized database schema with Redis caching',
      'Automated testing pipeline with 80%+ coverage',
      'Deployed on Vercel/AWS with custom domain and SSL',
    ],
  };
  let recommendedCertifications = [
    'AWS Certified Developer / Cloud Practitioner',
    'Postman API Fundamentals Student Expert',
    'Meta Front-End Developer Professional Certificate',
  ];

  if (roleLower.includes('frontend') || roleLower.includes('react') || roleLower.includes('next')) {
    if (durationMonths === 3) {
      milestones = [
        {
          period: 'Month 1 (Weeks 1–4)',
          title: 'Modern JavaScript (ES6+), TypeScript & React Core',
          theme: 'Foundation & Components',
          keyTopics: [
            'Async/Await, Closures, Event Loop, DOM APIs',
            'TypeScript strict typing, interfaces, generics',
            'React Hooks (useEffect, useMemo, useCallback, useRef)',
            'State management with Zustand / Context API',
          ],
          portfolioDeliverable: 'Interactive Analytics Dashboard with real-time API filtering and dark mode.',
          learningHoursPerWeek: hoursPerWeek,
        },
        {
          period: 'Month 2 (Weeks 5–8)',
          title: 'Next.js App Router, SSR, Server Actions & Tailwind',
          theme: 'Production Architecture',
          keyTopics: [
            'Server Components vs Client Components architecture',
            'Incremental Static Regeneration (ISR) & Route Handlers',
            'Server Actions, Zod validation & Optimistic UI',
            'Tailwind CSS & Shadcn UI accessible design systems',
          ],
          portfolioDeliverable: 'Full-stack Next.js E-Commerce platform with Stripe checkout and dynamic SEO.',
          learningHoursPerWeek: hoursPerWeek,
        },
        {
          period: 'Month 3 (Weeks 9–12)',
          title: 'Performance Optimization, Core Web Vitals & Interview Prep',
          theme: 'Polishing & Job Hunt',
          keyTopics: [
            'LCP, INP, CLS debugging with Chrome DevTools',
            'Bundle splitting, dynamic imports, image optimization',
            'Unit testing with Jest & React Testing Library',
            'Technical interview drills & GitHub portfolio curation',
          ],
          portfolioDeliverable: 'High-performance portfolio website with 95+ Google Lighthouse scores and live demo links.',
          learningHoursPerWeek: hoursPerWeek,
        },
      ];
    } else {
      milestones = [
        {
          period: 'Month 1–2',
          title: 'Advanced JavaScript, TypeScript & Modern UI Styling',
          theme: 'Frontend Architecture',
          keyTopics: [
            'TypeScript deep dive (Utility types, type narrowing)',
            'DOM performance, WebSockets, custom hooks pattern',
            'Responsive component libraries (Tailwind, Radix UI)',
          ],
          portfolioDeliverable: 'Reusable Component Library published to npm with Storybook documentation.',
          learningHoursPerWeek: hoursPerWeek,
        },
        {
          period: 'Month 3–4',
          title: 'Next.js 15, Server Actions, Caching & Data Layer',
          theme: 'Full Stack Integration',
          keyTopics: [
            'Next.js App Router, Partial Prerendering (PPR)',
            'PostgreSQL & Prisma ORM database connection',
            'NextAuth / Clerk authentication & Protected middleware',
          ],
          portfolioDeliverable: 'Collaborative Real-time Kanban Workspace with WebSockets and drag-and-drop.',
          learningHoursPerWeek: hoursPerWeek,
        },
        {
          period: 'Month 5–6',
          title: 'Enterprise Scalability, Testing, CI/CD & Placement Launch',
          theme: 'Enterprise Readiness',
          keyTopics: [
            'End-to-end testing with Playwright / Cypress',
            'Docker containerization & GitHub Actions automated tests',
            'System design for frontends & live mock interviews',
          ],
          portfolioDeliverable: 'Production Multi-tenant SaaS with custom subdomains and Stripe billing.',
          learningHoursPerWeek: hoursPerWeek,
        },
      ];
    }
  } else if (roleLower.includes('data') || roleLower.includes('analyst')) {
    milestones = [
      {
        period: 'Month 1',
        title: 'Advanced SQL, Relational Modeling & Excel Analytics',
        theme: 'Data Extraction & Wrangling',
        keyTopics: [
          'Complex Joins, Window Functions (ROW_NUMBER, RANK)',
          'Common Table Expressions (CTEs), Subqueries, Indexing',
          'Pivot tables, Power Query, XLOOKUP, statistical summaries',
        ],
        portfolioDeliverable: 'E-commerce Sales Performance Audit with 10 complex SQL business queries.',
        learningHoursPerWeek: hoursPerWeek,
      },
      {
        period: 'Month 2',
        title: 'Business Intelligence Dashboards (Power BI & Tableau)',
        theme: 'Executive Storytelling',
        keyTopics: [
          'DAX formulas, Star Schema data modeling',
          'Interactive drill-throughs, KPI cards, visual storytelling',
          'Automated data refresh schedules and publishing',
        ],
        portfolioDeliverable: 'Executive SaaS Churn & ARR Dashboard in Power BI with live interactive filters.',
        learningHoursPerWeek: hoursPerWeek,
      },
      {
        period: 'Month 3',
        title: 'Python for Data Analysis (Pandas, NumPy, Seaborn) & Portfolio',
        theme: 'Statistical Insights',
        keyTopics: [
          'Data cleaning, handling missing values with Pandas',
          'Exploratory Data Analysis (EDA) and correlation heatmaps',
          'A/B test hypothesis testing (p-value, t-test, z-test)',
        ],
        portfolioDeliverable: 'End-to-End Customer Lifetime Value (CLV) analysis with Jupyter Notebook report.',
        learningHoursPerWeek: hoursPerWeek,
      },
    ];
    capstoneProject = {
      title: 'Healthcare Patient Readmission Analytics System',
      description: 'SQL + Python + PowerBI system identifying risk indicators and saving hospital costs.',
      keyDeliverables: [
        'Data cleaning script handling 50,000+ patient records',
        'Cohort retention and risk factor analysis',
        'Interactive Power BI report for hospital executives',
      ],
    };
    recommendedCertifications = [
      'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
      'Google Data Analytics Professional Certificate',
    ];
  } else {
    // Universal General Tech / Management roadmap
    milestones = [
      {
        period: 'Phase 1: Core Fundamentals',
        title: 'Industry Tooling, Workflows & Methodologies',
        theme: 'Core Foundations',
        keyTopics: [
          'Industry standard terminology, frameworks, and workflows',
          'Git/GitHub version control or CRM/Jira management',
          'Core domain operational principles',
        ],
        portfolioDeliverable: 'Foundational baseline case study or repository solving a realistic business challenge.',
        learningHoursPerWeek: hoursPerWeek,
      },
      {
        period: 'Phase 2: Execution & Advanced Practice',
        title: 'Practical Application & Complex Scenarios',
        theme: 'Hands-on Execution',
        keyTopics: [
          'Handling edge cases, error resolutions, and escalations',
          'Collaborative sprint management and cross-functional alignment',
          'Metrics measurement (KPIs, OKRs, conversion, throughput)',
        ],
        portfolioDeliverable: 'Comprehensive capstone project demonstrating measurable business value.',
        learningHoursPerWeek: hoursPerWeek,
      },
      {
        period: 'Phase 3: Career Positioning & Interview Mastery',
        title: 'Portfolio Presentation, Resume Tuning & Mock Rounds',
        theme: 'Interview Conversion',
        keyTopics: [
          'STAR method behavioral response preparation',
          'LinkedIn recruiter outreach & resume keyword optimization',
          'Live simulation practice and salary negotiation drills',
        ],
        portfolioDeliverable: 'Complete polished portfolio website and tailored resume ready for active applications.',
        learningHoursPerWeek: hoursPerWeek,
      },
    ];
  }

  const totalHours = durationMonths * 4 * hoursPerWeek;

  return {
    roleName: targetRole,
    durationMonths,
    totalHours,
    summary: `A structured ${durationMonths}-month roadmap designed to take you from your current level to job-ready competency for ${targetRole} with ~${hoursPerWeek} study hours/week.`,
    milestones,
    recommendedCertifications,
    capstoneProject,
  };
}
