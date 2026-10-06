export interface CareerTrajectoryOption {
  targetRole: string;
  domain: string;
  easePercentage: number; // 0-100 ease of transition
  salaryGrowthPotential: string; // e.g. "+35% to +60% CTC"
  bridgeSkills: string[];
  whyGoodFit: string;
  estimatedTimeToTransition: string; // e.g. "3–6 Months"
}

export interface CareerPathMapping {
  currentRole: string;
  category: string;
  paths: CareerTrajectoryOption[];
}

export const CAREER_PATHS_DATABASE: CareerPathMapping[] = [
  {
    currentRole: 'Frontend Developer',
    category: 'IT & Software',
    paths: [
      {
        targetRole: 'Full Stack Engineer',
        domain: 'IT & Software',
        easePercentage: 85,
        salaryGrowthPotential: '+30% to +50%',
        bridgeSkills: ['Node.js & Express', 'PostgreSQL / Prisma', 'RESTful API Architecture', 'Docker Basics'],
        whyGoodFit: 'Natural progression leveraging your existing UI and state management skills.',
        estimatedTimeToTransition: '3–4 Months',
      },
      {
        targetRole: 'UI/UX Engineer / Design Technologist',
        domain: 'Design & Tech',
        easePercentage: 78,
        salaryGrowthPotential: '+25% to +40%',
        bridgeSkills: ['Figma to Code Systems', 'Web Accessibility (WCAG)', 'Animation / Framer Motion', 'Design Tokens'],
        whyGoodFit: 'High demand in design-centric SaaS products for bridging engineering and product design.',
        estimatedTimeToTransition: '2–3 Months',
      },
      {
        targetRole: 'Frontend Solution Architect',
        domain: 'Engineering Leadership',
        easePercentage: 65,
        salaryGrowthPotential: '+60% to +100%',
        bridgeSkills: ['Micro-frontends', 'Core Web Vitals Optimization', 'CI/CD Pipelines', 'Security & CDN Caching'],
        whyGoodFit: 'Strategic leadership role steering technology choices for large-scale enterprise portals.',
        estimatedTimeToTransition: '6–12 Months',
      },
    ],
  },
  {
    currentRole: 'Software Developer (General / Backend)',
    category: 'IT & Software',
    paths: [
      {
        targetRole: 'DevOps / Cloud Architect',
        domain: 'Cloud Infrastructure',
        easePercentage: 80,
        salaryGrowthPotential: '+40% to +70%',
        bridgeSkills: ['AWS / GCP', 'Kubernetes & Docker', 'Terraform (IaC)', 'CI/CD Automation'],
        whyGoodFit: 'Deep code understanding makes writing infrastructure automation intuitive.',
        estimatedTimeToTransition: '3–6 Months',
      },
      {
        targetRole: 'AI Application Engineer',
        domain: 'AI / GenAI',
        easePercentage: 75,
        salaryGrowthPotential: '+50% to +85%',
        bridgeSkills: ['Python & FastAPI', 'LangChain / LlamaIndex', 'Vector Databases (Pinecone/Milvus)', 'Prompt Engineering'],
        whyGoodFit: 'Explosive industry demand integrating LLMs and generative agents into enterprise software.',
        estimatedTimeToTransition: '2–4 Months',
      },
      {
        targetRole: 'Engineering Manager (EM)',
        domain: 'Management',
        easePercentage: 68,
        salaryGrowthPotential: '+50% to +80%',
        bridgeSkills: ['Agile Team Leadership', '1-on-1 Mentorship', 'Sprint Planning & OKRs', 'Cross-team Alignment'],
        whyGoodFit: 'Lead developer teams, manage technical debt, and partner with executive leadership.',
        estimatedTimeToTransition: '6–12 Months',
      },
    ],
  },
  {
    currentRole: 'Data Analyst',
    category: 'Data & Analytics',
    paths: [
      {
        targetRole: 'Data Engineer',
        domain: 'Data Engineering',
        easePercentage: 80,
        salaryGrowthPotential: '+45% to +75%',
        bridgeSkills: ['Python ETL Pipelines', 'Apache Spark / Airflow', 'Data Warehousing (Snowflake/BigQuery)', 'Docker'],
        whyGoodFit: 'Evolve from querying data to architecting the pipelines that supply enterprise data.',
        estimatedTimeToTransition: '4–6 Months',
      },
      {
        targetRole: 'Machine Learning / AI Engineer',
        domain: 'AI & Data Science',
        easePercentage: 70,
        salaryGrowthPotential: '+60% to +100%',
        bridgeSkills: ['Scikit-learn & PyTorch', 'Feature Engineering', 'Model Deployment (MLOps)', 'Statistical Hypothesis Testing'],
        whyGoodFit: 'High prestige and compensation solving predictive modeling and recommendation problems.',
        estimatedTimeToTransition: '6–9 Months',
      },
      {
        targetRole: 'Product Analyst / Growth Analyst',
        domain: 'Product Management',
        easePercentage: 88,
        salaryGrowthPotential: '+30% to +50%',
        bridgeSkills: ['A/B Testing Frameworks', 'Mixpanel / Amplitude', 'Funnel Retention Analysis', 'User Behavior Analytics'],
        whyGoodFit: 'Work closely with founders and PMs to identify conversion growth levers.',
        estimatedTimeToTransition: '2–3 Months',
      },
    ],
  },
  {
    currentRole: 'Digital Marketing Executive',
    category: 'Marketing',
    paths: [
      {
        targetRole: 'Performance Marketing Specialist',
        domain: 'Digital Marketing',
        easePercentage: 90,
        salaryGrowthPotential: '+35% to +60%',
        bridgeSkills: ['Meta / Google Ads Bidding Algorithms', 'ROAS Optimization', 'Landing Page CRO', 'Server-side CAPI Tracking'],
        whyGoodFit: 'Directly controls ad spend and revenue generation, commanding performance bonuses.',
        estimatedTimeToTransition: '2–3 Months',
      },
      {
        targetRole: 'Growth Marketing Lead',
        domain: 'Marketing Leadership',
        easePercentage: 75,
        salaryGrowthPotential: '+60% to +90%',
        bridgeSkills: ['Viral Loops & Referral Engineering', 'Lifecycle Email Automation', 'Data Analytics (SQL/GA4)', 'Product-Led Growth (PLG)'],
        whyGoodFit: 'Oversees whole acquisition, activation, and retention funnels for startups.',
        estimatedTimeToTransition: '4–6 Months',
      },
      {
        targetRole: 'SEO & Content Strategist',
        domain: 'Inbound Growth',
        easePercentage: 85,
        salaryGrowthPotential: '+30% to +50%',
        bridgeSkills: ['Technical SEO Audits', 'Programmatic SEO', 'Core Web Vitals for SEO', 'High-Authority Link Building'],
        whyGoodFit: 'Compounding organic traffic specialist for media companies and enterprise SaaS.',
        estimatedTimeToTransition: '2–3 Months',
      },
    ],
  },
  {
    currentRole: 'BPO Quality Analyst (QA)',
    category: 'Customer Operations',
    paths: [
      {
        targetRole: 'Operations Team Leader (TL)',
        domain: 'Operations Management',
        easePercentage: 88,
        salaryGrowthPotential: '+30% to +50%',
        bridgeSkills: ['People Management', 'Attrition Control', 'KPI & SLA Scorecards', 'Client Escalations'],
        whyGoodFit: 'Direct promotion path leveraging deep knowledge of process errors and coaching.',
        estimatedTimeToTransition: '3–6 Months',
      },
      {
        targetRole: 'Customer Success Manager (CSM)',
        domain: 'SaaS / Tech',
        easePercentage: 78,
        salaryGrowthPotential: '+50% to +80%',
        bridgeSkills: ['B2B Client Relationship Management', 'Onboarding & Product Adoption', 'Renewal & Upselling', 'CRM (HubSpot/Gainsight)'],
        whyGoodFit: 'Transition from cost-center support into high-paying SaaS customer retention.',
        estimatedTimeToTransition: '3–4 Months',
      },
      {
        targetRole: 'Process Excellence / Six Sigma Consultant',
        domain: 'Continuous Improvement',
        easePercentage: 72,
        salaryGrowthPotential: '+55% to +85%',
        bridgeSkills: ['Lean Six Sigma Green Belt', 'Root Cause Analysis (Fishbone/5 Whys)', 'Value Stream Mapping', 'Process Automation'],
        whyGoodFit: 'High demand across multinational BPOs, logistics, and healthcare conglomerates.',
        estimatedTimeToTransition: '4–6 Months',
      },
    ],
  },
  {
    currentRole: 'HR Executive / Recruiter',
    category: 'Human Resources',
    paths: [
      {
        targetRole: 'HR Business Partner (HRBP)',
        domain: 'Strategic HR',
        easePercentage: 80,
        salaryGrowthPotential: '+45% to +75%',
        bridgeSkills: ['Strategic Workforce Planning', 'Performance Management Systems', 'Labor Laws & POSH Compliance', 'Executive Coaching'],
        whyGoodFit: 'High-influence advisor role partnering with business unit leaders.',
        estimatedTimeToTransition: '4–6 Months',
      },
      {
        targetRole: 'Niche Tech Talent Acquisition Lead',
        domain: 'Recruitment Leadership',
        easePercentage: 88,
        salaryGrowthPotential: '+40% to +70%',
        bridgeSkills: ['GitHub / Boolean Talent Mining', 'Employer Branding Campaigns', 'Salary Negotiation & Offer Buy-in', 'ATS Pipeline Metrics'],
        whyGoodFit: 'Lucrative recruitment specialist role with high commissions in tech hubs.',
        estimatedTimeToTransition: '2–3 Months',
      },
      {
        targetRole: 'Compensation & Benefits Specialist (Total Rewards)',
        domain: 'HR Operations',
        easePercentage: 70,
        salaryGrowthPotential: '+50% to +80%',
        bridgeSkills: ['Salary Benchmarking Surveys', 'ESOP / Equity Structuring', 'Statutory Benefits & Insurance', 'Advanced HR Analytics'],
        whyGoodFit: 'Analytical and high-demand specialization in enterprise corporations.',
        estimatedTimeToTransition: '4–6 Months',
      },
    ],
  },
];

export function findCareerPathsForRole(roleOrTitle: string) {
  const query = (roleOrTitle || '').toLowerCase();
  const found = CAREER_PATHS_DATABASE.find(
    (item) => item.currentRole.toLowerCase().includes(query) || query.includes(item.currentRole.toLowerCase())
  );

  if (found) {
    return found.paths;
  }

  // Fallback generic mapping based on tech or general
  return CAREER_PATHS_DATABASE[0].paths;
}
