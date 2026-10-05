'use client';

import { CheckCircle2, Loader2 } from 'lucide-react';

interface ProcessingProgressProps {
  currentStep: 'scanning' | 'cleaning' | 'verifying' | 'done';
}

const STEPS = [
  { id: 'scanning', label: '1. Scanning Headers', desc: 'Parsing EXIF, GPS, XMP, IPTC, C2PA' },
  { id: 'cleaning', label: '2. Removing Metadata', desc: 'Sanitizing container segments' },
  { id: 'verifying', label: '3. Verifying Results', desc: 'Running secondary post-clean scan' },
];

export default function ProcessingProgress({ currentStep }: ProcessingProgressProps) {
  const getStepStatus = (stepId: string) => {
    if (currentStep === 'done') return 'completed';
    const order = ['scanning', 'cleaning', 'verifying', 'done'];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        Processing Pipeline
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {STEPS.map((step) => {
          const status = getStepStatus(step.id);
          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                status === 'completed'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                  : status === 'active'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600 text-blue-900 dark:text-blue-200 animate-pulse'
                  : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-400'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                {status === 'active' && <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />}
                {status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />}
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold">{step.label}</div>
                <div className="text-[11px] opacity-80">{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
