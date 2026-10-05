'use client';

import { VerificationReport } from '@/types/tools';
import { CheckCircle2, TrendingDown, Layers, FileCheck } from 'lucide-react';

interface ResultSummaryProps {
  verification: VerificationReport;
  filename: string;
}

export default function ResultSummary({ verification, filename }: ResultSummaryProps) {
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 1. Status Card */}
      <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0 shadow-md shadow-emerald-500/20">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Audit Status
          </h4>
          <p className="text-sm font-extrabold text-emerald-900 dark:text-emerald-100">
            {verification.allCleanedSuccessfully ? '100% Verified Clean' : 'Clean Complete'}
          </p>
        </div>
      </div>

      {/* 2. File Size Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm flex items-center gap-3">
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
          <TrendingDown className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            File Size
          </h4>
          <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
            <span>{formatBytes(verification.cleanedSizeBytes)}</span>
            {verification.sizeSavingsPercent > 0 && (
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                -{verification.sizeSavingsPercent}%
              </span>
            )}
          </p>
        </div>
      </div>

      {/* 3. Mode Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm flex items-center gap-3">
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Cleaning Mode
          </h4>
          <p className="text-sm font-bold text-zinc-900 dark:text-white capitalize">
            {verification.modeUsed === 'metadata-only' ? 'Metadata Only' : 'Re-encoded Image'}
          </p>
        </div>
      </div>
    </div>
  );
}
