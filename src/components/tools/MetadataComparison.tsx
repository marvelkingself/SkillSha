'use client';

import { FieldComparison } from '@/types/tools';
import { CheckCircle2, XCircle, MinusCircle, AlertCircle, ShieldCheck } from 'lucide-react';

interface MetadataComparisonProps {
  comparisons: FieldComparison[];
}

export default function MetadataComparison({ comparisons }: MetadataComparisonProps) {
  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Before vs. After Verification Audit</span>
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            A secondary scan was performed on the cleaned output image. Only items verified absent are marked &ldquo;Removed&rdquo;.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-white/10 text-zinc-400 uppercase tracking-wider font-bold text-[10px]">
              <th className="py-3 px-3">Metadata Category</th>
              <th className="py-3 px-3">Before Clean</th>
              <th className="py-3 px-3">After Clean</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 hidden md:table-cell">Audit Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
            {comparisons.map((row) => {
              const isRemoved = row.status === 'Removed';
              const isNotFound = row.status === 'Not Found';
              const isUnsupported = row.status === 'Unsupported';

              return (
                <tr key={row.category} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-zinc-900 dark:text-white">
                    {row.category}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        row.before === 'Found'
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {row.before}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        row.after === 'Absent'
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                          : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {row.after}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {isRemoved && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/50">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Removed</span>
                      </span>
                    )}
                    {isNotFound && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        <MinusCircle className="w-3 h-3" />
                        <span>Not Found</span>
                      </span>
                    )}
                    {isUnsupported && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>Unsupported</span>
                      </span>
                    )}
                    {!isRemoved && !isNotFound && !isUnsupported && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400">
                        <XCircle className="w-3 h-3" />
                        <span>{row.status}</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-zinc-500 dark:text-zinc-400 hidden md:table-cell text-[11px]">
                    {row.notes}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
