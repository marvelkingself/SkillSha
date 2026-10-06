export interface AtsCheckResult {
  score: number; // 0 - 100
  rating: 'Poor' | 'Average' | 'Good' | 'Excellent';
  summary: string;
  categoryScores: {
    sections: number; // 0-25
    impactAndMetrics: number; // 0-25
    actionVerbs: number; // 0-20
    formattingReadability: number; // 0-15
    contactCompleteness: number; // 0-15
  };
  detectedSections: {
    name: string;
    found: boolean;
    status: 'pass' | 'fail' | 'warning';
    recommendation?: string;
  }[];
  actionVerbsFound: string[];
  weakWordsFound: string[];
  quantifiedMetricsCount: number;
  wordCount: number;
  criticalIssues: string[];
  warnings: string[];
  passedChecks: string[];
  extractedSkills: string[];
}

export interface ResumeJdMatchResult {
  matchPercentage: number;
  readinessLabel: string;
  matchedSkills: string[];
  missingSkills: string[];
  keywordGaps: {
    keyword: string;
    frequencyInJd: number;
    importance: 'High' | 'Medium';
    contextTip: string;
  }[];
  experienceMatch: {
    jdRequiredYears?: number;
    resumeYearsFound?: number;
    meetsRequirement: boolean;
    explanation: string;
  };
  recommendations: string[];
}

// Strong ATS Action Verbs dictionary
export const STRONG_ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'analyzed', 'architected', 'automated',
  'budgeted', 'built', 'championed', 'coached', 'collaborated', 'configured', 'consolidated',
  'created', 'decreased', 'delivered', 'deployed', 'designed', 'developed', 'devised',
  'diagnosed', 'directed', 'documented', 'eliminated', 'engineered', 'enhanced', 'established',
  'exceeded', 'executed', 'expanded', 'expedited', 'formulated', 'generated', 'governed',
  'guided', 'headed', 'identified', 'implemented', 'improved', 'increased', 'initiated',
  'innovated', 'inspected', 'integrated', 'introduced', 'invented', 'launched', 'led',
  'leveraged', 'managed', 'maximized', 'mentored', 'migrated', 'minimized', 'modernized',
  'negotiated', 'optimized', 'orchestrated', 'overhauled', 'oversaw', 'pioneered', 'planned',
  'programmed', 'reduced', 'refactored', 'resolved', 'restructured', 'revamped', 'scaled',
  'spearheaded', 'standardized', 'streamlined', 'strengthened', 'structured', 'surpassed',
  'transformed', 'troubleshot', 'unified', 'upgraded', 'validated', 'yielded',
];

// Passive / Overused filler phrases that lower ATS and recruiter appeal
export const WEAK_PASSIVE_WORDS = [
  'responsible for', 'duties included', 'helped with', 'assisted in', 'worked on',
  'part of a team that', 'handled', 'did', 'tried to', 'various tasks',
  'hardworking', 'go-getter', 'detail-oriented', 'team player', 'synergy', 'think outside the box',
];

// Universal Core Skills for scanning
export const SKILL_LEXICON = [
  // IT / Software
  'javascript', 'typescript', 'react', 'next.js', 'node.js', 'python', 'java', 'c++', 'c#',
  'html', 'css', 'tailwind', 'redux', 'sql', 'postgresql', 'mongodb', 'mysql', 'nosql',
  'redis', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'git', 'github', 'rest api',
  'graphql', 'microservices', 'linux', 'unit testing', 'jest', 'cypress', 'system design',
  // Data
  'data analysis', 'pandas', 'numpy', 'scikit-learn', 'power bi', 'tableau', 'excel',
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'etl', 'data warehousing',
  // Marketing & Sales
  'seo', 'sem', 'google ads', 'meta ads', 'content marketing', 'email marketing', 'crm',
  'salesforce', 'hubspot', 'copywriting', 'conversion rate optimization', 'cro', 'google analytics',
  'lead generation', 'cold calling', 'b2b sales', 'account management', 'negotiation',
  // Management & Soft Skills
  'agile', 'scrum', 'jira', 'project management', 'product management', 'cross-functional leadership',
  'stakeholder management', 'problem solving', 'communication', 'conflict resolution',
];

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function testSkillMatch(text: string, skill: string): boolean {
  if (!text || !skill) return false;
  const escaped = escapeRegex(skill.trim());
  const regex = new RegExp(`(?:^|[^a-zA-Z0-9#+])${escaped}(?=[^a-zA-Z0-9#+]|$)`, 'i');
  return regex.test(text);
}

export function countSkillMatches(text: string, skill: string): number {
  if (!text || !skill) return 0;
  const escaped = escapeRegex(skill.trim());
  const regex = new RegExp(`(?:^|[^a-zA-Z0-9#+])${escaped}(?=[^a-zA-Z0-9#+]|$)`, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Scan a resume text and generate complete ATS audit metrics
 */
export function analyzeResumeAts(resumeText: string): AtsCheckResult {
  const text = resumeText || '';
  const lowerText = text.toLowerCase();
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = words.length;

  // 1. Check Standard Resume Sections
  const sectionsToCheck = [
    {
      name: 'Contact Information',
      patterns: [/email|@|\.com|\.in/i, /\+?\d{10,13}|\(\d{3}\)/i],
      recommendation: 'Include your professional email, direct phone number, city, and LinkedIn profile URL at the very top.',
    },
    {
      name: 'Professional Summary / About',
      patterns: [/summary|professional summary|about me|profile|executive summary/i],
      recommendation: 'Add a 3–4 line punchy Professional Summary highlighting your title, key achievements, and primary skillset.',
    },
    {
      name: 'Work Experience / Employment',
      patterns: [/experience|work history|employment|professional experience|internship/i],
      recommendation: 'Clearly detail past roles with company name, job designation, dates (MM/YYYY), and quantifiable bullet points.',
    },
    {
      name: 'Skills & Proficiencies',
      patterns: [/skills|technical skills|technologies|core competencies|proficiencies/i],
      recommendation: 'Create a dedicated "Skills" section categorized by tools, languages, and frameworks for clean ATS parsing.',
    },
    {
      name: 'Education',
      patterns: [/education|academic|bachelor|master|b\.tech|bca|mca|bba|degree|university|college/i],
      recommendation: 'List degree name, university/institution, graduation year, and GPA/Percentage.',
    },
    {
      name: 'Projects (Optional for Freshers)',
      patterns: [/projects|academic projects|key projects|portfolio/i],
      recommendation: 'Highlight 2–3 capstone projects with live links, tech stack utilized, and the user problem solved.',
    },
  ];

  let detectedSectionsCount = 0;
  const detectedSections = sectionsToCheck.map((sec) => {
    const found = sec.patterns.some((p) => p.test(text));
    if (found) detectedSectionsCount++;
    return {
      name: sec.name,
      found,
      status: (found ? 'pass' : 'fail') as 'pass' | 'fail',
      recommendation: found ? undefined : sec.recommendation,
    };
  });

  // 2. Action Verbs Detection
  const actionVerbsFound: string[] = [];
  STRONG_ACTION_VERBS.forEach((verb) => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(lowerText) && !actionVerbsFound.includes(verb)) {
      actionVerbsFound.push(verb);
    }
  });

  // 3. Weak / Passive Phrases Detection
  const weakWordsFound: string[] = [];
  WEAK_PASSIVE_WORDS.forEach((weak) => {
    if (lowerText.includes(weak) && !weakWordsFound.includes(weak)) {
      weakWordsFound.push(weak);
    }
  });

  // 4. Quantified Metrics (Numbers, %, $, ₹, Xx, metrics)
  const metricMatches = text.match(/\b\d+(\.\d+)?%|\$\d+[\d,]*|₹\d+[\d,]*|\b\d+x\b|\b\d{2,}\b/g) || [];
  const quantifiedMetricsCount = metricMatches.length;

  // 5. Contact Completeness Checks
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}|\d{10}/.test(text);
  const hasLinkedIn = /linkedin\.com\/in\/|linkedin/i.test(text);
  const hasPortfolioOrGithub = /github\.com|portfolio|\.dev|\.io|behance/i.test(text);

  // 6. Extracted Skills
  const extractedSkills: string[] = [];
  SKILL_LEXICON.forEach((skill) => {
    if (testSkillMatch(lowerText, skill) && !extractedSkills.includes(skill)) {
      extractedSkills.push(skill);
    }
  });

  // Compute Category Scores
  // Category 1: Sections (Max 25)
  const sectionsScore = Math.min(25, Math.round((detectedSectionsCount / sectionsToCheck.length) * 25));

  // Category 2: Impact & Metrics (Max 25)
  let impactScore = 5;
  if (quantifiedMetricsCount >= 6) impactScore = 25;
  else if (quantifiedMetricsCount >= 4) impactScore = 20;
  else if (quantifiedMetricsCount >= 2) impactScore = 15;
  else if (quantifiedMetricsCount >= 1) impactScore = 10;

  // Category 3: Action Verbs (Max 20)
  let actionScore = 5;
  if (actionVerbsFound.length >= 8) actionScore = 20;
  else if (actionVerbsFound.length >= 5) actionScore = 16;
  else if (actionVerbsFound.length >= 3) actionScore = 12;
  else if (actionVerbsFound.length >= 1) actionScore = 8;
  // Deduct for excessive weak words
  actionScore = Math.max(2, actionScore - Math.min(6, weakWordsFound.length * 2));

  // Category 4: Formatting & Readability (Max 15)
  let formattingScore = 15;
  if (wordCount < 150) formattingScore = 4;
  else if (wordCount < 300) formattingScore = 9;
  else if (wordCount > 1200) formattingScore = 10; // too long for ATS single/double page

  // Category 5: Contact Info (Max 15)
  let contactScore = 0;
  if (hasEmail) contactScore += 5;
  if (hasPhone) contactScore += 5;
  if (hasLinkedIn) contactScore += 3;
  if (hasPortfolioOrGithub) contactScore += 2;

  const totalScore = Math.min(100, Math.max(10, sectionsScore + impactScore + actionScore + formattingScore + contactScore));

  const criticalIssues: string[] = [];
  const warnings: string[] = [];
  const passedChecks: string[] = [];

  // Issues & Passes logic
  if (!hasEmail) criticalIssues.push('Missing Email Address in contact details.');
  else passedChecks.push('Valid professional email address detected.');

  if (!hasPhone) criticalIssues.push('Missing Contact Phone Number.');
  else passedChecks.push('Direct contact number detected.');

  if (wordCount < 250) {
    criticalIssues.push(`Resume is very short (${wordCount} words). ATS systems require at least 350–800 words to evaluate role competency.`);
  } else if (wordCount > 1100) {
    warnings.push(`Resume word count is slightly high (${wordCount} words). Try to keep it under 800–900 words for optimal 1–2 page readability.`);
  } else {
    passedChecks.push(`Ideal resume length (${wordCount} words) for ATS parsing.`);
  }

  if (quantifiedMetricsCount < 2) {
    criticalIssues.push('Lack of quantified results. Add metrics like % increased, $ saved, hours automated, or team size managed.');
  } else {
    passedChecks.push(`Strong quantifiable achievements detected (${quantifiedMetricsCount} metrics identified).`);
  }

  if (actionVerbsFound.length < 3) {
    warnings.push('Few strong action verbs found. Replace generic duties with powerful verbs like "Architected", "Spearheaded", "Optimized".');
  } else {
    passedChecks.push(`Rich use of strong industry action verbs (${actionVerbsFound.length} verbs found).`);
  }

  if (weakWordsFound.length > 0) {
    warnings.push(`Detected passive phrases (${weakWordsFound.slice(0, 3).join(', ')}). Replace with direct active verbs.`);
  }

  if (!hasLinkedIn) {
    warnings.push('No LinkedIn profile URL detected. 92% of recruiters verify candidate LinkedIn profiles before shortlisting.');
  } else {
    passedChecks.push('LinkedIn profile link detected.');
  }

  detectedSections.forEach((s) => {
    if (!s.found && s.name !== 'Projects (Optional for Freshers)') {
      criticalIssues.push(`Missing mandatory section: "${s.name}".`);
    } else if (s.found) {
      passedChecks.push(`Found section: ${s.name}`);
    }
  });

  const rating: 'Poor' | 'Average' | 'Good' | 'Excellent' =
    totalScore >= 85 ? 'Excellent' : totalScore >= 70 ? 'Good' : totalScore >= 50 ? 'Average' : 'Poor';

  const summary =
    rating === 'Excellent'
      ? 'Your resume demonstrates high ATS compliance with clear section architecture, rich action verbs, and quantifiable impact.'
      : rating === 'Good'
      ? 'Solid foundation! Addressing a few keyword gaps and quantified metrics will elevate this resume into the top 5% of applicants.'
      : rating === 'Average'
      ? 'Your resume has foundational content but lacks quantifiable results and key structural sections that modern ATS scanners expect.'
      : 'Critical ATS hurdles detected. Review missing sections, contact info, and action verbs to pass automated screening filters.';

  return {
    score: totalScore,
    rating,
    summary,
    categoryScores: {
      sections: sectionsScore,
      impactAndMetrics: impactScore,
      actionVerbs: actionScore,
      formattingReadability: formattingScore,
      contactCompleteness: contactScore,
    },
    detectedSections,
    actionVerbsFound,
    weakWordsFound,
    quantifiedMetricsCount,
    wordCount,
    criticalIssues,
    warnings,
    passedChecks,
    extractedSkills,
  };
}

/**
 * Compare Resume against Job Description
 */
export function matchResumeWithJd(resumeText: string, jdText: string): ResumeJdMatchResult {
  const resumeLower = (resumeText || '').toLowerCase();
  const jdLower = (jdText || '').toLowerCase();

  // Extract skills mentioned in JD
  const jdSkills: string[] = [];
  SKILL_LEXICON.forEach((skill) => {
    if (testSkillMatch(jdLower, skill) && !jdSkills.includes(skill)) {
      jdSkills.push(skill);
    }
  });

  // Find matches and misses
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  jdSkills.forEach((skill) => {
    if (testSkillMatch(resumeLower, skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // Calculate Match %
  const totalRelevantSkills = Math.max(1, jdSkills.length);
  const matchPercentage = Math.min(
    98,
    Math.max(15, Math.round((matchedSkills.length / totalRelevantSkills) * 100))
  );

  // Keyword gaps with contextual recommendations
  const keywordGaps = missingSkills.slice(0, 8).map((skill, index) => {
    const occurrences = countSkillMatches(jdLower, skill);
    return {
      keyword: skill.toUpperCase(),
      frequencyInJd: occurrences || 1,
      importance: (index < 3 ? 'High' : 'Medium') as 'High' | 'Medium',
      contextTip: `Mention "${skill}" in your Skills section or within your bullet points where you used this tool.`,
    };
  });

  // Experience match heuristic
  const jdExpMatch = jdLower.match(/(\d+)\+?\s*(?:to\s*(\d+))?\s*(?:years?|yrs?)/i);
  const reqYears = jdExpMatch ? parseInt(jdExpMatch[1], 10) : undefined;

  const resumeExpMatch = resumeLower.match(/(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?experience/i);
  const resumeYears = resumeExpMatch ? parseInt(resumeExpMatch[1], 10) : undefined;

  let meetsRequirement = true;
  let explanation = 'Experience alignment could not be determined automatically from text.';
  if (reqYears !== undefined && resumeYears !== undefined) {
    meetsRequirement = resumeYears >= reqYears;
    explanation = meetsRequirement
      ? `Candidate has ~${resumeYears} years vs JD requirement of ${reqYears}+ years.`
      : `JD asks for ${reqYears}+ years, but resume mentions ${resumeYears} years. Emphasize project depth to compensate.`;
  } else if (reqYears !== undefined) {
    explanation = `Job posting requests ${reqYears}+ years of experience. Ensure your timeline clearly reflects this.`;
  }

  const readinessLabel =
    matchPercentage >= 80
      ? 'Strong Match — High Probability of Interview Callback'
      : matchPercentage >= 60
      ? 'Moderate Match — Good fit with a few target keyword additions'
      : 'Low Match — Significant keyword gaps against JD requirements';

  const recommendations: string[] = [];
  if (missingSkills.length > 0) {
    recommendations.push(
      `Incorporate missing high-frequency keywords: ${missingSkills.slice(0, 4).join(', ')} into your Skills and Experience bullet points.`
    );
  }
  recommendations.push(
    'Mirror the job posting terminology directly (e.g. if JD says "RESTful APIs", use "RESTful APIs" rather than just "API").'
  );
  recommendations.push(
    'Align your resume Professional Summary with the exact job designation requested in the opening.'
  );

  return {
    matchPercentage,
    readinessLabel,
    matchedSkills,
    missingSkills,
    keywordGaps,
    experienceMatch: {
      jdRequiredYears: reqYears,
      resumeYearsFound: resumeYears,
      meetsRequirement,
      explanation,
    },
    recommendations,
  };
}
