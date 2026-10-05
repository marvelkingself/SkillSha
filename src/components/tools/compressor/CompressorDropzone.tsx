'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle, ShieldCheck } from 'lucide-react';

interface CompressorDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export default function CompressorDropzone({
  onFilesSelected,
  disabled = false,
}: CompressorDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (rawFiles: FileList | File[]) => {
    setErrorMessage(null);
    const validFiles: File[] = [];
    const filesArray = Array.from(rawFiles);

    for (const file of filesArray) {
      const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
      const isExtSupported = SUPPORTED_EXTENSIONS.includes(ext);
      const isMimeSupported =
        file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';

      if (isExtSupported || isMimeSupported) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      setErrorMessage('Please upload valid JPG, PNG, or WebP images.');
      return;
    }

    onFilesSelected(validFiles);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
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
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so re-selecting same file triggers change
      e.target.value = '';
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none ${
          disabled ? 'opacity-60 cursor-not-allowed border-slate-300 bg-slate-50' : ''
        } ${
          isDragging
            ? 'border-blue-500 bg-blue-50/70 scale-[1.008] shadow-lg shadow-blue-500/10'
            : 'border-slate-300 hover:border-blue-400 bg-white hover:bg-slate-50/60 shadow-sm'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          multiple
          disabled={disabled}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Main Icon */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isDragging
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'bg-blue-50 text-blue-600'
            }`}
          >
            {isDragging ? (
              <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            ) : (
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Drag & Drop your images here, or{' '}
              <span className="text-blue-600 underline underline-offset-4 font-semibold">
                Browse Files
              </span>
            </h3>
            <p className="text-sm text-slate-500">
              Supports <span className="font-semibold text-slate-700">JPG, PNG, WebP</span> • Batch multiple files supported
            </p>
          </div>

          {/* Privacy badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Private • Instant In-Browser Compression (No upload needed)</span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
