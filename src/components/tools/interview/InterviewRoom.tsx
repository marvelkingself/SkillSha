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
  FillerWordStats,
} from '@/lib/tools/interview/speech';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Loader2,
  Bot,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Keyboard,
  X,
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
  const [inputMode, setInputMode] = useState<'text' | 'voice'>(setup.mode || 'text');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [answerSeconds, setAnswerSeconds] = useState(0);

  // Hidden background metrics for final evaluation report
  const [fillerStats, setFillerStats] = useState<FillerWordStats>({
    totalWords: 0,
    fillerCount: 0,
    fillerPercentage: 0,
    detectedWords: [],
    pacingFeedback: '',
  });

  const recognitionRef = useRef<any>(null);
  const answerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Read initial question aloud on mount
  useEffect(() => {
    speakQuestion(initialQuestion.questionText);
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Track answer time in background
  useEffect(() => {
    answerTimerRef.current = setInterval(() => {
      setAnswerSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      if (answerTimerRef.current) clearInterval(answerTimerRef.current);
    };
  }, []);

  const speakQuestion = (text: string) => {
    setIsSpeakingAi(true);
    speakText(text, () => {
      setIsSpeakingAi(false);
      // If voice mode is active, auto-start mic after AI finishes asking
      if (inputMode === 'voice') {
        startListening();
      }
    });
  };

  const handleReplayQuestion = () => {
    if (isSpeakingAi) {
      stopSpeaking();
      setIsSpeakingAi(false);
    } else {
      speakQuestion(currentQuestion.questionText);
    }
  };

  // Web Speech Recognition
  const startListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setInputMode('text');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListeningMic(true);
      };

      recognition.onresult = (event: any) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        const trimmed = fullTranscript.trim();
        setCandidateText(trimmed);

        // Analyze filler words in background
        const stats = analyzeSpeechTranscript(trimmed);
        setFillerStats(stats);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e.error);
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

    // If reached target questions, finish interview
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
          candidateAnswer: candidateText.trim() || 'Completed early by candidate.',
          durationSeconds: answerSeconds,
          fillerWordsCount: fillerStats.fillerCount,
        };
      }
      return q;
    });
    onFinish(finalHistory);
  };

  const currentNumber = history.length;
  const totalTarget = setup.totalQuestionsTarget || 6;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Minimal Bar */}
      <div className="flex items-center justify-between py-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Question {currentNumber} of ~{totalTarget}
          </span>
          <span className="text-xs text-slate-400">• {setup.roleName}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleManualFinish}
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            End & View Score
          </button>
          <button
            type="button"
            onClick={onExit}
            title="Exit interview"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Interviewer Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Bot className="w-6 h-6" />
              </div>
              {isSpeakingAi && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white animate-ping" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">AI Interviewer</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {currentQuestion.category || 'Interview Question'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isSpeakingAi ? 'Speaking question aloud...' : 'Listening for your response'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReplayQuestion}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors"
            title={isSpeakingAi ? 'Stop speech' : 'Replay question audio'}
          >
            {isSpeakingAi ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Question Text */}
        <div className="pt-2">
          <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
            &ldquo;{currentQuestion.questionText}&rdquo;
          </p>
        </div>
      </div>

      {/* Candidate Answer Workspace */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        {/* Input Mode Selector & Guidance */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
          <span className="font-semibold text-slate-700">Your Answer</span>

          <div className="flex items-center gap-2">
            {inputMode === 'voice' ? (
              <button
                type="button"
                onClick={() => {
                  stopListening();
                  setInputMode('text');
                }}
                className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Switch to typing</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setInputMode('voice')}
                className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Switch to voice</span>
              </button>
            )}
          </div>
        </div>

        {/* Voice Mode View */}
        {inputMode === 'voice' ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
            <button
              type="button"
              onClick={toggleMic}
              disabled={isSubmitting}
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform active:scale-95 cursor-pointer ${
                isListeningMic
                  ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/30 ring-8 ring-rose-100'
                  : 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-indigo-500/30 hover:scale-105'
              }`}
            >
              {isListeningMic ? <Mic className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
            </button>

            <div>
              <p className="font-bold text-base text-slate-900">
                {isListeningMic
                  ? 'Listening... Speak now'
                  : isSubmitting
                  ? 'Processing your answer...'
                  : '🎙️ Tap to Answer'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {isListeningMic ? 'Tap again when finished speaking' : 'Tap the microphone to speak your response'}
              </p>
            </div>

            {/* Live Transcript Preview */}
            <div className="w-full text-left p-4 rounded-2xl bg-slate-50 border border-slate-200 min-h-[90px] max-h-48 overflow-y-auto">
              {candidateText ? (
                <p className="text-slate-800 text-sm leading-relaxed">{candidateText}</p>
              ) : (
                <p className="text-slate-400 text-xs italic">
                  {isListeningMic ? 'Listening to speech...' : 'Your spoken answer will appear here...'}
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Text Typing View */
          <div className="space-y-2">
            <textarea
              rows={5}
              value={candidateText}
              onChange={(e) => {
                setCandidateText(e.target.value);
                const stats = analyzeSpeechTranscript(e.target.value);
                setFillerStats(stats);
              }}
              placeholder="Type your answer here... Be specific and use real-world examples."
              disabled={isSubmitting}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-slate-900 placeholder-slate-400 text-sm leading-relaxed resize-y"
              autoFocus
            />
          </div>
        )}

        {/* Action Button (Sticky on mobile, clean on desktop) */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            {candidateText ? `${candidateText.split(/\s+/).filter(Boolean).length} words` : ''}
          </span>

          <button
            type="button"
            onClick={handleSubmitAnswer}
            disabled={!candidateText.trim() || isSubmitting}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing next question...</span>
              </>
            ) : (
              <>
                <span>Send Answer</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
