import { InterviewSetupConfig, QuestionRecord } from '@/types/interview';
import { getRoleConfig } from '@/config/interview/domains';

export function buildSystemPrompt(setup: InterviewSetupConfig): string {
  const role = getRoleConfig(setup.roleId);

  return `You are a Senior Principal Interviewer at a premier global technology & enterprise firm conducting a professional mock interview for a ${setup.roleName} candidate.

DOMAIN: ${setup.domain}
ROLE: ${setup.roleName}
EXPERIENCE LEVEL: ${setup.experience}
INTERVIEW TYPE: ${setup.type}
DIFFICULTY LEVEL: ${setup.difficulty}

ROLE CONTEXT & KEY SKILLS:
${role ? role.keySkills.join(', ') : 'Standard industry competencies'}

INTERVIEWER GUIDELINES:
1. Speak as a real, senior industry interviewer. Be professional, direct, and rigorous.
2. Ask ONE question at a time.
3. NEVER repeat questions.
4. If the candidate gives a brief, generic, or buzzword-heavy answer, DO NOT change the topic immediately. Probe deeper with a challenging contextual follow-up question (e.g. asking for specific trade-offs, architecture choices, real-world bug scenarios, or exact contributions).
5. For Behavioral interviews, evaluate whether the candidate follows the STAR methodology (Situation, Task, Action, Result).
6. Adapt the depth to their experience level:
   - Fresher: Focus on fundamentals, core syntax, problem solving, and project conceptual clarity.
   - Experienced (3-8+ years): Focus on scalability, production debugging, architecture, trade-offs, and leadership.
${setup.resumeText ? `\nCANDIDATE RESUME HIGHLIGHTS:\n${setup.resumeText.slice(0, 1500)}` : ''}
${setup.jobDescription ? `\nTARGET JOB DESCRIPTION:\n${setup.jobDescription.slice(0, 1500)}` : ''}
`;
}

export function buildFollowUpPrompt(
  setup: InterviewSetupConfig,
  history: QuestionRecord[],
  candidateLatestAnswer: string
): string {
  const lastQuestion = history[history.length - 1];

  return `The candidate just answered the previous question in this ${setup.type} for ${setup.roleName}.

PREVIOUS QUESTION #${lastQuestion.questionNumber}:
"${lastQuestion.questionText}"

CANDIDATE'S ANSWER:
"${candidateLatestAnswer}"

CONVERSATION CONTEXT SO FAR:
${history.map((q) => `Q${q.questionNumber}: ${q.questionText}\nA: ${q.candidateAnswer || '(no answer)'}`).join('\n\n')}

TASK:
Analyze the candidate's answer carefully.
- If the answer was vague or just named a tool without explaining how they used it, probe them directly with a realistic follow-up.
- If the answer was thorough and answered the question well, advance to the next critical topic for this ${setup.roleName} role.
- Keep the question concise, realistic, and industry-authentic.
- Output ONLY valid JSON with this exact structure:
{
  "nextQuestion": "The exact question text to ask the candidate",
  "category": "Technical" | "Architecture" | "Behavioral" | "Domain" | "Problem Solving",
  "difficulty": "Easy" | "Medium" | "Hard" | "Expert",
  "probingReason": "Brief reason why this question was selected based on candidate's prior answer"
}
`;
}

export function buildEvaluationPrompt(
  setup: InterviewSetupConfig,
  questionsAndAnswers: QuestionRecord[]
): string {
  return `You are an Executive Hiring Committee evaluating a candidate's complete mock interview for ${setup.roleName} (${setup.experience}, ${setup.domain}).

INTERVIEW TRANSCRIPT:
${questionsAndAnswers
  .map(
    (qa, idx) => `
QUESTION ${idx + 1} (${qa.category} - ${qa.difficulty}):
"${qa.questionText}"

CANDIDATE ANSWER:
"${qa.candidateAnswer || 'No answer provided'}"
`
  )
  .join('\n----------------------------------------\n')}

TASK:
Provide an objective, constructive evaluation. Calculate scores out of 100 for each dimension.
Adapt scoring weights appropriately:
- IT & Software: Technical Knowledge and Problem Solving are heavily weighted.
- BPO & Customer Service: Communication, Process Understanding (CSAT/AHT/FCR), and Professionalism are heavily weighted.
- Sales & Marketing: Strategic Domain Knowledge, Persuasion, and Metrics (ROAS, BANT, CAC) are heavily weighted.

For each question, provide:
1. What went well (positive reinforcement)
2. What was missing (critical omissions)
3. Better approach (how a top 5% candidate structures this)
4. Suggested model answer
5. STAR methodology evaluation if applicable

Also generate a 7-Day Personalized Preparation Plan targeting their weakest areas.

Output ONLY valid JSON with this exact structure:
{
  "overallScore": 82,
  "readinessStatus": "78% — Good, but needs improvement",
  "scores": {
    "technicalKnowledge": 85,
    "communication": 78,
    "confidence": 81,
    "problemSolving": 88,
    "domainKnowledge": 84,
    "answerRelevance": 79,
    "answerStructure": 76,
    "professionalism": 90
  },
  "strongestAreas": ["Area 1", "Area 2", "Area 3"],
  "weakestAreas": ["Area 1", "Area 2", "Area 3"],
  "technicalGaps": ["Gap 1", "Gap 2"],
  "communicationGaps": ["Gap 1", "Gap 2"],
  "questionsFeedback": [
    {
      "questionNumber": 1,
      "score": 80,
      "whatWentWell": ["Point 1", "Point 2"],
      "whatWasMissing": ["Point 1"],
      "betterApproach": "Explanation...",
      "suggestedAnswer": "Model answer text...",
      "interviewerNote": "Constructive comment..."
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "title": "Day 1 — Fundamentals",
      "focusArea": "Core concepts",
      "actionItems": ["Action 1", "Action 2"],
      "recommendedTopics": ["Topic 1", "Topic 2"]
    }
  ]
}
`;
}
