export type InterviewDomain =
  | 'IT & Software'
  | 'HR'
  | 'BPO'
  | 'Digital Marketing'
  | 'Sales'
  | 'Finance'
  | 'Management';

export type ExperienceLevel =
  | 'Fresher'
  | '0–1 Year'
  | '1–2 Years'
  | '2–3 Years'
  | '3–5 Years'
  | '5–8 Years'
  | '8+ Years';

export type InterviewType =
  | 'HR Interview'
  | 'Technical Interview'
  | 'Behavioral Interview'
  | 'Managerial Interview'
  | 'Domain Interview'
  | 'Full Mock Interview';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export type InterviewMode = 'text' | 'voice';

export interface RoleConfig {
  id: string;
  name: string;
  domain: InterviewDomain;
  description: string;
  keySkills: string[];
  sampleQuestions: {
    fresher: string[];
    experienced: string[];
  };
  weightings: {
    technical: number; // e.g. 0.35
    communication: number; // e.g. 0.20
    problemSolving: number; // e.g. 0.20
    domainKnowledge: number; // e.g. 0.15
    professionalism: number; // e.g. 0.10
  };
}

export interface DomainConfig {
  name: InterviewDomain;
  description: string;
  iconName: string;
  roles: RoleConfig[];
}

export interface InterviewSetupConfig {
  domain: InterviewDomain;
  roleId: string;
  roleName: string;
  experience: ExperienceLevel;
  type: InterviewType;
  difficulty: DifficultyLevel;
  mode: InterviewMode;
  resumeText?: string;
  jobDescription?: string;
  totalQuestionsTarget: number;
}

export interface QuestionRecord {
  id: string;
  questionNumber: number;
  questionText: string;
  category: string;
  difficulty: DifficultyLevel;
  candidateAnswer?: string;
  durationSeconds?: number;
  fillerWordsCount?: number;
  followUpReason?: string;
  feedback?: QuestionFeedback;
}

export interface StarBreakdown {
  situation: string;
  task: string;
  action: string;
  result: string;
  starScore: number; // 0-100
}

export interface QuestionFeedback {
  whatWentWell: string[];
  whatWasMissing: string[];
  betterApproach: string;
  suggestedAnswer: string;
  interviewerNote: string;
  starEvaluation?: StarBreakdown;
  score: number; // 0-100
}

export interface CategoryScores {
  technicalKnowledge: number;
  communication: number;
  confidence: number;
  problemSolving: number;
  domainKnowledge: number;
  answerRelevance: number;
  answerStructure: number;
  professionalism: number;
}

export interface PreparationDayPlan {
  day: number;
  title: string;
  focusArea: string;
  actionItems: string[];
  recommendedTopics: string[];
}

export interface InterviewEvaluationReport {
  sessionId: string;
  setup: InterviewSetupConfig;
  completedAt: string;
  totalDurationSeconds: number;
  overallScore: number; // 0-100
  readinessStatus: string; // e.g. "82% — Interview Ready (Offer Likely)"
  scores: CategoryScores;
  strongestAreas: string[];
  weakestAreas: string[];
  technicalGaps: string[];
  communicationGaps: string[];
  questionsFeedback: QuestionRecord[];
  preparationPlan: PreparationDayPlan[];
}

export interface SavedInterviewSummary {
  id: string;
  date: string;
  domain: InterviewDomain;
  roleName: string;
  experience: ExperienceLevel;
  type: InterviewType;
  overallScore: number;
  readinessStatus: string;
  totalQuestions: number;
  durationMinutes: number;
}
