'use client';

import { useState } from 'react';
import {
  InterviewSetupConfig,
  QuestionRecord,
  InterviewEvaluationReport,
} from '@/types/interview';
import InterviewSetup from './InterviewSetup';
import InterviewRoom from './InterviewRoom';
import InterviewReport from './InterviewReport';
import InterviewDashboard from './InterviewDashboard';
import {
  saveInterviewReport,
  getInterviewReportById,
} from '@/lib/tools/interview/storage';
import {
  Sparkles,
  LayoutDashboard,
  PlayCircle,
  Loader2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

type ViewMode = 'setup' | 'room' | 'report' | 'dashboard';

export default function InterviewClient() {
  const [viewMode, setViewMode] = useState<ViewMode>('setup');
  const [setupConfig, setSetupConfig] = useState<InterviewSetupConfig | null>(null);
  const [initialQuestion, setInitialQuestion] = useState<QuestionRecord | null>(null);
  const [activeReport, setActiveReport] = useState<InterviewEvaluationReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluatingStatus, setEvaluatingStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Handle Start from Setup Wizard
  const handleStartInterview = async (config: InterviewSetupConfig) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSetupConfig(config);

    try {
      const res = await fetch('/api/tools/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          setup: config,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to start interview session. Please try again.');
      }

      const data = await res.json();
      const question: QuestionRecord = {
        id: `q-${Date.now()}`,
        questionNumber: 1,
        questionText: data.questionText,
        category: data.category || 'Opening / Background',
        difficulty: data.difficulty || config.difficulty,
      };

      setInitialQuestion(question);
      setViewMode('room');
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Failed to initiate mock interview session. Please verify connection and retry.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Finish from Simulator Room
  const handleFinishInterview = async (history: QuestionRecord[]) => {
    if (!setupConfig) return;

    setEvaluatingStatus('Analyzing responses across 8 evaluation dimensions...');
    setIsLoading(true);

    try {
      const res = await fetch('/api/tools/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          setup: setupConfig,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate diagnostic evaluation report.');
      }

      const data = await res.json();
      const report: InterviewEvaluationReport = data.report || data;

      // Save to localStorage
      saveInterviewReport(report);

      setActiveReport(report);
      setViewMode('report');
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Evaluation generation failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
      setEvaluatingStatus(null);
    }
  };

  // 3. Handle View Report from Dashboard
  const handleViewSavedReport = (sessionId: string) => {
    const report = getInterviewReportById(sessionId);
    if (report) {
      setActiveReport(report);
      setViewMode('report');
    } else {
      alert('Selected interview report could not be found in local browser storage.');
    }
  };

  // 4. Reset & start fresh
  const handleStartNew = () => {
    setSetupConfig(null);
    setInitialQuestion(null);
    setActiveReport(null);
    setErrorMessage(null);
    setViewMode('setup');
  };

  return (
    <div className="w-full">
      {/* Navigation Bar / Mode Switcher (Hidden when inside active interview room) */}
      {viewMode !== 'room' && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Next-Gen AI Career Simulator
            </span>
          </div>

          <div className="inline-flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => {
                if (viewMode !== 'setup') setViewMode('setup');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                viewMode === 'setup'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              Practice Mock Interview
            </button>

            <button
              onClick={() => setViewMode('dashboard')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                viewMode === 'dashboard'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              My History & Track Record
            </button>
          </div>
        </div>
      )}

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
          <div className="flex-1">
            <p className="font-semibold">Notice</p>
            <p className="text-rose-700 text-xs sm:text-sm mt-0.5">{errorMessage}</p>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 animate-spin">
              <Loader2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {evaluatingStatus ? 'Evaluating Candidate Performance' : 'Configuring AI Interview Room'}
            </h3>
            <p className="text-slate-600 text-sm">
              {evaluatingStatus ||
                'Tailoring questions based on your domain, target role, experience level, and resume...'}
            </p>
          </div>
        </div>
      )}

      {/* Main View Router */}
      {viewMode === 'setup' && (
        <InterviewSetup onStart={handleStartInterview} disabled={isLoading} />
      )}

      {viewMode === 'room' && setupConfig && initialQuestion && (
        <InterviewRoom
          setup={setupConfig}
          initialQuestion={initialQuestion}
          onFinish={handleFinishInterview}
          onExit={handleStartNew}
        />
      )}

      {viewMode === 'report' && activeReport && (
        <InterviewReport
          report={activeReport}
          onRestart={() => {
            if (setupConfig) {
              handleStartInterview(setupConfig);
            } else {
              handleStartNew();
            }
          }}
          onNewSetup={handleStartNew}
        />
      )}

      {viewMode === 'dashboard' && (
        <InterviewDashboard
          onStartNew={handleStartNew}
          onViewReport={handleViewSavedReport}
        />
      )}
    </div>
  );
}
