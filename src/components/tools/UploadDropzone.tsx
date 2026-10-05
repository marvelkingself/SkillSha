'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
  maxSizeBytes?: number; // default 25MB
}

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.heic'];
const SUPPORTED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/tiff',
  'image/heic',
  'image/heif',
];

export default function UploadDropzone({
  onFileSelected,
  maxSizeBytes = 25 * 1024 * 1024,
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndHandleFile = (file: File) => {
    setErrorMessage(null);

    // File size check
    if (file.size > maxSizeBytes) {
      const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
      setErrorMessage(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is ${maxMb} MB.`);
      return;
    }

    // Format extension / mime check
    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
    const isSupportedMime = SUPPORTED_MIME_TYPES.includes(file.type);
    const isSupportedExt = SUPPORTED_EXTENSIONS.includes(ext);

    if (!isSupportedMime && !isSupportedExt) {
      setErrorMessage('Unsupported file format. Please upload a JPG, PNG, WebP, AVIF, or TIFF image.');
      return;
    }

    onFileSelected(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndHandleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer select-none text-center ${
          isDragging
            ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/20 scale-[1.01]'
            : 'border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={SUPPORTED_EXTENSIONS.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Upload Icon Circle */}
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-4 shadow-sm group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>

        {/* Main Upload Copy */}
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
          Drop your image here, or <span className="text-blue-600 dark:text-blue-400 underline decoration-blue-300">browse</span>
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
          Supports JPG, PNG, WebP, AVIF, TIFF up to 25 MB.
        </p>

        {/* Supported Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
          {['JPG', 'JPEG', 'PNG', 'WEBP', 'AVIF', 'TIFF'].map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded-md text-[10px] font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/40"
            >
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
