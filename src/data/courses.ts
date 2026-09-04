export interface ModuleBullet {
  title: string;
  desc?: string;
  icon?: string;
}

export interface MilestoneModule {
  title: string;
  icon: string;
  bullets: ModuleBullet[];
  color: "orange" | "blue" | "indigo" | "emerald" | "rose" | "amber" | "violet" | "teal";
}

export interface CourseMilestone {
  number: number;
  title: string;
  modules: MilestoneModule[];
}

export interface CourseFAQ {
  q: string;
  a: string;
}

export interface PortfolioProject {
  milestone: number;
  codename: string;
  tagline: string;
  description: string;
  bg: string;        // CSS background color / gradient
  shape: "star4" | "starburst" | "flower" | "spiral" | "wave" | "aura" | "diamond" | "hexburst";
}

export interface CourseData {
  title: string;
  typewriter: string[];
  description: string;
  duration: string;
  salary: string;
  liveSessions: string;
  projects: string;
  milestoneWord: string;
  milestones: CourseMilestone[];
  faqs: CourseFAQ[];
  portfolioProjects?: PortfolioProject[];
  flagshipContent?: any;
}

import { CITIES_LIST } from "@/data/cities";

export const COURSE_SLUG_MAP: Record<string, string> = {
  "ai-engineering": "ai-engineering-course-with-gen-ai",
  "full-stack-development": "full-stack-development-course-with-gen-ai",
  "digital-marketing-with-gen-ai": "digital-marketing-course-with-gen-ai",
  "digital-marketing-noida": "digital-marketing-course-in-noida-with-gen-ai",
  "digital-marketing": "digital-marketing-course-standard-with-gen-ai",
  "ui-ux-design": "ui-ux-design-course-with-gen-ai",
  "data-science-ai": "data-science-course-with-gen-ai",
  "product-management": "product-management-course-with-gen-ai",
  "algorithmic-trading": "algorithmic-trading-course-with-gen-ai",
  "graphic-designing": "graphic-design-course-with-gen-ai",
  "ai-healthcare-doctor": "ai-healthcare-doctor-course-with-gen-ai",
  "ai-clinical-nurse": "ai-clinical-nurse-course-with-gen-ai",
  "ai-finance-ca": "ai-finance-ca-course-with-gen-ai",
  "data-analyst": "data-analyst-course-with-gen-ai",
  "business-analyst": "business-analyst-course-with-gen-ai",
  "ai-ml-with-gen-ai": "ai-ml-course-with-gen-ai",
  "software-testing": "software-testing-course-with-gen-ai",
  "playwright-automation": "playwright-automation-course-with-gen-ai"
};

export function getCourseSlugById(id: string, city?: string): string {
  const base = COURSE_SLUG_MAP[id] || `${id}-course-with-gen-ai`;
  if (city) {
    if (id === "digital-marketing-noida") {
      return "digital-marketing-course-in-noida-with-gen-ai";
    }
    if (base.endsWith("-standard-with-gen-ai")) {
      return base.replace("-standard-with-gen-ai", `-standard-in-${city}-with-gen-ai`);
    }
    if (base.endsWith("-course-with-gen-ai")) {
      return base.replace("-course-with-gen-ai", `-course-in-${city}-with-gen-ai`);
    }
    if (base.endsWith("-course")) {
      return base.replace("-course", `-course-in-${city}-with-gen-ai`);
    }
    return `${base}-in-${city}-with-gen-ai`;
  }
  return base;
}

export function getCourseAndCityFromSlug(slug: string): { id: string | undefined; city: string | undefined } {
  // 1. Try to match without city first (main course pages)
  for (const id of Object.keys(COURSE_SLUG_MAP)) {
    if (getCourseSlugById(id) === slug) {
      return { id, city: undefined };
    }
  }

  // 2. Try to match with city (city-specific pages)
  for (const id of Object.keys(COURSE_SLUG_MAP)) {
    for (const city of CITIES_LIST) {
      if (getCourseSlugById(id, city.slug) === slug) {
        return { id, city: city.slug };
      }
    }
  }

  return { id: undefined, city: undefined };
}

export function getCourseIdBySlug(slug: string): string | undefined {
  return getCourseAndCityFromSlug(slug).id;
}

export const COURSES_DATA: Record<string, CourseData> = {
  "digital-marketing-with-gen-ai": {
    title: "Digital Marketing with Gen AI",
    typewriter: ["Gen AI Marketing", "Meta & Google Ads", "AI Content Engines", "Automation Funnels", "Data-Driven Growth"],
    description: "Master the future of marketing. Combine core growth marketing strategies with Generative AI tools to build high-converting ad engines, automate campaign copy, optimize landing pages, and scale brand distribution.",
    duration: "24 Weeks",
    salary: "₹ 9.5 LPA",
    liveSessions: "45+ hrs",
    projects: "12+",
    milestoneWord: "Ten",
    milestones: [
      {
        number: 1,
        title: "Digital Marketing Fundamentals + AI Basics (Weeks 1-2)",
        modules: [
          {
            title: "Fundamentals & Basics",
            icon: "psychology",
            color: "orange",
            bullets: [
              { title: "What is digital marketing in 2024?", desc: "Core growth strategies", icon: "help" },
              { title: "How has marketing changed with Gen AI?", desc: "Shift in industry standards", icon: "bolt" },
              { title: "Career paths and opportunities in digital marketing", desc: "Key roles and requirements", icon: "trending_up" },
              { title: "Setting up AI tools for marketing workflows", desc: "Setting up Claude & ChatGPT accounts", icon: "settings" },
              { title: "Understanding AI's role as a tool, not a replacement", desc: "Ethical prompting guidelines", icon: "check_circle" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "Content Marketing + AI-Powered Content Creation (Weeks 3-4)",
        modules: [
          {
            title: "Content Marketing Strategy",
            icon: "article",
            color: "blue",
            bullets: [
              { title: "Building content strategies that convert", desc: "Funnel layouts and models", icon: "filter_alt" },
              { title: "Writing for search engines and humans", desc: "Balancing user intent and SEO", icon: "edit_note" },
              { title: "Using AI to scale content production without losing quality", desc: "Scale strategies with LLMs", icon: "text_snippet" },
              { title: "Content calendars and distribution", desc: "Channel distribution plans", icon: "calendar_today" },
              { title: "Measuring content performance", desc: "CTR, conversion rates & metrics", icon: "analytics" }
            ]
          }
        ]
      },
      {
        number: 3,
        title: "SEO Mastery for Global Markets (Weeks 5-6)",
        modules: [
          {
            title: "Global Search Engine Optimization",
            icon: "query_stats",
            color: "rose",
            bullets: [
              { title: "Technical SEO fundamentals", desc: "Indexing, sitemaps and speed checks", icon: "bolt" },
              { title: "Keyword research using AI and traditional methods", desc: "SEMrush and keyword clustering", icon: "search" },
              { title: "Competitor analysis and market positioning", desc: "Spying on organic strategies", icon: "find_in_page" },
              { title: "Link-building and domain authority", desc: "Acquiring high-quality links", icon: "link" },
              { title: "International SEO considerations", desc: "Hreflang and global CDNs", icon: "public" }
            ]
          }
        ]
      },
      {
        number: 4,
        title: "Social Media Marketing Worldwide (Weeks 7-8)",
        modules: [
          {
            title: "Social Platforms & Distribution",
            icon: "groups",
            color: "violet",
            bullets: [
              { title: "Platform-specific strategies (LinkedIn, Instagram, Facebook, TikTok, Twitter/X)", desc: "Organic and profile setups", icon: "share" },
              { title: "Community management and engagement", desc: "Growing and nurturing audiences", icon: "chat" },
              { title: "Content creation and scheduling", desc: "Automating publication loops", icon: "schedule" },
              { title: "Paid social advertising", desc: "Boosting and amplifying organic reach", icon: "campaign" },
              { title: "Using AI for trend analysis and content optimization", desc: "Tuning assets based on data", icon: "trending_up" }
            ]
          }
        ]
      },
      {
        number: 5,
        title: "Paid Advertising Mastery (Weeks 9-10)",
        modules: [
          {
            title: "Google & Meta Advertising",
            icon: "ads_click",
            color: "indigo",
            bullets: [
              { title: "Google Search Ads and display advertising", desc: "Keyword bids and asset groups", icon: "search" },
              { title: "Performance marketing fundamentals", desc: "Understanding unit economics", icon: "payments" },
              { title: "Facebook and Instagram advertising at scale", desc: "Warm and cold targeting funnels", icon: "photo_library" },
              { title: "YouTube advertising strategies", desc: "Bumper and skippable videography", icon: "movie" },
              { title: "Budget optimization and ROI tracking", desc: "Scaling high-performing creatives", icon: "trending_up" },
              { title: "AI for predictive campaign performance", desc: "Simulating ad test splits", icon: "psychology" }
            ]
          }
        ]
      },
      {
        number: 6,
        title: "Email Marketing & Marketing Automation (Weeks 11-12)",
        modules: [
          {
            title: "Lifecycle & Email Channels",
            icon: "email",
            color: "teal",
            bullets: [
              { title: "Building engaged email lists", desc: "Opt-ins and lead magnet designs", icon: "list" },
              { title: "Segmentation and personalization", desc: "Tuning emails based on user tags", icon: "person" },
              { title: "Email sequences and automation", desc: "Welcome loops and winbacks", icon: "loop" },
              { title: "A/B testing and optimization", desc: "Optimizing subject headers & CTR", icon: "check" },
              { title: "Marketing automation platforms globally", desc: "Configuring HubSpot & Klaviyo", icon: "settings" }
            ]
          }
        ]
      },
      {
        number: 7,
        title: "Analytics, Data & AI-Driven Decisions (Weeks 13-14)",
        modules: [
          {
            title: "GA4, Tags & Attribution",
            icon: "analytics",
            color: "amber",
            bullets: [
              { title: "Google Analytics 4 mastery", desc: "Custom tags, audiences & paths", icon: "analytics" },
              { title: "Data interpretation for strategic decisions", desc: "Translating traffic to ROI sheets", icon: "table_chart" },
              { title: "Creating dashboards and reports", desc: "Google Looker Studio reporting", icon: "dashboard" },
              { title: "Predictive analytics with machine learning", desc: "Modeling prospective churn trends", icon: "trending_up" },
              { title: "Converting data into actionable insights", desc: "Presenting updates to stakeholders", icon: "article" }
            ]
          }
        ]
      },
      {
        number: 8,
        title: "AI Integration & Advanced Workflows (Weeks 15-16)",
        modules: [
          {
            title: "Automations, Agents & Workflows",
            icon: "timeline",
            color: "emerald",
            bullets: [
              { title: "Comprehensive AI toolkit for marketers", desc: "Prompt library schemas", icon: "terminal" },
              { title: "Automating routine tasks", desc: "Connecting scraping tools via Make.com", icon: "loop" },
              { title: "Customer journey mapping with AI", desc: "Simulating user flow conversion", icon: "map" },
              { title: "Chatbots and conversational marketing", desc: "Configuring CRM answer bots", icon: "chat" },
              { title: "Ethical AI in marketing", desc: "Copyright compliance protocols", icon: "gavel" }
            ]
          }
        ]
      },
      {
        number: 9,
        title: "Portfolio & Career Preparation (Week 17)",
        modules: [
          {
            title: "Resume, GitHub & Mentorship",
            icon: "business_center",
            color: "violet",
            bullets: [
              { title: "Polishing your digital marketing portfolio", desc: "Showcasing live campaign audits", icon: "photo_library" },
              { title: "GitHub portfolio presentation", desc: "Storing automation scripts & sheets", icon: "terminal" },
              { title: "Interview preparation for global companies", desc: "Mock panels with growth leads", icon: "groups" },
              { title: "Salary negotiation strategies", desc: "Maximizing retainer contract sizes", icon: "payments" }
            ]
          }
        ]
      },
      {
        number: 10,
        title: "Capstone Project (Weeks 18-24)",
        modules: [
          {
            title: "Real-World Campaign Execution",
            icon: "handshake",
            color: "orange",
            bullets: [
              { title: "Real-world client project", desc: "Deploying active live ads budgets", icon: "payments" },
              { title: "Complete campaign management", desc: "Taking client requirements to execution", icon: "timeline" },
              { title: "Strategy to execution", desc: "Delivering qualified conversions", icon: "check_circle" },
              { title: "Team collaboration", desc: "Using Slack, Notion and Figma shares", icon: "groups" },
              { title: "Post-campaign analysis and reporting", desc: "Presenting metrics to client panels", icon: "article" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do I need prior marketing experience for this Digital Marketing Course?", a: "Not at all. Our Digital Marketing Course is designed for complete beginners. We start from fundamentals and build up. Even professionals from other fields succeed because the curriculum is structured logically. Prior experience is helpful but not required." },
      { q: "How much time should I dedicate weekly to this Digital Marketing Course?", a: "We recommend 5-6 hours per week for live classes plus assignments. If you're self-paced, you can distribute this however you like. Most people complete the Digital Marketing Course in 6 months, but can accelerate or extend based on schedule." },
      { q: "Will this Digital Marketing Course help me get a job internationally?", a: "Yes. The skills taught in our Digital Marketing Course are universally applicable. Graduates work for international brands, multinationals, and digital agencies worldwide. However, visa requirements depend on specific country policies—our role is training you to be job-ready." },
      { q: "Is AI going to replace me after I learn this Digital Marketing Course?", a: "No. AI is a tool, not a replacement. This Digital Marketing Course teaches you to leverage AI for better work. Good marketers become better with AI; mediocre marketers stay mediocre. You'll learn when to use AI and when to use human judgment—that's the real skill." },
      { q: "What if I want to specialize in one area after the Digital Marketing Course?", a: "Perfect. Our Digital Marketing Course teaches everything, but you can deepen any specialty. Many graduates take additional certifications in their chosen area (advanced SEO, performance marketing, etc.). We provide guidance on specialization paths." },
      { q: "Is the certification from this Digital Marketing Course recognized by employers?", a: "Yes. Skillsha's certificate is recognized globally by companies hiring digital marketers. More importantly, your portfolio of real projects speaks louder than any certificate. Employers care about what you can do, and our Digital Marketing Course ensures you can do real work." },
      { q: "What's the refund policy for this Digital Marketing Course?", a: "7-day money-back guarantee if you're unsatisfied after the first week. After 7 days, we offer course pause options but don't refund (since the content has value regardless of completion)." },
      { q: "Can I access the Digital Marketing Course materials after completion?", a: "Yes. You get lifetime access to course materials and all future updates. As digital marketing evolves, we update content, and you benefit from those updates forever." },
      { q: "Will this Digital Marketing Course make me independent for freelancing?", a: "Yes. Many Digital Marketing Course graduates become successful freelancers or agency owners. The practical skills and portfolio enable freelance work. Some prefer employment, others prefer freelance freedom—both are viable paths." },
      { q: "How does this Digital Marketing Course differ from free resources online?", a: "Free resources are scattered, inconsistent, and outdated. Our Digital Marketing Course is structured, current, taught by active professionals, includes projects, and offers placement support. Plus, the discipline of a formal course ensures you actually complete it." },
      { q: "Can I get a job while taking this Digital Marketing Course?", a: "Yes. Many students work part-time or full-time while taking our Digital Marketing Course. The flexible self-paced option works for employed professionals. You're learning skills that help your current job too." },
      { q: "What's the time commitment to get placed after this Digital Marketing Course?", a: "Average is 30-45 days from course completion to job offer. We actively help with placement during the course (mock interviews, portfolio building), so you're interview-ready on day one after completing the Digital Marketing Course." }
    ],
    portfolioProjects: [
      {
        milestone: 1,
        codename: "AURA",
        tagline: "Build Your AI Content Machine",
        description: "Develop a custom-tailored prompt library for generating ad copy hooks, email drip sequences, and blog posts with high CTR ratings.",
        bg: "#F9C5C0",
        shape: "star4"
      },
      {
        milestone: 2,
        codename: "ECHO",
        tagline: "Deploy a Live AI Campaign Funnel",
        description: "Build an optimized landing page, deploy Meta ads with AI creative tools, and set up tracking analytics for conversion optimization.",
        bg: "#C5E3F9",
        shape: "diamond"
      },
      {
        milestone: 3,
        codename: "NEXUS",
        tagline: "Automate Growth Workflows",
        description: "Set up multi-step automated marketing pipelines connecting scraping tools, LLMs, and social posting systems.",
        bg: "#D4F1C5",
        shape: "hexburst"
      }
    ],
    flagshipContent: {
      heroSubtext: "Ready to build a global career in digital marketing? Skillsha's Digital Marketing Course is designed for professionals worldwide who want to master modern marketing strategies powered by generative AI.\n\nThis isn't outdated training from 2015. This is a comprehensive Digital Marketing Course that combines proven marketing fundamentals with cutting-edge Gen AI tools that top companies are using right now in 2024 and beyond.\n\nWhether you're in North America, Europe, Asia, or anywhere globally, digital marketing jobs are in high demand. The challenge? Most Digital Marketing Training still teaches traditional methods. Skillsha bridges that gap by integrating AI into every aspect of your Digital Marketing Course.\n\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available Worldwide",
      whyChooseList: {
        placement: [
          "Direct introductions to 500+ hiring companies globally",
          "Mock interviews with industry professionals from top companies",
          "Resume optimization for international job applications",
          "LinkedIn profile building for global visibility",
          "Portfolio reviews that impress international recruiters"
        ],
        ai: [
          "ChatGPT for content creation and strategy",
          "DALL-E and Midjourney for visual content at scale",
          "Predictive analytics with AI",
          "Marketing automation powered by machine learning",
          "Personalization at scale using AI"
        ],
        trainers: [
          { name: "Mr. Shad", title: "Performance Marketing Specialist", bullets: ["Experience: 12+ years in SEM and conversion optimization", "Specialization: Google Ads, paid search, ROI optimization", "Global Work: Managed campaigns across USA, UK, Germany, India, and Southeast Asia", "Companies: Has worked with 50+ brands globally, from startups to enterprises", "Expertise: Performance marketing that delivers measurable results"], quote: "Shad breaks down complex bidding strategies into actionable steps" },
          { name: "Mr. Akshay Mishra", "img": "", title: "Social Media & Brand Strategy Expert", bullets: ["Experience: 10+ years in social media marketing and brand building", "Specialization: Content strategy, community building, viral marketing", "Global Work: Managed international campaigns for lifestyle and tech brands", "Companies: Built social presence for brands across multiple continents", "Expertise: Creating engaged communities and brand visibility at scale"], quote: "Mr. Akshay's real-world examples are incredibly practical" },
          { name: "Ms. Hema", title: "Email & Marketing Automation Expert", bullets: ["Experience: 6+ years in email marketing and marketing automation", "Specialization: Email funnels, customer lifecycle marketing, automation", "Global Work: Expert with international marketing automation platforms", "Companies: Helped businesses automate customer engagement globally", "Expertise: Building scalable marketing systems with automation"], quote: "Hema teaches conversion psychology through email" }
        ],
        pricing: [
          "Regular price: ₹30,000 / approximately $360 USD / €330 EUR equivalent",
          "Special discount: ₹15,000 / $180 USD / €165 EUR (50% off)",
          "Additional cashback: ₹2,000 / $24 USD / €22 EUR",
          "0% Interest EMI available worldwide",
          "No hidden charges, transparent pricing",
          "We keep costs low because we believe quality digital marketing education shouldn't be expensive."
        ]
      },
      differences: [
        {
          title: "1. Real-World, Globally-Relevant Projects",
          bullets: [
            "Launch a complete ad campaign (from strategy to execution)",
            "Create an SEO-optimized content strategy",
            "Build an email marketing funnel with automation",
            "Develop a social media growth strategy",
            "Create AI-powered content workflows",
            "Run live marketing experiments with real results"
          ]
        },
        {
          title: "2. GitHub Portfolio for Technical Marketers",
          bullets: [
            "Marketing automation scripts",
            "Analytics dashboards",
            "Data analysis tools",
            "Competitive intelligence frameworks",
            "Custom marketing solutions"
          ]
        },
        {
          title: "3. Industry-Recognized Certification",
          bullets: [
            "Our Digital Marketing Course certification is respected globally. We've designed it to meet international standards and is recognized by companies worldwide actively hiring digital marketers."
          ]
        },
        {
          title: "4. Live Campaign Experience",
          bullets: [
            "You won't just watch campaigns. During this Digital Marketing Course, you'll run actual marketing campaigns with real budgets. This means:",
            "You see what actually converts",
            "You troubleshoot real problems",
            "You build confidence before your first job",
            "You have case studies for interviews"
          ]
        }
      ],
      skills: [
        {
          category: "Content & Strategy Skills",
          list: [
            "SEO-optimized content creation",
            "Social media content strategy",
            "Copywriting for ads and emails",
            "Using AI for content ideation and creation",
            "Content planning and calendars",
            "Video content for YouTube and social platforms"
          ]
        },
        {
          category: "Technical Marketing Skills",
          list: [
            "Google Analytics 4 setup and analysis",
            "Conversion tracking across platforms",
            "Google Tag Manager basics",
            "Marketing automation platform setup",
            "Analytics dashboard creation",
            "Data interpretation and reporting"
          ]
        },
        {
          category: "Strategic Marketing Skills",
          list: [
            "Complete digital marketing strategy development",
            "Competitor analysis and benchmarking",
            "Audience research and buyer personas",
            "Customer journey mapping",
            "ROI calculation and reporting",
            "Budget allocation across channels"
          ]
        },
        {
          category: "Advertising Skills",
          list: [
            "Google Ads (Search, Display, Shopping, YouTube)",
            "Facebook and Instagram advertising",
            "LinkedIn advertising for B2B",
            "Campaign structure and optimization",
            "A/B testing and experimentation",
            "Paid keyword strategy and bidding"
          ]
        },
        {
          category: "Platform-Specific Skills",
          list: [
            "LinkedIn for B2B and professional marketing",
            "Instagram for visual storytelling",
            "Facebook for audience targeting at scale",
            "YouTube for content marketing",
            "Email platforms and marketing automation",
            "Social media scheduling and management"
          ]
        },
        {
          category: "AI-Powered Skills",
          list: [
            "ChatGPT for content and strategy",
            "DALL-E and visual AI for graphics",
            "AI-powered SEO tools",
            "Predictive analytics",
            "Marketing automation with AI",
            "Ethical AI usage in campaigns"
          ]
        }
      ],
      placement: {
        during: [
          "Week 4: Career counseling and job market orientation",
          "Week 8: Resume and LinkedIn profile optimization",
          "Week 12: Mock interview with industry professional",
          "Week 16: Portfolio review and feedback",
          "Week 20: Final mock interview and confidence building"
        ],
        after: [
          "Your profile added to our global job portal",
          "2-3 job matches sent weekly based on your preferences",
          "Direct referral to 20-30 companies matched to your skills",
          "Weekly job discussion sessions",
          "Updated interview question bank",
          "Ongoing career guidance and support"
        ],
        network: [
          "Fast-growing startups seeking digital talent",
          "Global tech companies expanding teams",
          "Digital agencies with permanent roles",
          "E-commerce companies scaling marketing",
          "SaaS companies in growth mode",
          "Fortune 500 companies with digital divisions"
        ]
      },
      careers: {
        roles: [
          { title: "Digital Marketing Executive/Specialist", salary: "$2,500-$4,000/month globally", duties: "Campaign management, content creation, social media", availability: "Every major market globally" },
          { title: "SEO Specialist", salary: "$3,000-$4,500/month", duties: "Keyword research, content optimization, ranking strategy", availability: "Every country with digital economy" },
          { title: "Content Marketing Manager", salary: "$2,800-$3,800/month", duties: "Blog strategy, content planning, performance tracking", availability: "Tech hubs, startups, established companies" },
          { title: "Paid Ads Specialist", salary: "$3,000-$4,500/month", duties: "Campaign setup, optimization, ROI management", availability: "Agencies, e-commerce, SaaS companies globally" },
          { title: "Email Marketing Specialist", salary: "$2,500-$3,500/month", duties: "Email campaigns, list management, automation", availability: "E-commerce, subscription services, B2C brands" },
          { title: "Social Media Manager", salary: "$2,500-$4,000/month", duties: "Community management, content, engagement", availability: "Agencies, startups, brands worldwide" },
          { title: "Growth Marketing Manager", salary: "$3,500-$5,500/month", duties: "Growth experiments, user acquisition, scaling", availability: "High-growth startups, tech companies" }
        ],
        growth: [
          "Year 1-2: Specialize in one area (SEO, paid ads, content, etc.)",
          "Year 3-4: Senior specialist or team lead (managing 3-5 people)",
          "Year 5+: Manager, director, or transition to agency ownership"
        ],
        salaryGrowth: [
          "After 1 year: 20-30% increase typical",
          "After 3 years: 2-3x your starting salary",
          "After 5 years: Experienced professionals earn $8,000-$15,000+/month globally"
        ]
      },
      pricingDetail: {
        rows: [
          { cost: "Regular course fee", amount: "₹30,000" },
          { cost: "50% special discount", amount: "₹15,000" },
          { cost: "Bonus cashback", amount: "₹2,000" },
          { cost: "Your final investment", amount: "₹13,000" }
        ],
        installments: [
          "3-month plan: ₹4,500/month (₹13,500 total)",
          "6-month plan: ₹2,300/month (₹13,800 total)",
          "No hidden fees, transparent pricing",
          "Works worldwide with multiple payment gateways"
        ],
        discounts: [
          "Enrolling 3+ people? Additional 10% discount per person",
          "Perfect for team upskilling",
          "Volume pricing available"
        ],
        includes: [
          "24 weeks (6 months) of structured training",
          "Live classes with industry experts",
          "Recorded sessions for flexibility",
          "Complete course materials and resources",
          "Real-world projects and campaigns",
          "10+ mock interviews with professionals",
          "Portfolio review and optimization",
          "GitHub portfolio building",
          "Industry-recognized certificate",
          "100% placement support",
          "Lifetime access to updates",
          "Alumni community and network",
          "Personal mentorship",
          "Job interview preparation"
        ]
      },
      stories: [
        { name: "Sarah M. (United States)", before: "Customer service representative, $32,000/year", after: "Digital Marketing Manager at SaaS startup, $52,000/year", body: "The Digital Marketing Course gave me structured knowledge I couldn't find elsewhere. Within 45 days of finishing, I was hired by a fast-growing startup. The practical projects were invaluable—I had real campaign examples in my portfolio. Now I manage a $500k annual ad budget.", result: "63% salary increase, remote work opportunity" },
        { name: "Amit K. (India)", before: "B.Tech graduate, struggling with direction", after: "Content Marketing Manager at lifestyle brand, ₹45,000/month", body: "I was lost after college. This Digital Marketing Course showed me a clear career path. The AI modules specifically impressed my employer—they saw I could use modern tools effectively. Six months after completion, I got promoted.", result: "Clear career trajectory, salary growing annually" },
        { name: "Lisa T. (Germany)", before: "Career changer from finance, €40,000/year", after: "Performance Marketing Manager at e-commerce company, €58,000/year", body: "The Digital Marketing Training was intense but worth every euro. The trainers explained complex concepts clearly. I landed a role within 2 months. My finance background combined with marketing skills made me valuable. Now leading a team.", result: "Career switch successful, 45% salary increase" },
        { name: "Rajesh P. (Southeast Asia)", before: "Digital marketer using outdated strategies, uncertain about AI", after: "Growth Marketer, agency, 2x salary increase", body: "I was worried AI would replace my job. This Digital Marketing Course showed me how to leverage it instead. Learned tools like ChatGPT, predictive analytics, marketing automation. Got promoted within a year, now leading digital strategy.", result: "Career security, significant salary increase, promotion" }
      ],
      enrollment: [
        { step: "Step 1", title: "Free Consultation Call", bullets: ["Schedule with our course advisor (5-minute online form)", "Discuss your goals and background", "Learn about format options", "Clarify payment plans for your region", "No pressure, no commitment"] },
        { step: "Step 2", title: "Take the Free Assessment", bullets: ["20-minute evaluation", "Understand your current knowledge", "Identify your learning goals", "Get personalized recommendations", "Learn which course format suits you best"] },
        { step: "Step 3", title: "Choose Your Learning Format", bullets: ["Live Interactive Sessions: Real-time classes with trainers, Direct interaction with instructors, Group learning and networking, Q&A during sessions, Ideal for accountability and interaction", "Self-Paced with Recorded Sessions: Watch sessions whenever you want, Learn at your speed, Weekly live doubt-clearing (optional), More flexible for busy professionals, Complete in 3-6 months"] },
        { step: "Step 4", title: "Complete Enrollment", bullets: ["Choose payment plan", "Sign course agreement", "Receive login credentials", "Get start date confirmation"] },
        { step: "Step 5", title: "Begin Your Digital Marketing Course", bullets: ["Access course platform", "Download materials", "Join community", "Attend orientation", "Start learning!"] }
      ],
      quickFacts: [
        "Duration: 24 weeks (adjustable based on learning pace)",
        "Format: Live or self-paced, both equally effective",
        "Cost: 50% discount available (₹13,000 / ~$156 USD / ~€145 EUR)",
        "Payment: 0% interest EMI option globally",
        "Placement: 100% support, 94% success rate",
        "Certificate: Industry-recognized worldwide",
        "Access: Lifetime course material access",
        "Mentorship: Personal guidance from trainers",
        "Community: Global network of marketers"
      ],
      disclaimer: "Disclaimer: Results vary based on individual effort, prior experience, and market conditions. While we maintain 94% placement rate, employment is not guaranteed. Course outcomes depend on active participation and commitment."
    }
  },
  "digital-marketing-noida": {
    title: "Digital Marketing Course in Noida with Gen AI",
    typewriter: ["Noida Growth Marketing", "Meta & Google Ads", "AI Content Engines", "NCR Campaigns", "Data-Driven Strategy"],
    description: "Master the future of marketing in Noida. Combine core growth marketing strategies with Generative AI tools to build high-converting ad engines, automate campaign copy, optimize landing pages, and scale brand distribution.",
    duration: "24 Weeks",
    salary: "₹ 9.5 LPA",
    liveSessions: "45+ hrs",
    projects: "12+",
    milestoneWord: "Ten",
    milestones: [
      {
        number: 1,
        title: "Digital Marketing Foundations + AI Basics (Weeks 1-2)",
        modules: [
          {
            title: "Foundations & Noida Market",
            icon: "psychology",
            color: "orange",
            bullets: [
              { title: "What digital marketing actually is (beyond buzzwords)", desc: "Core concepts", icon: "help" },
              { title: "Noida's digital marketing job market—what companies are hiring", desc: "Local hiring landscapes", icon: "location_on" },
              { title: "Gen AI fundamentals for marketers", desc: "Understanding the shift", icon: "bolt" },
              { title: "Setting up your AI tools for marketing", desc: "Workspace setups", icon: "settings" },
              { title: "Understanding the difference between AI automation and strategic thinking", desc: "Strategy vs output", icon: "check_circle" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "Content Marketing + AI-Powered Content Creation (Weeks 3-4)",
        modules: [
          {
            title: "Content Marketing Strategy",
            icon: "article",
            color: "blue",
            bullets: [
              { title: "Building a content strategy that converts", desc: "Funnel alignment", icon: "filter_alt" },
              { title: "Writing for search engines and humans", desc: "Readability and search rules", icon: "edit_note" },
              { title: "Using AI tools to accelerate content creation (without losing quality)", desc: "Scale strategies", icon: "text_snippet" },
              { title: "Content calendars and publishing schedules", desc: "Organizing distribution", icon: "calendar_today" },
              { title: "Measuring content performance with real metrics", desc: "Performance tracking", icon: "analytics" }
            ]
          }
        ]
      },
      {
        number: 3,
        title: "SEO Mastery for Noida & NCR Markets (Weeks 5-6)",
        modules: [
          {
            title: "Local & Technical SEO",
            icon: "query_stats",
            color: "rose",
            bullets: [
              { title: "Technical SEO that actually improves rankings", desc: "Site speed and indexing", icon: "bolt" },
              { title: "Keyword research using both traditional and AI methods", desc: "Noida and global terms", icon: "search" },
              { title: "Competitor analysis and differentiation", desc: "Noida competitor analysis", icon: "find_in_page" },
              { title: "Link-building strategies that work", desc: "Domain authority acquisition", icon: "link" },
              { title: "Local SEO for Noida and NCR businesses", desc: "GMB and local queries", icon: "location_on" }
            ]
          }
        ]
      },
      {
        number: 4,
        title: "Social Media Marketing + Community Building (Weeks 7-8)",
        modules: [
          {
            title: "Social Platforms & Listening",
            icon: "groups",
            color: "violet",
            bullets: [
              { title: "Platform-specific strategies (LinkedIn, Instagram, Facebook, Twitter/X)", desc: "Brand building", icon: "share" },
              { title: "Content creation and scheduling", desc: "Automating posts", icon: "schedule" },
              { title: "Community management and engagement", desc: "Direct interactions", icon: "chat" },
              { title: "Using AI for social listening and trend analysis", desc: "Scoping viral hooks", icon: "trending_up" },
              { title: "Paid social advertising with strategic AI optimization", desc: "Targeted campaigns", icon: "campaign" }
            ]
          }
        ]
      },
      {
        number: 5,
        title: "Paid Advertising Mastery (Google Ads & Facebook Ads) (Weeks 9-10)",
        modules: [
          {
            title: "Paid Ads & Bidding",
            icon: "ads_click",
            color: "indigo",
            bullets: [
              { title: "Google Search Ads fundamentals and advanced strategies", desc: "Bidding and keywords", icon: "search" },
              { title: "Performance marketing tactics", desc: "NCR ROI economics", icon: "payments" },
              { title: "Facebook and Instagram advertising", desc: "Creative targeting", icon: "photo_library" },
              { title: "Audience targeting and segmentation", desc: "Audience builders", icon: "groups" },
              { title: "ROI tracking and optimization", desc: "Maximizing budget spend", icon: "trending_up" },
              { title: "Using AI to predict ad performance", desc: "CTR forecasting", icon: "psychology" }
            ]
          }
        ]
      },
      {
        number: 6,
        title: "Email Marketing & Marketing Automation (Weeks 11-12)",
        modules: [
          {
            title: "Automation & Nurturing",
            icon: "email",
            color: "teal",
            bullets: [
              { title: "Building an email list that converts", desc: "Lead magnet structure", icon: "list" },
              { title: "Segmentation and personalization", desc: "Custom email paths", icon: "person" },
              { title: "Email sequences and automation", desc: "Welcome and winbacks", icon: "loop" },
              { title: "A/B testing and optimization", desc: "Subject and CTA experiments", icon: "check" },
              { title: "Using AI for subject line generation and send-time optimization", desc: "Optimizing delivery", icon: "settings" }
            ]
          }
        ]
      },
      {
        number: 7,
        title: "Analytics, Data & AI-Driven Decision Making (Weeks 13-14)",
        modules: [
          {
            title: "GA4 & Data interpretation",
            icon: "analytics",
            color: "amber",
            bullets: [
              { title: "Google Analytics 4 mastery", desc: "Tracking metrics", icon: "analytics" },
              { title: "Creating dashboards that matter", desc: "Visualizations", icon: "dashboard" },
              { title: "Data interpretation for non-technical people", desc: "Simple insights", icon: "table_chart" },
              { title: "Predictive analytics with AI", desc: "Modeling trends", icon: "trending_up" },
              { title: "Building reports that influence decisions", desc: "Decision tracking", icon: "article" }
            ]
          }
        ]
      },
      {
        number: 8,
        title: "AI Tools Integration & Advanced Workflows (Weeks 15-16)",
        modules: [
          {
            title: "Workflows & Automations",
            icon: "timeline",
            color: "emerald",
            bullets: [
              { title: "Comprehensive AI tool kit for digital marketers", desc: "Selecting the best LLMs", icon: "terminal" },
              { title: "Automating repetitive tasks", desc: "Make and Zapier connections", icon: "loop" },
              { title: "AI-powered customer journey mapping", desc: "Tracing conversions", icon: "map" },
              { title: "Building chatbots for customer engagement", desc: "Chat integrations", icon: "chat" },
              { title: "Ethical AI usage in marketing", desc: "Best practices", icon: "gavel" }
            ]
          }
        ]
      },
      {
        number: 9,
        title: "Portfolio & Career Preparation (Week 17)",
        modules: [
          {
            title: "Resume & Portfolio Preparation",
            icon: "business_center",
            color: "violet",
            bullets: [
              { title: "Polishing your digital marketing portfolio", desc: "Highlighting Noida case studies", icon: "photo_library" },
              { title: "GitHub portfolio for technical marketers", desc: "Publishing automation scripts", icon: "terminal" },
              { title: "Interview preparation and confidence building", desc: "Local mock panels", icon: "groups" }
            ]
          }
        ]
      },
      {
        number: 10,
        title: "Live Project & Capstone (Weeks 18-24)",
        modules: [
          {
            title: "Capstone Client Project",
            icon: "handshake",
            color: "orange",
            bullets: [
              { title: "Real client project (often resulting in actual work opportunities)", desc: "Noida client projects", icon: "payments" },
              { title: "Strategy development to execution", desc: "Campaign roadmap", icon: "timeline" },
              { title: "Team-based digital marketing campaigns", desc: "Group coordination", icon: "groups" },
              { title: "Post-campaign analysis and reporting", desc: "Final ROI sheets", icon: "article" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do I need prior marketing experience to join the Digital Marketing Course in Noida?", a: "Not at all. Our Digital Marketing Course in Noida is designed for complete beginners. Even if you're coming from a different field, we start from basics. That said, professionals with non-marketing backgrounds also benefit from learning modern AI-integrated strategies. The curriculum is structured for all levels." },
      { q: "Will the Digital Marketing Course in Noida help me get a job in Noida specifically?", a: "Yes, 60% of our Digital Marketing Course in Noida graduates get placed in Noida itself (tech parks in Sectors 62, 63, and corporate offices in Sector 18). Another 25% get placed in Delhi, and 15% in other NCR areas. Our placement network is strongest in Noida and NCR." },
      { q: "Is the AI component in the Digital Marketing Course in Noida replacing actual marketing skills?", a: "No. AI is a tool we're teaching you to use better. The Digital Marketing Course in Noida teaches you both marketing fundamentals and how to apply AI tools effectively. Real marketing strategy still requires human thinking. AI helps you execute faster, not think differently." },
      { q: "Can I take the Digital Marketing Course in Noida while working a full-time job?", a: "Yes. We offer both live and recorded session options. Many working professionals take 4-6 hours per week for our Digital Marketing Course in Noida and complete it in 6 months. Some accelerate and finish in 4 months. It's flexible." },
      { q: "What if I want to specialize in just one area (like SEO or Paid Ads)?", a: "Our Digital Marketing Course in Noida teaches everything, but you can certainly deepen your expertise in specific areas during the course. We have elective modules and advanced sessions. After completing the course, some graduates take additional specialized certifications." },
      { q: "Does the Digital Marketing Course in Noida certificate have value with employers in Noida and NCR?", a: "Yes. Skillsha's certificate is recognized by companies actively hiring in Noida and NCR. Plus, during the Digital Marketing Course in Noida, you build a portfolio of real work that's more impressive than any certificate. Employers care about what you can do, which we ensure through practical projects." },
      { q: "What's the refund policy if I'm not satisfied with the Digital Marketing Course in Noida?", a: "We offer a 7-day money-back guarantee. If you're not satisfied after attending the first week of the Digital Marketing Course in Noida, we'll refund your full investment. No questions asked. After 7 days, we offer to pause the course if you need a break, but refunds aren't applicable (since the content will have value regardless)." },
      { q: "Will learning AI tools in the Digital Marketing Course in Noida make me dependent on them?", a: "No. The Digital Marketing Course in Noida teaches you when to use AI and when to rely on human judgment. We emphasize that AI is a multiplier—good marketers become better marketers with AI. Poor marketers stay poor. You'll learn to think first, then use AI to execute faster." },
      { q: "How much time should I dedicate daily to the Digital Marketing Course in Noida?", a: "We recommend 3-4 hours per week for live classes plus 2-3 hours for assignments and projects. If you're self-paced, you can spread this however you like. Total commitment: 5-6 hours per week over 24 weeks (6 months) to complete the Digital Marketing Course in Noida properly." },
      { q: "Can I get a job abroad with this Digital Marketing Course in Noida certification?", a: "International job requirements vary, but the digital marketing skills taught in our Digital Marketing Course in Noida are universally applicable. Many graduates work for international brands or companies with offices in other countries. However, visa sponsorship and international positions depend on specific company policies—not just your certification." },
      { q: "What's the difference between Skillsha's Digital Marketing Course in Noida and other courses?", a: "Three things: (1) Our trainers actively practice what they teach—they're not just teachers, (2) We focus on AI integration, which most competitors don't, (3) Our placement support is structured and results-backed (94% placement rate). Compare this with generic online courses that teach outdated strategies." },
      { q: "Is the Digital Marketing Course in Noida updated regularly?", a: "Yes. Digital marketing changes fast. We update the Digital Marketing Course in Noida quarterly to reflect new tools, platforms, and AI capabilities. Alumni also get lifetime access to course updates, so your knowledge doesn't become obsolete." }
    ],
    portfolioProjects: [
      {
        milestone: 1,
        codename: "AURA",
        tagline: "Build Your Noida AI Content Machine",
        description: "Develop a custom prompt library for generating ad copy hooks, email drip sequences, and blog posts matching Noida agencies requirements.",
        bg: "#F9C5C0",
        shape: "star4"
      },
      {
        milestone: 2,
        codename: "ECHO",
        tagline: "Deploy a Live AI Campaign in NCR",
        description: "Build an optimized landing page, deploy Meta ads with AI creative tools, and set up tracking analytics for Noida local businesses.",
        bg: "#C5E3F9",
        shape: "diamond"
      },
      {
        milestone: 3,
        codename: "NEXUS",
        tagline: "Automate NCR Growth Workflows",
        description: "Set up multi-step automated marketing pipelines connecting scraping tools, LLMs, and social posting systems for Sector 62 tech hubs.",
        bg: "#D4F1C5",
        shape: "hexburst"
      }
    ],
    flagshipContent: {
      heroSubtext: "Are you looking to build a career in digital marketing? Skillsha's Digital Marketing Course in Noida is your answer. This isn't just any training program—it's a complete transformation journey that combines traditional digital marketing expertise with cutting-edge generative AI tools that shape today's marketing industry.\n\nNoida has become a hub for digital talent, and companies across NCR are actively hiring skilled digital marketers. The only problem? Most courses teach you outdated strategies. Our Digital Marketing Course in Noida bridges that gap by teaching you AI-powered marketing techniques that companies actually use right now.\n\nSpecial Offer: Get 50% Discount (₹15,000 instead of ₹30,000) + ₹2,000 Cashback + 0% Interest EMI Available",
      whyChooseList: {
        placement: [
          "Direct job introductions to 500+ hiring companies in NCR",
          "Mock interviews conducted by industry professionals",
          "Resume and portfolio reviews tailored to job market demands",
          "LinkedIn optimization workshops",
          "Job readiness assessment before placement"
        ],
        ai: [
          "ChatGPT, DALL-E, and specialized marketing AI that professionals use daily",
          "AI for faster campaign creation, better targeting, and smarter content strategy",
          "AI predictive modeling for performance marketing budgets"
        ],
        trainers: [
          { name: "Mr. Shad", title: "Performance Marketing Expert", bullets: ["12+ years in digital marketing", "Specialization: SEM (Search Engine Marketing) and conversion rate optimization", "Background: Worked with 50+ brands ranging from startups to Fortune 500 companies", "Key strength: He'll teach you how to make every rupee of ad spend count"], quote: "Shad explains complex bidding strategies in simple terms" },
          { name: "Mr. Akshay Mishra", "img": "", title: "Social Media & Brand Strategy Specialist", bullets: ["10+ years in social media marketing and brand building", "Specialization: Creating viral campaigns and building engaged communities", "Background: Has managed social media for lifestyle, tech, and e-commerce brands", "Key strength: Practical tactics that actually build brand presence on social platforms"], quote: "Mr. Akshay's case studies made everything click for me" },
          { name: "Ms. Hema", title: "Email & Marketing Automation Expert", bullets: ["6+ years in email marketing and marketing automation", "Specialization: Building email funnels that convert and marketing automation workflows", "Background: Expert in platforms like Mailchimp, ActiveCampaign, HubSpot", "Key strength: Shows you how to nurture leads into paying customers"], quote: "Hema's email sequences taught me conversion psychology" }
        ],
        pricing: [
          "Regular Fee: ₹30,000",
          "Special Discount: ₹15,000 (50% Off)",
          "Bonus: ₹2,000 Cashback",
          "EMI Option: 0% Interest Available",
          "No hidden charges. No surprise fees. Just honest pricing.",
          "We save on overhead to keep prices affordable for Noida students."
        ]
      },
      differences: [
        {
          title: "1. Real-World Projects You'll Actually Build",
          bullets: [
            "A complete Facebook ad campaign for a real product (from strategy to execution)",
            "An SEO-optimized blog strategy and content calendar",
            "A full email marketing funnel with automation",
            "A YouTube channel growth strategy",
            "An AI-powered content creation workflow",
            "A social media analytics dashboard"
          ]
        },
        {
          title: "2. GitHub Portfolio Building",
          bullets: [
            "Marketing automation scripts",
            "Analytics dashboards",
            "Keyword research tools",
            "Competitive analysis frameworks"
          ]
        },
        {
          title: "3. Industry-Recognized Certification",
          bullets: [
            "Our Digital Marketing Course in Noida gives you a certification that Noida, Delhi, and NCR companies recognize. We've partnered with industry bodies to ensure our certification holds actual weight."
          ]
        },
        {
          title: "4. Live Campaigns—Learn by Doing",
          bullets: [
            "You won't just watch our trainers work. In our Digital Marketing Course in Noida, you'll run live marketing campaigns with real budgets and real results.",
            "You see what actually converts and what doesn't",
            "You learn to troubleshoot real campaign issues",
            "You build confidence before your first job"
          ]
        }
      ],
      skills: [
        {
          category: "Content Skills",
          list: [
            "Writing SEO-optimized blog posts",
            "Creating engaging social media content",
            "Copywriting for ads and emails",
            "Using AI for rapid content creation",
            "Content strategy and planning",
            "Video script writing for YouTube"
          ]
        },
        {
          category: "Technical Skills",
          list: [
            "Google Analytics 4 setup and analysis",
            "Google Search Console management",
            "Conversion tracking and implementation",
            "Tag Manager (GTM) basics",
            "Basic marketing automation setup",
            "Dashboard creation for performance tracking"
          ]
        },
        {
          category: "Strategy Skills",
          list: [
            "Building complete digital marketing strategies",
            "Competitor analysis and benchmarking",
            "Audience research and buyer persona creation",
            "Customer journey mapping",
            "ROI calculation and reporting",
            "Budget allocation across channels"
          ]
        },
        {
          category: "Advertising Skills",
          list: [
            "Google Ads (Search, Display, Shopping, YouTube)",
            "Facebook and Instagram advertising",
            "LinkedIn advertising for B2B",
            "Campaign structure and optimization",
            "A/B testing and experimentation",
            "Paid search keyword strategy"
          ]
        },
        {
          category: "Platform-Specific Skills",
          list: [
            "LinkedIn for professional marketing",
            "Instagram for visual storytelling",
            "Facebook for audience targeting",
            "YouTube for content marketing",
            "Email platforms and automation",
            "Social media scheduling and management"
          ]
        },
        {
          category: "AI-Powered Skills",
          list: [
            "ChatGPT for content ideation and creation",
            "DALL-E and Midjourney for visual content",
            "AI-powered SEO tools",
            "Predictive analytics with AI",
            "Marketing automation with AI",
            "Ethical AI usage in campaigns"
          ]
        }
      ],
      placement: {
        during: [
          "Week 4: Career counseling session about Noida's job market",
          "Week 8: Resume and LinkedIn profile optimization workshop",
          "Week 12: Mock interview round 1",
          "Week 16: Portfolio review with industry feedback",
          "Week 20: Mock interview round 2 (real feedback from actual hiring managers)"
        ],
        after: [
          "Your profile is added to our job portal (500+ active job openings)",
          "Dedicated placement coordinator sends you 2-3 job recommendations per week",
          "We forward your profile to 20-30 relevant companies directly",
          "You attend weekly job discussion sessions to practice interviews",
          "We provide updated interview question sets based on latest hiring trends",
          "Certificate and skill verification letters for employers"
        ],
        network: [
          "Growing startups in Noida Tech Park",
          "IT services companies in Sector 62",
          "E-commerce brands (Delhi-based, expanding to NCR)",
          "Agencies specializing in digital marketing services",
          "In-house marketing teams at mid-sized companies",
          "MNCs with digital transformation initiatives"
        ]
      },
      careers: {
        roles: [
          { title: "Digital Marketing Executive", salary: "₹2.5 - 3.5 Lakh/year", duties: "Campaign management, content creation, social media", availability: "Startups, agencies, e-commerce brands" },
          { title: "SEO Specialist", salary: "₹3 - 4.5 Lakh/year", duties: "Keyword research, content optimization, rank tracking", availability: "Digital agencies, SaaS companies, e-commerce" },
          { title: "Content Marketing Executive", salary: "₹2.8 - 3.8 Lakh/year", duties: "Blog writing, content calendar, content performance", availability: "Tech startups, B2B companies, publications" },
          { title: "Paid Ads Specialist (Google/Facebook Ads)", salary: "₹3 - 4 Lakh/year", duties: "Campaign setup, optimization, ROI tracking", availability: "Performance marketing agencies, e-commerce, SaaS" },
          { title: "Email Marketing Specialist", salary: "₹2.5 - 3.5 Lakh/year", duties: "Email campaigns, list management, automation", availability: "E-commerce, subscription services, B2C brands" },
          { title: "Social Media Manager", salary: "₹2.5 - 3.5 Lakh/year", duties: "Community management, content scheduling, engagement", availability: "Startups, agencies, brands, NGOs" },
          { title: "Growth Marketer/Growth Hacker", salary: "₹3.5 - 5 Lakh/year", duties: "Viral marketing, growth experiments, user acquisition", availability: "High-growth startups in Noida and NCR" },
          { title: "Marketing Analyst", salary: "₹3 - 4 Lakh/year", duties: "Data analysis, reporting, strategy recommendations", availability: "E-commerce, tech companies, consulting firms" }
        ],
        growth: [
          "Year 1-2: Specialist in one area (SEO, Paid Ads, Social Media, etc.)",
          "Year 3-4: Senior Specialist or Team Lead (managing 3-4 people)",
          "Year 5+: Marketing Manager, Campaign Director, or transition to agency leadership"
        ],
        salaryGrowth: [
          "After 2 years: ₹4-6 Lakh per year",
          "After 4 years: ₹6-10 Lakh per year",
          "After 6 years: ₹10-15 Lakh+ per year (in management roles)"
        ]
      },
      pricingDetail: {
        rows: [
          { cost: "Regular Course Fee", amount: "₹30,000" },
          { cost: "Special Discount (50% Off)", amount: "₹15,000" },
          { cost: "Bonus Cashback", amount: "₹2,000" },
          { cost: "Final Investment", amount: "₹13,000" }
        ],
        installments: [
          "3-month plan: ₹4,500/month (₹13,500 total)",
          "6-month plan: ₹2,300/month (₹13,800 total)",
          "No hidden fees, transparent pricing",
          "Works worldwide with multiple payment gateways"
        ],
        discounts: [
          "Enrolling 3+ people? Additional 10% discount per person",
          "Perfect for team upskilling in Noida",
          "Volume pricing available"
        ],
        includes: [
          "24 weeks of structured training (6 months)",
          "Access to all course materials and recordings",
          "Real-world project with live campaign management",
          "10+ mock interviews with industry professionals",
          "Portfolio review sessions",
          "GitHub portfolio building",
          "Industry-recognized certificate",
          "100% placement support with job introductions",
          "Lifetime access to updated course materials",
          "Alumni community access (Noida and NCR professionals)",
          "Personal mentorship from trainers",
          "Job interview preparation materials"
        ]
      },
      stories: [
        { name: "Priya M. (Noida)", before: "Working as a customer service executive, earning ₹2 Lakh/year", after: "Digital Marketing Executive at Sector 62 startup, earning ₹3.8 Lakh/year", body: "I was stuck in customer service with no technical skills. The Digital Marketing Course in Noida at Skillsha taught me everything from SEO to paid ads. Within 45 days of course completion, I got placed. The AI modules specifically helped me stand out.", result: "90% salary increase, promotion after 1 year" },
        { name: "Arjun K. (Greater Noida)", before: "B.Tech graduate struggling to find relevant work", after: "Content Marketing Specialist, Delhi brand, earning ₹3.2 Lakh/year", body: "I didn't know what digital marketing was when I started. By week 2 of the Digital Marketing Course in Noida, everything clicked. The content module was the game-changer. Now I manage content for a brand that reaches 500k people monthly.", result: "First job in his interest area, clear career path" },
        { name: "Neha S. (Sector 18, Noida)", before: "Freelancer doing basic social media, income unpredictable", after: "Social Media Manager at Fintech startup, earning ₹2.8 Lakh/year + bonus", body: "The structured curriculum of the Digital Marketing Course in Noida helped me move beyond just posting content. I learned strategy, analytics, and how to measure what actually works. I now manage social for a company targeting millennial investors.", result: "Stable income, health insurance, growth potential" },
        { name: "Rohit P. (Noida)", before: "Marketing professional stuck using outdated strategies", after: "Senior Digital Marketer at e-commerce brand, earning ₹5.5 Lakh/year", body: "The AI integration in the Digital Marketing Course in Noida was exactly what I needed. I was worried about automation replacing my job, but Skillsha showed me how to leverage AI. Got promoted faster than expected.", result: "50% salary increase, management opportunity" }
      ],
      enrollment: [
        { step: "Step 1", title: "Schedule a Free Consultation", bullets: ["Contact Skillsha's course counselor to discuss career goals", "Understand format options & payment plan", "Phone: +91 73030 82191, Email: info@skillsha.com"] },
        { step: "Step 2", title: "Take the Free Intro Assessment", bullets: ["Quick 20-minute evaluation to align goals", "Understand learning style preference", "Identify priority topics"] },
        { step: "Step 3", title: "Choose Your Learning Format", bullets: ["Option A: Instructor-Led Live Classes (Real-time classes, Batch size 15-20, personalized attention)", "Option B: Self-Paced with Recorded Sessions (Watch on schedule, weekly doubt-clearing, complete in 3-6 months)"] },
        { step: "Step 4", title: "Complete Enrollment Formalities", bullets: ["Pay enrollment fee (full or EMI option)", "Sign the course agreement", "Receive login credentials and start date"] },
        { step: "Step 5", title: "Begin Your Journey", bullets: ["Receive course materials & join WhatsApp/Discord community", "Meet your trainer and classmates", "Start with Module 1 (Foundations & AI basics)"] }
      ],
      quickFacts: [
        "Duration: 24 weeks (adjustable based on learning pace)",
        "Format: Live or self-paced, both equally effective",
        "Cost: 50% discount (₹13,000 final cost)",
        "Payment: 0% interest EMI option",
        "Placement: 100% support, 94% success rate",
        "Certificate: Industry-recognized worldwide",
        "Access: Lifetime course updates",
        "Mentorship: Personal guidance from trainers",
        "Community: Alumni network of NCR professionals"
      ],
      disclaimer: "Disclaimer: Results vary based on individual effort, prior experience, and market conditions. While we maintain 94% placement rate, employment is not guaranteed. Course outcomes depend on active participation and commitment."
    }
  },
  "digital-marketing": {
    title: "Digital Marketing",
    typewriter: ["Meta & Google Ads", "Growth Strategy", "Conversion Funnels", "Data Analytics"],
    description: "Build high-converting campaigns across Meta, Google, YouTube, and modern digital channels using data-driven marketing strategies and conversion rate optimization tools.",
    duration: "20 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "30+",
    projects: "10+",
    milestoneWord: "Nine",
    milestones: [
      {
        number: 1,
        title: "Growth Fundamentals & Copywriting",
        modules: [
          {
            title: "Marketing Strategy",
            icon: "query_stats",
            color: "orange",
            bullets: [
              { title: "Understanding modern funnels", desc: "(AARRR framework)", icon: "funnel_chart" },
              { title: "Customer acquisition cost", desc: "(CAC) and LTV metrics", icon: "payments" },
              { title: "Competitor research", desc: "and marketing channels", icon: "find_in_page" }
            ]
          },
          {
            title: "High-Converting Ad Copy",
            icon: "rate_review",
            color: "blue",
            bullets: [
              { title: "Writing hooks that convert", desc: "for Reels/Shorts", icon: "edit_note" },
              { title: "AIDA model framework", desc: "for landing page copies", icon: "text_snippet" },
              { title: "Designing high CTR creatives", desc: "using Canva/Figma", icon: "photo_library" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do I get to manage active budgets?", a: "Yes, the program includes live campaigns where you spend real (provided or personal client) budgets to verify performance." }
    ]
  },
  "data-science-ai": {
    title: "Data Science & AI",
    typewriter: ["Python for Data Science", "Machine Learning & Stats", "Gen AI & Prompt Engineering", "Vector DBs & RAG", "Data-Driven Decision Making"],
    description: "Want a career in data science? Skillsha's Data Science Course with Gen AI teaches you the skills companies are hiring for right now — Python, statistics, SQL, and machine learning — plus how to use AI tools like ChatGPT and Claude to work faster.",
    duration: "28 Weeks (6–7 Months)",
    salary: "₹ 12L+ LPA",
    liveSessions: "45+ hrs",
    projects: "12+",
    milestoneWord: "Ten",
    milestones: [
      {
        number: 1,
        title: "Data Science Foundations + AI Fundamentals (Weeks 1-2)",
        modules: [
          {
            title: "Data Science & AI Basics",
            icon: "psychology",
            color: "orange",
            bullets: [
              { title: "What is data science in 2026?", desc: "Core business analytics workflows", icon: "help" },
              { title: "Data science project lifecycle", desc: "From raw data to final deployment", icon: "autorenew" },
              { title: "Understanding Generative AI roles", desc: "ChatGPT and Claude as co-pilots", icon: "bolt" },
              { title: "Prompting foundations for analytics", desc: "Setting up custom LLM system rules", icon: "terminal" },
              { title: "Setting up development environments", desc: "Jupyter notebooks and VS Code", icon: "settings" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "Python for Data Science & AI (Weeks 3-5)",
        modules: [
          {
            title: "Python Programming Foundation",
            icon: "terminal",
            color: "blue",
            bullets: [
              { title: "Python syntax, lists, dictionaries", desc: "Control flows and standard scripts", icon: "code" },
              { title: "Writing custom analytical functions", desc: "Structuring reusable logic blocks", icon: "settings" },
              { title: "AI-assisted coding and debugging", desc: "Using AI to locate syntax and logic errors", icon: "bug_report" },
              { title: "File handling and CSV parsing", desc: "Reading and loading local datasets", icon: "folder" },
              { title: "Writing clean, PEP 8 standard code", desc: "Using linter setups with AI review", icon: "check_circle" }
            ]
          }
        ]
      },
      {
        number: 3,
        title: "Statistics, Probability & Mathematics (Weeks 6-8)",
        modules: [
          {
            title: "Mathematical Foundations",
            icon: "calculate",
            color: "rose",
            bullets: [
              { title: "Descriptive statistics", desc: "Mean, median, mode, variance, SD", icon: "analytics" },
              { title: "Probability distributions", desc: "Normal, binomial, Poisson models", icon: "show_chart" },
              { title: "Hypothesis testing", desc: "Z-test, T-test, ANOVA, and p-values", icon: "rule" },
              { title: "A/B testing workflows", desc: "Measuring feature conversion impacts", icon: "compare_arrows" },
              { title: "Linear algebra & calculus basics", desc: "Vectors, matrices, derivatives", icon: "functions" }
            ]
          }
        ]
      },
      {
        number: 4,
        title: "Data Wrangling, EDA & Visualization (Weeks 9-11)",
        modules: [
          {
            title: "Data Cleansing & EDA",
            icon: "bar_chart",
            color: "violet",
            bullets: [
              { title: "Pandas and NumPy libraries", desc: "Slicing, grouping, and matrix operations", icon: "table_rows" },
              { title: "Handling messy data", desc: "Imputing null values, handling outliers", icon: "cleaning_services" },
              { title: "Data visualization basics", desc: "Plotting with Matplotlib & Seaborn", icon: "pie_chart" },
              { title: "Exploratory Data Analysis (EDA)", desc: "Spotting correlations and patterns", icon: "find_in_page" },
              { title: "Storytelling with datasets", desc: "Formatting insights for business teams", icon: "article" }
            ]
          }
        ]
      },
      {
        number: 5,
        title: "Machine Learning & Predictive Analytics (Weeks 12-14)",
        modules: [
          {
            title: "Predictive Model Workflows",
            icon: "account_tree",
            color: "indigo",
            bullets: [
              { title: "Supervised vs Unsupervised learning", desc: "Scikit-Learn algorithms toolkit", icon: "balance" },
              { title: "Regression systems", desc: "Linear and polynomial regression models", icon: "trending_up" },
              { title: "Classification algorithms", desc: "Logistic regression, decision trees, random forests", icon: "split_screen" },
              { title: "Model evaluation metrics", desc: "Accuracy, precision, recall, F1-score", icon: "check_circle" },
              { title: "Clustering algorithms", desc: "K-means and hierarchical groupings", icon: "groups" }
            ]
          }
        ]
      },
      {
        number: 6,
        title: "Deep Learning & Neural Networks (Weeks 15-16)",
        modules: [
          {
            title: "Neural Network Architectures",
            icon: "smart_toy",
            color: "teal",
            bullets: [
              { title: "Intro to deep learning structures", desc: "Perceptrons and layers", icon: "layers" },
              { title: "Activation & loss functions", desc: "ReLU, Sigmoid, Cross-Entropy", icon: "show_chart" },
              { title: "Training neural networks", desc: "Backpropagation and optimization", icon: "sync" },
              { title: "Convolutional Neural Networks (CNNs)", desc: "Intro to computer vision", icon: "image" },
              { title: "Recurrent Neural Networks (RNNs)", desc: "Intro to sequential data sequences", icon: "timeline" }
            ]
          }
        ]
      },
      {
        number: 7,
        title: "Generative AI, LLMs & Prompt Engineering (Weeks 17-18)",
        modules: [
          {
            title: "LLM Orchestration & Prompting",
            icon: "chat",
            color: "amber",
            bullets: [
              { title: "How LLMs actually work", desc: "Transformers, weights, tokens", icon: "psychology" },
              { title: "System instructions & role prompts", desc: "Configuring custom AI outputs", icon: "settings" },
              { title: "Few-shot and chain-of-thought", desc: "Tuning AI reasoning behaviors", icon: "link" },
              { title: "Structured data returns (JSON/Markdown)", desc: "Getting reliable outputs", icon: "table_chart" },
              { title: "Mitigating AI biases & hallucination", desc: "Factual boundary checks", icon: "warning" }
            ]
          }
        ]
      },
      {
        number: 8,
        title: "RAG, Vector Databases & AI Agents (Weeks 19-21)",
        modules: [
          {
            title: "Semantic Search & Agents",
            icon: "storage",
            color: "emerald",
            bullets: [
              { title: "Retrieval-Augmented Generation (RAG)", desc: "Grounding LLMs with custom data", icon: "find_in_page" },
              { title: "Vector embedding models", desc: "Converting text chunks to coordinates", icon: "pin" },
              { title: "Pinecone and ChromaDB systems", desc: "High-performance vector indices", icon: "database" },
              { title: "AI agent architectures", desc: "Autonomous planning, tools, and loops", icon: "smart_toy" },
              { title: "Multi-agent systems basics", desc: "Collaborating models for complex goals", icon: "groups" }
            ]
          }
        ]
      },
      {
        number: 9,
        title: "Advanced GenAI, MLOps & AI Deployment (Weeks 22-23)",
        modules: [
          {
            title: "Analytics Apps & MLOps",
            icon: "cloud_upload",
            color: "violet",
            bullets: [
              { title: "Building dashboards with Streamlit", desc: "Fast frontend interfaces for Python", icon: "dashboard" },
              { title: "API wrapping with FastAPI", desc: "Exposing prediction models as endpoints", icon: "api" },
              { title: "MLOps lifecycle basics", desc: "Versioning data models and pipelines", icon: "history" },
              { title: "Deploying data apps to cloud", desc: "Hosting on Vercel and AWS", icon: "cloud" },
              { title: "Monitoring runtime latency", desc: "Tracking token expenses and API errors", icon: "speed" }
            ]
          }
        ]
      },
      {
        number: 10,
        title: "End-to-End Capstone Project (Weeks 24-28)",
        modules: [
          {
            title: "Real-World System Execution",
            icon: "handshake",
            color: "orange",
            bullets: [
              { title: "Comprehensive dataset analytics", desc: "Cleaning, EDA and visualization", icon: "table_rows" },
              { title: "Machine learning model tuning", desc: "Building regression and classification pipelines", icon: "tune" },
              { title: "AI-assisted agent workflows integration", desc: "Adding semantic vector search tools", icon: "bolt" },
              { title: "Interactive Streamlit web release", desc: "Deploying a live analytical dashboard", icon: "dashboard" },
              { title: "Capstone presentation & reporting", desc: "Documenting findings for stakeholders", icon: "article" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do I need prior data science or programming experience?", a: "No. This course is built for complete beginners and starts from the absolute fundamentals. If you've never coded or worked with data before, you can still follow along — the curriculum builds up gradually, one skill at a time." },
      { q: "How much time should I dedicate weekly to the Data Science Course?", a: "Most students spend around 5–6 hours a week on live classes and practice, though this can vary. Self-paced learners can spread this out however fits their schedule. Consistency matters more than doing everything in one long session." },
      { q: "Will this Data Science Course help me get a job internationally?", a: "Yes. The skills you learn — Python, statistics, SQL, and machine learning — are used by data teams worldwide. That said, visa and work-permit rules depend entirely on each country's own policies, which we can't control." },
      { q: "Is AI going to replace me if I learn this course?", a: "No — AI is a tool, not a replacement for your judgment. This course teaches you to use Gen AI to work faster and smarter, but you still need to understand statistics and data science fundamentals to know whether the AI's output actually makes sense." },
      { q: "What if I want to specialize in one area after the course?", a: "That's completely normal. This course gives you a strong, broad foundation across data science. Many graduates later go deeper into one area — like machine learning or NLP — once they know where their interest lies." },
      { q: "Is the certification from this course recognized by employers?", a: "Yes. Skillsha's certificate is recognized by companies hiring data professionals globally. More importantly, your portfolio of real projects speaks louder than any certificate — employers care about what you can do." },
      { q: "What's the refund policy for this Data Science Course?", a: "We offer a 7-day money-back guarantee if you're unsatisfied after your first week. After 7 days, we offer course-pause options rather than a refund, since the content has value regardless of completion." },
      { q: "Can I access course materials after completion?", a: "Yes. You get lifetime access to course materials and future updates. As data science and AI tools evolve, we update the content, and you benefit from those updates for free." },
      { q: "Can this course help me with freelancing?", a: "Yes. Many graduates use their portfolio and skills to take on freelance data analysis or consulting work, either alongside a job or as a full path of their own." },
      { q: "How does this course differ from free resources online?", a: "Free tutorials are scattered and often outdated, with no one to check your work or answer your questions. This course gives you a structured path, real projects, mentor feedback, and placement support — all in one place." },
      { q: "Can I get a job while taking the Data Science Course?", a: "Yes. Many students work full-time or part-time while studying, especially with the self-paced option. Recorded sessions mean you won't fall behind if work gets busy some weeks." },
      { q: "What's the time commitment to get placed after finishing?", a: "Average time from course completion to job offer is around 30–45 days. We start placement support activities — resume help, mock interviews — during the course itself, so you're interview-ready on day one after completing the Data Science Course." }
    ],
    portfolioProjects: [
      {
        milestone: 1,
        codename: "AURA",
        tagline: "Automated Data Cleansing Pipeline",
        description: "Build a Python-based automated dataset parser to clean messy CSV files, impute missing values, handle outliers, and generate automated EDA profiling reports.",
        bg: "#F9C5C0",
        shape: "star4"
      },
      {
        milestone: 2,
        codename: "ECHO",
        tagline: "Predictive Analytics Engine",
        description: "Build a customer churn predictive model using machine learning models, deploying it via API.",
        bg: "#C5E3F9",
        shape: "diamond"
      },
      {
        milestone: 3,
        codename: "NEXUS",
        tagline: "Visual Dashboard App",
        description: "Build an interactive visual analytics dashboard using Streamlit to visualize live data trends.",
        bg: "#D4F1C5",
        shape: "hexburst"
      },
      {
        milestone: 4,
        codename: "SPARK",
        tagline: "Predictive Analytics Dashboard",
        description: "Develop an interactive visual dashboard using Streamlit to visualize business performance metrics and time-series sales forecasts.",
        bg: "#F9E4C5",
        shape: "starburst"
      }
    ],
    flagshipContent: {
      heroSubtext: "Want a career in data science? Skillsha's Data Science Course with Gen AI teaches you the skills companies are hiring for right now — Python, statistics, SQL, and machine learning — plus how to use AI tools like ChatGPT and Claude to work faster.\n\nThis is a complete, hands-on certification program built for beginners, graduates, and working professionals, anywhere in the world. You'll learn by doing real projects, not just watching videos, and you'll get placement support to help you find your first data science job.\n\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available Worldwide",
      whyChooseList: {
        placement: [
          "Get help finding a job with data science, not just learning it",
          "Career counseling and job market orientation with industry experts",
          "Professional resume building and LinkedIn profile optimization",
          "Mock interviews with active, real-world data scientists",
          "Connections to our global network of hiring partners"
        ],
        ai: [
          "Learn ChatGPT and Claude co-piloting to write Python code faster",
          "Generate and optimize complex SQL database queries with AI",
          "Accelerate your data analysis and wrangling tasks using LLMs",
          "Master prompt engineering to ask the right analytical questions",
          "Gain a competitive edge that modern recruiters are actively hunting for"
        ],
        trainers: [
          { name: "Mr. Rahul", title: "Lead Instructor", bullets: ["Focuses on practical, hands-on data analysis", "Connects concepts to real job situations", "Expert in Python scripting and statistical structures", "Passionate about making statistics easy to understand"], quote: "Rahul makes Python syntax and data cleaning feel natural.", img: "", exp: "8+ Yrs Exp" },
          { name: "Mr. Shubham", title: "Machine Learning & Applied AI", bullets: ["Specialist in ML and applied AI workflows", "Teaches model training and pipelines step-by-step", "Expert in Scikit-Learn models and classification", "Helped scale models for global tech startups"], quote: "Shubham helps you move from concepts to building real models.", img: "", exp: "10+ Yrs Exp" },
          { name: "Mr. Gufran", title: "Gen AI & Prompt Engineering", bullets: ["Focuses on AI integrations and prompting rules", "Teaches responsible use of AI tools in analytical work", "Expert in LLM architectures and vector search setups", "Emphasizes double-checking AI output against facts"], quote: "Gufran shows you how to use AI to work 10x faster.", img: "", exp: "6+ Yrs Exp" }
        ],
        pricing: [
          "Regular price: ₹40,000",
          "Special discount: ₹20,000 (50% off)",
          "Additional cashback: ₹2,000 on one-time payment",
          "0% Interest EMI available worldwide",
          "No hidden charges, transparent pricing",
          "Get premium quality data science training at an affordable price."
        ]
      },
      differencesSubtext: "Forget generic slide decks. We build job-ready data professionals with real projects, real datasets, and a verifiable portfolio.",
      differences: [
        {
          title: "1. Real-World, Globally-Relevant Projects",
          bullets: [
            "Clean messy datasets to handle missing values and outliers",
            "Build customer churn machine learning predictive models",
            "Write SQL queries to extract data from corporate databases",
            "Deploy an interactive data dashboard showing analytics logs"
          ]
        },
        {
          title: "2. GitHub Portfolio for Data Professionals",
          bullets: [
            "Python data analysis notebooks",
            "SQL query files and database schemas",
            "Machine learning model codebooks",
            "Streamlit visualization application files"
          ]
        },
        {
          title: "3. Industry-Recognized Certification",
          bullets: [
            "Our Data Science Course certification is designed to meet industry expectations and is recognized by companies actively hiring data professionals worldwide."
          ]
        },
        {
          title: "4. Real, Messy Data Experience",
          bullets: [
            "We skip textbook datasets. You will clean and analyze real, messy data files—exactly like the ones you will see on the job."
          ]
        }
      ],
      toolsSubtext: "Master the complete Data Science, Machine Learning & Gen AI ecosystem through practical tools, technologies, and real-world workflows. Instead of learning tools as a static list, you'll learn how to use them together across the complete data science lifecycle — from data collection and analysis to machine learning, visualization, and AI-powered solutions.",
      skills: [
        {
          category: "Python & Data Analysis",
          list: [
            "Python — Programming fundamentals, functions, OOP, data structures & automation",
            "NumPy — Numerical computing, arrays, mathematical operations & data processing",
            "Pandas — Data cleaning, transformation, manipulation & analysis",
            "Jupyter Notebook — Interactive data analysis, experimentation & documentation",
            "SQL — Database querying, joins, subqueries, CTEs, window functions & analytics"
          ]
        },
        {
          category: "Data Visualization & BI",
          list: [
            "Matplotlib — Statistical and analytical visualizations",
            "Seaborn — Advanced statistical data visualization",
            "Power BI — Interactive dashboards, reports, KPIs & business analytics",
            "Excel — Data analysis, formulas, pivot tables & reporting"
          ]
        },
        {
          category: "Machine Learning",
          list: [
            "Scikit-learn — Classification, regression, clustering & model evaluation",
            "Supervised Learning — Regression and classification algorithms",
            "Unsupervised Learning — Clustering, dimensionality reduction & pattern discovery",
            "Feature Engineering — Feature selection, transformation & optimization",
            "Model Evaluation — Accuracy, precision, recall, F1-score, ROC-AUC & cross-validation"
          ]
        },
        {
          category: "Deep Learning & AI",
          list: [
            "TensorFlow / Keras — Neural networks and deep learning models",
            "PyTorch — Deep learning and AI model development",
            "Neural Networks — Core concepts, architectures & training",
            "Computer Vision — Image classification and visual data processing",
            "NLP — Natural language processing and text-based AI applications"
          ]
        },
        {
          category: "Gen AI & AI-Powered",
          list: [
            "ChatGPT — Python assistance, SQL generation, data analysis & problem solving",
            "Claude — Advanced reasoning, coding assistance & data workflows",
            "Prompt Engineering — Designing effective prompts for professional data tasks",
            "Generative AI — Understanding LLMs, AI workflows & practical applications",
            "AI-Assisted Coding — Generate, debug, optimize and document Python & SQL",
            "AI Data Analysis — Use AI to accelerate exploration, insights and reporting"
          ]
        },
        {
          category: "Databases & Data Eng",
          list: [
            "MySQL / PostgreSQL — Relational database management & advanced SQL",
            "MongoDB — NoSQL data storage and document-based databases",
            "ETL / Data Pipelines — Extract, transform and load data efficiently",
            "Data Cleaning — Handle missing values, duplicates and inconsistent datasets",
            "Data Processing — Prepare large and complex datasets for analysis and modeling"
          ]
        },
        {
          category: "Deployment & Production",
          list: [
            "Git & GitHub — Version control and collaborative development",
            "Streamlit — Build interactive data science and ML applications",
            "APIs — Integrate machine learning models with applications",
            "Cloud Fundamentals — Understand deployment and scalable data workflows",
            "Model Deployment — Deploy trained ML models for real-world use"
          ]
        },
        {
          category: "Complete Workflow",
          list: [
            "Data Collection — Gathering raw data from files, databases, or APIs",
            "SQL & Python Wrangling — Preparing data for ingestion",
            "Data Cleaning & Imputation — Handling outliers and missing values",
            "Exploratory Data Analysis — Visualizing trends and correlations",
            "Model Training & Tuning — Training machine learning & neural network models",
            "Gen AI Integration — Accelerating analytics and report compiling",
            "Model Deployment — Publishing interactive Streamlit applications and APIs"
          ]
        }
      ],
      placement: {
        during: [
          "Week 4: Career path alignment and portfolio audit",
          "Week 8: GitHub analytic portfolio verification",
          "Week 12: Machine learning code audit with mentor",
          "Week 16: Tech resume polish and mock rounds",
          "Week 20: Technical coding case study simulations"
        ],
        after: [
          "Your profile added to our global job portal",
          "2-3 job matches sent weekly based on your preferences",
          "Direct referral to 20-30 companies matched to your skills",
          "Weekly job discussion sessions",
          "Updated interview question bank",
          "Ongoing career guidance and support"
        ],
        network: [
          "Fast-growing startups seeking data talent",
          "Global tech companies expanding data teams",
          "Analytics and consulting firms with permanent roles",
          "E-commerce companies scaling data operations",
          "SaaS companies in growth mode",
          "Companies with dedicated data and AI divisions"
        ]
      },
      careers: {
        marketSentiment: "These roles exist across almost every industry — tech, finance, healthcare, retail, and more — because most companies today collect more data than they know what to do with. That's exactly the gap this course prepares you to fill.",
        roles: [
          {
            title: "Data Analyst",
            availability: "Immediate Placement",
            duties: "Cleans, analyzes, and reports on data using Python and SQL to help business teams make data-driven decisions.",
            keyPoints: [
              "Perform SQL data aggregation & joins",
              "Wrangle and clean messy CSV/Excel datasets",
              "Build interactive charts with Seaborn/Matplotlib",
              "Translate analytical data into visual reports"
            ],
            baseMin: 6,
            baseMax: 9
          },
          {
            title: "Junior Data Scientist",
            availability: "High Demand",
            duties: "Builds, tests, and evaluates early-stage predictive and machine learning models under the guidance of senior leads.",
            keyPoints: [
              "Wrangle features and preprocess datasets",
              "Implement classification and regression algorithms",
              "Tune model hyperparameters using Scikit-Learn",
              "Verify model accuracy, precision, and recall scores"
            ],
            baseMin: 8,
            baseMax: 12
          },
          {
            title: "Data Scientist",
            availability: "Premium Role",
            duties: "Owns the end-to-end data pipeline, from database extraction and statistical analysis to training and deploying production ML models.",
            keyPoints: [
              "Design complex database schemas and model inputs",
              "Build predictive machine learning systems",
              "Expose models as FastAPI wrapper endpoints",
              "Integrate RAG and vector database architectures"
            ],
            baseMin: 12,
            baseMax: 18
          },
          {
            title: "Machine Learning Associate",
            availability: "Immediate Placement",
            duties: "Supports the development, fine-tuning, and deployment of machine learning and neural network models.",
            keyPoints: [
              "Format datasets for ML model ingestion",
              "Conduct parameter efficiency tuning (PEFT/LoRA)",
              "Save and package trained model weights via Joblib",
              "Monitor running pipelines for latency and token use"
            ],
            baseMin: 9,
            baseMax: 13
          },
          {
            title: "Business Intelligence Analyst",
            availability: "High Demand",
            duties: "Turns complex data streams into interactive business dashboards, dashboards, and automated reports for company leadership.",
            keyPoints: [
              "Establish corporate KPI reporting structures",
              "Design interactive visual apps with Streamlit",
              "Optimize PostgreSQL querying databases speed",
              "Build Google Looker Studio & Power BI charts"
            ],
            baseMin: 7,
            baseMax: 10
          },
          {
            title: "Data Analytics Specialist",
            availability: "Immediate Placement",
            duties: "Performs deep-dive analysis on organizational databases and transactional datasets to identify operational bottlenecks and growth opportunities.",
            keyPoints: [
              "Analyze customer cohorts and churn parameters",
              "Run hypothesis testing and statistical models",
              "Wrangle sales and market dataset variables",
              "Generate automated business digests for product teams"
            ],
            baseMin: 8,
            baseMax: 12
          }
        ],
        growth: [
          "Year 1: Deliver clean Python pandas code, SQL schemas, and dashboards",
          "Year 2-3: Senior analyst designing predictive risk models",
          "Year 5+: Lead Scientist directing enterprise analytics teams"
        ],
        salaryGrowth: [
          "Starting package: ₹12L+ per annum average",
          "After 1 year: 20-30% increase typical",
          "After 3 years: 2-3x your starting salary"
        ]
      },
      pricingDetail: {
        rows: [
          { cost: "Regular course fee", amount: "₹40,000" },
          { cost: "50% special discount", amount: "₹20,000" },
          { cost: "Bonus cashback", amount: "₹2,000" },
          { cost: "Your final investment", amount: "₹18,000" }
        ],
        installments: [
          "3-month plan: ₹6,667/month (₹20,000 total)",
          "6-month plan: ₹3,334/month (₹20,000 total)",
          "No cost EMI available globally",
          "No hidden fees, transparent pricing"
        ],
        discounts: [
          "Referral discount: 10% off for group registrations",
          "Corporate upskilling packages available",
          "Team rates on request"
        ],
        includes: [
          "6–7 months of structured, mentor-led training",
          "Live classes with industry experts",
          "Recorded sessions for flexibility",
          "Complete course materials and real datasets",
          "Real-world projects and a full capstone project",
          "Mock interviews with professionals",
          "Portfolio review and optimization",
          "GitHub portfolio building",
          "Industry-recognized certificate",
          "100% placement support",
          "Lifetime access to updates",
          "Alumni community and network",
          "Personal mentorship",
          "Job interview preparation"
        ]
      },
      stories: [
        {
          name: "Wil M. (United States)",
          before: "Non-technical Background",
          after: "Data Analyst, $70k/year",
          body: "Wil came to the course looking for a structured way into data analytics after working in an unrelated field. The step-by-step curriculum, especially the statistics and Python modules, gave him a foundation he could build on.",
          result: "Successfully switched careers to data analytics"
        },
        {
          name: "Rohit K. (India)",
          before: "Recent College Graduate",
          after: "Junior Data Scientist, ₹12L/year",
          body: "Rohit was a recent graduate unsure how to break into data science without prior work experience. Building a portfolio of real projects — not just certificates — made the biggest difference when he started applying for roles.",
          result: "Landed junior data scientist job"
        },
        {
          name: "Isha T. (Germany)",
          before: "Sales Operations Assistant",
          after: "BI Analyst, €50k/year",
          body: "Isha switched careers into data science after several years in a different industry. She found the machine learning and Gen AI modules especially useful, since they matched what employers in her target roles were actually asking about.",
          result: "Transitioned to business intelligence"
        },
        {
          name: "Rahool P. (Southeast Asia)",
          before: "Operations Lead",
          after: "Data Scientist, $65k/year equivalent",
          body: "Rahool already worked with data informally in his job but wanted formal training to move into a dedicated data role. The SQL and machine learning modules helped him formalize skills he'd been using loosely.",
          result: "Promoted to full data scientist"
        }
      ],
      quickFacts: [
        "Format: Live Classes + Portfolio Workshops",
        "Graduation Rate: 94% Secure Job in 60 Days",
        "Refund Policy: 7-Day Money Back Guarantee",
        "Average starting package: ₹12L+ per annum",
        "Access: Lifetime course materials & updates",
        "Certification: Globally verified credential"
      ]
    }
  }
};

export const MENTORS_LIST = [
  { name: "Abhay", img: "/files/Mentors/student-photo-1.webp", company: "Zoho" },
  { name: "Pankhuri", img: "/files/Mentors/student-photo-2.webp", company: "Flipkart" },
  { name: "Lakshit", img: "/files/Mentors/student-photo-3.webp", company: "Razorpay" },
  { name: "Laxmi", img: "/files/Mentors/student-photo-4.webp", company: "Freshworks" },
  { name: "Gauri", img: "/files/Mentors/student-photo-5.webp", company: "Zomato" },
  { name: "Priya", img: "/files/Mentors/student-photo-6.webp", company: "Meesho" },
  { name: "Yogesh", img: "/files/Mentors/student-photo-7.webp", company: "Swiggy" },
  { name: "Ahmad", img: "/files/Mentors/student-photo-8.webp", company: "Paytm" },
  { name: "Abhishek", img: "/files/Mentors/student-photo-9.webp", company: "Cred" },
  { name: "Riya", img: "/files/Mentors/student-photo-10.webp", company: "Nykaa" },
  { name: "Sneha", img: "/files/Mentors/student-photo-12.webp", company: "Zepto" },
  { name: "Manish", img: "/files/Mentors/student-photo-13.webp", company: "PhonePe" },
  { name: "Deepika", img: "/files/Mentors/student-photo-14.webp", company: "Dream11" },
  { name: "Alok", img: "/files/Mentors/student-photo-15.webp", company: "Tata Elxsi" },
  { name: "Shweta", img: "/files/Mentors/student-photo-16.webp", company: "Wipro" },
  { name: "Rahul", img: "/files/Mentors/student-photo-17.webp", company: "TCS" },
  { name: "Kavita", img: "/files/Mentors/student-photo-18.webp", company: "Cognizant" },
  { name: "Suresh", img: "/files/Mentors/student-photo-19.webp", company: "Capgemini" },
  { name: "Meera", img: "/files/Mentors/student-photo-20.webp", company: "HCLTech" },
  { name: "Vikram", img: "/files/Mentors/student-photo-21.webp", company: "Tech Mahindra" },
  { name: "Swati", img: "/files/Mentors/student-photo-22.webp", company: "LTIMindtree" },
  { name: "Gaurav", img: "/files/Mentors/student-photo-23.webp", company: "Hexaware" },
  { name: "Kiran", img: "/files/Mentors/student-photo-24.webp", company: "Mphasis" },
  { name: "Sunita", img: "/files/Mentors/student-photo-25.webp", company: "Genpact" },
  { name: "Rajesh", img: "/files/Mentors/student-photo-26.webp", company: "Birlasoft" },
  { name: "Anil", img: "/files/Mentors/student-photo-27.webp", company: "KPIT" },
  { name: "Pooja", img: "/files/Mentors/student-photo-28.webp", company: "UST" },
  { name: "Deepak", img: "/files/Mentors/student-photo-29.webp", company: "Coforge" },
  { name: "Ritu", img: "/files/Mentors/student-photo-30.webp", company: "Virtusa" }
];
