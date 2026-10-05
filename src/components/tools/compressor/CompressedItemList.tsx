'use client';

import { useState } from 'react';
import { CompressedItem } from '@/types/compressor';
import { formatFileSize, downloadBlob } from '@/lib/tools/compressor/browser-compressor';
import {
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';

interface CompressedItemListProps {
  items: CompressedItem[];
  onRemoveItem: (id: string) => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
  isProcessing: boolean;
}

export default function CompressedItemList({
  items,
  onRemoveItem,
  onDownloadAll,
  onClearAll,
  isProcessing,
}: CompressedItemListProps) {
  const [comparingItem, setComparingItem] = useState<CompressedItem | null>(null);

  if (items.length === 0) return null;

  // Calculate overall stats
  const totalOriginalSize = items.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressedSize = items.reduce(
    (acc, curr) => acc + (curr.status === 'done' ? curr.compressedSize : curr.originalSize),
    0
  );
  const totalSavedBytes = Math.max(0, totalOriginalSize - totalCompressedSize);
  const overallSavingsPercent =
    totalOriginalSize > 0 ? Math.round((totalSavedBytes / totalOriginalSize) * 100) : 0;
  const completedCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="space-y-6">
      {/* Global Savings Summary Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{overallSavingsPercent}% Overall Reduction</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Saved {formatFileSize(totalSavedBytes)} of bandwidth!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Processed {completedCount} of {items.length} images. Ready for high-speed web delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onDownloadAll}
              disabled={isProcessing || completedCount === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>Download All ({completedCount})</span>
            </button>
            <button
              type="button"
              onClick={onClearAll}
              disabled={isProcessing}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all disabled:opacity-50"
            >
              Clear Queue
            </button>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="block text-[11px] text-slate-400 uppercase font-mono">Original</span>
            <span className="text-sm sm:text-base font-bold text-slate-200">
              {formatFileSize(totalOriginalSize)}
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="block text-[11px] text-slate-400 uppercase font-mono">Compressed</span>
            <span className="text-sm sm:text-base font-bold text-emerald-400">
              {formatFileSize(totalCompressedSize)}
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="block text-[11px] text-slate-400 uppercase font-mono">Space Saved</span>
            <span className="text-sm sm:text-base font-bold text-blue-300">
              {formatFileSize(totalSavedBytes)}
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="block text-[11px] text-slate-400 uppercase font-mono">Items</span>
            <span className="text-sm sm:text-base font-bold text-amber-300">{items.length} Images</span>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {items.map((item) => {
          const isDone = item.status === 'done';
          const isCompressing = item.status === 'compressing';
          const isError = item.status === 'error';

          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-4 transition-all hover:border-slate-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Left: Thumbnail & Name */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 group">
                  <img
                    src={item.compressedPreviewUrl || item.originalPreviewUrl}
                    alt={item.originalName}
                    className="w-full h-full object-cover"
                  />
                  {isDone && (
                    <button
                      type="button"
                      onClick={() => setComparingItem(item)}
                      title="Inspect Before & After"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-800 text-sm truncate" title={item.originalName}>
                    {item.originalName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                    <span>{formatFileSize(item.originalSize)}</span>
                    {isDone && (
                      <>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="font-semibold text-emerald-700">
                          {formatFileSize(item.compressedSize)}
                        </span>
                        {item.width > 0 && item.height > 0 && (
                          <span className="text-slate-400 font-mono text-[11px]">
                            • {item.width}×{item.height}px
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Status badge & Action Buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Savings or Processing Badge */}
                <div>
                  {isCompressing && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      Compressing...
                    </span>
                  )}
                  {isDone && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        item.savingsPercent > 0
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <TrendingDown className="w-3 h-3 text-emerald-600" />
                      -{item.savingsPercent}%
                    </span>
                  )}
                  {isError && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                      Failed
                    </span>
                  )}
                </div>

                {/* Compare Button */}
                {isDone && (
                  <button
                    type="button"
                    onClick={() => setComparingItem(item)}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Before / After Comparison"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}

                {/* Download Button */}
                {isDone && item.compressedBlob && (
                  <button
                    type="button"
                    onClick={() => {
                      const ext = item.outputFormat.includes('webp')
                        ? '.webp'
                        : item.outputFormat.includes('png')
                        ? '.png'
                        : '.jpg';
                      const base =
                        item.originalName.substring(0, item.originalName.lastIndexOf('.')) ||
                        item.originalName;
                      downloadBlob(item.compressedBlob!, `${base}-compressed${ext}`);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                )}

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove from queue"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Modal */}
      {comparingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900">Before & After Comparison</h3>
              </div>
              <button
                type="button"
                onClick={() => setComparingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-600">Original</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {formatFileSize(comparingItem.originalSize)}
                  </span>
                </div>
                <div className="rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center min-h-[220px]">
                  <img
                    src={comparingItem.originalPreviewUrl}
                    alt="Original"
                    className="max-h-[360px] object-contain w-auto mx-auto"
                  />
                </div>
              </div>

              {/* Compressed */}
              <div className="border border-emerald-200 rounded-xl p-3 bg-emerald-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-800">Optimized</span>
                  <span className="text-xs font-bold text-emerald-700">
                    {formatFileSize(comparingItem.compressedSize)} (-{comparingItem.savingsPercent}%)
                  </span>
                </div>
                <div className="rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center min-h-[220px]">
                  <img
                    src={comparingItem.compressedPreviewUrl || comparingItem.originalPreviewUrl}
                    alt="Optimized"
                    className="max-h-[360px] object-contain w-auto mx-auto"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setComparingItem(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
