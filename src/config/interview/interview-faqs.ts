export interface InterviewFaq {
  question: string;
  answer: string;
}

export const INTERVIEW_FAQS: InterviewFaq[] = [
  {
    question: 'How is the Skillsha AI Interview Simulator different from a static question-answer website?',
    answer:
      'Unlike static question banks, Skillsha uses an adaptive conversational AI engine that acts like a real senior interviewer. It analyzes your previous response, identifies missing details or superficial buzzwords, and generates tailored contextual follow-up questions in real time. It adapts to your specific role, experience level, resume, and job description.',
  },
  {
    question: 'Does the Voice Interview mode support speech recognition and voice feedback?',
    answer:
      'Yes. You can answer using your microphone with real-time Speech-to-Text transcription, live audio waveform visualization, speaking duration timer, and an optional filler-word detector (tracking "um", "uh", "like"). The AI interviewer also speaks questions aloud with natural speech synthesis.',
  },
  {
    question: 'Can I upload my resume or paste a specific Job Description (JD)?',
    answer:
      'Yes! You can paste your resume text or upload your resume file, as well as paste the exact Job Description of the company you are targeting. The AI scans your stated projects, technologies, and achievements to challenge your claims with realistic project verification questions.',
  },
  {
    question: 'How does the role-adaptive evaluation and scoring system work?',
    answer:
      'After completing the interview, you receive an overall score (0–100) and an 8-metric breakdown: Technical Knowledge, Communication, Confidence, Problem Solving, Domain Knowledge, Answer Relevance, Answer Structure, and Professionalism. The scoring system dynamically adjusts weights based on the profession (e.g. higher technical weighting for software engineering; higher communication and customer handling weighting for BPO and HR).',
  },
  {
    question: 'What is the STAR methodology used in behavioral evaluations?',
    answer:
      'STAR stands for Situation, Task, Action, and Result. Top global employers (Amazon, Google, Microsoft, Deloitte) evaluate behavioral answers through this framework. Skillsha evaluates whether your responses clearly define the context, your specific responsibility, the concrete action you executed, and the measurable outcome achieved.',
  },
  {
    question: 'What is included in the Personalized 7-Day Preparation Plan?',
    answer:
      'Based on your specific weaknesses and knowledge gaps identified during the mock interview, the AI generates a customized Day 1 through Day 7 study roadmap with exact topic recommendations and actionable exercises to turn your weak spots into strengths before your real interview.',
  },
  {
    question: 'Are my answers and resume private and confidential?',
    answer:
      'Yes. Skillsha enforces strict privacy standards. Your interview responses, transcripts, and uploaded resume text are processed in memory and stored securely in your private browser session. Your data is never shared with third parties or recruiters without your consent.',
  },
];
