import { DomainConfig, InterviewDomain, RoleConfig } from '@/types/interview';

export const INTERVIEW_DOMAINS_CONFIG: DomainConfig[] = [
  {
    name: 'IT & Software',
    description: 'Engineering, web development, data science, DevOps, and cloud roles.',
    iconName: 'Code',
    roles: [
      {
        id: 'it-nextjs-dev',
        name: 'Next.js Developer',
        domain: 'IT & Software',
        description: 'Server Components, SSR/SSG/ISR, App Router architecture, API handlers & Core Web Vitals.',
        keySkills: ['Next.js 14/15/16', 'React 19', 'Server Actions', 'TypeScript', 'SEO Optimization', 'Tailwind CSS'],
        sampleQuestions: {
          fresher: [
            'What is the fundamental difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR)?',
            'Explain how the Next.js App Router differs from the legacy Pages Router.',
            'What is the purpose of Server Components versus Client Components in Next.js?',
            'How do you handle API calls and form submissions using Server Actions?',
            'What is the function of the layout.tsx file in Next.js?',
          ],
          experienced: [
            'How do you architect Incremental Static Regeneration (ISR) with on-demand cache revalidation at scale?',
            'Explain Next.js request memoization, Data Cache, Full Route Cache, and Router Cache mechanics.',
            'How would you diagnose and fix a slow Largest Contentful Paint (LCP) caused by server-rendered database waterfall queries?',
            'Explain your strategy for implementing stateless JWT authentication with Edge Middleware and HTTP-only cookies in Next.js.',
            'Describe a scenario where Server Components caused an unexpected hydration error and how you debugged it.',
          ],
        },
        weightings: { technical: 0.45, problemSolving: 0.25, domainKnowledge: 0.15, communication: 0.1, professionalism: 0.05 },
      },
      {
        id: 'it-react-dev',
        name: 'React Developer',
        domain: 'IT & Software',
        description: 'Component architecture, state management, hooks lifecycle, virtual DOM, and performance.',
        keySkills: ['React 18/19', 'Redux/Zustand', 'Hooks', 'Virtual DOM', 'Webpack/Vite', 'Performance Optimization'],
        sampleQuestions: {
          fresher: [
            'Explain the React Component lifecycle and how the useEffect hook replicates lifecycle methods.',
            'What is the difference between controlled and uncontrolled components?',
            'What is the Virtual DOM and how does React reconciliation algorithm work?',
            'How do you pass data between sibling components without props drilling?',
            'What are React Fragments and why are they used?',
          ],
          experienced: [
            'How do you prevent unnecessary re-renders in deeply nested React applications? Compare useMemo, useCallback, and React.memo.',
            'Explain the internal implementation of React Fiber architecture and concurrent rendering features.',
            'How would you design a scalable state management architecture for a fintech trading dashboard with real-time WebSockets?',
            'Discuss the trade-offs of micro-frontends with Module Federation versus monolithic React codebases.',
            'How do you optimize bundle size when code-splitting dynamic imports and tree-shaking third-party libraries?',
          ],
        },
        weightings: { technical: 0.45, problemSolving: 0.25, domainKnowledge: 0.15, communication: 0.1, professionalism: 0.05 },
      },
      {
        id: 'it-frontend-dev',
        name: 'Frontend Developer',
        domain: 'IT & Software',
        description: 'HTML5, modern CSS, JavaScript ES6+, responsive design, web performance & cross-browser compatibility.',
        keySkills: ['JavaScript ES6+', 'HTML5/CSS3', 'Responsive Design', 'Web Accessibility (a11y)', 'REST APIs'],
        sampleQuestions: {
          fresher: [
            'Explain CSS Box Model and the difference between content-box and border-box.',
            'What is the difference between == and === in JavaScript?',
            'Explain closures in JavaScript with a practical use case.',
            'What is event bubbling and event capturing?',
            'How do CSS Flexbox and CSS Grid differ in layout modeling?',
          ],
          experienced: [
            'How do you optimize Critical Rendering Path (CRP) to minimize First Contentful Paint (FCP) and Cumulative Layout Shift (CLS)?',
            'Explain Service Workers, caching strategies (Stale-While-Revalidate, Network First), and offline Progressive Web Apps.',
            'How do you enforce WCAG 2.1 AA accessibility standards for dynamic interactive components like modals and comboboxes?',
            'Discuss how you would architect a design system component library distributed across multiple engineering teams.',
          ],
        },
        weightings: { technical: 0.4, problemSolving: 0.25, domainKnowledge: 0.15, communication: 0.15, professionalism: 0.05 },
      },
      {
        id: 'it-backend-dev',
        name: 'Backend Developer',
        domain: 'IT & Software',
        description: 'REST/GraphQL APIs, relational & NoSQL databases, microservices, caching, concurrency, and security.',
        keySkills: ['Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'System Design'],
        sampleQuestions: {
          fresher: [
            'Explain the Event Loop in Node.js and how non-blocking I/O functions.',
            'What is the difference between SQL and NoSQL databases, and when would you choose which?',
            'What is database normalization and why is it important?',
            'Explain the differences between HTTP GET, POST, PUT, PATCH, and DELETE.',
            'How do you secure passwords before storing them in a database?',
          ],
          experienced: [
            'How do you design a distributed rate-limiter using Redis and the Sliding Window Counter algorithm?',
            'Explain database indexing internals (B-Trees vs Hash Indexes) and how you optimize slow join queries on tables with millions of rows.',
            'How do you handle distributed transactions and eventual consistency in microservices using the Saga pattern?',
            'Describe how you prevent race conditions and handle concurrency in payment processing workflows.',
          ],
        },
        weightings: { technical: 0.5, problemSolving: 0.25, domainKnowledge: 0.15, communication: 0.05, professionalism: 0.05 },
      },
      {
        id: 'it-fullstack-dev',
        name: 'Full Stack Developer',
        domain: 'IT & Software',
        description: 'End-to-end web architecture, frontend UI, backend services, cloud deployment, and database schemas.',
        keySkills: ['React/Next.js', 'Node.js/Python', 'SQL & NoSQL', 'REST/GraphQL', 'CI/CD Pipelines'],
        sampleQuestions: {
          fresher: [
            'Explain the client-server architecture and how a browser request travels to a database and back.',
            'How do you handle user authentication and authorization across the frontend and backend?',
            'What are CORS headers and why do browsers block cross-origin requests?',
          ],
          experienced: [
            'Architect an end-to-end e-commerce flash sale system capable of handling 50,000 requests per second with inventory consistency.',
            'How do you balance serverless functions versus containerized microservices for high-throughput enterprise applications?',
            'Explain your automated CI/CD pipeline strategy with zero-downtime blue-green deployments.',
          ],
        },
        weightings: { technical: 0.45, problemSolving: 0.25, domainKnowledge: 0.15, communication: 0.1, professionalism: 0.05 },
      },
      {
        id: 'it-qa-engineer',
        name: 'QA Engineer',
        domain: 'IT & Software',
        description: 'Manual and automated testing, test strategies, test cases, regression, smoke, and API testing.',
        keySkills: ['Manual Testing', 'Selenium/Cypress', 'Postman', 'Bug Tracking (Jira)', 'Test Plans'],
        sampleQuestions: {
          fresher: [
            'What is the difference between Verification and Validation in software engineering?',
            'Explain the Software Testing Life Cycle (STLC) phases.',
            'What is the difference between Regression Testing and Retesting?',
            'How do you write a clear, reproducible bug report?',
          ],
          experienced: [
            'How do you design an automated test pyramid (Unit, Integration, E2E) to maintain fast CI builds without flaky tests?',
            'Describe your API testing framework strategy using Postman/Newman or REST Assured in a continuous deployment pipeline.',
            'How do you test system resilience and fault tolerance for distributed microservices under chaos conditions?',
          ],
        },
        weightings: { technical: 0.35, problemSolving: 0.3, domainKnowledge: 0.2, communication: 0.1, professionalism: 0.05 },
      },
      {
        id: 'it-automation-tester',
        name: 'Automation Tester',
        domain: 'IT & Software',
        description: 'Test automation frameworks (Selenium, Playwright, Cypress), CI/CD test integration, and scripting.',
        keySkills: ['Playwright', 'Selenium WebDriver', 'Java/Python', 'Page Object Model', 'CI/CD Integration'],
        sampleQuestions: {
          fresher: [
            'What is the Page Object Model (POM) and why is it beneficial?',
            'How do you handle dynamic dropdowns and explicit waits in Selenium/Playwright?',
            'What is the difference between findElement and findElements?',
          ],
          experienced: [
            'How do you architect a parallel cross-browser test execution grid in Docker containers within GitHub Actions?',
            'How do you manage test data isolation and automated database teardowns in end-to-end automation suites?',
          ],
        },
        weightings: { technical: 0.45, problemSolving: 0.25, domainKnowledge: 0.15, communication: 0.1, professionalism: 0.05 },
      },
      {
        id: 'it-data-analyst',
        name: 'Data Analyst',
        domain: 'IT & Software',
        description: 'SQL queries, data cleaning, statistical analysis, dashboard creation (Power BI/Tableau), and insights.',
        keySkills: ['SQL', 'Python/Pandas', 'Power BI / Tableau', 'Excel Modeling', 'Statistical Analysis'],
        sampleQuestions: {
          fresher: [
            'Explain SQL Joins: INNER, LEFT, RIGHT, and FULL OUTER joins with examples.',
            'What are Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK)?',
            'How do you handle missing or duplicate values in Pandas?',
            'Explain the difference between categorical and numerical variables.',
          ],
          experienced: [
            'How would you diagnose a sudden 15% drop in weekly active users for an edtech platform using exploratory data analysis?',
            'Explain your approach to designing star and snowflake dimensional schemas for business intelligence data warehouses.',
            'How do you calculate Customer Lifetime Value (CLV) and Churn Probability using cohort analysis?',
          ],
        },
        weightings: { technical: 0.4, problemSolving: 0.3, domainKnowledge: 0.15, communication: 0.1, professionalism: 0.05 },
      },
      {
        id: 'it-data-scientist',
        name: 'Data Scientist',
        domain: 'IT & Software',
        description: 'Machine learning algorithms, predictive modeling, NLP, deep learning, and statistical testing.',
        keySkills: ['Python', 'Scikit-learn', 'TensorFlow/PyTorch', 'Hypothesis Testing', 'Feature Engineering'],
        sampleQuestions: {
          fresher: [
            'Explain the bias-variance tradeoff in machine learning.',
            'What is the difference between supervised and unsupervised learning?',
            'How does a Random Forest classifier work compared to a single Decision Tree?',
          ],
          experienced: [
            'How do you address severe class imbalance (e.g. 99.8% vs 0.2%) in financial fraud detection models?',
            'Explain how you evaluate models when accuracy is deceptive (Precision-Recall curves vs ROC-AUC).',
            'How do you monitor and resolve model drift and concept drift in production inference pipelines?',
          ],
        },
        weightings: { technical: 0.45, problemSolving: 0.3, domainKnowledge: 0.15, communication: 0.05, professionalism: 0.05 },
      },
      {
        id: 'it-devops-engineer',
        name: 'DevOps Engineer',
        domain: 'IT & Software',
        description: 'CI/CD automation, cloud infrastructure (AWS/GCP), Docker, Kubernetes, Terraform, and monitoring.',
        keySkills: ['AWS/GCP', 'Docker & Kubernetes', 'Terraform', 'CI/CD (GitHub Actions/Jenkins)', 'Prometheus/Grafana'],
        sampleQuestions: {
          fresher: [
            'What is the core philosophy of DevOps and CI/CD?',
            'Explain the difference between a Docker Image and a Docker Container.',
            'What is Infrastructure as Code (IaC) and why is Terraform used?',
          ],
          experienced: [
            'How do you architect a multi-region highly available Kubernetes cluster on AWS EKS with automated pod autoscaling (HPA/KEDA)?',
            'Explain zero-downtime rolling updates, canary deployments, and automated rollback triggers using Prometheus metrics.',
            'Describe how you secure secrets management across production clusters without committing credentials to Git.',
          ],
        },
        weightings: { technical: 0.5, problemSolving: 0.25, domainKnowledge: 0.15, communication: 0.05, professionalism: 0.05 },
      },
      {
        id: 'it-uiux-designer',
        name: 'UI/UX Designer',
        domain: 'IT & Software',
        description: 'User research, wireframing, high-fidelity prototyping in Figma, design systems, and usability testing.',
        keySkills: ['Figma', 'Wireframing', 'User Research', 'Design Systems', 'Usability Testing'],
        sampleQuestions: {
          fresher: [
            'Explain the stages of the Design Thinking process.',
            'What is the difference between UI design and UX design?',
            'How do you conduct user research before creating wireframes?',
          ],
          experienced: [
            'Walk me through how you redesigned a complex onboarding flow that boosted user completion rates by over 30%.',
            'How do you balance business constraints and developer feasibility with user-centered accessibility standards?',
          ],
        },
        weightings: { technical: 0.3, problemSolving: 0.3, domainKnowledge: 0.2, communication: 0.15, professionalism: 0.05 },
      },
    ],
  },
  {
    name: 'BPO',
    description: 'Call center quality assurance, customer support operations, voice/non-voice, and workforce management.',
    iconName: 'Headphones',
    roles: [
      {
        id: 'bpo-qa',
        name: 'Quality Analyst',
        domain: 'BPO',
        description: 'Call monitoring, QA scorecards, calibration, CSAT, FCR, AHT analysis, RCA, and agent feedback.',
        keySkills: ['Call Monitoring', 'Calibration', 'RCA & Pareto Charts', 'CSAT & NPS', 'AHT Optimization', 'FCR Tracking'],
        sampleQuestions: {
          fresher: [
            'What is Quality Assurance (QA) in a BPO environment and why is it critical?',
            'What parameters do you look for while auditing a customer support interaction?',
            'What is AHT (Average Handling Time) and how does it relate to customer satisfaction?',
            'What is FCR (First Contact Resolution) and how do you verify if an issue was resolved on the first contact?',
            'What is CSAT (Customer Satisfaction Score) and how is it measured?',
          ],
          experienced: [
            'How do you conduct Root Cause Analysis (RCA) and use Pareto Charts to identify repeated quality failures?',
            'What is call calibration, and how do you resolve a calibration variance between QA teams and operations leadership?',
            'How would you handle an agent who aggressively disagrees with a fatal error deduction on their scorecard?',
            'Describe a situation where you identified a systemic process flaw through call auditing and helped operations reduce repeat calls by 20%.',
            'What CRM and quality audit tools (Verint, NICE, Salesforce, Zendesk) have you configured scorecards in?',
          ],
        },
        weightings: { communication: 0.35, domainKnowledge: 0.3, problemSolving: 0.2, professionalism: 0.15, technical: 0.0 },
      },
      {
        id: 'bpo-csr',
        name: 'Customer Support Executive',
        domain: 'BPO',
        description: 'Inbound/outbound call handling, dispute de-escalation, empathy, CRM tickets, and CSAT.',
        keySkills: ['Active Listening', 'De-escalation', 'CRM Ticketing', 'Empathy', 'Communication'],
        sampleQuestions: {
          fresher: [
            'How do you greet a customer and build immediate rapport?',
            'How would you handle an angry customer shouting about an undelivered urgent package?',
            'What does empathy mean to you in customer service, and how is it different from sympathy?',
            'How do you manage hold time without making the customer feel neglected?',
          ],
          experienced: [
            'Describe a challenging escalation you turned from a cancellation into a loyal advocate.',
            'How do you balance strict AHT targets with providing thorough, high-CSAT resolutions?',
          ],
        },
        weightings: { communication: 0.45, problemSolving: 0.25, professionalism: 0.2, domainKnowledge: 0.1, technical: 0.0 },
      },
      {
        id: 'bpo-team-leader',
        name: 'Team Leader',
        domain: 'BPO',
        description: 'Floor management, shrink & attrition management, agent coaching, KPI achievement, and escalations.',
        keySkills: ['Floor Management', 'KPI Monitoring', 'Attrition Control', 'Performance Coaching'],
        sampleQuestions: {
          fresher: [
            'What are the core daily responsibilities of a Team Leader in a contact center?',
            'How do you track team shrinkage and schedule adherence?',
          ],
          experienced: [
            'How do you coach a bottom-quartile agent who is struggling with low CSAT and high AHT?',
            'How do you handle unexpected absenteeism during peak campaign call volume?',
          ],
        },
        weightings: { communication: 0.3, problemSolving: 0.3, domainKnowledge: 0.25, professionalism: 0.15, technical: 0.0 },
      },
    ],
  },
  {
    name: 'Digital Marketing',
    description: 'Search engine optimization (SEO), performance marketing, social media, PPC, and content strategy.',
    iconName: 'TrendingUp',
    roles: [
      {
        id: 'dm-seo-exec',
        name: 'SEO Executive',
        domain: 'Digital Marketing',
        description: 'Technical SEO, keyword research, on-page optimization, backlink building, Google Search Console, Core Web Vitals.',
        keySkills: ['Technical SEO', 'Keyword Research', 'On-Page Optimization', 'Google Search Console', 'Core Web Vitals', 'Link Building'],
        sampleQuestions: {
          fresher: [
            'What is the difference between On-Page SEO and Off-Page SEO?',
            'What is Technical SEO and why are robots.txt and sitemap.xml essential?',
            'How do you perform keyword research and assess search intent (Informational, Navigational, Transactional)?',
            'What are canonical tags and how do they prevent duplicate content penalties?',
            'What are Google Core Web Vitals (LCP, INP, CLS) and how do they influence rankings?',
          ],
          experienced: [
            'How do you diagnose and recover organic traffic following a major Google Helpful Content / Core Algorithm update?',
            'Explain how you optimize large eCommerce websites (100k+ pages) with faceted navigation without wasting crawl budget.',
            'What is your step-by-step strategy for building high-authority editorial backlinks without violating Google Spam policies?',
            'How do you optimize a page for Google SGE / AI Overviews and answer engine optimization (AEO)?',
          ],
        },
        weightings: { domainKnowledge: 0.4, problemSolving: 0.3, technical: 0.15, communication: 0.1, professionalism: 0.05 },
      },
      {
        id: 'dm-ppc-exec',
        name: 'PPC / Performance Marketing Executive',
        domain: 'Digital Marketing',
        description: 'Google Search & Display Ads, Meta Ads Manager, ROAS optimization, bid strategies, and conversion tracking.',
        keySkills: ['Google Ads', 'Meta Ads Manager', 'ROAS Optimization', 'A/B Testing', 'Conversion Tracking (GA4/GTM)'],
        sampleQuestions: {
          fresher: [
            'What is Quality Score in Google Ads and what three factors determine it?',
            'Explain the difference between CPC, CPM, CPA, and ROAS.',
            'How do you set up conversion tracking using Google Tag Manager and GA4?',
          ],
          experienced: [
            'How do you scale a Meta Ads campaign from $1,000/day to $10,000/day while keeping CPA within target limits?',
            'Explain the transition to Advantage+ shopping campaigns and automated Smart Bidding strategies in Google Ads.',
          ],
        },
        weightings: { domainKnowledge: 0.35, problemSolving: 0.35, technical: 0.15, communication: 0.1, professionalism: 0.05 },
      },
      {
        id: 'dm-social-media',
        name: 'Social Media Manager',
        domain: 'Digital Marketing',
        description: 'Organic social strategy, content calendars, community management, viral formats (Reels/Shorts), and influencer campaigns.',
        keySkills: ['Social Media Strategy', 'Instagram Reels & TikTok', 'LinkedIn Organic', 'Community Management', 'Analytics'],
        sampleQuestions: {
          fresher: [
            'How do you tailor content differently for LinkedIn versus Instagram versus Twitter/X?',
            'What metrics matter most for measuring social media engagement beyond vanity follower counts?',
          ],
          experienced: [
            'Describe a viral social campaign you conceptualized and executed that drove measurable product signups.',
            'How do you manage online public relations crises and negative brand commentary on Twitter/X?',
          ],
        },
        weightings: { communication: 0.4, domainKnowledge: 0.3, problemSolving: 0.2, professionalism: 0.1, technical: 0.0 },
      },
    ],
  },
  {
    name: 'HR',
    description: 'Human resources management, technical recruiting, payroll, compliance, and employee relations.',
    iconName: 'Users',
    roles: [
      {
        id: 'hr-recruiter',
        name: 'Technical Recruiter',
        domain: 'HR',
        description: 'Sourcing, screening, technical qualification, ATS management, pipeline building, and offer negotiation.',
        keySkills: ['Technical Sourcing', 'Boolean Search', 'ATS (Greenhouse/Lever)', 'Candidate Screening', 'Salary Negotiation'],
        sampleQuestions: {
          fresher: [
            'How do you source passive tech candidates using Boolean search operators on LinkedIn?',
            'What questions do you ask during a 15-minute initial candidate screening call?',
            'How do you verify whether a candidate possesses genuine hands-on experience versus theoretical knowledge?',
          ],
          experienced: [
            'How do you manage hiring manager expectations when salary budgets are below current market rates for niche roles?',
            'What metrics do you track to reduce Time-to-Hire and improve Offer Acceptance Rate (OAR)?',
          ],
        },
        weightings: { communication: 0.4, domainKnowledge: 0.3, problemSolving: 0.2, professionalism: 0.1, technical: 0.0 },
      },
      {
        id: 'hr-generalist',
        name: 'HR Generalist',
        domain: 'HR',
        description: 'Onboarding, employee engagement, POSH compliance, grievance resolution, and performance management.',
        keySkills: ['Statutory Compliance', 'Employee Engagement', 'Grievance Handling', 'Performance Appraisals'],
        sampleQuestions: {
          fresher: [
            'What are the mandatory statutory compliance requirements for private companies in India (PF, ESI, Gratuity)?',
            'How do you structure an effective employee onboarding program?',
          ],
          experienced: [
            'How do you investigate and handle a sensitive POSH (Prevention of Sexual Harassment) complaint with strict confidentiality?',
            'What strategies do you deploy to combat voluntary employee attrition in fast-growing teams?',
          ],
        },
        weightings: { communication: 0.35, domainKnowledge: 0.3, problemSolving: 0.2, professionalism: 0.15, technical: 0.0 },
      },
    ],
  },
  {
    name: 'Sales',
    description: 'Lead generation, business development, B2B SaaS sales, enterprise deals, pipeline management, and closing.',
    iconName: 'Target',
    roles: [
      {
        id: 'sales-bde',
        name: 'Business Development Executive (BDE)',
        domain: 'Sales',
        description: 'Cold outreach, discovery calls, objection handling, CRM updates (HubSpot/Salesforce), and quota achievement.',
        keySkills: ['Cold Calling & Emailing', 'Discovery Calls', 'Objection Handling', 'B2B Sales Funnels', 'HubSpot/Salesforce'],
        sampleQuestions: {
          fresher: [
            'How do you open a cold call to grab a prospect’s attention within the first 10 seconds?',
            'What is the BANT framework (Budget, Authority, Need, Timeline) and how do you qualify leads?',
            'How do you handle the common objection: "Your price is too high"?',
          ],
          experienced: [
            'Describe how you navigated a multi-stakeholder enterprise sales cycle where the champion supported you but the CFO hesitated.',
            'What is your proven framework for consistently hitting 120%+ of quarterly quota?',
          ],
        },
        weightings: { communication: 0.45, problemSolving: 0.3, domainKnowledge: 0.15, professionalism: 0.1, technical: 0.0 },
      },
      {
        id: 'sales-manager',
        name: 'Sales Manager',
        domain: 'Sales',
        description: 'Sales team leadership, quota forecasting, pipeline management, territory planning, and high-stakes negotiation.',
        keySkills: ['Sales Forecasting', 'Pipeline Review', 'Team Leadership', 'Deal Closing'],
        sampleQuestions: {
          fresher: [
            'How do you forecast monthly sales revenue accurately based on pipeline stage probabilities?',
          ],
          experienced: [
            'How do you turn around an underperforming sales rep while maintaining team morale and high velocity?',
            'Explain your methodology for designing competitive sales commission and incentive structures.',
          ],
        },
        weightings: { communication: 0.35, problemSolving: 0.35, domainKnowledge: 0.2, professionalism: 0.1, technical: 0.0 },
      },
    ],
  },
  {
    name: 'Finance',
    description: 'Corporate accounting, financial modeling, tax compliance (GST/TDS), audit, and financial statement analysis.',
    iconName: 'DollarSign',
    roles: [
      {
        id: 'fin-analyst',
        name: 'Financial Analyst',
        domain: 'Finance',
        description: 'Financial modeling, DCF valuations, variance analysis, budgeting, and investor presentations.',
        keySkills: ['Financial Modeling', 'DCF & Multiples', 'Variance Analysis', 'Excel VBA', 'P&L Analysis'],
        sampleQuestions: {
          fresher: [
            'Walk me through the three financial statements (P&L, Balance Sheet, Cash Flow) and how they link together.',
            'If Depreciation increases by $10, how does that affect the three financial statements?',
            'What is Working Capital and why can a company be profitable yet go bankrupt?',
          ],
          experienced: [
            'How do you build a 3-statement financial model with dynamic debt schedules and scenario analysis?',
            'Explain how you calculate Weighted Average Cost of Capital (WACC) and Discounted Cash Flow (DCF).',
          ],
        },
        weightings: { technical: 0.45, problemSolving: 0.3, domainKnowledge: 0.15, communication: 0.05, professionalism: 0.05 },
      },
      {
        id: 'fin-accountant',
        name: 'Accountant',
        domain: 'Finance',
        description: 'General ledger, reconciliations, GST filings, TDS, audit support, and month-end close.',
        keySkills: ['Tally / QuickBooks', 'GST & TDS Compliance', 'Bank Reconciliation', 'Ledger Accounting'],
        sampleQuestions: {
          fresher: [
            'What are the golden rules of accounting with examples for Real, Personal, and Nominal accounts?',
            'How do you prepare a Bank Reconciliation Statement (BRS)?',
            'Explain the difference between Accrual Accounting and Cash Accounting.',
          ],
          experienced: [
            'How do you handle Input Tax Credit (ITC) reconciliations under GST regulations with vendor discrepancies?',
            'Describe how you streamline month-end financial closure from 15 days down to 4 days.',
          ],
        },
        weightings: { technical: 0.45, domainKnowledge: 0.3, problemSolving: 0.15, communication: 0.05, professionalism: 0.05 },
      },
    ],
  },
  {
    name: 'Management',
    description: 'Product management, agile project management, sprint planning, cross-functional leadership, and business strategy.',
    iconName: 'Briefcase',
    roles: [
      {
        id: 'mgmt-product-mgr',
        name: 'Product Manager',
        domain: 'Management',
        description: 'Product roadmap, user story writing, PRDs, metric tracking (AARRR), prioritization frameworks (RICE), and discovery.',
        keySkills: ['PRD Writing', 'RICE Framework', 'A/B Testing', 'User Discovery', 'Agile / Scrum', 'Metrics & OKRs'],
        sampleQuestions: {
          fresher: [
            'What is the difference between a Product Manager and a Project Manager?',
            'How do you prioritize features using the RICE (Reach, Impact, Confidence, Effort) framework?',
            'What metrics would you track to measure the success of an edtech mobile app onboarding experience?',
          ],
          experienced: [
            'How do you handle a disagreement between senior engineering leadership claiming a feature is unfeasible and executives demanding it for a client contract?',
            'Describe how you took a product from 0 to 1, including product-market fit discovery, customer interviews, and iteration.',
          ],
        },
        weightings: { problemSolving: 0.35, communication: 0.3, domainKnowledge: 0.2, professionalism: 0.1, technical: 0.05 },
      },
      {
        id: 'mgmt-business-analyst',
        name: 'Business Analyst',
        domain: 'Management',
        description: 'Requirements gathering, BRDs/FRDs, process modeling (BPMN), gap analysis, and stakeholder alignment.',
        keySkills: ['BRD/FRD Documentation', 'BPMN & Flowcharts', 'Gap Analysis', 'SQL & Wireframing'],
        sampleQuestions: {
          fresher: [
            'What is the difference between Functional Requirements and Non-Functional Requirements?',
            'What is a Use Case diagram and how do you document user stories?',
          ],
          experienced: [
            'How do you elicit requirements from non-technical stakeholders who do not know what they actually need?',
            'Walk me through a complex business process re-engineering project you led that eliminated manual bottlenecks.',
          ],
        },
        weightings: { problemSolving: 0.35, communication: 0.3, domainKnowledge: 0.2, professionalism: 0.1, technical: 0.05 },
      },
    ],
  },
];

export function getDomainConfig(domain: InterviewDomain): DomainConfig | undefined {
  return INTERVIEW_DOMAINS_CONFIG.find((d) => d.name === domain);
}

export function getRoleConfig(roleId: string): RoleConfig | undefined {
  for (const dom of INTERVIEW_DOMAINS_CONFIG) {
    const found = dom.roles.find((r) => r.id === roleId);
    if (found) return found;
  }
  return undefined;
}
