'use client';

import { useState, useRef, useCallback } from 'react';
import {
  CompressedPdfItem,
  PdfCompressionPreset,
  PdfCompressionSettings,
} from '@/types/pdf';
import {
  compressPdfInBrowser,
  formatFileSize,
  downloadBlob,
} from '@/lib/tools/pdf/pdf-compressor';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingDown,
  Layers,
} from 'lucide-react';

export default function PdfClient() {
  const [items, setItems] = useState<CompressedPdfItem[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [preset, setPreset] = useState<PdfCompressionPreset>('balanced');
  const [stripMetadata, setStripMetadata] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getSettingsForPreset = (p: PdfCompressionPreset): PdfCompressionSettings => {
    switch (p) {
      case 'extreme':
        return { preset: 'extreme', quality: 0.4, stripMetadata };
      case 'light':
        return { preset: 'light', quality: 0.85, stripMetadata };
      case 'balanced':
      default:
        return { preset: 'balanced', quality: 0.65, stripMetadata };
    }
  };

  const runCompressionQueue = useCallback(
    async (itemsToProcess: CompressedPdfItem[], currentPreset: PdfCompressionPreset) => {
      setIsProcessing(true);
      const settings = getSettingsForPreset(currentPreset);

      const updated = await Promise.all(
        itemsToProcess.map(async (item) => {
          try {
            const res = await compressPdfInBrowser(item.originalFile, settings);
            return {
              ...item,
              compressedBlob: res.blob,
              compressedSize: res.size,
              savingsBytes: res.savingsBytes,
              savingsPercent: res.savingsPercent,
              status: 'done' as const,
              errorMsg: undefined,
            };
          } catch (err: unknown) {
            const errorMsg =
              err instanceof Error ? err.message : 'Compression failed for this PDF.';
            return {
              ...item,
              status: 'error' as const,
              errorMsg,
            };
          }
        })
      );

      setItems(updated);
      setIsProcessing(false);
    },
    [stripMetadata]
  );

  const handleFilesSelected = async (files: File[]) => {
    const pdfFiles = files.filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );

    if (pdfFiles.length === 0) return;

    const newItems: CompressedPdfItem[] = pdfFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      originalFile: file,
      name: file.name,
      originalSize: file.size,
      compressedBlob: null,
      compressedSize: file.size,
      savingsBytes: 0,
      savingsPercent: 0,
      status: 'processing' as const,
    }));

    const combinedList = [...items, ...newItems];
    setItems(combinedList);

    await runCompressionQueue(combinedList, preset);
  };

  const handlePresetChange = (newPreset: PdfCompressionPreset) => {
    setPreset(newPreset);
    if (items.length > 0) {
      setItems((prev) =>
        prev.map((item) => ({ ...item, status: 'processing' as const }))
      );
      runCompressionQueue(items, newPreset);
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
  };

  const handleDownloadSingle = (item: CompressedPdfItem) => {
    if (!item.compressedBlob) return;
    const dotIdx = item.name.lastIndexOf('.');
    const base = dotIdx !== -1 ? item.name.substring(0, dotIdx) : item.name;
    downloadBlob(item.compressedBlob, `${base}-optimized.pdf`);
  };

  const handleDownloadAll = () => {
    const doneItems = items.filter((i) => i.status === 'done' && i.compressedBlob);
    doneItems.forEach((item, idx) => {
      setTimeout(() => {
        const dotIdx = item.name.lastIndexOf('.');
        const base = dotIdx !== -1 ? item.name.substring(0, dotIdx) : item.name;
        downloadBlob(item.compressedBlob!, `${base}-optimized.pdf`);
      }, idx * 250);
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) {
            handleFilesSelected(Array.from(e.dataTransfer.files));
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 sm:p-12 rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-blue-500 dark:hover:border-blue-400 bg-white/70 dark:bg-zinc-900/70 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center cursor-pointer shadow-sm group"
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
          <FileText className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
            Drag & Drop PDF Documents Here
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            or click to browse from your device. Multi-file batch processing supported.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>100% In-Browser Privacy • Up to 50MB</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={(e) => {
            if (e.target.files) handleFilesSelected(Array.from(e.target.files));
          }}
          className="hidden"
        />
      </div>

      {/* Preset Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Compression Level</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Select the desired balance between file size reduction and image clarity.
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={stripMetadata}
              onChange={(e) => setStripMetadata(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Strip Redundant XML Metadata</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'extreme',
              label: 'Extreme Compression',
              reduction: '~60% Reduction',
              desc: 'Smallest file size. Ideal for strict portal upload limits and email.',
            },
            {
              id: 'balanced',
              label: 'Recommended',
              reduction: '~45% Reduction',
              desc: 'Best balance. Great quality with significant size reduction.',
            },
            {
              id: 'light',
              label: 'Light Compression',
              reduction: '~20% Reduction',
              desc: 'Highest visual clarity. Best for high-res portfolio printing.',
            },
          ].map((opt) => {
            const isSelected = preset === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handlePresetChange(opt.id as PdfCompressionPreset)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-xs'
                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 bg-slate-50/30 dark:bg-zinc-800/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{opt.label}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {opt.reduction}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{opt.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Processed Batch Items List */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-800 dark:text-zinc-200">
                Queue ({items.length} {items.length === 1 ? 'document' : 'documents'})
              </span>
              {isProcessing && (
                <span className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Optimizing...</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadAll}
                disabled={isProcessing}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download All</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Clear queue"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* File info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-bold text-sm text-slate-800 dark:text-zinc-200 truncate max-w-xs sm:max-w-md">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span>{formatFileSize(item.originalSize)}</span>
                      {item.status === 'done' && (
                        <>
                          <span>➔</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {formatFileSize(item.compressedSize)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  {item.status === 'processing' && (
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Compressing</span>
                    </div>
                  )}

                  {item.status === 'error' && (
                    <div className="flex items-center gap-1 text-xs text-red-500 font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      <span>{item.errorMsg || 'Failed'}</span>
                    </div>
                  )}

                  {item.status === 'done' && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      -{item.savingsPercent}%
                    </span>
                  )}

                  {item.status === 'done' && (
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(item)}
                      className="py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
