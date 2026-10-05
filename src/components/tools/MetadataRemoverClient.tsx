'use client';

import { useState } from 'react';
import {
  MetadataScanResult,
  CleaningMode,
  CleanApiResponse,
  ScanApiResponse,
} from '@/types/tools';
import UploadDropzone from './UploadDropzone';
import FilePreview from './FilePreview';
import MetadataReport from './MetadataReport';
import CleaningModeSelector from './CleaningModeSelector';
import ProcessingProgress from './ProcessingProgress';
import ResultSummary from './ResultSummary';
import MetadataComparison from './MetadataComparison';
import DownloadButton from './DownloadButton';
import PrivacyNotice from './PrivacyNotice';
import { AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

export default function MetadataRemoverClient() {
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<{ width?: number; height?: number } | undefined>(undefined);
  const [scanResult, setScanResult] = useState<MetadataScanResult | null>(null);
  const [cleaningMode, setCleaningMode] = useState<CleaningMode>('metadata-only');
  const [quality, setQuality] = useState<number>(90);
  const [processingState, setProcessingState] = useState<'idle' | 'scanning' | 'cleaning' | 'verifying' | 'done'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [cleanedResult, setCleanedResult] = useState<CleanApiResponse['data'] | null>(null);

  // Read dimensions from image object
  const inspectDimensions = (f: File) => {
    const img = new window.Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  // Step 1: File Selected & Fast Scan
  const handleFileSelected = async (selectedFile: File) => {
    setFile(selectedFile);
    setCleanedResult(null);
    setErrorMessage(null);
    setProcessingState('scanning');
    inspectDimensions(selectedFile);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('action', 'scan');

      const res = await fetch('/api/tools/metadata-cleaner', {
        method: 'POST',
        body: formData,
      });

      const json: ScanApiResponse = await res.json();
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || 'Failed to scan image headers.');
      }

      setScanResult(json.data);
      if (json.data.imageInfo.width && json.data.imageInfo.height) {
        setDimensions({ width: json.data.imageInfo.width, height: json.data.imageInfo.height });
      }
      setProcessingState('idle');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Could not scan image headers. The file may be unsupported.');
      setProcessingState('idle');
    }
  };

  // Step 2: Clean and Verify Execution
  const handleClean = async () => {
    if (!file) return;

    setErrorMessage(null);
    setProcessingState('cleaning');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('action', 'clean');
      formData.append('mode', cleaningMode);
      formData.append('quality', String(quality));

      // After 400ms switch progress indicator to verifying to inform the user
      setTimeout(() => {
        setProcessingState((prev) => (prev === 'cleaning' ? 'verifying' : prev));
      }, 500);

      const res = await fetch('/api/tools/metadata-cleaner', {
        method: 'POST',
        body: formData,
      });

      const json: CleanApiResponse = await res.json();
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || 'Failed to clean image metadata.');
      }

      setCleanedResult(json.data);
      setProcessingState('done');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'An error occurred while cleaning the image. Please try again.');
      setProcessingState('idle');
    }
  };

  const handleReset = () => {
    setFile(null);
    setDimensions(undefined);
    setScanResult(null);
    setCleanedResult(null);
    setProcessingState('idle');
    setErrorMessage(null);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Privacy Notice */}
      <PrivacyNotice />

      {/* Main Interactive Workspace */}
      <div className="space-y-6">
        {/* Upload Dropzone (When no file is selected) */}
        {!file && (
          <UploadDropzone onFileSelected={handleFileSelected} />
        )}

        {/* File Preview (When file is active) */}
        {file && (
          <FilePreview
            file={file}
            dimensions={dimensions}
            onReplace={handleReset}
            onRemove={handleReset}
          />
        )}

        {/* Processing State Indicator */}
        {processingState !== 'idle' && processingState !== 'done' && (
          <ProcessingProgress
            currentStep={
              processingState === 'scanning'
                ? 'scanning'
                : processingState === 'cleaning'
                ? 'cleaning'
                : 'verifying'
            }
          />
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Pre-Clean: Metadata Report & Mode Selector */}
        {file && scanResult && !cleanedResult && processingState === 'idle' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <MetadataReport scanResult={scanResult} />

            <CleaningModeSelector
              selectedMode={cleaningMode}
              onModeChange={setCleaningMode}
              quality={quality}
              onQualityChange={setQuality}
              onCleanClick={handleClean}
              isProcessing={processingState !== 'idle'}
            />
          </div>
        )}

        {/* Post-Clean: Results, Audit Verification, Download */}
        {cleanedResult && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <ResultSummary
              verification={cleanedResult.verification}
              filename={cleanedResult.filename}
            />

            <MetadataComparison
              comparisons={cleanedResult.verification.comparisons}
            />

            {/* Cleaned Image Preview & Download Button */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Cleaned Image Ready for Download</span>
                </h4>
                <span className="text-xs text-zinc-400">
                  {cleanedResult.filename}
                </span>
              </div>

              <div className="relative max-h-96 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center border border-zinc-200 dark:border-white/10 p-2">
                <img
                  src={cleanedResult.cleanedImageBase64}
                  alt="Cleaned preview"
                  className="max-h-80 w-auto object-contain rounded-xl"
                />
              </div>

              <DownloadButton
                dataUri={cleanedResult.cleanedImageBase64}
                filename={cleanedResult.filename}
                onReset={handleReset}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
