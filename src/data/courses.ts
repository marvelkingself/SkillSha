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
}

export const COURSES_DATA: Record<string, CourseData> = {
  "ai-engineering": {
    title: "AI Engineering",
    typewriter: ["Certification in AI", "AI Systems", "AI Assistants", "Autonomous Agents", "Enterprise Workflows"],
    description: "Join India's most hands-on Professional Certification in AI Program, where you don't just learn AI but build assistants, agents, and automation systems across real business workflows in 8 weeks.",
    duration: "8 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "64+ hrs",
    projects: "8+",
    milestoneWord: "Nine",
    milestones: [
      {
        number: 1,
        title: "AI Foundations & Prompt Systems",
        modules: [
          {
            title: "How AI Actually Works",
            icon: "psychology",
            color: "orange",
            bullets: [
              { title: "AI vs ML vs Generative AI", desc: "(operator-level clarity)", icon: "balance" },
              { title: "LLM internals simplified", desc: "(tokens, context, probability)", icon: "article" },
              { title: "How models generate responses", desc: "(next-token prediction logic)", icon: "trending_up" },
              { title: "Understanding hallucination", desc: "and limitations", icon: "warning" },
              { title: "Where AI fits across", desc: "business functions", icon: "groups" },
              { title: "Mapping AI opportunities", desc: "in your workflow", icon: "map" }
            ]
          },
          {
            title: "Prompt Engineering",
            icon: "terminal",
            color: "blue",
            bullets: [
              { title: "Role-based prompting", desc: "(marketer, founder modes)", icon: "person" },
              { title: "Structured outputs", desc: "(tables, JSON, SOPs)", icon: "table_chart" },
              { title: "Few-shot prompting", desc: "for consistent results", icon: "check" },
              { title: "Chain-of-thought", desc: "for reasoning tasks", icon: "link" },
              { title: "Prompt frameworks", desc: "for content, analysis", icon: "check" },
              { title: "Building reusable", desc: "prompt libraries", icon: "check" }
            ]
          },
          {
            title: "Build Your First AI Micro-System",
            icon: "check_circle",
            color: "emerald",
            bullets: [
              { title: "Thinking in workflows", desc: "(input &rarr; output)", icon: "timeline" },
              { title: "Creating chained prompts", desc: "(multi-step logic)", icon: "link" },
              { title: "Building content +", desc: "analysis pipelines", icon: "article" },
              { title: "Using AI memory manually", desc: "(context reuse)", icon: "check" },
              { title: "Setting up personal", desc: "AI workspace", icon: "settings" },
              { title: "Creating your first", desc: "reusable AI system", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "AI Assistants",
        modules: [
          {
            title: "Assistant Architecture",
            icon: "settings",
            color: "indigo",
            bullets: [
              { title: "System Rules & Custom Instructions", desc: "structuring base behaviors", icon: "settings" },
              { title: "Persona & Tone Engineering", desc: "replicating brand voice", icon: "check" },
              { title: "Safety Guardrails & Constraints", desc: "handling edge cases", icon: "check" }
            ]
          },
          {
            title: "Context & Memory",
            icon: "check_circle",
            color: "violet",
            bullets: [
              { title: "Context Optimization", desc: "optimizing prompt layouts", icon: "check" },
              { title: "Session State Management", desc: "preserving user parameters", icon: "check" },
              { title: "Short & Long-Term Memory", desc: "integrating database histories", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 3,
        title: "AI Agents & Automation Systems",
        modules: [
          {
            title: "AI Agents: Foundations & Workflows",
            icon: "brain",
            color: "emerald",
            bullets: [
              { title: "AI Agent vs Chatbot", desc: "defining autonomy, loops", icon: "balance" },
              { title: "Tools, Systems & Products", desc: "how to design autonomous systems", icon: "check" },
              { title: "Workflow Mapping", desc: "pinpointing agent triggers", icon: "timeline" }
            ]
          },
          {
            title: "Build Agents (n8n & No-Code)",
            icon: "precision_manufacturing",
            color: "teal",
            bullets: [
              { title: "Trigger &rarr; Action &rarr; Loops", desc: "n8n execution logic", icon: "autorenew" },
              { title: "Tool-Calling Integrations", desc: "wiring agents to REST APIs", icon: "check" },
              { title: "Error Handling & Fallbacks", desc: "building resilient logic", icon: "bug_report" }
            ]
          },
          {
            title: "Agent Architecture & MCP Systems",
            icon: "precision_manufacturing",
            color: "emerald",
            bullets: [
              { title: "MCP Architecture", desc: "implementing Model Context Protocol", icon: "check" },
              { title: "Short & Long-Term Memory", desc: "handling state persistence", icon: "check" },
              { title: "Multi-Agent Collaboration", desc: "organizing subagents", icon: "precision_manufacturing" }
            ]
          }
        ]
      },
      {
        number: 4,
        title: "AI for Content Creation",
        modules: [
          {
            title: "AI Video, Avatars & Voice Systems",
            icon: "check_circle",
            color: "rose",
            bullets: [
              { title: "AI Avatar Videos", desc: "avatars (HeyGen / Synthesia)", icon: "videocam" },
              { title: "Voice Cloning & Translation", desc: "speech generation (ElevenLabs)", icon: "mic" },
              { title: "AI Video Generators", desc: "Runway & Pika workflows", icon: "videocam" }
            ]
          }
        ]
      },
      {
        number: 5,
        title: "AI for Marketing",
        modules: [
          {
            title: "AI Ad Systems & Creative Testing",
            icon: "check_circle",
            color: "amber",
            bullets: [
              { title: "Systematic Creative Ad Strategy", desc: "optimizing copy and formats", icon: "article" },
              { title: "Hook Generation Frameworks", desc: "crafting high-CTR openers", icon: "check" },
              { title: "AI-driven A/B Creative Testing", desc: "setting up low-cost feedback loops", icon: "check" },
              { title: "Smart Lead Qualification", desc: "using conversational agents", icon: "filter_alt" },
              { title: "Landing Page Integration", desc: "hooking webhooks into context", icon: "check" },
              { title: "Automated Dynamic Personalization", desc: "customizing pitches in real-time", icon: "check" }
            ]
          },
          {
            title: "The Ultimate AI Marketing Execution Machine",
            icon: "campaign",
            color: "amber",
            bullets: [
              { title: "Multi-Channel Pipelines", desc: "linking content and ads", icon: "check" },
              { title: "Outreach & Engagement Loops", desc: "WhatsApp & email context engines", icon: "autorenew" },
              { title: "Scaling & Optimization Systems", desc: "using metric aggregation dashboards", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 6,
        title: "AI for Sales Systems",
        modules: [
          {
            title: "Lead Qualification & Scoring Systems",
            icon: "check_circle",
            color: "rose",
            bullets: [
              { title: "Lead Scoring Frameworks", desc: "measuring buyer intent", icon: "filter_alt" },
              { title: "AI-driven Qualification Engines", desc: "classifying accounts programmatically", icon: "check" },
              { title: "Dynamic Lead Segmentation", desc: "routing high-intent prospects", icon: "filter_alt" }
            ]
          }
        ]
      },
      {
        number: 7,
        title: "Support, HR & Finance Systems",
        modules: [
          {
            title: "AI Customer Support Systems",
            icon: "check_circle",
            color: "emerald",
            bullets: [
              { title: "RAG-based Support Chatbots", desc: "grounded on internal docs", icon: "check" },
              { title: "FAQ & Knowledge Automations", desc: "serving verified resolutions", icon: "timeline" },
              { title: "Multi-Channel Routing Loops", desc: "assigning complex tickets", icon: "autorenew" }
            ]
          },
          {
            title: "AI-Driven HR & Talent Operations",
            icon: "payments",
            color: "teal",
            bullets: [
              { title: "Resume Screening & Scorecards", desc: "evaluating alignment via criteria", icon: "check" },
              { title: "Interview Automations", desc: "organizing calendar triggers", icon: "timeline" },
              { title: "Evaluations & Onboarding Loops", desc: "summarizing candidate performance", icon: "autorenew" }
            ]
          },
          {
            title: "AI Financial Analytics & Reporting",
            icon: "check_circle",
            color: "emerald",
            bullets: [
              { title: "Financial Data Analysis", desc: "crunching transactional logs", icon: "check" },
              { title: "Automated Report Compiling", desc: "generating digests instantly", icon: "check" },
              { title: "Trend Forecasting", desc: "projecting runway metrics", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 8,
        title: "AI for Tech & Product",
        modules: [
          {
            title: "AI Product Building & Deployment",
            icon: "code",
            color: "blue",
            bullets: [
              { title: "Packaging Workflows", desc: "bundling Python and databases", icon: "timeline" },
              { title: "Sleek Interface Deployments", desc: "publishing beautiful responsive apps", icon: "check" },
              { title: "Monitoring & Optimization", desc: "tracking runtime tokens and latency", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 9,
        title: "Capstone Project — Infinity",
        modules: [
          {
            title: "System Specification & Assistant Layer",
            icon: "settings",
            color: "orange",
            bullets: [
              { title: "Use Case Design & Specs", desc: "defining target architecture mapping", icon: "check" },
              { title: "Assistant & Context Foundation", desc: "building indexed vectors", icon: "check" }
            ]
          },
          {
            title: "Content Engine & Agentic Systems",
            icon: "precision_manufacturing",
            color: "rose",
            bullets: [
              { title: "UGC & Scraper Infrastructures", desc: "engineering lead-generation loops", icon: "table_chart" },
              { title: "Multi-Agent Systems & Routing", desc: "programming self-correcting chains", icon: "precision_manufacturing" }
            ]
          },
          {
            title: "AI Operations & Product Release",
            icon: "code",
            color: "amber",
            bullets: [
              { title: "Sales & AI Ops Automations", desc: "closing pipelines and classifiers", icon: "timeline" },
              { title: "Hosted Web Dashboard & Demo", desc: "packaging the unified project", icon: "dashboard" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do I need coding experience?", a: "No, this program starts from absolute foundations and covers zero-code tools as well as basic Python API integrations." },
      { q: "What is the schedule of live classes?", a: "Live interactive classes are held on weekends, with recorded access and mentor support available 24/7." }
    ],
    portfolioProjects: [
      {
        milestone: 1,
        codename: "AURA",
        tagline: "Build Your AI Writing Assistant",
        description: "Prompt library (writing, research, role-based prompts: marketer, analyst), structured outputs & summarization workflows.",
        bg: "#F9C5C0",
        shape: "star4"
      },
      {
        milestone: 2,
        codename: "ECHO",
        tagline: "Build Your AI Brand Assistant",
        description: "Fully architected AI assistant with system rules, persona engineering, memory context, and session-state management.",
        bg: "#C5E3F9",
        shape: "diamond"
      },
      {
        milestone: 3,
        codename: "NEXUS",
        tagline: "Build Your AI Automation Agent",
        description: "Multi-agent automation system with n8n, tool-calling integrations, MCP architecture, and resilient error-handling loops.",
        bg: "#D4F1C5",
        shape: "hexburst"
      },
      {
        milestone: 4,
        codename: "SPARK",
        tagline: "Build Your AI Content Studio",
        description: "AI video creation system with avatar generation, voice cloning, and automated content pipeline using HeyGen & ElevenLabs.",
        bg: "#F9E4C5",
        shape: "starburst"
      },
      {
        milestone: 5,
        codename: "ASCEND",
        tagline: "Build Your AI Marketing Machine",
        description: "AI ad creative system, lead generation system, funnel automation, follow-up workflows, and performance tracking system.",
        bg: "#C5D9F9",
        shape: "star4"
      },
      {
        milestone: 6,
        codename: "ENGINE",
        tagline: "Build Your AI Sales Engine",
        description: "Lead qualification system, outreach automation via email/WhatsApp, proposal generation system, follow-up sequences, and sales pipeline workflow.",
        bg: "#F9C5C5",
        shape: "starburst"
      },
      {
        milestone: 7,
        codename: "FLOW",
        tagline: "Build Your AI Operations System",
        description: "Support chatbot, ticket routing system, resume screening workflow, finance report automation, and dashboard with insights system.",
        bg: "#F9C5D9",
        shape: "flower"
      },
      {
        milestone: 8,
        codename: "STACK",
        tagline: "Build Your AI Product System",
        description: "AI product use cases, RAG-based assistant, multi-agent workflows, tool integrations via APIs, and a basic AI product interface.",
        bg: "#F9F0C5",
        shape: "spiral"
      },
      {
        milestone: 9,
        codename: "INFINITY",
        tagline: "Build Your Full AI Business System",
        description: "End-to-end capstone: AI assistant, content engine, agentic sales + ops system, and a hosted web dashboard demo.",
        bg: "#E0C5F9",
        shape: "aura"
      }
    ]
  },
  "full-stack-development": {
    title: "Full-Stack Development",
    typewriter: ["Web Apps", "Next.js & React", "APIs & Databases", "SaaS Architecture"],
    description: "Master frontend, backend, databases, APIs, cloud infrastructure, and deployment systems used by modern startups and SaaS companies to build scale-ready web applications.",
    duration: "20 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "40+",
    projects: "15+",
    milestoneWord: "Ten",
    milestones: [
      {
        number: 1,
        title: "Frontend Foundations",
        modules: [
          {
            title: "HTML5, CSS3 & Modern JS",
            icon: "html",
            color: "orange",
            bullets: [
              { title: "Semantic HTML structures", desc: "and accessible layouts", icon: "accessibility" },
              { title: "CSS Flexbox & CSS Grid", desc: "for fluid responsive designs", icon: "grid_view" },
              { title: "JS ES6+ essentials", desc: "(promises, async/await, closures)", icon: "code" }
            ]
          },
          {
            title: "Tailwind CSS",
            icon: "style",
            color: "blue",
            bullets: [
              { title: "Utility-first CSS styling", desc: "for ultra-fast styling speed", icon: "bolt" },
              { title: "Responsive layouts & dark mode", desc: "out-of-the-box", icon: "dark_mode" },
              { title: "Custom themes & configurations", desc: "in Tailwind v4", icon: "settings" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "Advanced React & Next.js",
        modules: [
          {
            title: "React Core",
            icon: "component_exchange",
            color: "indigo",
            bullets: [
              { title: "Component lifecycle & hooks", desc: "(useState, useEffect, useMemo)", icon: "refresh" },
              { title: "State management patterns", desc: "(Context API, Redux/Zustand)", icon: "layers" },
              { title: "React performance optimization", desc: "and virtual DOM mechanics", icon: "speed" }
            ]
          },
          {
            title: "Next.js App Router",
            icon: "rocket_launch",
            color: "emerald",
            bullets: [
              { title: "Server & Client Components", desc: "for fast initial load", icon: "dns" },
              { title: "File-system routing & Layouts", desc: "with nested pages", icon: "folder_shared" },
              { title: "Data fetching & caching", desc: "with fetch API", icon: "cached" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Is prior programming knowledge required?", a: "Basic understanding of HTML and JS helps, but we cover JavaScript from scratch before moving to frameworks." },
      { q: "Will I learn about cloud and DevOps?", a: "Yes, you will learn to build, containerize (Docker), and deploy apps on Vercel, Heroku, and AWS." }
    ]
  },
  "digital-marketing-with-gen-ai": {
    title: "Digital Marketing with Gen AI",
    typewriter: ["Gen AI Marketing", "Meta & Google Ads", "AI Content Engines", "Automation Funnels", "Data-Driven Growth"],
    description: "Master the future of marketing. Combine core growth marketing strategies with Generative AI tools to build high-converting ad engines, automate campaign copy, optimize landing pages, and scale brand distribution.",
    duration: "12 Weeks",
    salary: "₹ 9.5 LPA",
    liveSessions: "45+ hrs",
    projects: "12+",
    milestoneWord: "Six",
    milestones: [
      {
        number: 1,
        title: "Funnel Strategy & AI Copywriting (Weeks 1-2)",
        modules: [
          {
            title: "Marketing Psychology & Funnels",
            icon: "psychology",
            color: "orange",
            bullets: [
              { title: "Pirate Funnels (AARRR Framework)", desc: "acquisition to retention logic", icon: "funnel_chart" },
              { title: "Unit Economics (CAC, LTV, ROI)", desc: "tracking core marketing health", icon: "payments" },
              { title: "Competitor Intelligence Tools", desc: "spying on competitor meta ads", icon: "find_in_page" },
              { title: "AI-Augmented ICP Personas", desc: "defining audiences with LLM agent sheets", icon: "groups" }
            ]
          },
          {
            title: "Copywriting & Prompt Systems",
            icon: "terminal",
            color: "blue",
            bullets: [
              { title: "AIDA & PAS Writing Frameworks", desc: "for high-converting copies", icon: "edit_note" },
              { title: "Claude & ChatGPT Persona Tuning", desc: "building writing brand voices", icon: "text_snippet" },
              { title: "High-CTR Ad Hooks & Copy", desc: "generating social media posts at scale", icon: "photo_library" },
              { title: "Structured Campaign Prompts", desc: "creating multi-step content loops", icon: "link" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "AI Media & Website Engines (Weeks 3-4)",
        modules: [
          {
            title: "AI Media & Video Generation",
            icon: "movie_creation",
            color: "indigo",
            bullets: [
              { title: "Midjourney & Firefly Prompting", desc: "for premium visual ad graphics", icon: "photo_library" },
              { title: "Figma UI & Figma AI Layouts", desc: "designing conversion landing pages", icon: "palette" },
              { title: "Short-Form Video Production", desc: "using script-to-video prompt tools", icon: "movie" },
              { title: "AI Voiceovers & Captions", desc: "using ElevenLabs and CapCut", icon: "volume_up" }
            ]
          },
          {
            title: "Business Web Architecture",
            icon: "web",
            color: "emerald",
            bullets: [
              { title: "WordPress Core Setup", desc: "installation and performance optimization", icon: "settings" },
              { title: "Visual Builders (Elementor)", desc: "building responsive brand portfolios", icon: "table_chart" },
              { title: "Shopify eCommerce Layouts", desc: "designing high-converting product pages", icon: "shopping_cart" },
              { title: "Core Web Vitals Speed Auditing", desc: "caching, CDNs, and file size checks", icon: "bolt" }
            ]
          }
        ]
      },
      {
        number: 3,
        title: "SEO & Paid Meta Campaigns (Weeks 5-6)",
        modules: [
          {
            title: "SEO & Generative Engine Optimization",
            icon: "query_stats",
            color: "rose",
            bullets: [
              { title: "On-Page, Off-Page & Technical Audits", desc: "using SEMrush and Ahrefs", icon: "find_in_page" },
              { title: "GEO (Generative Engine Optimization)", desc: "ranking in Perplexity and Gemini", icon: "psychology" },
              { title: "AI Keyword Intent Clustering", desc: "automating keyword sheets using LLMs", icon: "map" },
              { title: "Local Schema Markup Setups", desc: "for regional search placements", icon: "location_on" }
            ]
          },
          {
            title: "Meta Ads Dynamic Targeting",
            icon: "ads_click",
            color: "violet",
            bullets: [
              { title: "Meta Campaign Architecture", desc: "leads, conversions, custom events", icon: "edit_note" },
              { title: "Advantage+ Targeting Setup", desc: "lookalikes, broad targeting logic", icon: "groups" },
              { title: "Dynamic Creative Optimization", desc: "auto-testing ad visual assets", icon: "photo_library" },
              { title: "Multi-Stage Retargeting Funnels", desc: "warming cold traffic systematically", icon: "timeline" }
            ]
          }
        ]
      },
      {
        number: 4,
        title: "Google Search Ads & Server Tagging (Weeks 7-8)",
        modules: [
          {
            title: "Google Ads & YouTube Campaigns",
            icon: "campaign",
            color: "teal",
            bullets: [
              { title: "Google Search Match Types", desc: "broad, phrase, exact bid tactics", icon: "find_in_page" },
              { title: "Demand Gen & Display Ad Funnels", desc: "scaling brand impressions globally", icon: "photo_library" },
              { title: "Bidding Algorithms (tCPA, tROAS)", desc: "maximizing automated budgets", icon: "trending_up" },
              { title: "YouTube Video Ad Placements", desc: "setting skippable and bumper ads", icon: "movie" }
            ]
          },
          {
            title: "GTM Server-Side Tagging",
            icon: "analytics",
            color: "amber",
            bullets: [
              { title: "GTM Server Containers", desc: "bypassing browser ad-blockers", icon: "settings" },
              { title: "GA4 Custom Event Attribution", desc: "building multi-touch models", icon: "table_chart" },
              { title: "First-Party Data Capture Loops", desc: "storing secure user identifier info", icon: "lock" },
              { title: "Stape.io / AWS Cloud Configs", desc: "hosting tracking endpoints", icon: "cloud" }
            ]
          }
        ]
      },
      {
        number: 5,
        title: "Lifecycle & Outbound Automation (Weeks 9-10)",
        modules: [
          {
            title: "LinkedIn & B2B Outbound Engagements",
            icon: "handshake",
            color: "indigo",
            bullets: [
              { title: "LinkedIn Creator Optimization", desc: "writing authority growth loops", icon: "person" },
              { title: "Clay Data Scraping Pipelines", desc: "automating lead list qualification", icon: "link" },
              { title: "Instantly.ai Outreach setups", desc: "cold email warming and variables", icon: "email" },
              { title: "B2B Social Outbound Workflows", desc: "using PhantomBuster actions", icon: "timeline" }
            ]
          },
          {
            title: "Lifecycle Email Marketing",
            icon: "email",
            color: "blue",
            bullets: [
              { title: "Klaviyo/ActiveCampaign Lists", desc: "capturing high-intent subscribers", icon: "list" },
              { title: "Automated Lifecycle Flows", desc: "welcome, cart abandon, winback paths", icon: "loop" },
              { title: "A/B Subject & CTR Optimization", desc: "maximizing open rate percentage", icon: "check" },
              { title: "Email Deliverability DNS Keys", desc: "configuring DKIM, SPF, DMARC logs", icon: "lock" }
            ]
          }
        ]
      },
      {
        number: 6,
        title: "Programmatic Scaling & Career Prep (Weeks 11-12)",
        modules: [
          {
            title: "Programmatic SEO & Automations",
            icon: "timeline",
            color: "emerald",
            bullets: [
              { title: "Programmatic Landing Page sheets", desc: "generating bulk ranking targets", icon: "table_chart" },
              { title: "Make.com & Zapier Growth Loops", desc: "syncing leads from ads to CRM", icon: "loop" },
              { title: "n8n AI Web scraper workflows", desc: "automating weekly content pulls", icon: "article" },
              { title: "Custom CRM AI Chatbots", desc: "responding instantly to lead requests", icon: "chat" }
            ]
          },
          {
            title: "Agency Blueprint & Career Acceleration",
            icon: "business_center",
            color: "orange",
            bullets: [
              { title: "Freelance Client Pricing Retainers", desc: "setting up hourly and performance bids", icon: "payments" },
              { title: "Loom Audit Client Acquisition", desc: "winning high-ticket contracts", icon: "movie" },
              { title: "Upwork & Fiverr Profile Tuning", desc: "optimizing for search rankings", icon: "person" },
              { title: "Interview Practice & ATS Resume", desc: "mock panels with marketing leaders", icon: "groups" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Is prior marketing or programming knowledge required?", a: "No prior experience is needed. We start from target audience definition and copywriting fundamentals before layering in advanced Generative AI automation." },
      { q: "Will I get to manage active budgets?", a: "Yes. The program includes hands-on modules where you structure, deploy, and analyze live ads using real target budgets." }
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
    ]
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
  "ui-ux-design": {
    title: "UI/UX Design",
    typewriter: ["UI Design Systems", "Figma & Framer", "UX Research", "Motion & Interaction"],
    description: "Design premium digital products. Master Figma, Framer, user psychology, information architecture, typography, and motion design systems.",
    duration: "20 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "35+",
    projects: "8+",
    milestoneWord: "Nine",
    milestones: [
      {
        number: 1,
        title: "Design Principles & Figma",
        modules: [
          {
            title: "Visual Design Core",
            icon: "palette",
            color: "rose",
            bullets: [
              { title: "Typography and scale", desc: "for modern devices", icon: "title" },
              { title: "Color systems & contrast rules", desc: "(WCAG standards)", icon: "brightness_medium" },
              { title: "Grid systems and spacing", desc: "for responsive UI layouts", icon: "grid_4x4" }
            ]
          },
          {
            title: "Figma Prototyping",
            icon: "draw",
            color: "indigo",
            bullets: [
              { title: "Auto Layout & Components", desc: "for flexible templates", icon: "view_quilt" },
              { title: "Interactive variables & variants", desc: "for state transitions", icon: "layers" },
              { title: "Smart Animate & microflows", desc: "for high-fidelity models", icon: "animation" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do we learn coding in this design program?", a: "No, this program focuses entirely on user experience design, wireframing, high-fidelity UI design in Figma, and no-code Framer websites." }
    ]
  },
  "data-science-ai": {
    title: "Data Science & AI",
    typewriter: ["Predictive Models", "Machine Learning", "Data Analytics", "Python Automation"],
    description: "Derive business insights from big data. Build machine learning pipelines, predictive engines, visual business intelligence dashboards, and deploy AI models.",
    duration: "20 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "35+",
    projects: "12+",
    milestoneWord: "Nine",
    milestones: [
      {
        number: 1,
        title: "Python & Data Operations",
        modules: [
          {
            title: "Python for Data Science",
            icon: "terminal",
            color: "violet",
            bullets: [
              { title: "Pandas & NumPy data manipulation", desc: "(indexing, merging, aggregates)", icon: "table_rows" },
              { title: "Data cleaning and preprocessing", desc: "(null values, duplicates)", icon: "cleaning_services" },
              { title: "Jupyter notebooks workflows", desc: "for analysis", icon: "science" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Is math background required?", a: "We cover the required linear algebra, calculus, and statistics concepts from absolute scratch." }
    ]
  },
  "product-management": {
    title: "Product Management",
    typewriter: ["Product Strategy", "Product Analytics", "Roadmap Execution", "Agile Leadership"],
    description: "Lead product development from conception to launch. Write PRDs, manage agile teams, analyze telemetry data, and define growth strategies.",
    duration: "20 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "30+",
    projects: "6+",
    milestoneWord: "Seven",
    milestones: [
      {
        number: 1,
        title: "Product Roadmap & Strategy",
        modules: [
          {
            title: "Core PM Functions",
            icon: "map",
            color: "emerald",
            bullets: [
              { title: "Writing specifications & PRDs", desc: "for engineering teams", icon: "description" },
              { title: "Agile, Scrum, and JIRA workflows", desc: "for sprint tracking", icon: "track_changes" },
              { title: "Prioritization matrices", desc: "(RICE, MoSCoW methods)", icon: "reorder" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do I need a technical degree?", a: "No, we teach the tech terminology and systems design knowledge required to collaborate with engineers effectively." }
    ]
  },
  "algorithmic-trading": {
    title: "Algorithmic Trading",
    typewriter: ["Quantitative Models", "Trading Bots", "Risk Automation", "Python Backtesting"],
    description: "Code, backtest, and automate financial trading strategies. Use time-series analysis, build live API brokers integration, and manage portfolio risks.",
    duration: "20 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "30+",
    projects: "8+",
    milestoneWord: "Nine",
    milestones: [
      {
        number: 1,
        title: "Quantitative Finance & Strategy",
        modules: [
          {
            title: "Python for Trading",
            icon: "show_chart",
            color: "amber",
            bullets: [
              { title: "Importing OHLCV market feeds", desc: "via REST & WebSockets", icon: "trending_down" },
              { title: "Calculating indicators", desc: "(RSI, MACD, Bollinger Bands)", icon: "analytics" },
              { title: "Building multi-broker routers", desc: "for live trade routing", icon: "settings_input_component" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Is trading capital provided?", a: "We use paper trading accounts with zero risk. You do not need to invest any real trading capital during the course." }
    ]
  },
  "graphic-designing": {
    title: "Graphic Designing",
    typewriter: ["Brand Identity", "Vector Illustration", "Layout & Composition", "Typography Systems"],
    description: "Master professional visual design. Build stunning brand identities, vector illustrations, editorial layouts, UI assets, and marketing collaterals using Figma, Illustrator, and Photoshop.",
    duration: "20 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "25+",
    projects: "10+",
    milestoneWord: "Nine",
    milestones: [
      {
        number: 1,
        title: "Visual Design Core & Tools",
        modules: [
          {
            title: "Design Principles",
            icon: "palette",
            color: "rose",
            bullets: [
              { title: "Color Theory & Typography", desc: "contrasts and grids", icon: "title" },
              { title: "Adobe Illustrator vectoring", desc: "(pen tool, shapes, logos)", icon: "vector_square" },
              { title: "Photoshop raster compositing", desc: "(layers, masks, editing)", icon: "image" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do I need drawing skills?", a: "No prior drawing or art background is required. We teach you design principles and software tools from scratch." }
    ]
  },
  "mental-health-wellness": {
    title: "Mental Health & Wellness",
    typewriter: ["Wellness Coaching", "Biohacking Systems", "Digital Well-being", "Mindfulness Training"],
    description: "Build an impactful career in wellness. Coach mindfulness, circadian health, habit formation, digital detox boundaries, and workshop design.",
    duration: "20 Weeks",
    salary: "₹ 8.9 LPA",
    liveSessions: "25+",
    projects: "6+",
    milestoneWord: "Nine",
    milestones: [
      {
        number: 1,
        title: "Mindfulness & Physiology",
        modules: [
          {
            title: "Circadian Science & Habits",
            icon: "wb_sunny",
            color: "teal",
            bullets: [
              { title: "Circadian rhythms & light exposure", desc: "for deep sleep states", icon: "bed" },
              { title: "Coaching active meditation", desc: "and somatic release", icon: "spa" },
              { title: "Atomic Habits coaching", desc: "for client accountability", icon: "checklist" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Is this a medical certification?", a: "No, this is a wellness coaching certification. We focus on lifestyle medicine, nutrition, habits, and mindfulness." }
    ]
  },
  "ai-healthcare-doctor": {
    title: "AI for Doctors",
    typewriter: ["Clinical AI", "Medical Prompting", "Research Automation", "EHR Optimization"],
    description: "Master clinical prompt engineering, HIPAA-compliant patient charting automation, and medical literature search agents to save 12+ hours of administrative overhead per week.",
    duration: "12 Weeks",
    salary: "Clinical Value",
    liveSessions: "36+ hrs",
    projects: "6+",
    milestoneWord: "Three",
    milestones: [
      {
        number: 1,
        title: "Clinical Prompting & Medical Search",
        modules: [
          {
            title: "Clinical Prompts",
            icon: "terminal",
            color: "rose",
            bullets: [
              { title: "Role-based prompting", desc: "(clinician, specialist, researcher)", icon: "person" },
              { title: "Medical records extraction", desc: "summarizing long documents", icon: "description" },
              { title: "SOAP note draft generation", desc: "using clinical guidelines", icon: "check" }
            ]
          },
          {
            title: "Medical Search",
            icon: "search",
            color: "rose",
            bullets: [
              { title: "PubMed scraping agents", desc: "getting latest trials", icon: "link" },
              { title: "Evidence synthesis co-pilot", desc: "for custom queries", icon: "check" },
              { title: "Clinical guidelines indexing", desc: "local search database", icon: "database" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "Patient Record Charting & EHR Automation",
        modules: [
          {
            title: "Patient Charting",
            icon: "mic",
            color: "rose",
            bullets: [
              { title: "Voice-to-EHR translation", desc: "transcribing patient dialogues", icon: "voice_to_text" },
              { title: "Drafting referral letters", desc: "to external specialists", icon: "mail" },
              { title: "Discharge instructions", desc: "made easy for patients", icon: "check" }
            ]
          },
          {
            title: "Security & Ethics",
            icon: "shield",
            color: "rose",
            bullets: [
              { title: "HIPAA security checks", desc: "protecting patient names", icon: "lock" },
              { title: "Hallucination detection", desc: "double checking dosage", icon: "warning" },
              { title: "Clinician-in-the-loop validation", desc: "for absolute safety", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 3,
        title: "AI Co-pilots & Specialized Diagnostics",
        modules: [
          {
            title: "Diagnostics Co-pilots",
            icon: "medical_services",
            color: "rose",
            bullets: [
              { title: "Image classification models", desc: "interpreting basic scans", icon: "image" },
              { title: "Symptom routing pipelines", desc: "smart patient triaging", icon: "check" },
              { title: "Prescription co-pilot", desc: "checking drug interactions", icon: "checklist" }
            ]
          },
          {
            title: "Unified Clinic Workflow AI",
            icon: "star",
            color: "rose",
            bullets: [
              { title: "Building intake chatbots", desc: "capturing symptoms first", icon: "chat" },
              { title: "Automated billing coding", desc: "matching diagnosis to codes", icon: "check" },
              { title: "Patient follow-up loops", desc: "checking in after visit", icon: "check" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Is this course HIPAA compliant?", a: "Yes, we teach best practices in secure medical AI using HIPAA-compliant API endpoints and local LLMs that preserve patient confidentiality." },
      { q: "Do I need coding experience?", a: "No, this is specifically designed for practicing physicians and medical professionals focusing on clinical workflows and prompt tools." }
    ]
  },
  "ai-clinical-nurse": {
    title: "AI for Nurses",
    typewriter: ["Smart Charting", "Shift Automation", "Triage Co-pilot", "Nursing Workflows"],
    description: "The definitive guide for clinical nursing professionals to save 15+ hours weekly on charting, shift handovers, and patient care planning using secure AI tools.",
    duration: "8 Weeks",
    salary: "Time-Saving Focus",
    liveSessions: "24+ hrs",
    projects: "4+",
    milestoneWord: "Three",
    milestones: [
      {
        number: 1,
        title: "Shift Handovers & Patient Care Plans",
        modules: [
          {
            title: "Shift Handovers",
            icon: "swap_horiz",
            color: "teal",
            bullets: [
              { title: "Drafting SBAR handover sheets", desc: "concise shift reporting", icon: "check" },
              { title: "Patient history extraction", desc: "finding vital points", icon: "person" },
              { title: "Shift transition summaries", desc: "saving hours on handoff", icon: "check" }
            ]
          },
          {
            title: "Care Plan Generation",
            icon: "assignment",
            color: "teal",
            bullets: [
              { title: "Smart care pathway builder", desc: "aligned with nursing DX", icon: "checklist" },
              { title: "Patient safety checklists", desc: "automated ward checkups", icon: "shield" },
              { title: "Treatment schedules", desc: "checking drug timings", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "Smart Charting & EHR Translation",
        modules: [
          {
            title: "Dictation-to-Chart",
            icon: "mic",
            color: "teal",
            bullets: [
              { title: "Voice translation to EHR", desc: "nursing notes builder", icon: "voice_to_text" },
              { title: "Vitals log parsing", desc: "reading vitals into system", icon: "check" },
              { title: "Treatment logs automated", desc: "recording nursing actions", icon: "check" }
            ]
          },
          {
            title: "Patient Communication",
            icon: "chat",
            color: "teal",
            bullets: [
              { title: "Discharge instructions", desc: "multilingual translations", icon: "language" },
              { title: "Patient triage assistants", desc: "sorting incoming calls", icon: "check" },
              { title: "Medication guide generator", desc: "clear patient guides", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 3,
        title: "Scheduling & Administrative Copilots",
        modules: [
          {
            title: "Shift Planners",
            icon: "calendar_month",
            color: "teal",
            bullets: [
              { title: "Roster optimization models", desc: "fair scheduling agent", icon: "check" },
              { title: "Shift swap automation", desc: "handling nurse schedules", icon: "check" },
              { title: "Admin time audit tracker", desc: "finding bottleneck tasks", icon: "search" }
            ]
          },
          {
            title: "EHR Nursing Capstone",
            icon: "star",
            color: "teal",
            bullets: [
              { title: "Building intake triagers", desc: "handling patient check-ins", icon: "chat" },
              { title: "Nursing report summaries", desc: "summarizing ward data", icon: "check" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Will this help with charting time?", a: "Yes! Our students report saving an average of 2 to 3 hours per shift by automating documentation drafts and shift notes." }
    ]
  },
  "ai-finance-ca": {
    title: "AI for CAs & Finance",
    typewriter: ["Tax Auditing AI", "Spreadsheet Agents", "Financial LLMs", "Accounting Automation"],
    description: "Automate accounting audits, tax reconciliation, invoice parsing, and corporate valuation reports using custom spreadsheet-aware LLM agents.",
    duration: "12 Weeks",
    salary: "Practice Scaler",
    liveSessions: "40+ hrs",
    projects: "8+",
    milestoneWord: "Three",
    milestones: [
      {
        number: 1,
        title: "Spreadsheet AI & Tax Auditing",
        modules: [
          {
            title: "Excel & Sheets AI",
            icon: "table_chart",
            color: "emerald",
            bullets: [
              { title: "Formula synthesis agents", desc: "automating model math", icon: "check" },
              { title: "Large-dataset analytics", desc: "finding ledger anomalies", icon: "search" },
              { title: "Pivot table generators", desc: "making analysis simple", icon: "check" }
            ]
          },
          {
            title: "Tax Code Audit",
            icon: "description",
            color: "emerald",
            bullets: [
              { title: "Tax code lookup engines", desc: "smart search indexer", icon: "database" },
              { title: "Compliance report drafts", desc: "checking tax regulations", icon: "check" },
              { title: "Tax planning assistants", desc: "optimizing client tax filing", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 2,
        title: "Invoice Processing & Accounting Automation",
        modules: [
          {
            title: "OCR & Invoicing",
            icon: "payments",
            color: "emerald",
            bullets: [
              { title: "Document extraction agents", desc: "parsing raw invoices", icon: "check" },
              { title: "Multi-currency ledgers", desc: "reconciling foreign transactions", icon: "check" },
              { title: "Ledger reconciliation models", desc: "flagging duplicate bills", icon: "warning" }
            ]
          },
          {
            title: "Financial Document Search",
            icon: "search",
            color: "emerald",
            bullets: [
              { title: "SEC filings chat engines", desc: "getting market stats", icon: "link" },
              { title: "Audit report drafts", desc: "generating findings", icon: "check" },
              { title: "Corporate portfolio audit", desc: "scraping client files", icon: "check" }
            ]
          }
        ]
      },
      {
        number: 3,
        title: "Financial Valuation & Enterprise Agents",
        modules: [
          {
            title: "Valuation Copilots",
            icon: "trending_up",
            color: "emerald",
            bullets: [
              { title: "DCF model builder agents", desc: "automated cash flow projection", icon: "check" },
              { title: "Sensitivity analysis engines", desc: "testing worst case plans", icon: "check" },
              { title: "Investment memo generator", desc: "writing summaries", icon: "check" }
            ]
          },
          {
            title: "Unified Finance Agent",
            icon: "star",
            color: "emerald",
            bullets: [
              { title: "Reconciliation AI agents", desc: "matching banking to ledgers", icon: "check" },
              { title: "Client audit automated capstone", desc: "processing raw PDFs", icon: "check" }
            ]
          }
        ]
      }
    ],
    faqs: [
      { q: "Do I need programming skills?", a: "No coding experience is required. We focus on low-code AI workflows, custom financial prompt templates, and Excel integrations." }
    ]
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
