export interface CityAnalyticsData {
  city: string;
  state: string;
  slug: string;
  urlSlug: string;
  deliveryMode: string;
  isNoidaCentre: boolean;
  heroParagraphB: string;
  quickFactsMode: string;
  careersText: string;
  industriesBullets: string[];
  howAttendText: string;
  q5Answer: string;
}

export const DATA_ANALYTICS_CITIES: Record<string, CityAnalyticsData> = {
  noida: {
    city: 'Noida',
    state: 'Uttar Pradesh',
    slug: 'noida',
    urlSlug: '/course/data-analytics-course-in-noida-with-gen-ai',
    deliveryMode: "Live online batches and direct access to Skillsha's national centre in Noida.",
    isNoidaCentre: true,
    heroParagraphB:
      "Located in Noida near Sector 62, Sector 135, and Expressway tech hubs, this program serves local students and professionals. Learners attend live interactive batches while accessing direct support at Skillsha's Noida centre.",
    quickFactsMode:
      "Live online batches and direct access to Skillsha's national centre in Noida",
    careersText:
      'Noida has developed into a major commercial and technological engine within the National Capital Region. With a substantial graduate population coming from Gautam Buddha Nagar and Greater Noida, common routes into data analytics include engineering graduates, commerce and management professionals, alongside working executives from sales, operations, and finance. Key corporate hiring takes place across major commercial districts including Sector 62, Sector 125-127 along the Noida-Greater Noida Expressway, Sector 135, and Advant Navis Business Park. Together with prominent media networks in Film City Sector 16A and commercial establishments near Sector 16 and 18, Noida offers diverse analytics careers across IT services, telecom, financial technology, and digital commerce.',
    industriesBullets: [
      'Information Technology & Cloud Services: Technology firms in Sector 62 and Sector 135 analyze infrastructure usage and software operational metrics.',
      'Banking, Fintech & Insurance: Financial institutions along the Expressway corridor evaluate consumer credit metrics, loan risk, and portfolio performance.',
      'Media & Digital Entertainment: Broadcasting networks and publishing firms in Sector 16A analyze viewership trends, digital engagement, and content metrics.',
      'E-Commerce & Retail Supply Chain: Digital commerce enterprises optimize warehouse logistics, delivery timelines, and product merchandising based on transactional data.',
      'Consulting & Professional Services: Corporate advisory agencies in commercial sectors prepare strategic business intelligence reports for multinational enterprise clients.',
    ],
    howAttendText:
      "Learners residing in Noida have the unique advantage of direct proximity to Skillsha's national learning centre at D-34, Sector 2, near Noida Sector 15 and 16 Metro Stations. Students participate in live interactive online batches during evenings and weekends while enjoying the option to visit our physical facility for direct mentor reviews, technical doubt clearing, and dedicated career guidance sessions throughout their training program.",
    q5Answer:
      'Yes, Skillsha operates its sole national learning centre in Noida, Uttar Pradesh. The centre is situated at D-34, Sector - 2, Noida - 201301, near Noida Sector 16 and 15 Metro Station. Learners can visit the facility for in-person mentor discussions, portfolio evaluations, and admissions consultations.',
  },
  pune: {
    city: 'Pune',
    state: 'Maharashtra',
    slug: 'pune',
    urlSlug: '/course/data-analytics-course-in-pune-with-gen-ai',
    deliveryMode:
      'Live online batches for learners in Pune. Skillsha has NO centre in Pune. The only centre is in Noida.',
    isNoidaCentre: false,
    heroParagraphB:
      'Designed for learners in Pune, an education hub near Hinjewadi, Kharadi, and Magarpatta City, this program runs via live online batches. Practical evening and weekend sessions fit busy schedules while Skillsha operates its centre in Noida.',
    quickFactsMode:
      'Live online batches for learners in Pune (Skillsha has NO centre in Pune; only centre is in Noida)',
    careersText:
      'Pune has evolved into a prominent employment center where data-informed decision-making drives organizational growth. As a major education hub with a massive student and early-career population, common routes into analytics include engineering graduates, commerce and BBA graduates, alongside working professionals from operations, finance, and marketing. Key employers operate across major technology clusters including Hinjewadi (Rajiv Gandhi Infotech Park), Kharadi, and Magarpatta City. Simultaneously, the region maintains a powerful automotive and engineering manufacturing base spanning the Pimpri-Chinchwad and Chakan belt. Combined with active BFSI, fintech, e-commerce, and SaaS enterprises, Pune presents continuous demand for specialists who interpret data effectively.',
    industriesBullets: [
      'Information Technology & SaaS: Enterprise software firms in Hinjewadi and Kharadi analyze product metrics and user engagement.',
      'Automotive & Manufacturing: Industrial plants in Chakan and Pimpri-Chinchwad utilize supply chain analytics to optimize factory output.',
      'Banking & Fintech: Financial services institutions evaluate transaction patterns, credit risk metrics, and customer acquisition costs.',
      'E-Commerce & Retail: Digital shopping platforms optimize product recommendations, inventory distribution logistics, and marketing spend efficiency.',
      'Operations & Logistics: Supply chain enterprises track fleet movements, delivery cycle timelines, and regional warehouse capacities.',
    ],
    howAttendText:
      'Learners living in Pune attend all Skillsha classes through interactive live online batches scheduled during evenings and weekends. Students join live video lectures, interact with trainers in real time, and access dedicated mentor support from home. Skillsha maintains its only physical training centre in Noida, Uttar Pradesh, ensuring Pune learners receive identical high-quality curriculum, hands-on project reviews, and dedicated career and placement assistance remotely without relocating.',
    q5Answer:
      'No, Skillsha has no physical centre, campus, or branch located in Pune. All classes for Pune learners are conducted through interactive live online batches. The only physical training centre operated by Skillsha is located at D-34, Sector - 2, Noida, Uttar Pradesh - 201301, near Noida Sector 16 and 15 Metro Station.',
  },
};

export const FROZEN_DATA_ANALYTICS_FACTS = {
  brand: 'Skillsha',
  courseName: 'Data Analytics with Gen AI',
  badge: '2+ Years of Excellence',
  centre:
    'D-34, Sector - 2, Noida, Uttar Pradesh - 201301, Near Noida Sector 16 and 15 Metro Station',
  phone: '+91 73030 82191',
  email: 'info@skillsha.com',
  heroStats: [
    '100+ Hiring Partners',
    '1000+ Students Trained',
    '100+ Corporate Tie-ups',
    'Cities Across India',
    'Dedicated Career & Placement Assistance',
  ],
  fee: {
    base: '₹21,500',
    gst: '18% GST (₹3,870)',
    total: '₹25,370',
    duration: '6-7 Months program duration',
    emi: 'EMI starts at ₹4,622/month for 6 months',
  },
  curriculumStats: {
    hours: '150+ Hours of Content',
    sessions: '90+ Live Sessions',
    toolsCount: '15+ Tools and Software',
  },
  placement: {
    studentsPlaced: '5,500+ students placed',
    partners: '100+ Hiring Partners',
    tieUps: '100+ Corporate Tie-ups',
  },
  trainers: {
    count: '30+ Industry Expert Trainers',
    experience: '10+ Years Corporate Training Experience',
    newBatches: '8+ New Batches starting every month',
  },
  ctaLabels: {
    advisor: 'Talk to Program Advisor',
    download: 'Download Curriculum',
    enroll: 'Enroll Now',
  },
};

export const SALARY_TABLE_ROWS = [
  { profile: 'Internship / trainee', salary: '₹10k–30k/month' },
  { profile: 'Fresher Data Analyst', salary: '₹3–6 LPA' },
  { profile: 'Fresher / Junior Data Scientist', salary: '₹4–8 LPA' },
  { profile: 'Strong fresher with good projects + skills', salary: '₹6–10 LPA' },
  { profile: '1–3 years Data Scientist', salary: '₹8–15 LPA' },
  { profile: '3–5 years', salary: '₹12–20+ LPA' },
  { profile: 'Strong experienced candidate / product company', salary: '₹20–30+ LPA' },
];

export const CURRICULUM_MODULES = [
  {
    num: 1,
    title: 'Analytics Foundations and Gen AI Basics',
    bullets: [
      'Understand core business analytics frameworks and performance measurement metrics.',
      'Explore structured data fundamentals, data formats, and database concepts.',
      'Examine generative AI models and their everyday analytical applications.',
      'Formulate effective prompt structures to interpret complex commercial scenarios.',
    ],
    outcome:
      'Learners master analytical commercial thinking and modern generative AI techniques for everyday business problem-solving.',
  },
  {
    num: 2,
    title: 'Excel and Google Sheets for Analysis',
    bullets: [
      'Apply advanced formulas including XLOOKUP, INDEX, and MATCH functions.',
      'Construct multi-dimensional pivot tables and dynamic summary reporting sheets.',
      'Implement conditional formatting rules and automated spreadsheet validation controls.',
      'Build interactive visual charts summarizing quarterly organizational revenue records.',
    ],
    outcome:
      'Students master practical spreadsheet modeling to process, organize, and present commercial datasets with precision.',
  },
  {
    num: 3,
    title: 'SQL for Data Analysis',
    bullets: [
      'Write relational database queries using MySQL and PostgreSQL databases.',
      'Combine disparate data tables using inner and outer joins.',
      'Aggregate financial information using GROUP BY and HAVING clauses.',
      'Construct complex subqueries and advanced analytical windowing ranking functions.',
    ],
    outcome:
      'Participants extract and manipulate complex enterprise data from relational database management systems with ease.',
  },
  {
    num: 4,
    title: 'Statistics and Business Mathematics',
    bullets: [
      'Compute descriptive metrics including mean, median, variance, and spread.',
      'Examine probability distributions and normal curves across business samples.',
      'Conduct hypothesis testing and evaluate statistical p-values in experiments.',
      'Analyze linear regression relationships to identify business trend trajectories.',
    ],
    outcome:
      'Learners apply rigorous statistical logic to validate business hypotheses and avoid misleading data conclusions.',
  },
  {
    num: 5,
    title: 'Python for Data Analysis (NumPy, Pandas)',
    bullets: [
      'Write clean Python syntax using variables, loops, and functions.',
      'Process multidimensional numerical arrays efficiently using NumPy vector operations.',
      'Import and manipulate tabular data frames using Pandas libraries.',
      'Filter records, transform columns, and handle structured business datasets.',
    ],
    outcome:
      'Students write reliable Python scripts to automate complex data extraction and tabular transformations efficiently.',
  },
  {
    num: 6,
    title: 'Data Cleaning and Exploratory Data Analysis',
    bullets: [
      'Detect and impute missing values across complex raw records.',
      'Identify statistical outliers using interquartile ranges and boxplots.',
      'Standardize inconsistent timestamps, text strings, and numerical category formats.',
      'Generate pairwise correlation matrix plots highlighting significant feature relationships.',
    ],
    outcome:
      'Participants convert unstructured and messy raw data into sanitized datasets ready for commercial reporting.',
  },
  {
    num: 7,
    title: 'Data Visualization with Power BI and Tableau',
    bullets: [
      'Design interactive business intelligence dashboards using modern Power BI.',
      'Formulate DAX calculations for dynamic time-intelligence sales metrics.',
      'Build informative charts and geographic distribution maps in Tableau.',
      'Configure connected storyboards communicating key performance indicators to management.',
    ],
    outcome:
      'Learners translate dry numerical figures into compelling interactive visual dashboards that drive executive decision-making.',
  },
  {
    num: 8,
    title: 'Gen AI for Analytics',
    bullets: [
      'Automate routine data transformation scripts utilizing ChatGPT and Claude.',
      'Generate SQL queries from plain natural language business questions.',
      'Synthesize executive textual summaries from complex statistical analytical findings.',
      'Integrate Gemini language models to validate analytical reporting drafts.',
    ],
    outcome:
      'Students multiply their analytical productivity by integrating generative artificial intelligence into everyday reporting routines.',
  },
  {
    num: 9,
    title: 'Introduction to Machine Learning for Analysts',
    bullets: [
      'Understand core supervised and unsupervised machine learning modeling techniques.',
      'Implement linear and logistic classification algorithms on customer records.',
      'Group user cohorts using k-means clustering unsupervised learning routines.',
      'Evaluate model performance using confusion matrices, precision, and recall.',
    ],
    outcome:
      'Participants apply predictive algorithms to anticipate commercial outcomes and segment customers into actionable groups.',
  },
  {
    num: 10,
    title: 'Capstone Projects and Career Preparation',
    bullets: [
      'Synthesize complete cross-functional analytics projects solving realistic corporate briefs.',
      'Deploy code repositories and project portfolios to public GitHub.',
      'Participate in simulated technical interviews assessing SQL and Python.',
      'Refine resumes with dedicated career and placement assistance counselors.',
    ],
    outcome:
      'Graduates possess an interview-ready professional portfolio demonstrating rigorous technical capability and end-to-end analytical problem-solving.',
  },
];

export const TOOLS_LIST = [
  'Excel',
  'Google Sheets',
  'MySQL',
  'PostgreSQL',
  'Python',
  'Pandas',
  'NumPy',
  'Matplotlib',
  'Seaborn',
  'Jupyter Notebook',
  'Power BI',
  'Tableau',
  'Looker Studio',
  'ChatGPT',
  'Claude',
  'Gemini',
  'Git and GitHub',
];

export const CAPSTONE_PROJECTS = [
  {
    title: 'Project 1: Sales and Revenue Dashboard',
    desc: 'This project analyzes multi-year retail transactions to track revenue growth, regional sales performance, and product profitability. Learners model underlying relational data, calculate complex DAX metrics, and assemble executive dashboards that enable commercial stakeholders to monitor key revenue drivers and identify underperforming business territories quickly.',
    tools: 'Excel, Power BI, DAX, and relational MySQL database queries.',
    deliverable: 'Interactive executive dashboard tracking regional revenue and product profit trends.',
    skill: 'Commercial metrics modeling, relational linking, and dynamic KPI visualization design.',
  },
  {
    title: 'Project 2: Customer Churn and Segmentation Analysis',
    desc: 'This project investigates customer attrition across subscription services to identify behavioral patterns associated with account cancellations. Students clean raw customer records with Python, run exploratory data analysis, and segment users into risk cohorts using statistical algorithms, delivering strategic retention recommendations to enterprise business executives.',
    tools: 'Python, Pandas, NumPy, Seaborn, and PostgreSQL relational database tables.',
    deliverable: 'Exploratory analysis report and cohort segmentation model evaluating retention.',
    skill: 'Data cleaning, behavioral cohort segmentation, and predictive churn modeling.',
  },
  {
    title: 'Project 3: Gen AI Analytics Assistant',
    desc: 'This project develops an intelligent analytical assistant that translates plain English business queries into accurate SQL commands and automated summary charts. Learners leverage modern large language models alongside Python to build a functional prototype that accelerates data discovery and simplifies metric reporting for non-technical managers.',
    tools: 'ChatGPT API, Claude, Python, Git, and SQLite structured storage.',
    deliverable: 'Functional chatbot converting plain language questions into SQL data summaries.',
    skill: 'Prompt engineering, automated query generation, and natural language analytics.',
  },
];

export const ROADMAP_STEPS = [
  { step: 'Step 01: Live Classes', desc: 'Attend interactive online sessions led by expert practitioners covering core concepts, syntax demonstrations, and real-world business scenarios in real time.' },
  { step: 'Step 02: Weekly Assignment', desc: 'Solidify conceptual understanding by solving practical weekly analytical problem sets reflecting authentic operational challenges commonly faced by corporate data teams.' },
  { step: 'Step 03: Mentor Support', desc: 'Resolve coding hurdles, syntax errors, and conceptual questions quickly through dedicated doubt-clearing sessions scheduled regularly alongside your core live classes.' },
  { step: 'Step 04: Real-World Project', desc: 'Apply combined database querying, Python scripting, and business intelligence reporting techniques to complex, uncleaned real-world enterprise datasets during training.' },
  { step: 'Step 05: Portfolio', desc: 'Assemble and publish your documented capstone code, interactive dashboards, and project summaries onto an impressive public GitHub profile repository website.' },
  { step: 'Step 06: Resume', desc: 'Collaborate with career advisors to craft a targeted, ATS-friendly resume highlighting technical proficiencies, project deliverables, and measurable commercial analytical results.' },
  { step: 'Step 07: Mock Interview', desc: 'Practice technical assessments, SQL live coding, and business case communication in simulated interview sessions led directly by seasoned industry mentors.' },
  { step: 'Step 08: Job Preparation', desc: 'Receive dedicated career and placement assistance connecting your verified analytical portfolio with recruitment drives across corporate partner networks and organizations.' },
];

export const EDITORIAL_VERIFICATION_TABLE = [
  { param: 'Written by', value: 'Mr. Gufran' },
  { param: 'Content re-checked and verified by', value: 'Mr. Farman' },
  { param: 'Technical verified by', value: 'Mr. Irshad Khan' },
  { param: 'Curriculum verified by', value: 'Mr. Gufran' },
  { param: 'Fee verified by', value: 'Admin Department' },
  { param: 'Placement figures', value: 'sourced from internal placement records' },
  { param: 'Review counts', value: 'verified against respective third-party platforms' },
  { param: 'Last reviewed', value: '6 October 2026' },
  { param: 'Reviewed by', value: 'Mr. Irshad Khan' },
  { param: 'Final editorial check', value: 'Mr. Irshad Khan, Technical Reviewer at Skillsha' },
];

export function getAnalyticsCityData(citySlug?: string): CityAnalyticsData {
  const normalized = (citySlug || 'noida').toLowerCase();
  if (DATA_ANALYTICS_CITIES[normalized]) {
    return DATA_ANALYTICS_CITIES[normalized];
  }

  // Format generic city while guaranteeing frozen facts & Noida centre rule
  const name = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  return {
    city: name,
    state: 'India',
    slug: normalized,
    urlSlug: `/course/data-analytics-course-in-${normalized}-with-gen-ai`,
    deliveryMode: `Live online batches for learners in ${name}. Skillsha has NO centre in ${name}. The only centre is in Noida.`,
    isNoidaCentre: false,
    heroParagraphB: `Designed for learners in ${name}, this program runs via live online batches. Practical evening and weekend sessions fit busy schedules while Skillsha operates its centre in Noida.`,
    quickFactsMode: `Live online batches for learners in ${name} (Skillsha has NO centre in ${name}; only centre is in Noida)`,
    careersText: `${name} has evolved into an active employment center where data-informed decision-making drives organizational growth. Skilled analytical professionals find diverse opportunities across technology, services, and commercial enterprises.`,
    industriesBullets: [
      `Information Technology & Software Services: Technology firms in ${name} analyze operational and platform metrics.`,
      `Banking, Finance & Fintech: Financial institutions evaluate consumer credit metrics, transaction records, and portfolio risk.`,
      `E-Commerce & Digital Retail: Commercial platforms optimize merchandise recommendations and delivery cycle logistics.`,
      `Operations & Supply Chain: Logistics firms track fleet movements and inventory capacity planning.`,
      `Consulting & Corporate Services: Advisory agencies prepare regular business intelligence summaries for clients.`,
    ],
    howAttendText: `Learners living in ${name} attend all Skillsha classes through interactive live online batches scheduled during evenings and weekends. Students join live video lectures, interact with trainers in real time, and access dedicated mentor support from home. Skillsha maintains its only physical training centre in Noida, Uttar Pradesh, ensuring ${name} learners receive identical high-quality curriculum, hands-on project reviews, and dedicated career and placement assistance remotely without relocating.`,
    q5Answer: `No, Skillsha has no physical centre, campus, or branch located in ${name}. All classes for ${name} learners are conducted through interactive live online batches. The only physical training centre operated by Skillsha is located at D-34, Sector - 2, Noida, Uttar Pradesh - 201301, near Noida Sector 16 and 15 Metro Station.`,
  };
}
