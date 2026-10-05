'use client';

import { Download, RefreshCw, Check } from 'lucide-react';
import { useState } from 'react';

interface DownloadButtonProps {
  dataUri: string;
  filename: string;
  onReset: () => void;
}

export default function DownloadButton({ dataUri, filename, onReset }: DownloadButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <button
        onClick={handleDownload}
        className="w-full sm:flex-1 py-4 px-6 rounded-2xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {downloaded ? (
          <>
            <Check className="w-5 h-5" />
            <span>Image Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download Clean Image</span>
          </>
        )}
      </button>

      <button
        onClick={onReset}
        className="w-full sm:w-auto py-4 px-6 rounded-2xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Clean Another Image</span>
      </button>
    </div>
  );
}
