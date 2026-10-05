import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

export default function PrivacyNotice() {
  return (
    <div className="p-6 rounded-3xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 space-y-4">
      <div className="flex items-center gap-2.5 text-blue-700 dark:text-blue-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <h4 className="text-sm font-bold uppercase tracking-wider">
          Privacy & Zero-Retention Guarantee
        </h4>
      </div>

      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
        Your image is processed for metadata cleaning. Temporary files are automatically removed after processing.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <ServerOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Zero Server Storage</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>No Third-Party Transmission</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <EyeOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Never Used for AI Training</span>
        </div>
      </div>
    </div>
  );
}
