import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InterviewSetupConfig, QuestionRecord } from '@/types/interview';
import { getRoleConfig } from '@/config/interview/domains';
import {
  buildSystemPrompt,
  buildFollowUpPrompt,
  buildEvaluationPrompt,
} from '@/lib/tools/interview/prompt-builder';
import {
  generateContextualFollowUp,
  evaluateInterviewLocally,
} from '@/lib/tools/interview/evaluator';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, setup, history, latestAnswer } = body as {
      action: 'start' | 'next_question' | 'evaluate';
      setup: InterviewSetupConfig;
      history?: QuestionRecord[];
      latestAnswer?: string;
    };

    if (!setup || !setup.roleId) {
      return NextResponse.json({ error: 'Missing interview setup configuration.' }, { status: 400 });
    }

    const role = getRoleConfig(setup.roleId);

    // 1. ACTION: START INTERVIEW (Generate Opening Question)
    if (action === 'start') {
      const isExperienced = ['2–3 Years', '3–5 Years', '5–8 Years', '8+ Years'].includes(setup.experience);

      // Try Gemini if available
      if (GEMINI_API_KEY) {
        try {
          const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const systemPrompt = buildSystemPrompt(setup);
          const prompt = `${systemPrompt}\n\nTASK: Ask the initial opening question for this ${setup.type}. Keep it natural, welcoming yet professional. Return ONLY JSON: {"questionText": "...", "category": "Introduction / Fundamentals", "difficulty": "${setup.difficulty}"}`;

          const result = await model.generateContent(prompt);
          const text = result.response.text();
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);

          return NextResponse.json({
            questionNumber: 1,
            questionText: parsed.questionText,
            category: parsed.category || 'Introduction',
            difficulty: parsed.difficulty || setup.difficulty,
          });
        } catch (err) {
          console.warn('Gemini opening question failed, falling back to local engine:', err);
        }
      }

      // Local engine fallback
      let openingQ = `Hello! Welcome to your ${setup.type} for the ${setup.roleName} position. To start off, could you briefly introduce yourself and walk me through your relevant experience and key technical strengths?`;

      if (setup.type === 'Technical Interview' && role) {
        const questions = isExperienced ? role.sampleQuestions.experienced : role.sampleQuestions.fresher;
        openingQ = questions[0] || openingQ;
      }

      return NextResponse.json({
        questionNumber: 1,
        questionText: openingQ,
        category: setup.type.includes('HR') ? 'HR & Background' : 'Core Fundamentals',
        difficulty: setup.difficulty,
      });
    }

    // 2. ACTION: NEXT QUESTION (Contextual Follow-up)
    if (action === 'next_question') {
      const qHistory = history || [];
      const candidateAnswer = latestAnswer || '';

      // Try Gemini if available
      if (GEMINI_API_KEY) {
        try {
          const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const systemPrompt = buildSystemPrompt(setup);
          const prompt = `${systemPrompt}\n\n${buildFollowUpPrompt(setup, qHistory, candidateAnswer)}`;

          const result = await model.generateContent(prompt);
          const text = result.response.text();
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);

          return NextResponse.json({
            questionNumber: qHistory.length + 1,
            questionText: parsed.nextQuestion,
            category: parsed.category || 'Deep Dive',
            difficulty: parsed.difficulty || setup.difficulty,
            probingReason: parsed.probingReason,
          });
        } catch (err) {
          console.warn('Gemini follow-up question failed, falling back to local engine:', err);
        }
      }

      // Local engine fallback
      const followUp = generateContextualFollowUp(setup, qHistory, candidateAnswer);
      return NextResponse.json({
        questionNumber: qHistory.length + 1,
        questionText: followUp.nextQuestion,
        category: followUp.category,
        difficulty: followUp.difficulty,
        probingReason: followUp.probingReason,
      });
    }

    // 3. ACTION: EVALUATE INTERVIEW (Full Scorecard & Plan)
    if (action === 'evaluate') {
      const qHistory = history || [];

      // Try Gemini if available
      if (GEMINI_API_KEY) {
        try {
          const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const systemPrompt = buildSystemPrompt(setup);
          const prompt = `${systemPrompt}\n\n${buildEvaluationPrompt(setup, qHistory)}`;

          const result = await model.generateContent(prompt);
          const text = result.response.text();
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);

          const fullReport = {
            ...parsed,
            sessionId: `interview-${Date.now()}`,
            setup,
            completedAt: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            totalDurationSeconds: qHistory.reduce((acc, q) => acc + (q.durationSeconds || 45), 0),
          };

          return NextResponse.json({ report: fullReport, ...fullReport });
        } catch (err) {
          console.warn('Gemini evaluation failed, falling back to local engine:', err);
        }
      }

      // Local engine fallback
      const localReport = evaluateInterviewLocally(setup, qHistory);
      return NextResponse.json({ report: localReport, ...localReport });
    }

    return NextResponse.json({ error: 'Invalid action requested.' }, { status: 400 });
  } catch (err: unknown) {
    console.error('Interview API error:', err);
    const msg = err instanceof Error ? err.message : 'Internal interview processing error.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
