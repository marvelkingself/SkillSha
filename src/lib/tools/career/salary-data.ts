export interface RoleSalaryBenchmark {
  roleId: string;
  roleName: string;
  domain: string;
  experienceTiers: {
    experience: string; // e.g. "Fresher (0–1 yr)", "1–3 yrs", "3–5 yrs", "5–8 yrs", "8+ yrs"
    minLpa: number;
    medianLpa: number;
    maxLpa: number;
  }[];
  highValueSkills: {
    skill: string;
    boostPercentage: number;
  }[];
  notes: string;
}

export const CITY_MULTIPLIERS: Record<string, { multiplier: number; label: string }> = {
  Bangalore: { multiplier: 1.2, label: 'Tech Capital (+20% avg premium)' },
  Mumbai: { multiplier: 1.15, label: 'Financial Hub (+15% avg premium)' },
  'Delhi-NCR (Gurgaon/Noida)': { multiplier: 1.15, label: 'MNC & Corporate Hub (+15% avg premium)' },
  Hyderabad: { multiplier: 1.1, label: 'Enterprise Tech (+10% avg premium)' },
  Pune: { multiplier: 1.08, label: 'IT & Auto Center (+8% avg premium)' },
  Chennai: { multiplier: 1.05, label: 'SaaS & Auto (+5% avg premium)' },
  'Other Indian Cities / Tier-2': { multiplier: 0.9, label: 'Tier-2 Baseline (-10%)' },
  'US / Remote Global (USD)': { multiplier: 3.5, label: 'Global Remote ($ converted)' },
};

export const SALARY_BENCHMARKS: RoleSalaryBenchmark[] = [
  // IT & Software
  {
    roleId: 'frontend-dev',
    roleName: 'Frontend Developer (React / Next.js)',
    domain: 'IT & Software',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 4.0, medianLpa: 5.5, maxLpa: 8.5 },
      { experience: '1–3 Years', minLpa: 6.5, medianLpa: 9.5, maxLpa: 14.0 },
      { experience: '3–5 Years', minLpa: 12.0, medianLpa: 16.5, maxLpa: 24.0 },
      { experience: '5–8 Years', minLpa: 18.0, medianLpa: 26.0, maxLpa: 38.0 },
      { experience: '8+ Years (Lead / Architect)', minLpa: 30.0, medianLpa: 42.0, maxLpa: 65.0 },
    ],
    highValueSkills: [
      { skill: 'Next.js App Router & SSR', boostPercentage: 18 },
      { skill: 'TypeScript & Architecture', boostPercentage: 15 },
      { skill: 'Core Web Vitals & Performance', boostPercentage: 12 },
      { skill: 'Micro-frontends', boostPercentage: 20 },
    ],
    notes: 'High demand across modern product startups and global capability centers (GCCs).',
  },
  {
    roleId: 'backend-dev',
    roleName: 'Backend Developer (Node.js / Java / Python / Go)',
    domain: 'IT & Software',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 4.5, medianLpa: 6.0, maxLpa: 9.0 },
      { experience: '1–3 Years', minLpa: 7.0, medianLpa: 10.5, maxLpa: 16.0 },
      { experience: '3–5 Years', minLpa: 13.5, medianLpa: 18.0, maxLpa: 26.0 },
      { experience: '5–8 Years', minLpa: 22.0, medianLpa: 30.0, maxLpa: 45.0 },
      { experience: '8+ Years (Staff / Principal)', minLpa: 35.0, medianLpa: 50.0, maxLpa: 75.0 },
    ],
    highValueSkills: [
      { skill: 'Distributed Systems & Microservices', boostPercentage: 22 },
      { skill: 'Kafka / Event Streaming', boostPercentage: 18 },
      { skill: 'Go / High Concurrency', boostPercentage: 20 },
      { skill: 'System Design & Redis Caching', boostPercentage: 15 },
    ],
    notes: 'Premium salaries paid for low-latency scaling and microservices experience.',
  },
  {
    roleId: 'fullstack-dev',
    roleName: 'Full Stack Engineer (MERN / Next.js / Cloud)',
    domain: 'IT & Software',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 4.5, medianLpa: 6.5, maxLpa: 10.0 },
      { experience: '1–3 Years', minLpa: 7.5, medianLpa: 11.0, maxLpa: 17.0 },
      { experience: '3–5 Years', minLpa: 14.0, medianLpa: 19.5, maxLpa: 28.0 },
      { experience: '5–8 Years', minLpa: 22.0, medianLpa: 32.0, maxLpa: 48.0 },
      { experience: '8+ Years (Tech Lead / Architect)', minLpa: 35.0, medianLpa: 48.0, maxLpa: 70.0 },
    ],
    highValueSkills: [
      { skill: 'Cloud Native AWS / GCP', boostPercentage: 18 },
      { skill: 'Docker & Kubernetes', boostPercentage: 15 },
      { skill: 'Generative AI / LLM Integration', boostPercentage: 25 },
    ],
    notes: 'Versatile engineers command top compensation in high-growth startup environments.',
  },
  {
    roleId: 'devops-engineer',
    roleName: 'DevOps & Cloud Engineer',
    domain: 'IT & Software',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 4.5, medianLpa: 6.0, maxLpa: 9.0 },
      { experience: '1–3 Years', minLpa: 7.5, medianLpa: 11.5, maxLpa: 16.5 },
      { experience: '3–5 Years', minLpa: 14.0, medianLpa: 20.0, maxLpa: 28.0 },
      { experience: '5–8 Years', minLpa: 24.0, medianLpa: 34.0, maxLpa: 50.0 },
      { experience: '8+ Years (Lead SRE)', minLpa: 36.0, medianLpa: 52.0, maxLpa: 80.0 },
    ],
    highValueSkills: [
      { skill: 'Kubernetes & Helm', boostPercentage: 20 },
      { skill: 'Terraform & Infrastructure as Code', boostPercentage: 18 },
      { skill: 'FinOps / Cloud Cost Optimization', boostPercentage: 22 },
    ],
    notes: 'Consistently one of the highest paying specializations in enterprise tech.',
  },
  {
    roleId: 'data-analyst',
    roleName: 'Data Analyst & BI Specialist',
    domain: 'IT & Software',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 3.8, medianLpa: 5.2, maxLpa: 7.5 },
      { experience: '1–3 Years', minLpa: 5.5, medianLpa: 8.5, maxLpa: 12.5 },
      { experience: '3–5 Years', minLpa: 10.0, medianLpa: 14.5, maxLpa: 20.0 },
      { experience: '5–8 Years', minLpa: 16.0, medianLpa: 22.0, maxLpa: 32.0 },
      { experience: '8+ Years (Analytics Manager)', minLpa: 25.0, medianLpa: 35.0, maxLpa: 50.0 },
    ],
    highValueSkills: [
      { skill: 'Advanced SQL & DBT', boostPercentage: 15 },
      { skill: 'Power BI & Tableau Dashboarding', boostPercentage: 12 },
      { skill: 'Python / Pandas Statistical Modeling', boostPercentage: 18 },
    ],
    notes: 'Crucial function across e-commerce, banking, logistics, and fintech.',
  },

  // Digital Marketing
  {
    roleId: 'digital-marketer',
    roleName: 'Digital Marketing & Growth Lead',
    domain: 'Digital Marketing',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 3.2, medianLpa: 4.2, maxLpa: 6.0 },
      { experience: '1–3 Years', minLpa: 4.8, medianLpa: 7.0, maxLpa: 10.5 },
      { experience: '3–5 Years', minLpa: 8.5, medianLpa: 12.5, maxLpa: 18.0 },
      { experience: '5–8 Years', minLpa: 15.0, medianLpa: 21.0, maxLpa: 30.0 },
      { experience: '8+ Years (VP / Head of Growth)', minLpa: 26.0, medianLpa: 38.0, maxLpa: 55.0 },
    ],
    highValueSkills: [
      { skill: 'Performance Marketing (Meta/Google ROAS)', boostPercentage: 20 },
      { skill: 'SEO Strategy & Programmatic Content', boostPercentage: 16 },
      { skill: 'Conversion Rate Optimization (CRO)', boostPercentage: 18 },
    ],
    notes: 'High upside through performance bonuses and direct CAC/revenue metrics.',
  },

  // HR
  {
    roleId: 'hr-executive',
    roleName: 'HR Generalist / Talent Acquisition Partner',
    domain: 'HR',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 3.0, medianLpa: 4.0, maxLpa: 5.5 },
      { experience: '1–3 Years', minLpa: 4.5, medianLpa: 6.5, maxLpa: 9.5 },
      { experience: '3–5 Years', minLpa: 7.5, medianLpa: 11.0, maxLpa: 15.0 },
      { experience: '5–8 Years', minLpa: 12.0, medianLpa: 17.5, maxLpa: 25.0 },
      { experience: '8+ Years (HRBP / Head of People)', minLpa: 20.0, medianLpa: 30.0, maxLpa: 45.0 },
    ],
    highValueSkills: [
      { skill: 'Niche Tech Recruiting & Sourcing', boostPercentage: 20 },
      { skill: 'HR Analytics & Workforce Planning', boostPercentage: 15 },
      { skill: 'Compensation & Benefits Structuring', boostPercentage: 18 },
    ],
    notes: 'Tech talent recruiters command higher incentives and commission splits.',
  },

  // BPO & Customer Service
  {
    roleId: 'bpo-qa',
    roleName: 'BPO Quality Analyst & Operations Lead',
    domain: 'BPO',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 2.8, medianLpa: 3.6, maxLpa: 4.8 },
      { experience: '1–3 Years', minLpa: 4.0, medianLpa: 5.5, maxLpa: 7.5 },
      { experience: '3–5 Years', minLpa: 6.0, medianLpa: 8.5, maxLpa: 12.0 },
      { experience: '5–8 Years', minLpa: 9.5, medianLpa: 13.5, maxLpa: 18.0 },
      { experience: '8+ Years (Operations Manager)', minLpa: 15.0, medianLpa: 22.0, maxLpa: 32.0 },
    ],
    highValueSkills: [
      { skill: 'Six Sigma Green Belt', boostPercentage: 22 },
      { skill: 'Quality Auditing & CSAT / FCR Analysis', boostPercentage: 15 },
      { skill: 'Workforce Management (WFM)', boostPercentage: 18 },
    ],
    notes: 'International voice and technical support processes offer night shift allowances.',
  },

  // Sales
  {
    roleId: 'sales-executive',
    roleName: 'Inside Sales & B2B Account Executive',
    domain: 'Sales',
    experienceTiers: [
      { experience: 'Fresher (0–1 yr)', minLpa: 3.5, medianLpa: 4.8, maxLpa: 7.0 },
      { experience: '1–3 Years', minLpa: 5.5, medianLpa: 8.0, maxLpa: 12.0 },
      { experience: '3–5 Years', minLpa: 9.0, medianLpa: 14.0, maxLpa: 22.0 },
      { experience: '5–8 Years', minLpa: 16.0, medianLpa: 24.0, maxLpa: 36.0 },
      { experience: '8+ Years (Enterprise Sales Director)', minLpa: 28.0, medianLpa: 45.0, maxLpa: 70.0 },
    ],
    highValueSkills: [
      { skill: 'Enterprise B2B Software Sales', boostPercentage: 25 },
      { skill: 'Salesforce CRM Pipeline Management', boostPercentage: 15 },
      { skill: 'US / Europe Geography Selling', boostPercentage: 22 },
    ],
    notes: 'Significant earning upside via uncapped sales commissions (typically 20–50% on top of base CTC).',
  },

  // Management
  {
    roleId: 'product-manager',
    roleName: 'Product Manager (B2B / B2C)',
    domain: 'Management',
    experienceTiers: [
      { experience: 'Fresher (APM 0–1 yr)', minLpa: 8.0, medianLpa: 12.0, maxLpa: 18.0 },
      { experience: '1–3 Years', minLpa: 12.0, medianLpa: 18.0, maxLpa: 26.0 },
      { experience: '3–5 Years', minLpa: 18.0, medianLpa: 26.0, maxLpa: 38.0 },
      { experience: '5–8 Years', minLpa: 28.0, medianLpa: 40.0, maxLpa: 60.0 },
      { experience: '8+ Years (Director / VP Product)', minLpa: 45.0, medianLpa: 65.0, maxLpa: 100.0 },
    ],
    highValueSkills: [
      { skill: '0 to 1 Product Discovery & Launch', boostPercentage: 20 },
      { skill: 'Data-driven Experimentation & SQL', boostPercentage: 15 },
      { skill: 'AI/ML Product Strategy', boostPercentage: 25 },
    ],
    notes: 'Premium compensation package with substantial stock option grants (ESOPs).',
  },
];

export function calculateEstimatedSalary(
  roleId: string,
  experienceLevel: string,
  city: string,
  selectedSkills: string[] = []
) {
  const benchmark =
    SALARY_BENCHMARKS.find((b) => b.roleId === roleId) || SALARY_BENCHMARKS[0];

  // Find tier or default to median tier
  const tier =
    benchmark.experienceTiers.find((t) => t.experience.includes(experienceLevel)) ||
    benchmark.experienceTiers[1];

  const cityConfig = CITY_MULTIPLIERS[city] || CITY_MULTIPLIERS['Bangalore'];
  const cityMult = cityConfig.multiplier;

  // Calculate skills boost
  let skillBoost = 0;
  selectedSkills.forEach((skillName) => {
    const found = benchmark.highValueSkills.find((s) => s.skill === skillName);
    if (found) skillBoost += found.boostPercentage / 100;
  });
  // Cap skill boost at 40%
  const totalMultiplier = cityMult * (1 + Math.min(0.4, skillBoost));

  const minLpa = Number((tier.minLpa * totalMultiplier).toFixed(1));
  const medianLpa = Number((tier.medianLpa * totalMultiplier).toFixed(1));
  const maxLpa = Number((tier.maxLpa * totalMultiplier).toFixed(1));

  // In-hand monthly estimation (Approx 70% in-hand after standard tax & PF in India)
  const approxMonthlyInHandMin = Math.round((minLpa * 100000 * 0.72) / 12);
  const approxMonthlyInHandMedian = Math.round((medianLpa * 100000 * 0.70) / 12);
  const approxMonthlyInHandMax = Math.round((maxLpa * 100000 * 0.68) / 12);

  return {
    roleName: benchmark.roleName,
    domain: benchmark.domain,
    experienceLevel: tier.experience,
    city,
    cityNote: cityConfig.label,
    minLpa,
    medianLpa,
    maxLpa,
    approxMonthlyInHandMin,
    approxMonthlyInHandMedian,
    approxMonthlyInHandMax,
    components: {
      basePayPercent: 70,
      performanceBonusPercent: 15,
      benefitsAndPfPercent: 15,
    },
    topSkills: benchmark.highValueSkills,
    notes: benchmark.notes,
  };
}
