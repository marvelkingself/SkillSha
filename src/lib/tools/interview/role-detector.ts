import { InterviewDomain, RoleConfig } from '@/types/interview';
import { INTERVIEW_DOMAINS_CONFIG } from '@/config/interview/domains';

export interface DetectedRoleResult {
  roleId: string;
  roleName: string;
  domain: InterviewDomain;
  description: string;
  keySkills: string[];
  isCustom: boolean;
  recommendedInterviewType: string;
  interviewTypeOptions: {
    id: string;
    title: string;
    description: string;
    isRecommended?: boolean;
  }[];
}

export const POPULAR_ROLES = [
  { name: 'Software Developer', domain: 'IT & Software', roleId: 'it-fullstack-dev' },
  { name: 'Next.js Developer', domain: 'IT & Software', roleId: 'it-nextjs-dev' },
  { name: 'Digital Marketing Executive', domain: 'Digital Marketing', roleId: 'mkt-seo-exec' },
  { name: 'HR Executive', domain: 'HR', roleId: 'hr-generalist' },
  { name: 'BPO Quality Analyst', domain: 'BPO', roleId: 'bpo-quality-analyst' },
  { name: 'Sales Executive', domain: 'Sales', roleId: 'sales-bdr' },
  { name: 'Data Analyst', domain: 'IT & Software', roleId: 'it-data-analyst' },
];

export function getRoleInterviewTypes(domain: InterviewDomain) {
  switch (domain) {
    case 'IT & Software':
      return [
        {
          id: 'Full Mock Interview',
          title: 'Full Mock Interview',
          description: 'HR + Technical + System/Problem Solving (Closest to real tech rounds)',
          isRecommended: true,
        },
        {
          id: 'Technical Interview',
          title: 'Technical Interview',
          description: 'Coding concepts, architectures, frameworks, and debugging logic',
        },
        {
          id: 'Behavioral Interview',
          title: 'System & Problem Solving',
          description: 'Real-world situations, architectural trade-offs, and STAR methodology',
        },
        {
          id: 'HR Interview',
          title: 'HR & Culture Fit',
          description: 'Background, team collaboration, motivation, and career trajectory',
        },
      ];
    case 'BPO':
      return [
        {
          id: 'Full Mock Interview',
          title: 'Full BPO Mock Interview',
          description: 'HR + Voice/Chat Assessment + Process/QA scenarios + Customer Handling',
          isRecommended: true,
        },
        {
          id: 'Domain Interview',
          title: 'Process & Quality (QA) Round',
          description: 'Quality scoring, CSAT, FCR, fatal/non-fatal errors, coaching feedback',
        },
        {
          id: 'Behavioral Interview',
          title: 'Escalation & Customer Handling',
          description: 'Handling irate customers, de-escalation, empathy, and active listening',
        },
        {
          id: 'HR Interview',
          title: 'HR & Versant Preparation',
          description: 'Fluency, voice modulation, rotational shift readiness, and culture fit',
        },
      ];
    case 'Digital Marketing':
      return [
        {
          id: 'Full Mock Interview',
          title: 'Full Marketing Mock Interview',
          description: 'HR + Campaign Strategy + Analytics/ROI + Case Study simulations',
          isRecommended: true,
        },
        {
          id: 'Domain Interview',
          title: 'Marketing & Technical Depth',
          description: 'SEO algorithms, Meta/Google Ads bidding, ROAS, tracking, and funnel design',
        },
        {
          id: 'Behavioral Interview',
          title: 'Case Study & Problem Solving',
          description: 'Handling dropping CTRs, scaling CPA, budget allocation, and creative burnout',
        },
        {
          id: 'HR Interview',
          title: 'HR & Growth Mindset',
          description: 'Creativity, analytical alignment, client stakeholder management',
        },
      ];
    case 'HR':
      return [
        {
          id: 'Full Mock Interview',
          title: 'Full HR Leadership Mock',
          description: 'HR Philosophy + Sourcing/Screening + Labor Laws + Employee Relations',
          isRecommended: true,
        },
        {
          id: 'Domain Interview',
          title: 'HR Process & Compliance',
          description: 'Talent pipeline, hiring metrics (Time-to-Hire), offer rollouts, grievances',
        },
        {
          id: 'Behavioral Interview',
          title: 'Conflict & Employee Relations',
          description: 'Handling toxic behaviors, policy violations, manager escalations, retention',
        },
        {
          id: 'HR Interview',
          title: 'Personal HR Fit & Values',
          description: 'Employer branding, workplace empathy, and ethical integrity',
        },
      ];
    case 'Sales':
      return [
        {
          id: 'Full Mock Interview',
          title: 'Full Sales Mock & Pitch Round',
          description: 'Qualification + Cold Calling + Objection Handling + Closing + HR',
          isRecommended: true,
        },
        {
          id: 'Domain Interview',
          title: 'Objection Handling & Pitching',
          description: 'BANT framework, pricing objections, competitive positioning, live pitch',
        },
        {
          id: 'Behavioral Interview',
          title: 'Quota & Deal Scenarios',
          description: 'Handling long sales cycles, missed quotas, and negotiating contract terms',
        },
        {
          id: 'HR Interview',
          title: 'HR & Resilience Assessment',
          description: 'Hunger for targets, coachability, work ethic, and team collaboration',
        },
      ];
    case 'Finance':
      return [
        {
          id: 'Full Mock Interview',
          title: 'Full Finance Mock Interview',
          description: 'Accounting Principles + Valuation/Modeling + Compliance + HR',
          isRecommended: true,
        },
        {
          id: 'Technical Interview',
          title: 'Financial Analysis & Reporting',
          description: '3-statement modeling, DCF, variance analysis, tax, and auditing standards',
        },
        {
          id: 'Behavioral Interview',
          title: 'Risk & Ethical Decisions',
          description: 'Audit discrepancies, reconciliation hurdles, regulatory compliance',
        },
        {
          id: 'HR Interview',
          title: 'HR & Professional Acumen',
          description: 'Attention to detail, deadline management, and business communication',
        },
      ];
    case 'Management':
    default:
      return [
        {
          id: 'Full Mock Interview',
          title: 'Full Management Mock Interview',
          description: 'Product Strategy + Execution + Stakeholder Management + Leadership',
          isRecommended: true,
        },
        {
          id: 'Managerial Interview',
          title: 'Strategic & Operational Depth',
          description: 'Roadmapping, RICE prioritization, sprint management, metrics & OKRs',
        },
        {
          id: 'Behavioral Interview',
          title: 'Leadership & Conflict Scenarios',
          description: 'Cross-functional alignment, managing underperformers, crisis resolution',
        },
        {
          id: 'HR Interview',
          title: 'Executive Fit & Vision',
          description: 'Vision, mentorship philosophy, and organizational culture building',
        },
      ];
  }
}

/**
 * Smart detection: Takes user query (e.g. "Next.js Developer", "BPO QA", "HR Executive")
 * and extracts domain, normalized title, and related skills.
 */
export function detectRoleFromQuery(query: string): DetectedRoleResult {
  const clean = query.trim();
  const lower = clean.toLowerCase();

  // 1. Direct match or substring match against known catalog
  for (const domainConfig of INTERVIEW_DOMAINS_CONFIG) {
    for (const role of domainConfig.roles) {
      if (
        role.name.toLowerCase() === lower ||
        lower === role.id.toLowerCase() ||
        role.name.toLowerCase().includes(lower) ||
        lower.includes(role.name.toLowerCase())
      ) {
        return {
          roleId: role.id,
          roleName: role.name,
          domain: role.domain,
          description: role.description,
          keySkills: role.keySkills,
          isCustom: false,
          recommendedInterviewType: 'Full Mock Interview',
          interviewTypeOptions: getRoleInterviewTypes(role.domain),
        };
      }
    }
  }

  // 2. Keyword heuristic detection
  // BPO keywords
  if (
    lower.includes('bpo') ||
    lower.includes('call center') ||
    lower.includes('telecalling') ||
    lower.includes('customer service') ||
    lower.includes('tech support') ||
    lower.includes('quality analyst') ||
    lower.includes('qa voice')
  ) {
    return {
      roleId: `custom-bpo-${clean.replace(/\s+/g, '-').toLowerCase()}`,
      roleName: clean || 'BPO Customer Support Specialist',
      domain: 'BPO',
      description: 'Customer communication, conflict resolution, active listening, and SLA adherence.',
      keySkills: ['Active Listening', 'Customer Empathy', 'Conflict De-escalation', 'CRM Tools', 'Quality Standards', 'CSAT Optimization'],
      isCustom: true,
      recommendedInterviewType: 'Full Mock Interview',
      interviewTypeOptions: getRoleInterviewTypes('BPO'),
    };
  }

  // Digital Marketing keywords
  if (
    lower.includes('marketing') ||
    lower.includes('seo') ||
    lower.includes('sem') ||
    lower.includes('ads') ||
    lower.includes('social media') ||
    lower.includes('content') ||
    lower.includes('copywriter') ||
    lower.includes('growth')
  ) {
    return {
      roleId: `custom-mkt-${clean.replace(/\s+/g, '-').toLowerCase()}`,
      roleName: clean || 'Digital Marketing Specialist',
      domain: 'Digital Marketing',
      description: 'Omnichannel growth, search engine algorithms, paid media optimization, and analytics.',
      keySkills: ['SEO & Organic Search', 'Google/Meta Ads', 'Funnel Strategy', 'Google Analytics 4', 'Content Copywriting', 'Conversion Rate Optimization (CRO)'],
      isCustom: true,
      recommendedInterviewType: 'Full Mock Interview',
      interviewTypeOptions: getRoleInterviewTypes('Digital Marketing'),
    };
  }

  // HR keywords
  if (
    lower.includes('hr') ||
    lower.includes('human resource') ||
    lower.includes('recruiter') ||
    lower.includes('talent acquisition') ||
    lower.includes('payroll') ||
    lower.includes('employee relation')
  ) {
    return {
      roleId: `custom-hr-${clean.replace(/\s+/g, '-').toLowerCase()}`,
      roleName: clean || 'HR Specialist',
      domain: 'HR',
      description: 'Talent management, candidate assessment, employment labor norms, and workplace engagement.',
      keySkills: ['Talent Sourcing', 'Behavioral Screening', 'Offer Negotiation', 'Employee Engagement', 'Labor Compliance', 'HRIS Systems'],
      isCustom: true,
      recommendedInterviewType: 'Full Mock Interview',
      interviewTypeOptions: getRoleInterviewTypes('HR'),
    };
  }

  // Sales keywords
  if (
    lower.includes('sales') ||
    lower.includes('bdr') ||
    lower.includes('sdr') ||
    lower.includes('business development') ||
    lower.includes('account executive') ||
    lower.includes('client relationship')
  ) {
    return {
      roleId: `custom-sales-${clean.replace(/\s+/g, '-').toLowerCase()}`,
      roleName: clean || 'Sales Executive',
      domain: 'Sales',
      description: 'Pipeline generation, consultative sales, objection handling, and quota closing.',
      keySkills: ['Cold Outreach', 'Objection Handling', 'BANT Qualification', 'Pipeline Management', 'Contract Negotiation', 'CRM (Salesforce/HubSpot)'],
      isCustom: true,
      recommendedInterviewType: 'Full Mock Interview',
      interviewTypeOptions: getRoleInterviewTypes('Sales'),
    };
  }

  // Finance keywords
  if (
    lower.includes('finance') ||
    lower.includes('accountant') ||
    lower.includes('audit') ||
    lower.includes('tax') ||
    lower.includes('banking') ||
    lower.includes('financial analyst')
  ) {
    return {
      roleId: `custom-fin-${clean.replace(/\s+/g, '-').toLowerCase()}`,
      roleName: clean || 'Financial Analyst',
      domain: 'Finance',
      description: 'Financial reporting, variance analysis, compliance, and cash flow modeling.',
      keySkills: ['Financial Modeling', 'Variance Analysis', 'GAAP / IFRS', 'Excel & PowerBI', 'Audit Compliance', 'Cash Flow Projections'],
      isCustom: true,
      recommendedInterviewType: 'Full Mock Interview',
      interviewTypeOptions: getRoleInterviewTypes('Finance'),
    };
  }

  // Management keywords
  if (
    lower.includes('manager') ||
    lower.includes('product manager') ||
    lower.includes('project manager') ||
    lower.includes('scrum') ||
    lower.includes('agile') ||
    lower.includes('operations')
  ) {
    return {
      roleId: `custom-mgmt-${clean.replace(/\s+/g, '-').toLowerCase()}`,
      roleName: clean || 'Project Manager',
      domain: 'Management',
      description: 'Strategic planning, cross-functional delivery, agile sprint leadership, and risk management.',
      keySkills: ['Agile / Scrum', 'RICE Prioritization', 'Stakeholder Alignment', 'Risk Mitigation', 'Product Roadmapping', 'Metrics & OKRs'],
      isCustom: true,
      recommendedInterviewType: 'Full Mock Interview',
      interviewTypeOptions: getRoleInterviewTypes('Management'),
    };
  }

  // Default: IT & Software
  // Extract specific tech skills if mentioned
  const techSkills: string[] = [];
  if (lower.includes('react')) techSkills.push('React.js', 'Hooks', 'State Management');
  if (lower.includes('next')) techSkills.push('Next.js', 'Server Components', 'SSR');
  if (lower.includes('node')) techSkills.push('Node.js', 'Express', 'APIs');
  if (lower.includes('python')) techSkills.push('Python', 'FastAPI/Django', 'Data Structures');
  if (lower.includes('data')) techSkills.push('SQL', 'Data Analytics', 'BI Tools');
  if (lower.includes('devops') || lower.includes('cloud')) techSkills.push('CI/CD', 'Docker', 'AWS/GCP');

  return {
    roleId: `custom-it-${clean.replace(/\s+/g, '-').toLowerCase() || 'developer'}`,
    roleName: clean || 'Software Engineer',
    domain: 'IT & Software',
    description: 'Technical system implementation, clean code architecture, problem solving, and modern best practices.',
    keySkills:
      techSkills.length > 0
        ? [...techSkills, 'System Architecture', 'Debugging', 'RESTful APIs']
        : ['Algorithm & Data Structures', 'Clean Architecture', 'API Integration', 'Debugging & Troubleshooting', 'Version Control (Git)', 'Performance Tuning'],
    isCustom: true,
    recommendedInterviewType: 'Full Mock Interview',
    interviewTypeOptions: getRoleInterviewTypes('IT & Software'),
  };
}
