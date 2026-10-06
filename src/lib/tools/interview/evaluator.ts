import {
  CategoryScores,
  InterviewEvaluationReport,
  InterviewSetupConfig,
  PreparationDayPlan,
  QuestionFeedback,
  QuestionRecord,
} from '@/types/interview';
import { getRoleConfig } from '@/config/interview/domains';

export function generateContextualFollowUp(
  setup: InterviewSetupConfig,
  history: QuestionRecord[],
  candidateAnswer: string
): {
  nextQuestion: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  probingReason: string;
} {
  const role = getRoleConfig(setup.roleId);
  const qNum = history.length + 1;
  const isExperienced = ['2–3 Years', '3–5 Years', '5–8 Years', '8+ Years'].includes(setup.experience);
  const cleanAns = candidateAnswer.trim().toLowerCase();
  const wordCount = cleanAns.split(/\s+/).filter(Boolean).length;

  // 1. If candidate gave a very short / buzzword-only answer (< 18 words), challenge them immediately
  if (wordCount < 18 && wordCount > 0) {
    const lastQ = history[history.length - 1];
    return {
      nextQuestion: `You mentioned that briefly, but can you walk me through a specific real-world example from your experience where you implemented that and what challenges you faced?`,
      category: 'Problem Solving',
      difficulty: setup.difficulty,
      probingReason: 'Candidate gave a high-level summary; probing for depth and practical hands-on experience.',
    };
  }

  // 2. Role-specific dynamic branching
  if (setup.roleId === 'bpo-qa') {
    if (qNum === 2) {
      return {
        nextQuestion: `How do you conduct Root Cause Analysis (RCA) and use Pareto Charts to identify repeated quality failures across an entire queue?`,
        category: 'Quality Analytics',
        difficulty: setup.difficulty,
        probingReason: 'Evaluating analytical problem-solving and quality defect remediation.',
      };
    }
    if (qNum === 3) {
      return {
        nextQuestion: `What is call calibration, and how do you resolve a calibration variance between QA evaluators and operations leadership?`,
        category: 'Process Calibration',
        difficulty: setup.difficulty,
        probingReason: 'Checking stakeholder alignment and scoring objectivity.',
      };
    }
    if (qNum === 4) {
      return {
        nextQuestion: `How would you handle an agent who aggressively disagrees with a fatal error deduction on their scorecard during a feedback session?`,
        category: 'Behavioral & Coaching',
        difficulty: setup.difficulty,
        probingReason: 'Assessing conflict resolution, empathy, and coaching methodology.',
      };
    }
  }

  if (setup.roleId === 'it-nextjs-dev') {
    if (qNum === 2) {
      return {
        nextQuestion: `How do you architect data fetching and caching across Server Components and Client Components in the App Router without causing unnecessary re-fetches?`,
        category: 'Architecture',
        difficulty: isExperienced ? 'Hard' : 'Medium',
        probingReason: 'Checking Next.js Data Cache and Server Components lifecycle mastery.',
      };
    }
    if (qNum === 3) {
      return {
        nextQuestion: `How would you diagnose and resolve a severe Largest Contentful Paint (LCP) issue caused by unoptimized images and blocking database waterfalls?`,
        category: 'Performance',
        difficulty: isExperienced ? 'Hard' : 'Medium',
        probingReason: 'Evaluating Core Web Vitals optimization and production debugging.',
      };
    }
    if (qNum === 4) {
      return {
        nextQuestion: `Explain your strategy for implementing secure authentication using Edge Middleware, JWTs, and HTTP-only cookies in Next.js.`,
        category: 'Security & Auth',
        difficulty: setup.difficulty,
        probingReason: 'Verifying backend security integration and middleware execution context.',
      };
    }
  }

  if (setup.roleId === 'dm-seo-exec') {
    if (qNum === 2) {
      return {
        nextQuestion: `What are Google Core Web Vitals (LCP, INP, CLS) and how do they directly influence search rankings and user experience?`,
        category: 'Technical SEO',
        difficulty: setup.difficulty,
        probingReason: 'Assessing technical optimization and page speed impact.',
      };
    }
    if (qNum === 3) {
      return {
        nextQuestion: `How do you diagnose and recover organic traffic following a major Google Helpful Content / Core Algorithm update?`,
        category: 'Algorithm Recovery',
        difficulty: isExperienced ? 'Hard' : 'Medium',
        probingReason: 'Probing crisis troubleshooting and content audit capabilities.',
      };
    }
  }

  // 3. Fallback to role sample question list adapted to experience
  if (role) {
    const list = isExperienced ? role.sampleQuestions.experienced : role.sampleQuestions.fresher;
    const nextText = list[Math.min(qNum - 1, list.length - 1)] || list[0];
    return {
      nextQuestion: nextText,
      category: setup.type.includes('HR') ? 'HR' : 'Technical',
      difficulty: setup.difficulty,
      probingReason: 'Advancing interview progression according to curriculum standards.',
    };
  }

  return {
    nextQuestion: `Can you describe a challenging project or milestone in your career and how you measured its success?`,
    category: 'Behavioral',
    difficulty: setup.difficulty,
    probingReason: 'Probing project execution and impact measurement.',
  };
}

export function evaluateInterviewLocally(
  setup: InterviewSetupConfig,
  history: QuestionRecord[]
): InterviewEvaluationReport {
  const role = getRoleConfig(setup.roleId);
  const isIT = setup.domain === 'IT & Software';
  const isBPO = setup.domain === 'BPO';

  // Compute answers quality metrics
  let totalWords = 0;
  let answeredCount = 0;

  const feedbacks: QuestionRecord[] = history.map((q) => {
    const ans = q.candidateAnswer || '';
    const words = ans.trim().split(/\s+/).filter(Boolean).length;
    if (words > 0) answeredCount++;
    totalWords += words;

    let qScore = 70;
    if (words > 40) qScore = 85;
    else if (words > 25) qScore = 78;
    else if (words > 10) qScore = 65;
    else qScore = 45;

    const feedback: QuestionFeedback = {
      score: qScore,
      whatWentWell: [
        'Demonstrated fundamental awareness of the core concepts.',
        words > 30 ? 'Provided structured context and appropriate terminology.' : 'Directly addressed the question without deflection.',
      ],
      whatWasMissing: [
        words < 35
          ? 'Did not cite specific quantitative metrics or measurable business outcomes.'
          : 'Could provide deeper edge-case analysis or alternative architectural trade-offs.',
        'Lacked explicit mention of lessons learned or post-implementation monitoring.',
      ],
      betterApproach:
        'Structure responses using the Problem-Action-Result format. State the challenge clearly, detail your specific technical implementation, and conclude with the measurable metric achieved.',
      suggestedAnswer: `A top-quartile answer begins by stating the operational or technical objective, outlines the methodology (e.g. comparing two viable approaches and justifying the choice), and concludes with quantitative impact (e.g., "reduced latency by 35%" or "improved CSAT to 94%").`,
      interviewerNote:
        words > 30
          ? 'Solid foundational response. Focus on speaking with greater confidence and metrics.'
          : 'Answer was brief. Interviewers expect practical scenarios and deeper explanations at this level.',
    };

    if (setup.type === 'Behavioral Interview') {
      feedback.starEvaluation = {
        situation: words > 15 ? 'Clearly identified context.' : 'Context was partially undefined.',
        task: 'Defined target responsibility adequately.',
        action: words > 30 ? 'Detailed actions taken.' : 'Needs more detail on individual contributions.',
        result: 'Include concrete metrics (percentages, revenue, hours saved).',
        starScore: Math.min(95, qScore + 5),
      };
    }

    return {
      ...q,
      feedback,
    };
  });

  // Calculate 8 metrics
  const avgQScore = feedbacks.length > 0 ? Math.round(feedbacks.reduce((a, b) => a + (b.feedback?.score || 70), 0) / feedbacks.length) : 75;

  const baseTech = isIT ? avgQScore : Math.min(95, avgQScore + 4);
  const baseComm = isBPO ? avgQScore : Math.max(70, avgQScore - 3);

  const scores: CategoryScores = {
    technicalKnowledge: baseTech,
    communication: baseComm,
    confidence: Math.min(92, Math.max(68, avgQScore + 2)),
    problemSolving: Math.min(95, Math.max(70, avgQScore + 3)),
    domainKnowledge: Math.min(94, Math.max(72, avgQScore + 1)),
    answerRelevance: Math.min(96, Math.max(75, avgQScore + 4)),
    answerStructure: Math.min(90, Math.max(65, avgQScore - 2)),
    professionalism: Math.min(98, Math.max(80, avgQScore + 6)),
  };

  // Overall Score weighted by domain
  const weights = role?.weightings || {
    technical: 0.3,
    communication: 0.25,
    problemSolving: 0.2,
    domainKnowledge: 0.15,
    professionalism: 0.1,
  };

  const overallScore = Math.min(
    99,
    Math.round(
      scores.technicalKnowledge * (weights.technical || 0.25) +
        scores.communication * (weights.communication || 0.25) +
        scores.problemSolving * (weights.problemSolving || 0.2) +
        scores.domainKnowledge * (weights.domainKnowledge || 0.15) +
        scores.professionalism * (weights.professionalism || 0.15)
    )
  );

  let readinessStatus = '82% — Interview Ready (Strong Contender)';
  if (overallScore < 70) {
    readinessStatus = `${overallScore}% — Needs Preparation (Fundamental Gaps Detected)`;
  } else if (overallScore < 80) {
    readinessStatus = `${overallScore}% — Good Foundation (Polishing Required)`;
  } else if (overallScore >= 90) {
    readinessStatus = `${overallScore}% — Top Tier (Offer Highly Likely)`;
  }

  // 7-Day Plan
  const plan: PreparationDayPlan[] = [
    {
      day: 1,
      title: 'Day 1 — Core Terminology & Architecture Fundamentals',
      focusArea: `Master standard ${setup.roleName} concepts and definitions.`,
      actionItems: [
        'Review core definitions and standard workflows.',
        'Practice explaining technical concepts simply without relying on buzzwords.',
      ],
      recommendedTopics: role?.keySkills.slice(0, 3) || ['Fundamentals', 'Process Flows'],
    },
    {
      day: 2,
      title: 'Day 2 — Deep-Dive Practical Scenarios',
      focusArea: 'Case studies and real-world implementation stories.',
      actionItems: [
        'Draft 3 concrete scenarios where you solved a high-impact bottleneck.',
        'Memorize specific before-and-after numbers (e.g. latency, error rate, CSAT).',
      ],
      recommendedTopics: ['Troubleshooting', 'Root Cause Analysis', 'Performance'],
    },
    {
      day: 3,
      title: 'Day 3 — Behavioral & STAR Methodology',
      focusArea: 'Mastering Situation-Task-Action-Result structure.',
      actionItems: [
        'Prepare 5 STAR stories covering leadership, conflict resolution, and tight deadlines.',
        'Ensure the "Result" section contains quantifiable business impact.',
      ],
      recommendedTopics: ['STAR Framework', 'Conflict Resolution', 'Ownership'],
    },
    {
      day: 4,
      title: 'Day 4 — Advanced Problem Solving & Edge Cases',
      focusArea: 'Handling curveball questions and unknown scenarios.',
      actionItems: [
        'Practice thinking out loud when faced with an unexpected question.',
        'Clarify assumptions before diving into answers.',
      ],
      recommendedTopics: ['System Design', 'Exception Handling', 'Scalability'],
    },
    {
      day: 5,
      title: 'Day 5 — Communication Pacing & Filler Word Reduction',
      focusArea: 'Refining vocal delivery and eliminating verbal tics.',
      actionItems: [
        'Record yourself answering 3 questions without saying "um", "uh", or "like".',
        'Use 2-second deliberate pauses to gather your thoughts instead of vocalizing fillers.',
      ],
      recommendedTopics: ['Pacing', 'Vocal Variety', 'Conciseness'],
    },
    {
      day: 6,
      title: 'Day 6 — Resume & Project Verification Drills',
      focusArea: 'Defending every line item and project on your CV.',
      actionItems: [
        'Be prepared to justify why you chose your tech stack or process over alternatives.',
        'Review architecture diagrams and your exact personal contributions.',
      ],
      recommendedTopics: ['Project Architecture', 'Trade-offs', 'Resume Claims'],
    },
    {
      day: 7,
      title: 'Day 7 — Full Timed Mock Interview Simulation',
      focusArea: 'Putting everything together under pressure.',
      actionItems: [
        'Complete a full 5-question mock session in Real Interview Mode.',
        'Review your final score to confirm score gains above 85%.',
      ],
      recommendedTopics: ['Full Mock Interview', 'Confidence Drills'],
    },
  ];

  return {
    sessionId: `interview-${Date.now()}`,
    setup,
    completedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    totalDurationSeconds: history.reduce((acc, q) => acc + (q.durationSeconds || 45), 0),
    overallScore,
    readinessStatus,
    scores,
    strongestAreas: [
      'Core domain fluency and appropriate use of terminology',
      'Professional demeanor and respectful articulation',
      'Willingness to address questions directly without evasion',
    ],
    weakestAreas: [
      'Inclusion of quantifiable business metrics and concrete outcomes',
      'Structural rigor using the STAR method for situational questions',
      'Explaining architectural trade-offs between competing approaches',
    ],
    technicalGaps: [
      'Deeper elaboration on production edge cases and error handling',
      'Explicit mention of industry monitoring and calibration tools',
    ],
    communicationGaps: [
      'Occasional verbal pauses that could be replaced with silent pauses',
      'Providing an executive summary first before diving into granular details',
    ],
    questionsFeedback: feedbacks,
    preparationPlan: plan,
  };
}
