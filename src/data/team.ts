export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  expertise?: string[];
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  image?: string;
}

export interface TeamGroup {
  id: string;
  title: string;
  members: TeamMember[];
}

export const FOUNDERS_DATA: TeamMember[] = [
  {
    name: "Amir Khan",
    role: "Co-Founder & CEO",
    bio: "A visionary leader driving technical educational accessibility, strategic industry alliances, and active student outcomes worldwide.",
    expertise: ["Strategic Growth", "Product Direction", "Partnership Networks", "Curriculum Strategy"],
    socials: {
      linkedin: "#",
      twitter: "#",
    },
    image: ""
  },
  {
    name: "Shad Ansari",
    role: "Co-Founder & CTO",
    bio: "An engineering pioneer focusing on modern AI runtime integrations, builder pedagogy, and high-performance educational platform runtimes.",
    expertise: ["AI Systems Architectures", "Developer Advocacy", "Pedagogical Runtimes", "Engineering Operations"],
    socials: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    },
    image: ""
  }
];

export const FOUNDERS_MESSAGE = {
  quote: "Our mission is to build a high-velocity learning environment where theory is replaced by build-runtimes, enabling students to become day-one ready for global product challenges.",
  body: "SkillSha was founded with a singular conviction: the traditional textbook-and-exams model of education is broken. By centering all curricula on real-world practical tools (like Generative AI platforms, Make.com, GitHub portfolios, and live campaigns), we remove the gap between learning and impact.\n\nWe are building a long-term learning community of developers, growth marketers, and builders who learn together, upskill continuously, and connect directly with hiring networks across Noida, NCR, and the globe."
};

export const TEAMS_DATA: TeamGroup[] = [
  {
    id: "trainers",
    title: "Trainers & Instructors",
    members: [
      {
        name: "Mr. Shad",
        role: "Lead Performance Marketing Instructor",
        bio: "12+ years in search engine marketing and conversion optimization. Ex-agency director.",
        expertise: ["Google Ads", "SEM Bidding", "Conversion Analytics"],
        socials: { linkedin: "#" }
      },
      {
        name: "Mr. Umar",
        role: "Lead Social Media Strategy Instructor",
        bio: "10+ years managing viral campaigns and visual brand positioning across NCR and globally.",
        expertise: ["Brand Strategy", "Community Management", "Paid Social Ads"],
        socials: { linkedin: "#" }
      },
      {
        name: "Ms. Hema",
        role: "Lead Marketing Automation Instructor",
        bio: "6+ years setting up high-converting email sequences and CRM drip logic.",
        expertise: ["HubSpot & ActiveCampaign", "A/B Testing", "Funnel Optimisation"],
        socials: { linkedin: "#" }
      },
      {
        name: "[Lead AI Instructor]",
        role: "Lead Artificial Intelligence Trainer",
        bio: "Active developer specializing in large language model workflows and prompt chains.",
        expertise: ["Prompt Engineering", "LLM APIs", "Autonomous Agents"],
        socials: { github: "#" }
      },
      {
        name: "[Lead Designer]",
        role: "UI/UX & Product Design Trainer",
        bio: "Product designer focusing on glassmorphism, responsive systems, and interactive design.",
        expertise: ["Figma Systems", "Interactive Layouts", "Aesthetics"],
        socials: { linkedin: "#" }
      }
    ]
  },
  {
    id: "mentors",
    title: "Mentors & Career Coaches",
    members: [
      {
        name: "[Career Coach A]",
        role: "Head of Placements & Career Counseling",
        expertise: ["Interview Preparation", "Salary Negotiation", "NCR Hiring Networks"]
      },
      {
        name: "[Resume Specialist]",
        role: "LinkedIn & Portfolio Reviewer",
        expertise: ["LinkedIn Optimisation", "Resume Formatting", "Personal Branding"]
      },
      {
        name: "[Technical Evaluator]",
        role: "Industry Project Evaluator",
        expertise: ["Code Quality", "Mock Reviews", "System Design"]
      }
    ]
  },
  {
    id: "developers",
    title: "Developers & Engineering",
    members: [
      {
        name: "[Lead Developer]",
        role: "Lead Educational Platform Architect",
        expertise: ["Next.js & React", "Supabase Backend", "Render Optimization"],
        socials: { github: "#" }
      },
      {
        name: "[Full Stack Dev]",
        role: "Platform Engineer",
        expertise: ["PostgreSQL", "API Route Optimization", "Docker"],
        socials: { github: "#" }
      },
      {
        name: "[AI System Engineer]",
        role: "Integrations Developer",
        expertise: ["Vector Databases", "LangChain", "Crawler Systems"],
        socials: { github: "#" }
      }
    ]
  },
  {
    id: "marketing",
    title: "Digital Marketing & SEO Team",
    members: [
      {
        name: "[SEO Lead]",
        role: "Head of Search & GEO Optimization",
        expertise: ["Technical SEO", "AEO/GEO Optimization", "Local Search SEO"]
      },
      {
        name: "[Growth Manager]",
        role: "Paid Ads & User Acquisition",
        expertise: ["Meta & Google Bidding", "Retargeting Funnels", "LTV Economics"]
      }
    ]
  },
  {
    id: "content",
    title: "Content Strategy Team",
    members: [
      {
        name: "[Content Director]",
        role: "Head of Copy & Script Strategy",
        expertise: ["Copywriting", "Storyboarding", "Editorial Systems"]
      },
      {
        name: "[Media Producer]",
        role: "Ad Creative & Video Editor",
        expertise: ["Figma Layouts", "Motion Graphics", "Video Production"]
      }
    ]
  },
  {
    id: "student-success",
    title: "Student Success & Support",
    members: [
      {
        name: "[Success Lead]",
        role: "Head of Student Experience",
        expertise: ["Student Retention", "Doubt Support", "LMS Administration"]
      },
      {
        name: "[Placement Coordinator]",
        role: "Career Coordinator",
        expertise: ["NCR Partner Liaison", "Mock Coordination", "Interview Pipelines"]
      }
    ]
  },
  {
    id: "operations",
    title: "Operations Team",
    members: [
      {
        name: "[Operations Lead]",
        role: "Head of Operations",
        expertise: ["Program Scheduling", "Resource Allocation", "NCR Operations"]
      },
      {
        name: "[Program Coordinator]",
        role: "Operations Manager",
        expertise: ["Schedule Syncing", "Admissions Coordination", "Event Planning"]
      }
    ]
  },
  {
    id: "legal",
    title: "Legal & Compliance",
    members: [
      {
        name: "[Legal Counsel]",
        role: "General Legal Counsel",
        expertise: ["IP Protection", "Course Agreements", "Policy Structuring"]
      },
      {
        name: "[Compliance Specialist]",
        role: "Data Privacy & Compliance Lead",
        expertise: ["GDPR/DPDP compliance", "Student Privacy", "Platform Safety"]
      }
    ]
  }
];
