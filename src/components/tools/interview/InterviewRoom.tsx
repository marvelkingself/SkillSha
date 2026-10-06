'use client';

import { useState, useEffect, useRef } from 'react';
import {
  InterviewSetupConfig,
  QuestionRecord,
} from '@/types/interview';
import {
  speakText,
  stopSpeaking,
  analyzeSpeechTranscript,
  formatDuration,
  FillerWordStats,
} from '@/lib/tools/interview/speech';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Loader2,
  Clock,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  Flag,
} from 'lucide-react';

interface InterviewRoomProps {
  setup: InterviewSetupConfig;
  initialQuestion: QuestionRecord;
  onFinish: (history: QuestionRecord[]) => void;
  onExit: () => void;
}

export default function InterviewRoom({
  setup,
  initialQuestion,
  onFinish,
  onExit,
}: InterviewRoomProps) {
  const [history, setHistory] = useState<QuestionRecord[]>([initialQuestion]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionRecord>(initialQuestion);
  const [candidateText, setCandidateText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpeakingAi, setIsSpeakingAi] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Timers
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [answerSeconds, setAnswerSeconds] = useState(0);

  // Live filler words
  const [fillerStats, setFillerStats] = useState<FillerWordStats>({
    totalWords: 0,
    fillerCount: 0,
    fillerPercentage: 0,
    detectedWords: [],
    pacingFeedback: '',
  });

  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Speech Synthesis and read initial question aloud
  useEffect(() => {
    speakQuestion(initialQuestion.questionText);
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Main Session Timer
  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setAnswerSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Speak AI Question
  const speakQuestion = (text: string) => {
    setIsSpeakingAi(true);
    speakText(text, () => {
      setIsSpeakingAi(false);
      // If voice mode, automatically turn on mic after AI finishes speaking
      if (setup.mode === 'voice') {
        startListening();
      }
    });
  };

  // Web Speech Recognition
  const startListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListeningMic(true);
      };

      recognition.onresult = (event: any) => {
        let finalTrans = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          finalTrans += event.results[i][0].transcript;
        }

        setCandidateText((prev) => {
          const updated = (prev ? prev + ' ' : '') + finalTrans;
          const stats = analyzeSpeechTranscript(updated);
          setFillerStats(stats);
          return updated;
        });
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition event:', e.error);
        setIsListeningMic(false);
      };

      recognition.onend = () => {
        setIsListeningMic(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error('Failed to start speech recognition', e);
      setIsListeningMic(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListeningMic(false);
    }
  };

  const toggleMic = () => {
    if (isListeningMic) {
      stopListening();
    } else {
      stopSpeaking();
      startListening();
    }
  };

  // Submit Answer & Fetch Next Question
  const handleSubmitAnswer = async () => {
    if (!candidateText.trim() || isSubmitting) return;

    stopListening();
    stopSpeaking();
    setIsSubmitting(true);

    const answeredRecord: QuestionRecord = {
      ...currentQuestion,
      candidateAnswer: candidateText.trim(),
      durationSeconds: answerSeconds,
      fillerWordsCount: fillerStats.fillerCount,
    };

    const updatedHistory = history.map((q) => (q.id === answeredRecord.id ? answeredRecord : q));
    setHistory(updatedHistory);

    // If reached max questions target, trigger completion
    if (updatedHistory.length >= setup.totalQuestionsTarget) {
      setIsSubmitting(false);
      onFinish(updatedHistory);
      return;
    }

    try {
      const res = await fetch('/api/tools/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'next_question',
          setup,
          history: updatedHistory,
          latestAnswer: candidateText.trim(),
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch next question');
      const data = await res.json();

      const nextQ: QuestionRecord = {
        id: `q-${Date.now()}`,
        questionNumber: data.questionNumber,
        questionText: data.questionText,
        category: data.category || 'Follow-up',
        difficulty: data.difficulty || setup.difficulty,
        followUpReason: data.probingReason,
      };

      setHistory([...updatedHistory, nextQ]);
      setCurrentQuestion(nextQ);
      setCandidateText('');
      setAnswerSeconds(0);
      setFillerStats({
        totalWords: 0,
        fillerCount: 0,
        fillerPercentage: 0,
        detectedWords: [],
        pacingFeedback: '',
      });

      // Speak next question
      speakQuestion(nextQ.questionText);
    } catch (err) {
      console.error(err);
      // Fallback: End interview if error
      onFinish(updatedHistory);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualFinish = () => {
    stopListening();
    stopSpeaking();
    const finalHistory = history.map((q) => {
      if (q.id === currentQuestion.id && !q.candidateAnswer) {
        return {
          ...q,
          candidateAnswer: candidateText.trim() || 'No answer provided.',
          durationSeconds: answerSeconds,
          fillerWordsCount: fillerStats.fillerCount,
        };
      }
      return q;
    });
    onFinish(finalHistory);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span>{setup.roleName}</span>
              <span className="text-slate-400 font-normal">•</span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{setup.type}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              {setup.experience} • {setup.difficulty} Level
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatDuration(elapsedSeconds)}</span>
          </div>

          <button
            type="button"
            onClick={handleManualFinish}
            className="py-1.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Finish Interview</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Stage (8 Cols): AI Interviewer & Answer Input */}
        <div className="lg:col-span-8 space-y-6">
          {/* AI Interviewer Stage Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar with Animated Pulse Rings */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-base shadow-md ${
                      isSpeakingAi ? 'ring-4 ring-blue-400/40 ring-offset-2' : ''
                    }`}
                  >
                    AI
                  </div>
                  {isSpeakingAi && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                  )}
                </div>

                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Senior Interviewer</span>
                    {isSpeakingAi && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 animate-pulse">
                        Speaking...
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    Question {currentQuestion.questionNumber} of {setup.totalQuestionsTarget}
                  </div>
                </div>
              </div>

              {/* Speaker Replay Button */}
              <button
                type="button"
                onClick={() =>
                  isSpeakingAi ? stopSpeaking() : speakQuestion(currentQuestion.questionText)
                }
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors cursor-pointer"
                title={isSpeakingAi ? 'Mute AI' : 'Replay question audio'}
              >
                {isSpeakingAi ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Question Display */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-white/5 space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                {currentQuestion.category}
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                &ldquo;{currentQuestion.questionText}&rdquo;
              </h1>

              {currentQuestion.followUpReason && (
                <p className="text-[11px] text-amber-700 dark:text-amber-300/90 font-medium italic pt-1 border-t border-slate-200/40 dark:border-white/5">
                  ★ Follow-up Context: {currentQuestion.followUpReason}
                </p>
              )}
            </div>
          </div>

          {/* Candidate Response Workspace */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Your Answer
              </span>

              {/* Voice Controls if Voice Mode */}
              {setup.mode === 'voice' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMic}
                    className={`py-1.5 px-3.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      isListeningMic
                        ? 'bg-red-600 text-white shadow-md animate-pulse'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isListeningMic ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isListeningMic ? 'Stop Recording' : 'Start Speaking'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Answer Textbox */}
            <div className="relative">
              <textarea
                rows={5}
                value={candidateText}
                onChange={(e) => {
                  setCandidateText(e.target.value);
                  const stats = analyzeSpeechTranscript(e.target.value);
                  setFillerStats(stats);
                }}
                placeholder={
                  setup.mode === 'voice'
                    ? 'Click "Start Speaking" and answer aloud into your microphone, or edit the transcribed text here...'
                    : 'Type your answer here. Provide real-world examples and structure your points clearly...'
                }
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
              />
            </div>

            {/* Live Filler Words & Fluency Alert */}
            {fillerStats.totalWords > 8 && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/60 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>
                    Fluency: <strong>{fillerStats.totalWords} words</strong> spoken
                  </span>
                  <span>•</span>
                  <span>
                    Filler words: <strong className={fillerStats.fillerCount > 3 ? 'text-amber-500' : 'text-emerald-500'}>{fillerStats.fillerCount}</strong>
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 italic">
                  {fillerStats.pacingFeedback}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCandidateText('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                Clear Answer
              </button>

              <button
                type="button"
                disabled={!candidateText.trim() || isSubmitting}
                onClick={handleSubmitAnswer}
                className="py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing & Preparing Next...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Answer</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar (4 Cols): Progress & Session Diagnostics */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Session Progress
            </h3>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-zinc-300">
                <span>Completed</span>
                <span className="text-blue-600">
                  {history.length - 1} / {setup.totalQuestionsTarget}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, ((history.length - 1) / setup.totalQuestionsTarget) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Questions Sequence List */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Questions Flow
              </label>
              <div className="space-y-2">
                {history.map((q, idx) => {
                  const isCurrent = q.id === currentQuestion.id;
                  const isDone = Boolean(q.candidateAnswer);
                  return (
                    <div
                      key={q.id}
                      className={`p-2.5 rounded-xl border text-xs transition-colors flex items-center justify-between ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold'
                          : isDone
                          ? 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-zinc-400'
                          : 'border-dashed border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="truncate pr-2">
                        Q{idx + 1}: {q.category}
                      </span>
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tips Card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200/90 space-y-1">
              <span className="font-bold block">💡 Interview Tip</span>
              <p className="leading-relaxed">
                When answering, state the <strong>Action</strong> you personally took, and quantify the <strong>Result</strong>. E.g. &ldquo;Reduced load time from 3.2s to 1.1s.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
