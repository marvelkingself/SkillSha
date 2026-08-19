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
  "mental-health-wellness": "mental-health-wellness-course-with-gen-ai",
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
  ,
    flagshipContent: {
    "heroSubtext": "Ready to build a global career in AI Engineering? Skillsha's AI Engineering Course is designed for software developers and tech professionals who want to master LLMs, autonomous agents, and RAG systems.\\n\\nThis is a complete, hands-on certification program that teaches how to build, deploy, and monitor scalable AI agents and workflows that drive real enterprise value.\\n\\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available",
    "whyChooseList": {
        "placement": [
            "Direct introductions to 500+ global tech startups hiring AI talent",
            "Mock interviews with senior AI architects from top firms",
            "GitHub portfolio building to show working autonomous agents",
            "LinkedIn optimization tailored to global AI markets",
            "Lifetime career guidance and placement opportunities"
        ],
        "ai": [
            "LLM prompt engineering and system instructions",
            "Vector embeddings and similarity search architectures",
            "Autonomous multi-agent orchestration frameworks",
            "Retrieval-Augmented Generation (RAG) optimization",
            "Fine-tuning open-source models with custom datasets",
            "Deploying AI APIs to production environments"
        ],
        "trainers": [
            {
                "name": "Mr. Shad",
                "title": "Lead AI Architect",
                "bullets": [
                    "12+ years building enterprise software systems",
                    "Expertise in LLM context routing and LangChain",
                    "Managed engineering teams in Silicon Valley and Europe",
                    "Worked with 40+ brands to deploy scalable AI backends"
                ],
                "quote": "Shad makes LLM context routing and agent design practical and clear.",
                "img": "/files/shad.png",
                "exp": "12+ Yrs Exp"
            },
            {
                "name": "Mr. Akshay Mishra",
                "title": "Autonomous Systems Expert",
                "bullets": [
                    "10+ years in distributed systems and automation",
                    "Specialization in CrewAI, AutoGen, and agentic loops",
                    "Built workflow automation pipelines for international clients",
                    "Expert in vector database scaling and index tuning"
                ],
                "quote": "Mr. Akshay's live coding loops are incredibly detailed and practical.",
                "img": "",
                "exp": "10+ Yrs Exp"
            },
            {
                "name": "Ms. Hema",
                "title": "Machine Learning Engineer",
                "bullets": [
                    "6+ years in Python, PyTorch, and deep learning models",
                    "Expertise in LoRA and QLoRA model fine-tuning",
                    "Developed RAG search indices for Fortune 550 companies",
                    "Helped scale vector databases to billions of vectors"
                ],
                "quote": "Hema demystifies embeddings and fine-tuning math.",
                "img": "",
                "exp": "6+ Yrs Exp"
            }
        ],
        "pricing": [
            "Regular price: ₹30,000 / $360 USD equivalent",
            "Special discount: ₹15,000 / $180 USD (50% off)",
            "Additional cashback: ₹2,000 / $24 USD",
            "0% Interest EMI available worldwide",
            "No hidden charges, transparent pricing",
            "Get world-class AI engineering education without expensive university pricing."
        ]
    },
    "differencesSubtext": "We skip slides and teach you to write code. You will build, deploy, and monitor active AI systems using the same stack tech giants use.",
    "differences": [
        {
            "title": "1. Real-World Autonomous Agent Projects",
            "bullets": [
                "Build autonomous workflow tools with multi-agent orchestration",
                "Create custom RAG document routing interfaces",
                "Implement vector-based semantic search engines",
                "Fine-tune open-source models on specific industry datasets"
            ]
        },
        {
            "title": "2. GitHub Portfolio for Tech Recruits",
            "bullets": [
                "Agent orchestration scripts",
                "Custom fine-tuning codebooks",
                "RAG application backend code",
                "Vector DB indexing configurations"
            ]
        },
        {
            "title": "3. Industry-Recognized Certification",
            "bullets": [
                "Skillsha's AI Engineering Certificate is recognized by top global hiring partners hiring engineers, consultants, and developers."
            ]
        },
        {
            "title": "4. Live Lab Experience",
            "bullets": [
                "Run actual API calls with real developer budgets.",
                "Optimize prompt contexts to reduce token bills",
                "Troubleshoot deployment errors on AWS and Vercel",
                "Build confidence through live-coded agent pipelines"
            ]
        }
    ],
    "toolPillars": [
        {
            "title": "LLMs & RAG Engines",
            "subtitle": "Context & Search Architecture",
            "icon": "psychology",
            "colorClass": "text-blue-500 bg-blue-500/10",
            "tools": [
                {
                    "name": "LangChain & LlamaIndex",
                    "category": "Orchestration",
                    "desc": "Data loading, node parsing, indexing, and querying",
                    "icon": "link"
                },
                {
                    "name": "OpenAI & Anthropic APIs",
                    "category": "Foundation Models",
                    "desc": "Model routing, function calling, structured outputs",
                    "icon": "terminal"
                },
                {
                    "name": "Pinecone & ChromaDB",
                    "category": "Vector Databases",
                    "desc": "High-performance semantic indices and metadata filters",
                    "icon": "storage"
                },
                {
                    "name": "HuggingFace Transformers",
                    "category": "Model Libraries",
                    "desc": "Loading local models, custom tokenizers, weights",
                    "icon": "smart_toy"
                }
            ],
            "pipeline": {
                "left": "Doc Loader",
                "middle": "Embedding Model",
                "right": "Pinecone Index",
                "leftLabel": "Source Files",
                "rightLabel": "Query Target"
            }
        },
        {
            "title": "Agentic Frameworks",
            "subtitle": "Autonomous Logic Engines",
            "icon": "bolt",
            "colorClass": "text-purple-500 bg-purple-500/10",
            "tools": [
                {
                    "name": "CrewAI & AutoGen",
                    "category": "Multi-Agent Orchestration",
                    "desc": "Defining custom roles, memory layers, and tasks",
                    "icon": "group"
                },
                {
                    "name": "LangGraph",
                    "category": "Stateful Flows",
                    "desc": "Graph-based conditional logic, cycles, and states",
                    "icon": "account_tree"
                },
                {
                    "name": "FastAPI",
                    "category": "AI Endpoints",
                    "desc": "Wrapping agent logic into secure production APIs",
                    "icon": "api"
                },
                {
                    "name": "Docker",
                    "category": "Isolation Lab",
                    "desc": "Packaging agent runtime and environments cleanly",
                    "icon": "layers"
                }
            ],
            "pipeline": {
                "left": "User Request",
                "middle": "Planner Agent",
                "right": "Execution Agent",
                "leftLabel": "Input Query",
                "rightLabel": "Tool Response"
            }
        },
        {
            "title": "Finetuning & Scale",
            "subtitle": "Model Adaptation Pipelines",
            "icon": "settings",
            "colorClass": "text-emerald-500 bg-emerald-500/10",
            "tools": [
                {
                    "name": "PyTorch",
                    "category": "Training Foundation",
                    "desc": "Tensor manipulations and deep learning matrices",
                    "icon": "settings"
                },
                {
                    "name": "LoRA & QLoRA",
                    "category": "Parameter Efficiency",
                    "desc": "Adapting model weights with minimal GPU resources",
                    "icon": "tune"
                },
                {
                    "name": "Weights & Biases",
                    "category": "Experiment Monitoring",
                    "desc": "Tracking training loss curves and evaluations",
                    "icon": "analytics"
                },
                {
                    "name": "vLLM",
                    "category": "Fast Inference",
                    "desc": "High-throughput model serving and context caching",
                    "icon": "speed"
                }
            ],
            "pipeline": {
                "left": "Dataset",
                "middle": "QLoRA Train",
                "right": "Adapter Model",
                "leftLabel": "Clean JSONL",
                "rightLabel": "Target Model"
            }
        }
    ],
    "skills": [
        {
            "category": "LLM & RAG Systems",
            "list": [
                "Data preprocessing & parsing",
                "Semantic vector database search",
                "Hybrid search & re-ranking",
                "Multi-stage QA document indexing",
                "Token allocation optimizations",
                "System instruction design"
            ]
        },
        {
            "category": "Agent Orchestration",
            "list": [
                "Role-based multi-agent definitions",
                "Hierarchical process architectures",
                "Custom tool creation for agents",
                "Stateful logic design with LangGraph",
                "Conditional graph transitions",
                "Agent memory and state persistence"
            ]
        },
        {
            "category": "Finetuning & Deploy",
            "list": [
                "Dataset formatting and preparation",
                "Fine-tuning open models via PEFT/LoRA",
                "Quantization methods (GGUF, AWQ)",
                "Fast API deployment wrappers",
                "Cloud GPU server provisioning",
                "Production monitoring and alerts"
            ]
        }
    ],
    "placement": {
        "during": [
            "Week 4: Career path alignment and portfolio audit",
            "Week 8: GitHub optimization and code reviews",
            "Week 12: System architecture review with senior mentor",
            "Week 16: Tech resume optimization and mock rounds",
            "Week 20: Final coding interview simulations"
        ],
        "after": [
            "Profile hosted on tech alumni database",
            "Direct introductions to hiring AI teams",
            "2-3 vetted engineer listings sent weekly",
            "Direct referral loops with partner startups",
            "Access to global remote tech work boards",
            "Continued mentor calls and career growth support"
        ],
        "network": [
            "Tech startups building proprietary AI layers",
            "Consultancies deploying enterprise solutions",
            "Venture-funded AI research organizations",
            "Agencies scaling engineering teams",
            "E-commerce brands building internal AI teams",
            "Fortune 500 tech innovation departments"
        ]
    },
    "careers": {
        "roles": [
            {
                "title": "AI Engineer",
                "salary": "$6,000-$9,000/month",
                "duties": "Agent design, vector pipeline optimization, RAG apps",
                "availability": "Worldwide"
            },
            {
                "title": "AI Solutions Architect",
                "salary": "$7,000-$10,000/month",
                "duties": "System design, LLM routing, vendor evaluations",
                "availability": "Enterprise companies"
            },
            {
                "title": "Machine Learning Engineer (PEFT)",
                "salary": "$6,500-$9,500/month",
                "duties": "Quantization, fine-tuning, model adaptations",
                "availability": "AI research labs, tech startups"
            },
            {
                "title": "Workflow Automation Engineer",
                "salary": "$5,500-$8,000/month",
                "duties": "Connecting agents with spreadsheets, CRM, and APIs",
                "availability": "Startups, mid-market companies"
            }
        ],
        "growth": [
            "Year 1: Develop production-level RAG and agent solutions",
            "Year 2-3: Senior engineer architecting multi-stage agent workflows",
            "Year 5+: Lead Architect directing enterprise AI adoption plans"
        ],
        "salaryGrowth": [
            "High-performing developers achieve 40% starting hikes",
            "AI engineers scale to senior ranges twice as fast as web devs",
            "Remote global projects offer premium international rates"
        ]
    },
    "pricingDetail": {
        "rows": [
            {
                "cost": "AI Course regular tuition",
                "amount": "₹30,000"
            },
            {
                "cost": "50% flagship discount",
                "amount": "₹15,000"
            },
            {
                "cost": "Cashback incentive",
                "amount": "₹2,000"
            },
            {
                "cost": "Your final tuition fee",
                "amount": "₹13,000"
            }
        ],
        "installments": [
            "3 monthly plans: ₹4,500/month (₹13,500 total)",
            "6 monthly plans: ₹2,300/month (₹13,800 total)",
            "100% money back guarantee for first 14 days",
            "No cost EMI available globally"
        ],
        "discounts": [
            "Corporate upskilling: additional 10% off for 3+ team members",
            "Referral cashback programs available",
            "Flexible group booking options"
        ],
        "includes": [
            "24 weeks structured technical training",
            "Live interactive lab labs",
            "Lifetime recording portal access",
            "Vetted vector database keys and cloud API access",
            "10+ portfolio-ready Github projects",
            "Professional portfolio code audits",
            "Custom interview prep guides",
            "Industry-recognized AI Certificate",
            "1-on-1 career mentor matchmaking"
        ]
    },
    "stories": [
        {
            "name": "John D. (Germany)",
            "before": "Junior Backend Developer, €48k/year",
            "after": "AI Software Engineer, €72k/year",
            "body": "The Skillsha AI Course changed my engineering trajectory. Instead of writing basic REST APIs, I learned how to orchestrate multi-agent CrewAI systems and tune Pinecone indexes. Recruiters were amazed by my Github portfolio code.",
            "result": "50% hike in 3 months"
        },
        {
            "name": "Sneha P. (India)",
            "before": "Data Analyst, ₹6 LPA",
            "after": "AI Solutions Consultant, ₹14 LPA",
            "body": "I wanted to transition from spreadsheets to AI models. Skillsha's practical focus on API setups and LangChain architectures gave me the exact tools I needed. The mock interviews helped me build real architectural confidence.",
            "result": "133% salary jump, global remote role"
        }
    ],
    "enrollment": [
        {
            "step": "Step 1",
            "title": "Submit Application",
            "bullets": [
                "Fill out our brief online application detailing your background and career goals.",
                "Admissions team reviews compatibility within 24 hours"
            ]
        },
        {
            "step": "Step 2",
            "title": "Admissions Chat",
            "bullets": [
                "Speak with our team to verify alignment and discuss your experience levels.",
                "Configure target track details"
            ]
        },
        {
            "step": "Step 3",
            "title": "Reserve Seat",
            "bullets": [
                "Confirm your enrollment with initial payment or set up interest-free monthly financing.",
                "Secure early booking discounts"
            ]
        },
        {
            "step": "Step 4",
            "title": "Onboarding Setup",
            "bullets": [
                "Gain instant portal access to pre-work resources, setup files, and live channel workspace.",
                "Complete pre-work modules before live classes start"
            ]
        }
    ],
    "quickFacts": [
        "Format: Live Classes + Portfolio Workshops",
        "Graduation Rate: 94% Secure Job in 60 Days",
        "Refund Policy: 14-Day Money Back Guarantee",
        "Average Hike: 54% Salary Jump Achieved",
        "Access: Lifetime course materials & forum updates",
        "Certification: Globally verified credential"
    ]
}
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
  ,
    flagshipContent: {
    "heroSubtext": "Design high-fidelity interfaces at 10x speed. Skillsha's UI/UX Design with Gen AI course teaches you modern Figma fundamentals, wireframing, and interactive prototyping, combined with cutting-edge AI design workflows.\\n\\nLearn to build premium product interfaces, landing pages, and interactive prototypes with the visual aesthetic that tech startups and top EdTech platforms demand.\\n\\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available",
    "whyChooseList": {
        "placement": [
            "Direct introductions to global product design agencies and tech companies",
            "Portfolio reviews that impress international product managers",
            "LinkedIn optimization workshops for global UX design roles",
            "Mock interviews with senior product designers",
            "Vetted job opportunities sent weekly"
        ],
        "ai": [
            "Figma AI plugins for fast layout generation",
            "Midjourney for premium landing page illustrations",
            "Uizard for quick interactive prototype builds",
            "ChatGPT for UX copy and persona creation",
            "AI-driven user behavior heatmaps",
            "Automated wireframe-to-prototype generation"
        ],
        "trainers": [
            {
                "name": "Mr. Shad",
                "title": "Lead Product Designer",
                "bullets": [
                    "12+ years in UI/UX and product design leadership",
                    "Designed interfaces for major tech brands and SaaS platforms",
                    "Expert in visual hierarchy and typography systems",
                    "Helped scale products from 0 to 10M+ users"
                ],
                "quote": "Shad teaches design systems and typographic rules with visual clarity.",
                "img": "/files/shad.png",
                "exp": "12+ Yrs Exp"
            },
            {
                "name": "Mr. Akshay Mishra",
                "title": "Brand & Interaction Specialist",
                "bullets": [
                    "10+ years in interaction design and branding",
                    "Specialization in micro-interactions, motion, and animation",
                    "Built design systems for international fintech platforms",
                    "Expert in web responsiveness and bento editorial styling"
                ],
                "quote": "Mr. Akshay's layout rules bring immediate premium visual polish.",
                "img": "",
                "exp": "10+ Yrs Exp"
            },
            {
                "name": "Ms. Hema",
                "title": "UX Researcher & Planner",
                "bullets": [
                    "6+ years in user research and cognitive design patterns",
                    "Expertise in user testing, journey maps, and wireframing",
                    "Worked with major healthcare and e-commerce companies",
                    "Helped optimize conversion funnels using behavior tracking"
                ],
                "quote": "Hema makes UX logic and conversion-oriented layouts completely logical.",
                "img": "",
                "exp": "6+ Yrs Exp"
            }
        ],
        "pricing": [
            "Regular price: ₹30,000 / $360 USD equivalent",
            "Special discount: ₹15,000 / $180 USD (50% off)",
            "Additional cashback: ₹2,000 / $24 USD",
            "0% Interest EMI available worldwide",
            "No hidden charges, transparent pricing",
            "Become a premium designer without expensive art school fees."
        ]
    },
    "differencesSubtext": "We focus on premium visual polish, atomic design systems, and rapid prototyping workflows. You will graduate with a live portfolio of 4 stunning case studies.",
    "differences": [
        {
            "title": "1. Premium Bento/Editorial Portfolio Projects",
            "bullets": [
                "Design a high-converting SaaS landing page",
                "Build a complete mobile app interface design system",
                "Create an AI-native interface design with dark mode",
                "Publish a live case study showcasing user journey testing"
            ]
        },
        {
            "title": "2. Atomic Design Systems in Figma",
            "bullets": [
                "Master components, auto-layout, variables, and variants",
                "Design scalable UI kits with light and dark modes",
                "Build fully responsive grid networks",
                "Create interactive micro-animations and state changes"
            ]
        },
        {
            "title": "3. Industry-Recognized Certification",
            "bullets": [
                "Skillsha's UI/UX Design with Gen AI Certificate is recognized globally by design agencies and hiring product teams."
            ]
        },
        {
            "title": "4. Rapid AI Workflows",
            "bullets": [
                "Generate assets in seconds instead of drawing manually",
                "Write clean UX copy with automated AI editors",
                "Run automated user tests using digital twins",
                "Accelerate design execution to stand out in interviews"
            ]
        }
    ],
    "toolPillars": [
        {
            "title": "Visual Design Core",
            "subtitle": "Figma & Design Systems",
            "icon": "palette",
            "colorClass": "text-blue-500 bg-blue-500/10",
            "tools": [
                {
                    "name": "Figma (Auto Layout & Variables)",
                    "category": "Design UI",
                    "desc": "Scale spacing, color modes, and layouts automatically",
                    "icon": "palette"
                },
                {
                    "name": "Atomic Components",
                    "category": "Design Systems",
                    "desc": "Create reusable buttons, forms, and cards with states",
                    "icon": "layers"
                },
                {
                    "name": "Responsive Layout Grids",
                    "category": "Responsive UX",
                    "desc": "Figma layouts that map perfectly to developer grids",
                    "icon": "grid_view"
                },
                {
                    "name": "Prototyping & Motion",
                    "category": "Micro-animations",
                    "desc": "Smart Animate transitions, overlays, and smart paths",
                    "icon": "movie"
                }
            ],
            "pipeline": {
                "left": "Wireframe",
                "middle": "Figma Components",
                "right": "High-Fi Screen",
                "leftLabel": "Sketch",
                "rightLabel": "Product UI"
            }
        },
        {
            "title": "AI Creative Studio",
            "subtitle": "Asset & Copy Generator",
            "icon": "psychology",
            "colorClass": "text-purple-500 bg-purple-500/10",
            "tools": [
                {
                    "name": "Midjourney",
                    "category": "AI Graphics",
                    "desc": "Premium illustrations and background elements",
                    "icon": "photo_library"
                },
                {
                    "name": "Figma AI & Plugins",
                    "category": "Workflow Speed",
                    "desc": "Automate layout changes and dummy data generation",
                    "icon": "terminal"
                },
                {
                    "name": "Uizard",
                    "category": "Rapid Prototyping",
                    "desc": "Transform hand-drawn wireframes into mockups in clicks",
                    "icon": "bolt"
                },
                {
                    "name": "ChatGPT & Claude",
                    "category": "UX Copywriting",
                    "desc": "Write clean button labels, header copy, and error alerts",
                    "icon": "edit"
                }
            ],
            "pipeline": {
                "left": "Text Prompt",
                "middle": "Midjourney Render",
                "right": "Figma Asset",
                "leftLabel": "Concept",
                "rightLabel": "UI Graphic"
            }
        },
        {
            "title": "Research & Testing",
            "subtitle": "UX Logic & Optimization",
            "icon": "analytics",
            "colorClass": "text-emerald-500 bg-emerald-500/10",
            "tools": [
                {
                    "name": "Maze",
                    "category": "User Testing",
                    "desc": "Run remote usability tests and map click success rates",
                    "icon": "analytics"
                },
                {
                    "name": "Hotjar / Heatmaps",
                    "category": "Behavior Analytics",
                    "desc": "Analyze scroll maps and user attention zones",
                    "icon": "visibility"
                },
                {
                    "name": "Miro",
                    "category": "User Journey Maps",
                    "desc": "Map research data, flows, and architectures",
                    "icon": "account_tree"
                },
                {
                    "name": "Framer",
                    "category": "Interactive Code UI",
                    "desc": "Publish Figma layout direct to live web code",
                    "icon": "link"
                }
            ],
            "pipeline": {
                "left": "Prototype Link",
                "middle": "Maze Testing",
                "right": "Heatmap Insights",
                "leftLabel": "Figma File",
                "rightLabel": "Design Changes"
            }
        }
    ],
    "skills": [
        {
            "category": "Visual UI Design",
            "list": [
                "Aesthetic bento & editorial layouts",
                "Scalable atomic systems in Figma",
                "Auto layout & advanced responsive design",
                "Custom component variant systems",
                "Color theory & typography hierarchies",
                "Micro-interactions & smart prototyping"
            ]
        },
        {
            "category": "UX Logic & Research",
            "list": [
                "User persona & scenario profiling",
                "Wireframing & user journey mapping",
                "Information architecture (IA) planning",
                "Usability testing using Maze",
                "Conversion-oriented layout structures",
                "Interaction state specifications"
            ]
        },
        {
            "category": "AI Design Workflows",
            "list": [
                "Prompting Midjourney for design assets",
                "AI-powered rapid wireframe generation",
                "Copy writing with Claude / ChatGPT",
                "Automating dummy data injection",
                "Analyzing heatmaps for design choices",
                "Scaling landing page layouts with AI"
            ]
        }
    ],
    "placement": {
        "during": [
            "Week 4: Portfolio setup and case study selection",
            "Week 8: Figma skills audit and feedback loops",
            "Week 12: Wireframe and system audit with PM mentor",
            "Week 16: Resume design and portfolio polish",
            "Week 20: Design presentation and mock rounds"
        ],
        "after": [
            "Design showcase on Skillsha talent directory",
            "Direct referral loops with product teams",
            "2-3 design jobs matched weekly",
            "Vetted client work briefs for portfolio growth",
            "Active Slack group for design opportunities",
            "Ongoing portfolio reviews as you scale"
        ],
        "network": [
            "Product design studios globally",
            "High-growth SaaS startups",
            "E-commerce brands upgrading layouts",
            "Marketing agencies hiring UI designers",
            "Mobile app development groups",
            "Corporate product design divisions"
        ]
    },
    "careers": {
        "roles": [
            {
                "title": "UI/UX Designer",
                "salary": "$3,000-$5,000/month",
                "duties": "Interface design, component kits, wireframing",
                "availability": "Agencies, SaaS companies, mobile teams"
            },
            {
                "title": "Product Designer",
                "salary": "$3,500-$6,000/month",
                "duties": "User testing, design systems, interface logic",
                "availability": "Startups, tech platforms"
            },
            {
                "title": "Visual Designer",
                "salary": "$2,800-$4,500/month",
                "duties": "Landing page systems, graphics, branding layouts",
                "availability": "Agencies, brands"
            },
            {
                "title": "UX Researcher",
                "salary": "$3,000-$4,800/month",
                "duties": "User journey mapping, testing, wireframe planning",
                "availability": "Established tech companies"
            }
        ],
        "growth": [
            "Year 1: Deliver clean visual screens and components",
            "Year 2-3: Manage complete product features and research",
            "Year 5+: Design Director shaping product design systems"
        ],
        "salaryGrowth": [
            "UI/UX designers with clean portfolios command premium rates",
            "AI-native designers execute work 3x faster than peers",
            "Remote product designers often secure global USD contracts"
        ]
    },
    "pricingDetail": {
        "rows": [
            {
                "cost": "Design Course regular tuition",
                "amount": "₹30,000"
            },
            {
                "cost": "50% special discount",
                "amount": "₹15,000"
            },
            {
                "cost": "Cashback bonus",
                "amount": "₹2,000"
            },
            {
                "cost": "Your final tuition fee",
                "amount": "₹13,000"
            }
        ],
        "installments": [
            "3 monthly plans: ₹4,500/month (₹13,500 total)",
            "6 monthly plans: ₹2,300/month (₹13,800 total)",
            "100% money back guarantee for first 14 days",
            "No cost EMI available globally"
        ],
        "discounts": [
            "Referral program: 10% off for both you and a friend",
            "Flexible payment schemes for corporate teams",
            "Upskilling package options available"
        ],
        "includes": [
            "24 weeks structured UX/UI training",
            "Live interactive layout clinics",
            "Recorded video portal access",
            "Vetted UI kits and design system assets",
            "4 high-fidelity portfolio projects",
            "Professional design portfolio audits",
            "Custom interview prep guides",
            "Industry-recognized UI/UX Certificate",
            "1-on-1 career mentor matchmaking"
        ]
    },
    "stories": [
        {
            "name": "Emily L. (United Kingdom)",
            "before": "Graphic Designer, £26k/year",
            "after": "UI/UX Designer at Fintech Startup, £42k/year",
            "body": "Skillsha helped me transition from print design to digital interfaces. Learning to build atomic design systems in Figma and speed up layout concepts with AI was the key. Within 60 days of completing, I secured my first product role.",
            "result": "61% salary increase, remote work"
        },
        {
            "name": "Varun M. (India)",
            "before": "Engineering Student",
            "after": "Product Designer at SaaS Brand, ₹8 LPA",
            "body": "I wanted to code less and design more. The Figma Auto Layout modules and AI asset generation techniques at Skillsha were incredibly practical. I built 3 premium app prototypes that immediately got me hired.",
            "result": "First job secured before graduation"
        }
    ],
    "enrollment": [
        {
            "step": "Step 1",
            "title": "Submit Application",
            "bullets": [
                "Fill out our brief online application detailing your background and career goals.",
                "Admissions team reviews compatibility within 24 hours"
            ]
        },
        {
            "step": "Step 2",
            "title": "Admissions Chat",
            "bullets": [
                "Speak with our team to verify alignment and discuss your experience levels.",
                "Configure target track details"
            ]
        },
        {
            "step": "Step 3",
            "title": "Reserve Seat",
            "bullets": [
                "Confirm your enrollment with initial payment or set up interest-free monthly financing.",
                "Secure early booking discounts"
            ]
        },
        {
            "step": "Step 4",
            "title": "Onboarding Setup",
            "bullets": [
                "Gain instant portal access to pre-work resources, setup files, and live channel workspace.",
                "Complete pre-work modules before live classes start"
            ]
        }
    ],
    "quickFacts": [
        "Format: Live Classes + Portfolio Workshops",
        "Graduation Rate: 94% Secure Job in 60 Days",
        "Refund Policy: 14-Day Money Back Guarantee",
        "Average Hike: 54% Salary Jump Achieved",
        "Access: Lifetime course materials & forum updates",
        "Certification: Globally verified credential"
    ]
}
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
        tagline: "Build Your AI Writing Assistant",
        description: "Develop a custom-tailored prompt library for generating ad copy hooks, email drip sequences, and blog posts with high CTR ratings.",
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
        tagline: "SQL Query Optimizer",
        description: "Create an automated database query writer and indexing database pipeline using LLM routing.",
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
      skills: [
        {
          category: "Programming & Data Skills",
          list: [
            "Python programming basics & syntax",
            "NumPy for numerical calculations and arrays",
            "Pandas for cleaning and organizing dataframes",
            "Handling missing values and data inconsistencies"
          ]
        },
        {
          category: "Statistics & Analytical Skills",
          list: [
            "Descriptive statistics (mean, variance, SD)",
            "Probability concepts explained simply",
            "Hypothesis testing (p-values, T-tests)",
            "A/B testing setup and analysis"
          ]
        },
        {
          category: "Machine Learning Skills",
          list: [
            "Supervised classification and regression",
            "Unsupervised clustering algorithms",
            "Feature engineering and selection APIs",
            "Hyperparameter tuning and evaluation"
          ]
        },
        {
          category: "SQL & Database Skills",
          list: [
            "Writing efficient SQL query select statements",
            "Joining tables and aggregating data",
            "Using AI to write and optimize queries",
            "Relational database schema modeling"
          ]
        },
        {
          category: "Data Visualization Skills",
          list: [
            "Creating charts using Matplotlib & Seaborn",
            "Designing business intelligence dashboards",
            "Telling data stories visually to leadership",
            "Google Looker Studio & Power BI fundamentals"
          ]
        },
        {
          category: "Gen AI & AI-Assisted Skills",
          list: [
            "LLM prompting and system instructions",
            "AI-assisted coding with Claude & ChatGPT",
            "RAG (Retrieval-Augmented Generation) setups",
            "Double-checking AI models output against facts"
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
            duties: "Performs deep-dive analysis on user behavior and e-commerce transactions to identify leaks and opportunities in business funnels.",
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
          before: "Marketing Coordinator",
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
  },  "product-management": {
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
,

  "data-analyst": {
    "title": "Data Analyst",
    "typewriter": [
        "PowerBI & Excel",
        "SQL Database Queries",
        "Python Data Analytics",
        "AI-Powered Dashboards"
    ],
    "description": "Master SQL, Python, Excel, and PowerBI alongside AI-driven automated data analytics workflows. Clean, model, and visualize data like a top corporate analyst.",
    "duration": "16 Weeks",
    "salary": "₹7.2 LPA",
    "liveSessions": "48+ hrs",
    "projects": "6+",
    "milestoneWord": "Six",
    "milestones": [
        {
            "number": 1,
            "title": "Advanced Excel & BI Analytics",
            "modules": [
                {
                    "title": "Formulas & Pivot Tables",
                    "icon": "table_chart",
                    "color": "orange",
                    "bullets": [
                        {
                            "title": "Dynamic array formulas",
                            "desc": "XLOOKUP, FILTER, UNIQUE",
                            "icon": "check"
                        },
                        {
                            "title": "Pivot tables and clean charts",
                            "desc": "building visual dashboards",
                            "icon": "check"
                        }
                    ]
                }
            ]
        },
        {
            "number": 2,
            "title": "SQL Database Queries",
            "modules": [
                {
                    "title": "SQL Select & Aggregations",
                    "icon": "database",
                    "color": "blue",
                    "bullets": [
                        {
                            "title": "Writing select filters and joins",
                            "desc": "combining multiple data sheets",
                            "icon": "check"
                        },
                        {
                            "title": "Data aggregations and grouping",
                            "desc": "calculating metrics",
                            "icon": "check"
                        }
                    ]
                }
            ]
        }
    ],
    "faqs": [
        {
            "q": "Is programming required for this course?",
            "a": "We teach Python from the absolute ground up, focusing only on the data packages (Pandas/NumPy) that analysts actually use."
        }
    ],
    "flagshipContent": {
        "heroSubtext": "Ready to build a career in Data Analytics? Skillsha's Data Analyst course teaches Python, SQL, Excel, and PowerBI, combined with modern AI data analysis pipelines.\\n\\nLearn to clean, model, and visualize corporate datasets at 10x speed using generative AI tools that top business intelligence teams are using right now.\\n\\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available",
        "whyChooseList": {
            "placement": [
                "Direct introductions to global analytics teams and corporate partners",
                "Mock interviews with senior business intelligence analysts",
                "Resume and LinkedIn optimization tailored to analyst markets",
                "GitHub portfolio setup showing clean data scripts",
                "Weekly job matching alerts"
            ],
            "ai": [
                "ChatGPT for SQL query design and debugging",
                "Claude for data cleaning script creation",
                "AI-powered predictive data analysis",
                "Automated dashboard layout planning",
                "Natural language query engines",
                "AI-driven anomaly detection in datasets"
            ],
            "trainers": [
                {
                    "name": "Mr. Shad",
                    "title": "Lead Data Analyst",
                    "bullets": [
                        "12+ years in business intelligence and reporting",
                        "Managed analytics pipelines for global retail and finance brands",
                        "Expert in SQL modeling and dashboard architectures",
                        "Trained 200+ junior analysts globally"
                    ],
                    "quote": "Shad makes database joins and query logic easy to master.",
                    "img": "/files/shad.png",
                    "exp": "12+ Yrs Exp"
                },
                {
                    "name": "Mr. Akshay Mishra",
                    "title": "PowerBI & Visuals Specialist",
                    "bullets": [
                        "10+ years in dashboard design and brand metrics",
                        "Specialization in PowerBI, DAX formulas, and charts",
                        "Built reporting interfaces for international brands",
                        "Expert in visual storytelling with charts"
                    ],
                    "quote": "Mr. Akshay teaches you to make dashboards look premium and polished.",
                    "img": "",
                    "exp": "10+ Yrs Exp"
                },
                {
                    "name": "Ms. Hema",
                    "title": "SQL & Automation Engineer",
                    "bullets": [
                        "6+ years in SQL database design and data analysis",
                        "Expertise in SQL query tuning, data lakes, and dashboards",
                        "Worked with major healthcare databases",
                        "Helped scale analytical systems"
                    ],
                    "quote": "Hema makes database queries and complex SQL filters second nature.",
                    "img": "",
                    "exp": "6+ Yrs Exp"
                }
            ],
            "pricing": [
                "Regular price: ₹30,000 / $360 USD equivalent",
                "Special discount: ₹15,000 / $180 USD (50% off)",
                "Additional cashback: ₹2,000 / $24 USD",
                "0% Interest EMI available worldwide",
                "No hidden charges, transparent pricing",
                "Gain professional data analytics skills without expensive corporate academy pricing."
            ]
        },
        "differencesSubtext": "We skip abstract theories and focus on practical SQL querying, Excel pivots, and PowerBI dashboards. You will build 4 portfolio dashboard projects.",
        "differences": [
            {
                "title": "1. Real-World Dashboard Case Studies",
                "bullets": [
                    "Design a sales dashboard in PowerBI",
                    "Create a SQL database query pipeline for customer analytics",
                    "Build a python data cleaning script for messy logs",
                    "Publish an interactive analytics web app"
                ]
            },
            {
                "title": "2. Clean GitHub Portfolios",
                "bullets": [
                    "Python analytic libraries",
                    "SQL database design schemas",
                    "DAX formula sheets",
                    "Automated dashboards"
                ]
            },
            {
                "title": "3. Industry-Recognized Certification",
                "bullets": [
                    "Skillsha's Data Analyst Certificate is recognized globally by top business intelligence and analytics teams."
                ]
            },
            {
                "title": "4. Rapid AI Analytics Workflows",
                "bullets": [
                    "Write SQL queries in seconds using AI assistants",
                    "Debug syntax and connection errors instantly",
                    "Automate chart selection based on data models",
                    "Speed up dashboard layout design using pattern frameworks"
                ]
            }
        ],
        "toolPillars": [
            {
                "title": "Excel & SQL Core",
                "subtitle": "Query & Spreadsheet Foundation",
                "icon": "storage",
                "colorClass": "text-blue-500 bg-blue-500/10",
                "tools": [
                    {
                        "name": "Excel (Power Query & DAX)",
                        "category": "Spreadsheets",
                        "desc": "Data modeling, pivots, and custom formulas",
                        "icon": "table_chart"
                    },
                    {
                        "name": "PostgreSQL & MySQL",
                        "category": "SQL Databases",
                        "desc": "Write select queries, joins, filters, and aggregations",
                        "icon": "database"
                    },
                    {
                        "name": "SQL Query Tuning",
                        "category": "Performance",
                        "desc": "Optimize indexing and database pipelines",
                        "icon": "settings"
                    },
                    {
                        "name": "Excel Dashboards",
                        "category": "Reporting",
                        "desc": "Create dynamic corporate charts and visual summaries",
                        "icon": "bar_chart"
                    }
                ],
                "pipeline": {
                    "left": "Raw Excel",
                    "middle": "SQL Query",
                    "right": "Clean View",
                    "leftLabel": "Database",
                    "rightLabel": "Data Output"
                }
            },
            {
                "title": "PowerBI Showcase",
                "subtitle": "Visual Dashboards & DAX",
                "icon": "analytics",
                "colorClass": "text-purple-500 bg-purple-500/10",
                "tools": [
                    {
                        "name": "PowerBI Desktop",
                        "category": "BI Tool",
                        "desc": "Connect data sources, define schemas, build layouts",
                        "icon": "analytics"
                    },
                    {
                        "name": "DAX Measures",
                        "category": "Metrics",
                        "desc": "Write advanced formulas to calculate business indicators",
                        "icon": "functions"
                    },
                    {
                        "name": "Interactive Charts",
                        "category": "Visuals",
                        "desc": "Map maps, scatter plots, and custom visualizations",
                        "icon": "donut_large"
                    },
                    {
                        "name": "PowerBI Service",
                        "category": "Publishing",
                        "desc": "Deploy dashboards to cloud servers and share links",
                        "icon": "cloud"
                    }
                ],
                "pipeline": {
                    "left": "Data Models",
                    "middle": "DAX Measures",
                    "right": "BI Dashboard",
                    "leftLabel": "Input DF",
                    "rightLabel": "Predict Model"
                }
            },
            {
                "title": "Python & AI Analytics",
                "subtitle": "Coding & AI Assistance",
                "icon": "psychology",
                "colorClass": "text-emerald-500 bg-emerald-500/10",
                "tools": [
                    {
                        "name": "Python (Pandas & NumPy)",
                        "category": "Data Cleaning",
                        "desc": "Filter missing records, clean formats, model variables",
                        "icon": "terminal"
                    },
                    {
                        "name": "ChatGPT & Claude",
                        "category": "AI Assistants",
                        "desc": "Generate SQL syntax and debug Python code immediately",
                        "icon": "edit"
                    },
                    {
                        "name": "Streamlit",
                        "category": "BI Web Apps",
                        "desc": "Publish python analytics as interactive web apps",
                        "icon": "api"
                    },
                    {
                        "name": "Git & GitHub",
                        "category": "Portfolio",
                        "desc": "Commit analyst scripts and host code repositories",
                        "icon": "link"
                    }
                ],
                "pipeline": {
                    "left": "Python File",
                    "middle": "Streamlit Run",
                    "right": "Live web app",
                    "leftLabel": "Code",
                    "rightLabel": "Dashboard"
                }
            }
        ],
        "skills": [
            {
                "category": "Spreadsheets & SQL",
                "list": [
                    "Dynamic lookup functions (XLOOKUP)",
                    "Power Query data import and clean",
                    "Relational database schema structures",
                    "SQL select queries, joins, aggregates",
                    "Data grouping and sorting logic",
                    "Connecting Excel tables with SQL databases"
                ]
            },
            {
                "category": "Visual BI Dashboards",
                "list": [
                    "Data modeling in PowerBI",
                    "DAX calculations and custom metrics",
                    "Visual charts, maps, and KPI cards",
                    "Dashboard layout rules & user experience",
                    "Cloud publishing and sharing dashboards",
                    "Interactive slice and filter configurations"
                ]
            },
            {
                "category": "Python & AI Workflows",
                "list": [
                    "Pandas dataframes data cleaning",
                    "Visual charts with Matplotlib",
                    "SQL syntax writing using ChatGPT",
                    "Python script debugging with Claude",
                    "Streamlit data app packaging",
                    "Git commit and GitHub portfolio setups"
                ]
            }
        ],
        "placement": {
            "during": [
                "Week 4: SQL queries assessment",
                "Week 8: PowerBI layout checks",
                "Week 12: Python coding challenges",
                "Week 16: Tech resume optimization",
                "Week 20: Technical mock interviews"
            ],
            "after": [
                "Alumni network data access",
                "Corporate recruiter matchmaking",
                "2-3 vetted analyst roles weekly",
                "Direct referral loops with partners",
                "Vetted corporate data tasks",
                "Continuous career guidance support"
            ],
            "network": [
                "SaaS startups hiring analyst talent",
                "Business intelligence consulting firms",
                "E-commerce brands analyzing metrics",
                "Agencies managing database loops",
                "Financial reporting divisions",
                "Corporate data management groups"
            ]
        },
        "careers": {
            "roles": [
                {
                    "title": "Junior Data Analyst",
                    "salary": "$3,500-$4,800/month",
                    "duties": "SQL queries, dashboards, clean spreadsheets",
                    "availability": "Startups, agencies, brands"
                },
                {
                    "title": "BI Analyst",
                    "salary": "$4,000-$5,500/month",
                    "duties": "PowerBI layouts, DAX formulas, database modeling",
                    "availability": "Corporate analytics departments"
                },
                {
                    "title": "Data Reporter",
                    "salary": "$3,200-$4,500/month",
                    "duties": "Spreadsheets, charts, reports, analytics summary",
                    "availability": "Startups, established brands"
                },
                {
                    "title": "Analytics Support Developer",
                    "salary": "$3,800-$5,200/month",
                    "duties": "SQL updates, Python data cleaning script management",
                    "availability": "Agencies, SaaS teams"
                }
            ],
            "growth": [
                "Year 1: Deliver clean database queries and visual charts",
                "Year 2-3: Senior analyst designing complex DAX dashboards",
                "Year 5+: Business Intelligence Lead directing analytics divisions"
            ],
            "salaryGrowth": [
                "BI analysts secure premium starting hikes",
                "SQL + dashboard skills command high rates globally",
                "Remote data analysts are highly sought by global teams"
            ]
        },
        "pricingDetail": {
            "rows": [
                {
                    "cost": "Tuition regular price",
                    "amount": "₹30,000"
                },
                {
                    "cost": "50% special discount",
                    "amount": "₹15,000"
                },
                {
                    "cost": "Bonus cashback",
                    "amount": "₹2,000"
                },
                {
                    "cost": "Your final investment",
                    "amount": "₹13,000"
                }
            ],
            "installments": [
                "3 monthly plans: ₹4,500/month (₹13,500 total)",
                "6 monthly plans: ₹2,300/month (₹13,800 total)",
                "100% money back guarantee for first 14 days",
                "No cost EMI available globally"
            ],
            "discounts": [
                "Referral program: 10% off for both you and a friend",
                "Flexible payment schemes for corporate teams",
                "Upskilling package options available"
            ],
            "includes": [
                "16 weeks structured Data Analyst training",
                "Live interactive layout clinics",
                "Recorded video portal access",
                "Vetted data files and schema files",
                "4 complete github analyst projects",
                "Professional database portfolio audits",
                "Custom interview prep guides",
                "Industry-recognized Analyst Certificate",
                "1-on-1 career mentor matchmaking"
            ]
        },
        "stories": [
            {
                "name": "Thomas L. (United Kingdom)",
                "before": "Operations Coordinator",
                "after": "Data Analyst at Logistics Brand, £38k/year",
                "body": "Skillsha's focus on SQL database logic and PowerBI visual layouts was exactly what I needed. I didn't want abstract academic formulas. I wanted practical query skills. Within 60 days of graduating, I got hired.",
                "result": "First technical role secured"
            },
            {
                "name": "Pooja S. (India)",
                "before": "Excel Assistant, ₹3 LPA",
                "after": "BI Analyst at Tech Brand, ₹7.5 LPA",
                "body": "I wanted to transition from spreadsheets to SQL data models. Skillsha's hands-on dashboard tasks and AI script writing gave me the edge. The code portfolio got me through the tech rounds.",
                "result": "150% salary jump, product team"
            }
        ],
        "enrollment": [
            {
                "step": "Step 1",
                "title": "Submit Application",
                "bullets": [
                    "Fill out our brief online application detailing your background and career goals.",
                    "Admissions team reviews compatibility within 24 hours"
                ]
            },
            {
                "step": "Step 2",
                "title": "Admissions Chat",
                "bullets": [
                    "Speak with our team to verify alignment and discuss your experience levels.",
                    "Configure target track details"
                ]
            },
            {
                "step": "Step 3",
                "title": "Reserve Seat",
                "bullets": [
                    "Confirm your enrollment with initial payment or set up interest-free monthly financing.",
                    "Secure early booking discounts"
                ]
            },
            {
                "step": "Step 4",
                "title": "Onboarding Setup",
                "bullets": [
                    "Gain instant portal access to pre-work resources, setup files, and live channel workspace.",
                    "Complete pre-work modules before live classes start"
                ]
            }
        ],
        "quickFacts": [
            "Format: Live Classes + Portfolio Workshops",
            "Graduation Rate: 94% Secure Job in 60 Days",
            "Refund Policy: 14-Day Money Back Guarantee",
            "Average Hike: 54% Salary Jump Achieved",
            "Access: Lifetime course materials & forum updates",
            "Certification: Globally verified credential"
        ]
    }
},

  "business-analyst": {
    "title": "Business Analyst",
    "typewriter": [
        "Business Strategy",
        "SQL Databases",
        "Agile & Jira",
        "Requirements Analysis"
    ],
    "description": "Learn to bridge the gap between business needs and technology. Master requirements gathering, SQL queries, user stories, and Agile methodologies.",
    "duration": "16 Weeks",
    "salary": "₹6.8 LPA",
    "liveSessions": "48+ hrs",
    "projects": "5+",
    "milestoneWord": "Five",
    "milestones": [
        {
            "number": 1,
            "title": "Requirements & Agile Lifecycle",
            "modules": [
                {
                    "title": "Agile, Scrum & Jira",
                    "icon": "change_history",
                    "color": "indigo",
                    "bullets": [
                        {
                            "title": "Writing user stories and acceptance criteria",
                            "desc": "mapping requirements",
                            "icon": "check"
                        },
                        {
                            "title": "Managing scrum boards in Jira",
                            "desc": "sprint planning",
                            "icon": "check"
                        }
                    ]
                }
            ]
        }
    ],
    "faqs": [
        {
            "q": "Is programming required?",
            "a": "No coding is required. We focus on business analysis models, requirements documents, and SQL database queries."
        }
    ],
    "flagshipContent": {
        "heroSubtext": "Ready to build a career in Business Analysis? Skillsha's Business Analyst course teaches requirements gathering, SQL, Excel, and Agile/Jira, combined with modern AI productivity workflows.\\n\\nLearn to model processes and write specifications at 10x speed using generative AI tools that top product teams are using right now.\\n\\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available",
        "whyChooseList": {
            "placement": [
                "Direct introductions to corporate partners and technology companies",
                "Mock interviews with senior business analysts and product managers",
                "Resume and LinkedIn optimization tailored to analyst markets",
                "Product portfolio setup showing requirements documents",
                "Weekly job matching alerts"
            ],
            "ai": [
                "ChatGPT for requirements draft creation",
                "Claude for user stories and acceptances",
                "AI-driven business process modeling",
                "Automated wireframe spec generation",
                "Smart meeting summaries using AI tools",
                "AI-powered market research frameworks"
            ],
            "trainers": [
                {
                    "name": "Mr. Shad",
                    "title": "Lead Product Manager",
                    "bullets": [
                        "12+ years in product management and business analysis",
                        "Managed requirements for fintech and enterprise SaaS software",
                        "Expert in Agile processes and documentation",
                        "Certified Scrum Product Owner"
                    ],
                    "quote": "Shad makes Agile sprint cycles and Jira configurations easy to follow.",
                    "img": "/files/shad.png",
                    "exp": "12+ Yrs Exp"
                },
                {
                    "name": "Mr. Akshay Mishra",
                    "title": "Interaction & Design Specialist",
                    "bullets": [
                        "10+ years in interface design and wireframing",
                        "Specialization in user flow maps and visual diagrams",
                        "Built specifications for international SaaS systems",
                        "Expert in visual hierarchy and bento layouts"
                    ],
                    "quote": "Mr. Akshay's diagram guidelines make your requirements documents look premium.",
                    "img": "",
                    "exp": "10+ Yrs Exp"
                },
                {
                    "name": "Ms. Hema",
                    "title": "Business Systems Analyst",
                    "bullets": [
                        "6+ years in systems research and SQL data analysis",
                        "Expertise in user stories, database queries, and wireframing",
                        "Worked with major e-commerce platforms",
                        "Helped scale analytical specifications"
                    ],
                    "quote": "Hema makes requirements documents and wireframes completely logical.",
                    "img": "",
                    "exp": "6+ Yrs Exp"
                }
            ],
            "pricing": [
                "Regular price: ₹30,000 / $360 USD equivalent",
                "Special discount: ₹15,000 / $180 USD (50% off)",
                "Additional cashback: ₹2,000 / $24 USD",
                "0% Interest EMI available worldwide",
                "No hidden charges, transparent pricing",
                "Gain professional business analyst skills without expensive corporate academy pricing."
            ]
        },
        "differencesSubtext": "We skip abstract theories and focus on practical Agile requirements, SQL querying, and Jira management. You will build 3 portfolio case studies.",
        "differences": [
            {
                "title": "1. Real-World Business Case Studies",
                "bullets": [
                    "Design a complete business requirements document (BRD)",
                    "Create a product backlog with user stories in Jira",
                    "Build a SQL query pipeline for competitor analytics",
                    "Publish a user flow diagram display"
                ]
            },
            {
                "title": "2. Requirements Portfolios",
                "bullets": [
                    "User stories and acceptance criteria",
                    "Agile backlog configurations",
                    "Process flowcharts",
                    "Database schemas"
                ]
            },
            {
                "title": "3. Industry-Recognized Certification",
                "bullets": [
                    "Skillsha's Business Analyst Certificate is recognized globally by top business analytics and tech teams."
                ]
            },
            {
                "title": "4. Rapid AI Workflows",
                "bullets": [
                    "Write user stories in seconds using AI assistants",
                    "Debug backlogs and sprint plans instantly",
                    "Automate flowchart selection based on process models",
                    "Speed up wireframe spec design using pattern frameworks"
                ]
            }
        ],
        "toolPillars": [
            {
                "title": "Agile & Jira Core",
                "subtitle": "Agile & Process Management",
                "icon": "change_history",
                "colorClass": "text-blue-500 bg-blue-500/10",
                "tools": [
                    {
                        "name": "Jira Software",
                        "category": "Project Tracking",
                        "desc": "Manage scrum boards, backlog lists, and sprint plans",
                        "icon": "change_history"
                    },
                    {
                        "name": "Confluence",
                        "category": "Documentation",
                        "desc": "Write business requirements and product specifications",
                        "icon": "description"
                    },
                    {
                        "name": "Miro & Lucidchart",
                        "category": "Visual Mapping",
                        "desc": "Draw user journeys and business workflow process maps",
                        "icon": "account_tree"
                    },
                    {
                        "name": "MS Excel Advanced",
                        "category": "Reporting",
                        "desc": "Pivot tables, custom charts, and financial estimates",
                        "icon": "table_chart"
                    }
                ],
                "pipeline": {
                    "left": "User Flow",
                    "middle": "Jira Backlog",
                    "right": "User Story",
                    "leftLabel": "Concept",
                    "rightLabel": "Dev Task"
                }
            },
            {
                "title": "SQL & Data Analytics",
                "subtitle": "Query & Database Foundation",
                "icon": "storage",
                "colorClass": "text-purple-500 bg-purple-500/10",
                "tools": [
                    {
                        "name": "PostgreSQL & MySQL",
                        "category": "SQL Databases",
                        "desc": "Write select queries, joins, filters, and aggregations",
                        "icon": "database"
                    },
                    {
                        "name": "SQL Query Tuning",
                        "category": "Performance",
                        "desc": "Optimize indexing and database pipelines",
                        "icon": "settings"
                    },
                    {
                        "name": "PowerBI Desktop",
                        "category": "BI Tool",
                        "desc": "Connect data sources, define schemas, build layouts",
                        "icon": "analytics"
                    },
                    {
                        "name": "DAX Measures",
                        "category": "Metrics",
                        "desc": "Write advanced formulas to calculate business indicators",
                        "icon": "functions"
                    }
                ],
                "pipeline": {
                    "left": "SQL database",
                    "middle": "DAX Measures",
                    "right": "BI Dashboard",
                    "leftLabel": "DB Schema",
                    "rightLabel": "Visual Report"
                }
            },
            {
                "title": "AI & Productivity",
                "subtitle": "Coding & AI Assistance",
                "icon": "psychology",
                "colorClass": "text-emerald-500 bg-emerald-500/10",
                "tools": [
                    {
                        "name": "ChatGPT & Claude",
                        "category": "AI Assistants",
                        "desc": "Generate SQL syntax and debug specifications immediately",
                        "icon": "edit"
                    },
                    {
                        "name": "Streamlit",
                        "category": "BI Web Apps",
                        "desc": "Publish python analytics as interactive web apps",
                        "icon": "api"
                    },
                    {
                        "name": "Git & GitHub",
                        "category": "Portfolio",
                        "desc": "Commit analyst scripts and host code repositories",
                        "icon": "link"
                    },
                    {
                        "name": "Python (Pandas & NumPy)",
                        "category": "Data Cleaning",
                        "desc": "Filter missing records, clean formats, model variables",
                        "icon": "terminal"
                    }
                ],
                "pipeline": {
                    "left": "Python File",
                    "middle": "Streamlit Run",
                    "right": "Live web app",
                    "leftLabel": "Code",
                    "rightLabel": "Dashboard"
                }
            }
        ],
        "skills": [
            {
                "category": "Agile & Documentation",
                "list": [
                    "Agile lifecycle & scrum structures",
                    "Requirements gathering & user stories",
                    "Process flowcharts & user journey maps",
                    "Managing scrum backlogs in Jira",
                    "Writing specs in Confluence",
                    "Agile estimation methods"
                ]
            },
            {
                "category": "SQL Databases & BI",
                "list": [
                    "Data modeling & table structures",
                    "SQL select queries, joins, aggregates",
                    "PowerBI dashboard visual configurations",
                    "DAX calculations and custom metrics",
                    "SQL queries optimization",
                    "Database schemas modeling"
                ]
            },
            {
                "category": "AI Tools & Workflows",
                "list": [
                    "Writing specs using ChatGPT",
                    "Debugging sprint backlogs with Claude",
                    "Automated anomaly checking in Excel",
                    "Miro diagrams creation with AI",
                    "Streamlit data app packaging",
                    "Git commit & GitHub portfolio setups"
                ]
            }
        ],
        "placement": {
            "during": [
                "Week 4: Business specs review",
                "Week 8: Jira board audit checks",
                "Week 12: SQL coding challenges",
                "Week 16: Tech resume optimization",
                "Week 20: Agile case study mock runs"
            ],
            "after": [
                "Alumni network data access",
                "Corporate recruiter matchmaking",
                "2-3 vetted analyst roles weekly",
                "Direct referral loops with partners",
                "Vetted corporate data tasks",
                "Continuous career guidance support"
            ],
            "network": [
                "SaaS startups hiring analyst talent",
                "Business intelligence consulting firms",
                "E-commerce brands analyzing metrics",
                "Agencies managing database loops",
                "Financial reporting divisions",
                "Corporate data management groups"
            ]
        },
        "careers": {
            "roles": [
                {
                    "title": "Business Analyst",
                    "salary": "$3,500-$4,800/month",
                    "duties": "User stories, Jira backlog, requirements",
                    "availability": "Startups, agencies, brands"
                },
                {
                    "title": "Systems Analyst",
                    "salary": "$4,000-$5,500/month",
                    "duties": "SQL structures, database schemas, documentation",
                    "availability": "Corporate analytics departments"
                },
                {
                    "title": "Product Analyst",
                    "salary": "$3,200-$4,500/month",
                    "duties": "Business specs, user metrics, visual dashboards",
                    "availability": "Startups, established brands"
                },
                {
                    "title": "Agile Scrum Master",
                    "salary": "$3,800-$5,200/month",
                    "duties": "Jira backlog metrics, sprint tracking, scrum ceremonies",
                    "availability": "Agencies, SaaS teams"
                }
            ],
            "growth": [
                "Year 1: Deliver clean business specs and backlog updates",
                "Year 2-3: Senior analyst designing complex business pipelines",
                "Year 5+: Product Manager directing agile team deliveries"
            ],
            "salaryGrowth": [
                "Business analysts secure premium starting hikes",
                "SQL + agile skills command high rates globally",
                "Remote business analysts are highly sought by global teams"
            ]
        },
        "pricingDetail": {
            "rows": [
                {
                    "cost": "Tuition regular price",
                    "amount": "₹30,000"
                },
                {
                    "cost": "50% special discount",
                    "amount": "₹15,000"
                },
                {
                    "cost": "Bonus cashback",
                    "amount": "₹2,000"
                },
                {
                    "cost": "Your final investment",
                    "amount": "₹13,000"
                }
            ],
            "installments": [
                "3 monthly plans: ₹4,500/month (₹13,500 total)",
                "6 monthly plans: ₹2,300/month (₹13,800 total)",
                "100% money back guarantee for first 14 days",
                "No cost EMI available globally"
            ],
            "discounts": [
                "Referral program: 10% off for both you and a friend",
                "Flexible payment schemes for corporate teams",
                "Upskilling package options available"
            ],
            "includes": [
                "16 weeks structured Business Analyst training",
                "Live interactive layout clinics",
                "Recorded video portal access",
                "Vetted data files and schema files",
                "4 complete github analyst projects",
                "Professional database portfolio audits",
                "Custom interview prep guides",
                "Industry-recognized Analyst Certificate",
                "1-on-1 career mentor matchmaking"
            ]
        },
        "stories": [
            {
                "name": "John T. (United Kingdom)",
                "before": "Sales Executive",
                "after": "Business Analyst at Tech Brand, £40k/year",
                "body": "Skillsha's focus on SQL database logic and Agile user stories was exactly what I needed. I didn't want abstract academic formulas. I wanted practical spec writing skills. Within 60 days of graduating, I got hired.",
                "result": "First technical role secured"
            },
            {
                "name": "Priya S. (India)",
                "before": "Operations Assistant, ₹3 LPA",
                "after": "Product Analyst at Tech Brand, ₹7.2 LPA",
                "body": "I wanted to transition from operations to product teams. Skillsha's hands-on agile backlogs and AI requirements writing gave me the edge. The code portfolio got me through the tech rounds.",
                "result": "140% salary jump, product team"
            }
        ],
        "enrollment": [
            {
                "step": "Step 1",
                "title": "Submit Application",
                "bullets": [
                    "Fill out our brief online application detailing your background and career goals.",
                    "Admissions team reviews compatibility within 24 hours"
                ]
            },
            {
                "step": "Step 2",
                "title": "Admissions Chat",
                "bullets": [
                    "Speak with our team to verify alignment and discuss your experience levels.",
                    "Configure target track details"
                ]
            },
            {
                "step": "Step 3",
                "title": "Reserve Seat",
                "bullets": [
                    "Confirm your enrollment with initial payment or set up interest-free monthly financing.",
                    "Secure early booking discounts"
                ]
            },
            {
                "step": "Step 4",
                "title": "Onboarding Setup",
                "bullets": [
                    "Gain instant portal access to pre-work resources, setup files, and live channel workspace.",
                    "Complete pre-work modules before live classes start"
                ]
            }
        ],
        "quickFacts": [
            "Format: Live Classes + Portfolio Workshops",
            "Graduation Rate: 94% Secure Job in 60 Days",
            "Refund Policy: 14-Day Money Back Guarantee",
            "Average Hike: 54% Salary Jump Achieved",
            "Access: Lifetime course materials & forum updates",
            "Certification: Globally verified credential"
        ]
    }
},

  "ai-ml-with-gen-ai": {
    "title": "AI/ML",
    "typewriter": [
        "Tensorflow & Keras",
        "Python Deep Learning",
        "Machine Learning Models",
        "Generative AI APIs"
    ],
    "description": "Deep dive into machine learning and neural networks. Train custom classification, regression, and generative models using PyTorch, Tensorflow, and Keras.",
    "duration": "24 Weeks",
    "salary": "₹10.5 LPA",
    "liveSessions": "64+ hrs",
    "projects": "8+",
    "milestoneWord": "Eight",
    "milestones": [
        {
            "number": 1,
            "title": "Deep Learning Foundations",
            "modules": [
                {
                    "title": "Neural Networks & Tensorflow",
                    "icon": "memory",
                    "color": "violet",
                    "bullets": [
                        {
                            "title": "Building custom neural networks in Tensorflow",
                            "desc": "hidden layers, weights",
                            "icon": "check"
                        },
                        {
                            "title": "Training deep learning classifiers",
                            "desc": "epochs, loss curves",
                            "icon": "check"
                        }
                    ]
                }
            ]
        }
    ],
    "faqs": [
        {
            "q": "What math background is needed?",
            "a": "We teach the necessary linear algebra and calculus concepts interactively as we build deep learning algorithms in code."
        }
    ],
    "flagshipContent": {
        "heroSubtext": "Ready to build a career in AI/ML? Skillsha's AI/ML course teaches PyTorch, Tensorflow, Keras, and deep learning, combined with modern generative AI model architectures.\\n\\nLearn to train, optimize, and deploy predictive and generative models using cloud GPU infrastructure that top AI labs are using right now.\\n\\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available",
        "whyChooseList": {
            "placement": [
                "Direct introductions to global AI research labs and tech partners",
                "Mock interviews with senior machine learning engineers",
                "Resume and LinkedIn optimization tailored to AI/ML markets",
                "GitHub portfolio setup showing trained neural network code",
                "Weekly job matching alerts"
            ],
            "ai": [
                "ChatGPT for machine learning code generation",
                "Claude for neural network design reviews",
                "AI-driven hyperparameter tuning scripts",
                "Predictive model training pipelines",
                "Automated dataset annotations",
                "AI-powered custom model fine-tuning"
            ],
            "trainers": [
                {
                    "name": "Mr. Shad",
                    "title": "Lead AI Architect",
                    "bullets": [
                        "12+ years building enterprise software systems",
                        "Expertise in LLM context routing and LangChain",
                        "Managed engineering teams in Silicon Valley and Europe",
                        "Worked with 40+ brands to deploy scalable AI backends"
                    ],
                    "quote": "Shad makes LLM context routing and agent design practical and clear.",
                    "img": "/files/shad.png",
                    "exp": "12+ Yrs Exp"
                },
                {
                    "name": "Mr. Akshay Mishra",
                    "title": "Autonomous Systems Expert",
                    "bullets": [
                        "10+ years in distributed systems and automation",
                        "Specialization in CrewAI, AutoGen, and agentic loops",
                        "Built workflow automation pipelines for international clients",
                        "Expert in vector database scaling and index tuning"
                    ],
                    "quote": "Mr. Akshay's live coding loops are incredibly detailed and practical.",
                    "img": "",
                    "exp": "10+ Yrs Exp"
                },
                {
                    "name": "Ms. Hema",
                    "title": "Machine Learning Engineer",
                    "bullets": [
                        "6+ years in Python, PyTorch, and deep learning models",
                        "Expertise in LoRA and QLoRA model fine-tuning",
                        "Developed RAG search indices for Fortune 500 companies",
                        "Helped scale vector databases to billions of vectors"
                    ],
                    "quote": "Hema demystifies embeddings and fine-tuning math.",
                    "img": "",
                    "exp": "6+ Yrs Exp"
                }
            ],
            "pricing": [
                "Regular price: ₹30,000 / $360 USD equivalent",
                "Special discount: ₹15,000 / $180 USD (50% off)",
                "Additional cashback: ₹2,000 / $24 USD",
                "0% Interest EMI available worldwide",
                "No hidden charges, transparent pricing",
                "Gain professional AI/ML engineering skills without expensive postgraduate degree fees."
            ]
        },
        "differencesSubtext": "We skip slides and teach you to write code. You will build, deploy, and monitor active AI systems using the same stack tech giants use.",
        "differences": [
            {
                "title": "1. Real-World AI/ML Case Studies",
                "bullets": [
                    "Train a custom deep learning classifier in PyTorch",
                    "Deploy a regression pipeline for financial forecasting",
                    "Build an automated image segmentation model",
                    "Fine-tune a neural network on specific industry datasets"
                ]
            },
            {
                "title": "2. GitHub ML Portfolios",
                "bullets": [
                    "Neural network configurations",
                    "Custom training loops in PyTorch",
                    "Dataset pre-processing scripts",
                    "Model inference endpoints"
                ]
            },
            {
                "title": "3. Industry-Recognized Certification",
                "bullets": [
                    "Skillsha's AI/ML Certificate is recognized globally by top machine learning and data engineering teams."
                ]
            },
            {
                "title": "4. Cloud GPU Training Labs",
                "bullets": [
                    "Train models on AWS and Google Cloud GPUs",
                    "Optimize model inference to reduce latency",
                    "Deploy models as FastAPI endpoints",
                    "Build pipeline loops with validation metrics"
                ]
            }
        ],
        "toolPillars": [
            {
                "title": "ML Foundations",
                "subtitle": "Python & Model Math",
                "icon": "storage",
                "colorClass": "text-blue-500 bg-blue-500/10",
                "tools": [
                    {
                        "name": "Python (Pandas & NumPy)",
                        "category": "Data Manipulation",
                        "desc": "Dataset filters, matrix operations, clean inputs",
                        "icon": "terminal"
                    },
                    {
                        "name": "Scikit-Learn",
                        "category": "ML Algorithms",
                        "desc": "Build classification, regression, and tree models",
                        "icon": "account_tree"
                    },
                    {
                        "name": "Matplotlib & Seaborn",
                        "category": "Data Visuals",
                        "desc": "Render correlation heatmaps and loss curve charts",
                        "icon": "bar_chart"
                    },
                    {
                        "name": "SQL (PostgreSQL)",
                        "category": "Databases",
                        "desc": "Extract datasets and model records dynamically",
                        "icon": "database"
                    }
                ],
                "pipeline": {
                    "left": "Raw Logs",
                    "middle": "SQL Filter",
                    "right": "Clean DataFrame",
                    "leftLabel": "Database",
                    "rightLabel": "Data Output"
                }
            },
            {
                "title": "Deep Learning Core",
                "subtitle": "Neural Networks & Tuning",
                "icon": "memory",
                "colorClass": "text-purple-500 bg-purple-500/10",
                "tools": [
                    {
                        "name": "PyTorch & Tensorflow",
                        "category": "DL Frameworks",
                        "desc": "Build deep neural networks and custom training loops",
                        "icon": "memory"
                    },
                    {
                        "name": "Keras",
                        "category": "Rapid DL",
                        "desc": "Define layers and build classification models fast",
                        "icon": "layers"
                    },
                    {
                        "name": "HuggingFace Transformers",
                        "category": "Pre-trained Models",
                        "desc": "Load weights, models, and custom tokenizers",
                        "icon": "smart_toy"
                    },
                    {
                        "name": "TensorBoard",
                        "category": "Experiment Monitoring",
                        "desc": "Track loss graphs and accuracy metrics live",
                        "icon": "analytics"
                    }
                ],
                "pipeline": {
                    "left": "Model Config",
                    "middle": "Epoch Train",
                    "right": "Weights File",
                    "leftLabel": "Input DF",
                    "rightLabel": "Predict Model"
                }
            },
            {
                "title": "AI API Deployment",
                "subtitle": "FastAPI & GPU Serving",
                "icon": "api",
                "colorClass": "text-emerald-500 bg-emerald-500/10",
                "tools": [
                    {
                        "name": "FastAPI",
                        "category": "Model APIs",
                        "desc": "Wrap model inference into clean REST API endpoints",
                        "icon": "api"
                    },
                    {
                        "name": "Docker",
                        "category": "Isolation Lab",
                        "desc": "Package model runtime and libraries cleanly",
                        "icon": "layers"
                    },
                    {
                        "name": "vLLM & Triton",
                        "category": "Fast Inference",
                        "desc": "High-performance model serving on GPU instances",
                        "icon": "speed"
                    },
                    {
                        "name": "ChatGPT & Claude",
                        "category": "Code Assistants",
                        "desc": "Generate Python code and debug neural net errors",
                        "icon": "edit"
                    }
                ],
                "pipeline": {
                    "left": "Python File",
                    "middle": "Docker Build",
                    "right": "API Endpoint",
                    "leftLabel": "Code",
                    "rightLabel": "Live Server"
                }
            }
        ],
        "skills": [
            {
                "category": "ML Foundations & SQL",
                "list": [
                    "Pandas data cleaning & matrix filters",
                    "Relational database schema structures",
                    "SQL select queries, joins, aggregates",
                    "Scikit-Learn classification algorithms",
                    "Model metrics: accuracy, precision, recall",
                    "Hyperparameter tuning techniques"
                ]
            },
            {
                "category": "Deep Learning & DL",
                "list": [
                    "Custom neural network layers design",
                    "Training loops in PyTorch & Keras",
                    "Loss function configurations & metrics",
                    "Image classification & CNN models",
                    "Text processing & RNN layouts",
                    "HuggingFace transformers integration"
                ]
            },
            {
                "category": "AI Serving & APIs",
                "list": [
                    "FastAPI deployment wrappers",
                    "Docker container configurations",
                    "GPU server setups on cloud",
                    "API endpoint responses parsing",
                    "Debugging ML code using ChatGPT",
                    "Git commit & GitHub portfolio setups"
                ]
            }
        ],
        "placement": {
            "during": [
                "Week 4: Python skills assessment",
                "Week 8: SQL query logic audit checks",
                "Week 12: PyTorch models code reviews",
                "Week 16: Tech resume optimization",
                "Week 20: Technical coding case study simulation"
            ],
            "after": [
                "AI alumni database access",
                "Corporate partner introductions",
                "2-3 vetted engineer listings weekly",
                "Direct referral loops with startups",
                "Access to global remote tech boards",
                "Continued mentor calls and career growth support"
            ],
            "network": [
                "Tech startups building custom model layers",
                "AI solutions consulting firms",
                "Fintech organizations scaling model backends",
                "Agencies managing database pipelines",
                "Research labs and data centers",
                "Corporate product development teams"
            ]
        },
        "careers": {
            "roles": [
                {
                    "title": "AI/ML Engineer",
                    "salary": "$6,500-$9,500/month",
                    "duties": "Model training, deployment APIs, dataset pipelines",
                    "availability": "Worldwide"
                },
                {
                    "title": "Deep Learning Developer",
                    "salary": "$7,000-$10,000/month",
                    "duties": "Neural networks design, model parameters tuning",
                    "availability": "AI research labs, startups"
                },
                {
                    "title": "Data Analyst Engineer",
                    "salary": "$5,500-$8,000/month",
                    "duties": "SQL updates, Python data cleaning, reporting apps",
                    "availability": "SaaS platforms, agencies"
                },
                {
                    "title": "ML Infrastructure Developer",
                    "salary": "$6,000-$9,000/month",
                    "duties": "Docker packaging, GPU servers provisioning, API tuning",
                    "availability": "Established tech brands"
                }
            ],
            "growth": [
                "Year 1: Deliver clean Python code, SQL databases, and models",
                "Year 2-3: Senior engineer architecting multi-stage prediction models",
                "Year 5+: Lead ML Architect directing corporate AI initiatives"
            ],
            "salaryGrowth": [
                "AI/ML engineers secure premium starting hikes",
                "Model training skills command high rates globally",
                "Remote data scientists are highly sought by global teams"
            ]
        },
        "pricingDetail": {
            "rows": [
                {
                    "cost": "Tuition regular price",
                    "amount": "₹30,000"
                },
                {
                    "cost": "50% special discount",
                    "amount": "₹15,000"
                },
                {
                    "cost": "Bonus cashback",
                    "amount": "₹2,000"
                },
                {
                    "cost": "Your final investment",
                    "amount": "₹13,000"
                }
            ],
            "installments": [
                "3 monthly plans: ₹4,500/month (₹13,500 total)",
                "6 monthly plans: ₹2,300/month (₹13,800 total)",
                "100% money back guarantee for first 14 days",
                "No cost EMI available globally"
            ],
            "discounts": [
                "Referral program: 10% off for both you and a friend",
                "Flexible payment schemes for corporate teams",
                "Upskilling package options available"
            ],
            "includes": [
                "24 weeks structured AI/ML training",
                "Live interactive training labs",
                "Recorded video portal access",
                "Vetted dataset files and neural weights",
                "6 complete github ML projects",
                "Professional code audits",
                "Custom interview prep guides",
                "Industry-recognized AI Certificate",
                "1-on-1 career mentor matchmaking"
            ]
        },
        "stories": [
            {
                "name": "John T. (Germany)",
                "before": "Backend Developer, €52k/year",
                "after": "AI Engineer at Fintech Brand, €78k/year",
                "body": "Skillsha's focus on SQL database logic and PyTorch models was exactly what I needed. I didn't want abstract academic formulas. I wanted practical model building skills. Within 60 days of graduating, I got hired.",
                "result": "First technical role secured"
            },
            {
                "name": "Priya S. (India)",
                "before": "Data Analyst, ₹6 LPA",
                "after": "ML Developer at Tech Brand, ₹13 LPA",
                "body": "I wanted to transition from dashboards to deep learning models. Skillsha's hands-on neural net tasks and FastAPI deployments gave me the edge. The code portfolio got me through the tech rounds.",
                "result": "116% salary jump, product team"
            }
        ],
        "enrollment": [
            {
                "step": "Step 1",
                "title": "Submit Application",
                "bullets": [
                    "Fill out our brief online application detailing your background and career goals.",
                    "Admissions team reviews compatibility within 24 hours"
                ]
            },
            {
                "step": "Step 2",
                "title": "Admissions Chat",
                "bullets": [
                    "Speak with our team to verify alignment and discuss your experience levels.",
                    "Configure target track details"
                ]
            },
            {
                "step": "Step 3",
                "title": "Reserve Seat",
                "bullets": [
                    "Confirm your enrollment with initial payment or set up interest-free monthly financing.",
                    "Secure early booking discounts"
                ]
            },
            {
                "step": "Step 4",
                "title": "Onboarding Setup",
                "bullets": [
                    "Gain instant portal access to pre-work resources, setup files, and live channel workspace.",
                    "Complete pre-work modules before live classes start"
                ]
            }
        ],
        "quickFacts": [
            "Format: Live Classes + Portfolio Workshops",
            "Graduation Rate: 94% Secure Job in 60 Days",
            "Refund Policy: 14-Day Money Back Guarantee",
            "Average Hike: 54% Salary Jump Achieved",
            "Access: Lifetime course materials & forum updates",
            "Certification: Globally verified credential"
        ]
    }
},

  "software-testing": {
    "title": "Software Testing",
    "typewriter": [
        "Manual Test Cases",
        "API Testing & Postman",
        "Selenium Webdriver",
        "Automation Frameworks"
    ],
    "description": "Master the complete testing lifecycle. From writing manual test cases and bug reports to building robust automated suites in Selenium and Java.",
    "duration": "16 Weeks",
    "salary": "₹6.2 LPA",
    "liveSessions": "48+ hrs",
    "projects": "5+",
    "milestoneWord": "Five",
    "milestones": [
        {
            "number": 1,
            "title": "Manual Testing & Bug Lifecycle",
            "modules": [
                {
                    "title": "Test Cases & Defect Management",
                    "icon": "bug_report",
                    "color": "rose",
                    "bullets": [
                        {
                            "title": "Writing manual test plans and edge scenarios",
                            "desc": "boundary value checks",
                            "icon": "check"
                        },
                        {
                            "title": "Bug tracking and logging in Jira",
                            "desc": "defect lifecycle steps",
                            "icon": "check"
                        }
                    ]
                }
            ]
        }
    ],
    "faqs": [
        {
            "q": "Is coding required?",
            "a": "We teach Java and JavaScript basics from scratch, focusing specifically on automation scripts and API assertions."
        }
    ],
    "flagshipContent": {
        "heroSubtext": "Ready to build a career in Software Testing? Skillsha's Software Testing course teaches manual testing, API testing with Postman, and automated suites in Selenium, combined with modern AI test case generation workflows.\\n\\nLearn to write manual specifications, automate interface clicks, and deploy test suites at 10x speed using generative AI tools that top QA teams are using right now.\\n\\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available",
        "whyChooseList": {
            "placement": [
                "Direct introductions to global technology partners and QA teams",
                "Mock interviews with senior QA leads and automation architects",
                "Resume and LinkedIn optimization tailored to software testing markets",
                "GitHub portfolio setup showing automation script repositories",
                "Weekly job matching alerts"
            ],
            "ai": [
                "ChatGPT for manual test case drafts",
                "Claude for automation script debugging",
                "AI-driven automated script generation",
                "Smart anomaly detection in execution logs",
                "AI-powered API test validation scripts",
                "Automated user story requirements analysis"
            ],
            "trainers": [
                {
                    "name": "Mr. Shad",
                    "title": "Lead QA Architect",
                    "bullets": [
                        "12+ years in QA and test automation leadership",
                        "Designed testing infrastructure for major fintech SaaS hubs",
                        "Expert in Selenium grid, Java, and automated suites",
                        "Worked with 40+ brands to improve code reliability"
                    ],
                    "quote": "Shad makes test automation logic and code syntax easy to follow.",
                    "img": "/files/shad.png",
                    "exp": "12+ Yrs Exp"
                },
                {
                    "name": "Mr. Akshay Mishra",
                    "title": "Interaction & API Specialist",
                    "bullets": [
                        "10+ years in distributed systems and API validation",
                        "Specialization in Postman, REST API scripts, and CI/CD",
                        "Built automation pipelines for international clients",
                        "Expert in visual dashboard tracking systems"
                    ],
                    "quote": "Mr. Akshay's API testing sessions bring immediate practical clarity.",
                    "img": "",
                    "exp": "10+ Yrs Exp"
                },
                {
                    "name": "Ms. Hema",
                    "title": "Systems Test Engineer",
                    "bullets": [
                        "6+ years in QA process planning and manual verification",
                        "Expertise in test plans, user scenarios, and Jira defect tracking",
                        "Worked with major healthcare databases",
                        "Helped scale validation pipelines"
                    ],
                    "quote": "Hema makes bug mapping and test scenario logic completely clear.",
                    "img": "",
                    "exp": "6+ Yrs Exp"
                }
            ],
            "pricing": [
                "Regular price: ₹30,000 / $360 USD equivalent",
                "Special discount: ₹15,000 / $180 USD (50% off)",
                "Additional cashback: ₹2,000 / $24 USD",
                "0% Interest EMI available worldwide",
                "No hidden charges, transparent pricing",
                "Gain professional QA skills without expensive bootcamp pricing."
            ]
        },
        "differencesSubtext": "We skip abstract theories and focus on practical manual test plans, SQL querying, and Selenium automation. You will build 3 portfolio testing suites.",
        "differences": [
            {
                "title": "1. Real-World Automation Projects",
                "bullets": [
                    "Design manual test plans for an e-commerce platform",
                    "Create an automated Selenium suite for a SaaS portal",
                    "Build an API validation pipeline in Postman",
                    "Publish a bug dashboard display in Jira"
                ]
            },
            {
                "title": "2. Clean GitHub Portfolios",
                "bullets": [
                    "Selenium automation scripts",
                    "Postman API test collections",
                    "Java/JS source code templates",
                    "CI/CD execution pipelines"
                ]
            },
            {
                "title": "3. Industry-Recognized Certification",
                "bullets": [
                    "Skillsha's Software Testing Certificate is recognized globally by top quality engineering and technology teams."
                ]
            },
            {
                "title": "4. Rapid AI Testing Workflows",
                "bullets": [
                    "Write manual cases in seconds using AI assistant prompt layers",
                    "Debug script errors instantly using code models",
                    "Automate script refactoring for dynamic UI elements",
                    "Speed up bug summary writeups using visual logs analysis"
                ]
            }
        ],
        "toolPillars": [
            {
                "title": "Manual & API Core",
                "subtitle": "Manual QA & API Validation",
                "icon": "bug_report",
                "colorClass": "text-blue-500 bg-blue-500/10",
                "tools": [
                    {
                        "name": "Jira Software",
                        "category": "Defect Tracking",
                        "desc": "Manage scrum boards, backlog lists, and bug lifecycles",
                        "icon": "change_history"
                    },
                    {
                        "name": "Postman",
                        "category": "API Testing",
                        "desc": "Verify REST API endpoints, write response checks and loops",
                        "icon": "api"
                    },
                    {
                        "name": "SQL (MySQL)",
                        "category": "Data Testing",
                        "desc": "Query databases, verify records, check data states",
                        "icon": "database"
                    },
                    {
                        "name": "Excel Sheets",
                        "category": "Test Plans",
                        "desc": "Write step-by-step manual test cases and schedules",
                        "icon": "table_chart"
                    }
                ],
                "pipeline": {
                    "left": "User Story",
                    "middle": "Test Cases",
                    "right": "Bug Logs",
                    "leftLabel": "Requirements",
                    "rightLabel": "Jira Defect"
                }
            },
            {
                "title": "Selenium Automation",
                "subtitle": "Web UI Test Automation",
                "icon": "layers",
                "colorClass": "text-purple-500 bg-purple-500/10",
                "tools": [
                    {
                        "name": "Selenium WebDriver",
                        "category": "UI Automation",
                        "desc": "Automate user clicks, entries, and UI assertions",
                        "icon": "layers"
                    },
                    {
                        "name": "Java & JavaScript",
                        "category": "Language Core",
                        "desc": "Write automation scripts using standard syntax structures",
                        "icon": "terminal"
                    },
                    {
                        "name": "TestNG & JUnit",
                        "category": "Testing Frameworks",
                        "desc": "Define suites, configure assertions, generate reports",
                        "icon": "settings"
                    },
                    {
                        "name": "Locators (CSS/XPath)",
                        "category": "UI Elements",
                        "desc": "Identify web components dynamically for scripts",
                        "icon": "search"
                    }
                ],
                "pipeline": {
                    "left": "Java File",
                    "middle": "Selenium Driver",
                    "right": "HTML Assert",
                    "leftLabel": "Code",
                    "rightLabel": "UI Response"
                }
            },
            {
                "title": "AI & CI/CD Pipelines",
                "subtitle": "Modern Pipelines & Speed",
                "icon": "psychology",
                "colorClass": "text-emerald-500 bg-emerald-500/10",
                "tools": [
                    {
                        "name": "GitHub Actions & Jenkins",
                        "category": "CI/CD Engine",
                        "desc": "Configure automation scripts to execute on code changes",
                        "icon": "loop"
                    },
                    {
                        "name": "ChatGPT & Claude",
                        "category": "AI Code Assistants",
                        "desc": "Generate manual cases and debug automation code instantly",
                        "icon": "edit"
                    },
                    {
                        "name": "Git",
                        "category": "Version Control",
                        "desc": "Commit testing script repositories to github",
                        "icon": "link"
                    },
                    {
                        "name": "Reporting Plugins (Extent)",
                        "category": "HTML Reports",
                        "desc": "Export visual test run results dashboards",
                        "icon": "analytics"
                    }
                ],
                "pipeline": {
                    "left": "Git Commit",
                    "middle": "GitHub Actions",
                    "right": "Test Report",
                    "leftLabel": "Push Code",
                    "rightLabel": "HTML Output"
                }
            }
        ],
        "skills": [
            {
                "category": "Manual QA & SQL",
                "list": [
                    "Manual test planning & edge case designs",
                    "Requirements user stories analysis",
                    "Bug lifecycle logging & Jira trackers",
                    "Postman REST API responses assertions",
                    "SQL SELECT database verifications",
                    "Excel spreadsheet data mappings"
                ]
            },
            {
                "category": "Selenium Automation",
                "list": [
                    "Selenium WebDriver automation scripts",
                    "Java/JavaScript OOP programming structures",
                    "CSS selector locators configurations",
                    "TestNG testing suite setups",
                    "Micro-interaction UI assertions",
                    "Page Object Model (POM) design patterns"
                ]
            },
            {
                "category": "AI & CI/CD Pipelines",
                "list": [
                    "Drafting test cases using ChatGPT",
                    "Debugging runtime script errors with Claude",
                    "Automated code generation tools",
                    "GitHub Actions CI/CD pipeline triggers",
                    "Git code commit setups",
                    "Extent visual HTML report exports"
                ]
            }
        ],
        "placement": {
            "during": [
                "Week 4: Manual testing specs review",
                "Week 8: Postman API collection checks",
                "Week 12: Selenium automation code audit",
                "Week 16: Tech resume optimization",
                "Week 20: QA mock interview simulations"
            ],
            "after": [
                "Alumni network database access",
                "Corporate QA partner introductions",
                "2-3 vetted testing roles weekly",
                "Direct referral loops with tech teams",
                "Access to global remote QA boards",
                "Continued mentor calls and career growth support"
            ],
            "network": [
                "SaaS startups hiring analyst talent",
                "Business intelligence consulting firms",
                "E-commerce brands analyzing metrics",
                "Agencies managing database loops",
                "Financial reporting divisions",
                "Corporate data management groups"
            ]
        },
        "careers": {
            "roles": [
                {
                    "title": "Manual QA Tester",
                    "salary": "$2,800-$3,800/month",
                    "duties": "Manual cases, Jira bug logs, API checks",
                    "availability": "Startups, agencies, brands"
                },
                {
                    "title": "Automation Test Engineer",
                    "salary": "$4,000-$5,500/month",
                    "duties": "Selenium scripts, automation frameworks, CI/CD",
                    "availability": "Corporate tech departments"
                },
                {
                    "title": "QA Analyst",
                    "salary": "$3,200-$4,500/month",
                    "duties": "Test plans, SQL verification, specs analysis",
                    "availability": "Startups, established brands"
                },
                {
                    "title": "API Validation Specialist",
                    "salary": "$3,500-$4,800/month",
                    "duties": "Postman test suites, integration assertions",
                    "availability": "Agencies, SaaS teams"
                }
            ],
            "growth": [
                "Year 1: Deliver clean manual case plans and bug logs",
                "Year 2-3: Senior engineer architecting Selenium testing suites",
                "Year 5+: QA Lead directing quality engineering departments"
            ],
            "salaryGrowth": [
                "Automation testers command high starting hikes",
                "Selenium + API skills command high rates globally",
                "Remote QA engineers are highly sought by global teams"
            ]
        },
        "pricingDetail": {
            "rows": [
                {
                    "cost": "Tuition regular price",
                    "amount": "₹30,000"
                },
                {
                    "cost": "50% special discount",
                    "amount": "₹15,000"
                },
                {
                    "cost": "Bonus cashback",
                    "amount": "₹2,000"
                },
                {
                    "cost": "Your final investment",
                    "amount": "₹13,000"
                }
            ],
            "installments": [
                "3 monthly plans: ₹4,500/month (₹13,500 total)",
                "6 monthly plans: ₹2,300/month (₹13,800 total)",
                "100% money back guarantee for first 14 days",
                "No cost EMI available globally"
            ],
            "discounts": [
                "Referral program: 10% off for both you and a friend",
                "Flexible payment schemes for corporate teams",
                "Upskilling package options available"
            ],
            "includes": [
                "16 weeks structured Software Testing training",
                "Live interactive layout clinics",
                "Recorded video portal access",
                "Vetted data files and schema files",
                "4 complete github testing projects",
                "Professional database portfolio audits",
                "Custom interview prep guides",
                "Industry-recognized QA Certificate",
                "1-on-1 career mentor matchmaking"
            ]
        },
        "stories": [
            {
                "name": "John T. (United Kingdom)",
                "before": "Tech Support Assistant",
                "after": "Automation Engineer at Tech Brand, £36k/year",
                "body": "Skillsha's focus on SQL database logic and Selenium automation was exactly what I needed. I didn't want abstract academic formulas. I wanted practical QA skills. Within 60 days of graduating, I got hired.",
                "result": "First technical role secured"
            },
            {
                "name": "Priya S. (India)",
                "before": "Manual Tester, ₹3 LPA",
                "after": "Automation QA at Tech Brand, ₹6.8 LPA",
                "body": "I wanted to transition from spreadsheets to automated scripts. Skillsha's hands-on Selenium tasks and API test writing gave me the edge. The code portfolio got me through the tech rounds.",
                "result": "126% salary jump, product team"
            }
        ],
        "enrollment": [
            {
                "step": "Step 1",
                "title": "Submit Application",
                "bullets": [
                    "Fill out our brief online application detailing your background and career goals.",
                    "Admissions team reviews compatibility within 24 hours"
                ]
            },
            {
                "step": "Step 2",
                "title": "Admissions Chat",
                "bullets": [
                    "Speak with our team to verify alignment and discuss your experience levels.",
                    "Configure target track details"
                ]
            },
            {
                "step": "Step 3",
                "title": "Reserve Seat",
                "bullets": [
                    "Confirm your enrollment with initial payment or set up interest-free monthly financing.",
                    "Secure early booking discounts"
                ]
            },
            {
                "step": "Step 4",
                "title": "Onboarding Setup",
                "bullets": [
                    "Gain instant portal access to pre-work resources, setup files, and live channel workspace.",
                    "Complete pre-work modules before live classes start"
                ]
            }
        ],
        "quickFacts": [
            "Format: Live Classes + Portfolio Workshops",
            "Graduation Rate: 94% Secure Job in 60 Days",
            "Refund Policy: 14-Day Money Back Guarantee",
            "Average Hike: 54% Salary Jump Achieved",
            "Access: Lifetime course materials & forum updates",
            "Certification: Globally verified credential"
        ]
    }
},

  "playwright-automation": {
    "title": "Playwright Automation",
    "typewriter": [
        "Playwright & TS/JS",
        "Async UI Testing",
        "CI/CD GitHub Actions",
        "API & Network Mocks"
    ],
    "description": "Master modern end-to-end web testing. Build lightning-fast async automated suites in Playwright, TypeScript, and JavaScript with CI/CD integration.",
    "duration": "12 Weeks",
    "salary": "₹6.8 LPA",
    "liveSessions": "36+ hrs",
    "projects": "4+",
    "milestoneWord": "Four",
    "milestones": [
        {
            "number": 1,
            "title": "Modern Playwright & JS Core",
            "modules": [
                {
                    "title": "Playwright Setup & Locators",
                    "icon": "speed",
                    "color": "teal",
                    "bullets": [
                        {
                            "title": "Installing Playwright and JavaScript runtime",
                            "desc": "project workspace setups",
                            "icon": "check"
                        },
                        {
                            "title": "Locating UI elements and dynamic wait assertions",
                            "desc": "async click flows",
                            "icon": "check"
                        }
                    ]
                }
            ]
        }
    ],
    "faqs": [
        {
            "q": "Why choose Playwright over Selenium?",
            "a": "Playwright is built for modern web architectures. It is much faster, runs asynchronously, handles network intercepting, and uses a clean Javascript/TypeScript API."
        }
    ],
    "flagshipContent": {
        "heroSubtext": "Ready to build a career in modern web automation? Skillsha's Playwright Automation course teaches JavaScript/TypeScript, async UI testing, and API intercepts, combined with CI/CD pipeline triggers.\\n\\nLearn to write high-performance end-to-end tests and mock network responses at 10x speed using generative AI tools that top modern engineering teams are using right now.\\n\\nLimited Time Offer: 50% Discount + Cashback + 0% Interest EMI Available",
        "whyChooseList": {
            "placement": [
                "Direct introductions to modern web startups and QA teams",
                "Mock interviews with senior automation engineers and QA leads",
                "Resume and LinkedIn optimization tailored to Playwright markets",
                "GitHub portfolio setup showing async automation suites",
                "Weekly job matching alerts"
            ],
            "ai": [
                "ChatGPT for async Playwright script design",
                "Claude for locator optimization and debugging",
                "AI-driven visual regression tests",
                "Smart trace logs analysis using AI code models",
                "AI-powered API mocking scripts",
                "Automated test coverage analysis"
            ],
            "trainers": [
                {
                    "name": "Mr. Shad",
                    "title": "Lead Automation Architect",
                    "bullets": [
                        "12+ years building enterprise software and testing layers",
                        "Expertise in Playwright, async JS, and node workspaces",
                        "Managed dev groups in Silicon Valley and Europe",
                        "Worked with 30+ brands to scale end-to-end test suites"
                    ],
                    "quote": "Shad makes async JavaScript execution and wait-state logic crystal clear.",
                    "img": "/files/shad.png",
                    "exp": "12+ Yrs Exp"
                },
                {
                    "name": "Mr. Akshay Mishra",
                    "title": "Distributed Systems Specialist",
                    "bullets": [
                        "10+ years in CI/CD, DevOps, and cloud systems",
                        "Specialization in GitHub Actions, Jenkins, and shell automation",
                        "Built testing pipelines for international clients",
                        "Expert in system trace analysis and reporting tools"
                    ],
                    "quote": "Mr. Akshay's CI/CD pipeline guides are extremely practical and detailed.",
                    "img": "",
                    "exp": "10+ Yrs Exp"
                },
                {
                    "name": "Ms. Hema",
                    "title": "JavaScript QA Developer",
                    "bullets": [
                        "6+ years in Python and JS automation frameworks",
                        "Expertise in UI locators, API mocks, and test reporting",
                        "Developed test suites for major fintech databases",
                        "Helped scale test execution speeds globally"
                    ],
                    "quote": "Hema demystifies locator structures and async code loops.",
                    "img": "",
                    "exp": "6+ Yrs Exp"
                }
            ],
            "pricing": [
                "Regular price: ₹30,000 / $360 USD equivalent",
                "Special discount: ₹15,000 / $180 USD (50% off)",
                "Additional cashback: ₹2,000 / $24 USD",
                "0% Interest EMI available worldwide",
                "No hidden charges, transparent pricing",
                "Gain professional Playwright automation skills without expensive bootcamp pricing."
            ]
        },
        "differencesSubtext": "We skip slides and teach you to write code. You will build, deploy, and monitor active Playwright systems using the same stack tech giants use.",
        "differences": [
            {
                "title": "1. Real-World Async Automation Projects",
                "bullets": [
                    "Build a complete end-to-end automation suite for a SaaS portal",
                    "Create an API verification collection with network intercepts",
                    "Build a visual regression testing script in Playwright",
                    "Configure a GitHub Actions pipeline triggering on push"
                ]
            },
            {
                "title": "2. High-Performance GitHub Portfolios",
                "bullets": [
                    "Playwright config files",
                    "TypeScript automation scripts",
                    "GitHub Action YAML profiles",
                    "Trace viewer dashboard code"
                ]
            },
            {
                "title": "3. Industry-Recognized Certification",
                "bullets": [
                    "Skillsha's Playwright Automation Certificate is recognized globally by top quality engineering and technology teams."
                ]
            },
            {
                "title": "4. Modern Async Testing Workflows",
                "bullets": [
                    "Write Playwright locators in seconds using AI assistants",
                    "Debug flaky tests using trace logs code models",
                    "Automate script generation for dynamic elements",
                    "Speed up network intercepts using automated code generators"
                ]
            }
        ],
        "toolPillars": [
            {
                "title": "Playwright Core",
                "subtitle": "TypeScript & Async Web Testing",
                "icon": "speed",
                "colorClass": "text-blue-500 bg-blue-500/10",
                "tools": [
                    {
                        "name": "Playwright Library",
                        "category": "UI Automation",
                        "desc": "Automate user clicks, entries, select boxes, and navigations",
                        "icon": "layers"
                    },
                    {
                        "name": "JavaScript & TypeScript",
                        "category": "Language Core",
                        "desc": "Write clean async scripts with strict typing structures",
                        "icon": "terminal"
                    },
                    {
                        "name": "CSS & XPath Locators",
                        "category": "Locators",
                        "desc": "Identify web components dynamically using clean selectors",
                        "icon": "search"
                    },
                    {
                        "name": "Playwright Inspector",
                        "category": "Debugging",
                        "desc": "Step through test execution scripts and inspect locators live",
                        "icon": "bug_report"
                    }
                ],
                "pipeline": {
                    "left": "TS Script",
                    "middle": "Playwright Core",
                    "right": "HTML Assert",
                    "leftLabel": "Code",
                    "rightLabel": "UI Response"
                }
            },
            {
                "title": "Advanced Test Flows",
                "subtitle": "Mocks, Traces & Mocks",
                "icon": "layers",
                "colorClass": "text-purple-500 bg-purple-500/10",
                "tools": [
                    {
                        "name": "API & Network Mocking",
                        "category": "Network Intercepts",
                        "desc": "Intercept backend API routes and return mock JSON payloads",
                        "icon": "api"
                    },
                    {
                        "name": "Playwright Traces",
                        "category": "Visual Diagnostics",
                        "desc": "Record screencasts, console outputs, and network calls for runs",
                        "icon": "analytics"
                    },
                    {
                        "name": "Visual Regression APIs",
                        "category": "Visual Testing",
                        "desc": "Compare page screenshots pixel-by-pixel for changes",
                        "icon": "visibility"
                    },
                    {
                        "name": "Parallel Test Execution",
                        "category": "Scale Runs",
                        "desc": "Run suites across multiple browser workers concurrently",
                        "icon": "speed"
                    }
                ],
                "pipeline": {
                    "left": "Network Call",
                    "middle": "Mock Intercept",
                    "right": "Mock Response",
                    "leftLabel": "Browser Request",
                    "rightLabel": "JSON Payload"
                }
            },
            {
                "title": "AI & CI/CD Pipelines",
                "subtitle": "Modern Pipelines & Speed",
                "icon": "psychology",
                "colorClass": "text-emerald-500 bg-emerald-500/10",
                "tools": [
                    {
                        "name": "GitHub Actions & Jenkins",
                        "category": "CI/CD Engine",
                        "desc": "Configure automation scripts to execute on code changes",
                        "icon": "loop"
                    },
                    {
                        "name": "ChatGPT & Claude",
                        "category": "AI Code Assistants",
                        "desc": "Generate manual cases and debug automation code instantly",
                        "icon": "edit"
                    },
                    {
                        "name": "Git",
                        "category": "Version Control",
                        "desc": "Commit testing script repositories to github",
                        "icon": "link"
                    },
                    {
                        "name": "Reporting Plugins (Extent)",
                        "category": "HTML Reports",
                        "desc": "Export visual test run results dashboards",
                        "icon": "analytics"
                    }
                ],
                "pipeline": {
                    "left": "Git Commit",
                    "middle": "GitHub Actions",
                    "right": "Test Report",
                    "leftLabel": "Push Code",
                    "rightLabel": "HTML Output"
                }
            }
        ],
        "skills": [
            {
                "category": "Playwright & TS Core",
                "list": [
                    "Playwright Library installation & setup",
                    "TypeScript async-await programming loops",
                    "CSS selector locators configurations",
                    "Automating user clicks & input fields",
                    "Smart wait assertions & validations",
                    "Page Object Model (POM) design patterns"
                ]
            },
            {
                "category": "Advanced Test Workflows",
                "list": [
                    "API route intercepting & response mocks",
                    "Analyzing test traces with Trace Viewer",
                    "Visual regression testing setups",
                    "Parallel execution across browser instances",
                    "Dynamic state & session storage sharing",
                    "Custom testing reporters configuration"
                ]
            },
            {
                "category": "AI & CI/CD Integration",
                "list": [
                    "Writing async scripts using ChatGPT",
                    "Debugging dynamic locators with Claude",
                    "GitHub Actions CI/CD workflow configurations",
                    "Automating test triggers on code push",
                    "Git code commit setups",
                    "HTML visual reports generation"
                ]
            }
        ],
        "placement": {
            "during": [
                "Week 3: TypeScript skills assessment",
                "Week 6: Playwright locators checks",
                "Week 9: Trace logs and intercepts review",
                "Week 12: CI/CD actions pipeline reviews"
            ],
            "after": [
                "Alumni network database access",
                "Corporate QA partner introductions",
                "2-3 vetted testing roles weekly",
                "Direct referral loops with tech teams",
                "Access to global remote QA boards",
                "Continued mentor calls and career growth support"
            ],
            "network": [
                "SaaS startups hiring analyst talent",
                "Business intelligence consulting firms",
                "E-commerce brands analyzing metrics",
                "Agencies managing database loops",
                "Financial reporting divisions",
                "Corporate data management groups"
            ]
        },
        "careers": {
            "roles": [
                {
                    "title": "Playwright QA Automation Engineer",
                    "salary": "$4,500-$6,500/month",
                    "duties": "End-to-end test automation, async scripts, CI/CD",
                    "availability": "Worldwide"
                },
                {
                    "title": "TypeScript QA Developer",
                    "salary": "$5,000-$7,500/month",
                    "duties": "TypeScript testing infrastructure, mocks setups",
                    "availability": "Modern SaaS brands"
                },
                {
                    "title": "Automation Test Specialist",
                    "salary": "$4,200-$6,000/month",
                    "duties": "Test scenarios design, network intercepts",
                    "availability": "Startups, tech platforms"
                },
                {
                    "title": "QA CI/CD Engineer",
                    "salary": "$4,800-$6,800/month",
                    "duties": "Actions workflows, parallel run pipelines",
                    "availability": "Agencies, tech groups"
                }
            ],
            "growth": [
                "Year 1: Deliver clean async scripts and mock test suites",
                "Year 2-3: Senior QA developer scaling parallel pipeline executions",
                "Year 5+: QA Lead directing quality engineering infrastructure"
            ],
            "salaryGrowth": [
                "Playwright specialists command premium starting hikes",
                "Async TS/JS testing skills are in high demand",
                "Remote global developers secure high international rates"
            ]
        },
        "pricingDetail": {
            "rows": [
                {
                    "cost": "Tuition regular price",
                    "amount": "₹30,000"
                },
                {
                    "cost": "50% special discount",
                    "amount": "₹15,000"
                },
                {
                    "cost": "Bonus cashback",
                    "amount": "₹2,000"
                },
                {
                    "cost": "Your final investment",
                    "amount": "₹13,000"
                }
            ],
            "installments": [
                "3 monthly plans: ₹4,500/month (₹13,500 total)",
                "6 monthly plans: ₹2,300/month (₹13,800 total)",
                "100% money back guarantee for first 14 days",
                "No cost EMI available globally"
            ],
            "discounts": [
                "Referral program: 10% off for both you and a friend",
                "Flexible payment schemes for corporate teams",
                "Upskilling package options available"
            ],
            "includes": [
                "12 weeks structured Playwright training",
                "Live interactive training labs",
                "Recorded video portal access",
                "Vetted documentation and boilerplate repo",
                "4 complete github automation projects",
                "Professional code audits",
                "Custom interview prep guides",
                "Industry-recognized Playwright Certificate",
                "1-on-1 career mentor matchmaking"
            ]
        },
        "stories": [
            {
                "name": "John T. (United Kingdom)",
                "before": "Manual QA Assistant",
                "after": "Playwright Automation Engineer, £44k/year",
                "body": "Skillsha's focus on TypeScript and Playwright mocks was exactly what I needed. I didn't want abstract academic formulas. I wanted modern async testing skills. Within 60 days of graduating, I got hired.",
                "result": "First automation role secured"
            },
            {
                "name": "Priya S. (India)",
                "before": "Selenium Tester, ₹4.2 LPA",
                "after": "Async QA Developer, ₹9 LPA",
                "body": "I wanted to transition from legacy Selenium to modern Playwright. Skillsha's hands-on network mocks and parallel execution tasks gave me the edge. The code portfolio got me through the tech rounds.",
                "result": "114% salary jump, SaaS team"
            }
        ],
        "enrollment": [
            {
                "step": "Step 1",
                "title": "Submit Application",
                "bullets": [
                    "Fill out our brief online application detailing your background and career goals.",
                    "Admissions team reviews compatibility within 24 hours"
                ]
            },
            {
                "step": "Step 2",
                "title": "Admissions Chat",
                "bullets": [
                    "Speak with our team to verify alignment and discuss your experience levels.",
                    "Configure target track details"
                ]
            },
            {
                "step": "Step 3",
                "title": "Reserve Seat",
                "bullets": [
                    "Confirm your enrollment with initial payment or set up interest-free monthly financing.",
                    "Secure early booking discounts"
                ]
            },
            {
                "step": "Step 4",
                "title": "Onboarding Setup",
                "bullets": [
                    "Gain instant portal access to pre-work resources, setup files, and live channel workspace.",
                    "Complete pre-work modules before live classes start"
                ]
            }
        ],
        "quickFacts": [
            "Format: Live Classes + Portfolio Workshops",
            "Graduation Rate: 94% Secure Job in 60 Days",
            "Refund Policy: 14-Day Money Back Guarantee",
            "Average Hike: 54% Salary Jump Achieved",
            "Access: Lifetime course materials & forum updates",
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
