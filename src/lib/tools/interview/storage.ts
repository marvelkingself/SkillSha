import { InterviewEvaluationReport, SavedInterviewSummary } from '@/types/interview';

const STORAGE_KEY = 'skillsha_interview_history';
const STREAK_KEY = 'skillsha_interview_streak';

export function saveInterviewReport(report: InterviewEvaluationReport): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getSavedInterviewSummaries();
    const summary: SavedInterviewSummary = {
      id: report.sessionId,
      date: report.completedAt,
      domain: report.setup.domain,
      roleName: report.setup.roleName,
      experience: report.setup.experience,
      type: report.setup.type,
      overallScore: report.overallScore,
      readinessStatus: report.readinessStatus,
      totalQuestions: report.questionsFeedback.length,
      durationMinutes: Math.max(1, Math.round(report.totalDurationSeconds / 60)),
    };

    // Store summary list (max 20)
    const updated = [summary, ...existing.filter((i) => i.id !== summary.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Store full report
    localStorage.setItem(`skillsha_interview_report_${report.sessionId}`, JSON.stringify(report));

    // Update Streak
    updateStreak();
  } catch (err) {
    console.error('Failed to save interview report to localStorage', err);
  }
}

export function getSavedInterviewSummaries(): SavedInterviewSummary[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getInterviewReportById(id: string): InterviewEvaluationReport | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`skillsha_interview_report_${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function deleteSavedInterview(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedInterviewSummaries();
    const updated = existing.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.removeItem(`skillsha_interview_report_${id}`);
  } catch (err) {
    console.error('Failed to delete interview report', err);
  }
}

export function getInterviewStreak(): number {
  if (typeof window === 'undefined') return 1;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? parseInt(raw, 10) : 1;
  } catch {
    return 1;
  }
}

function updateStreak(): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getInterviewStreak();
    localStorage.setItem(STREAK_KEY, String(current + 1));
  } catch {
    // ignore
  }
}
