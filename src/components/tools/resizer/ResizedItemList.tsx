'use client';

import { useState } from 'react';
import { ResizedItem } from '@/types/resizer';
import { formatFileSize, downloadBlob } from '@/lib/tools/resizer/browser-resizer';
import {
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';

interface ResizedItemListProps {
  items: ResizedItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  disabled?: boolean;
}

export default function ResizedItemList({
  items,
  onRemoveItem,
  onClearAll,
  disabled = false,
}: ResizedItemListProps) {
  const [activeModalItem, setActiveModalItem] = useState<ResizedItem | null>(null);

  if (items.length === 0) return null;

  const doneItems = items.filter((item) => item.status === 'done' && item.resizedBlob);
  const isAllDone = doneItems.length === items.length && items.length > 0;

  const handleDownloadAll = () => {
    doneItems.forEach((item, index) => {
      if (!item.resizedBlob) return;
      setTimeout(() => {
        const dotIndex = item.originalName.lastIndexOf('.');
        const baseName = dotIndex !== -1 ? item.originalName.substring(0, dotIndex) : item.originalName;
        const filename = `${baseName}-${item.resizedWidth}x${item.resizedHeight}.${item.outputFormat || 'jpg'}`;
        downloadBlob(item.resizedBlob!, filename);
      }, index * 250);
    });
  };

  const handleDownloadSingle = (item: ResizedItem) => {
    if (!item.resizedBlob) return;
    const dotIndex = item.originalName.lastIndexOf('.');
    const baseName = dotIndex !== -1 ? item.originalName.substring(0, dotIndex) : item.originalName;
    const filename = `${baseName}-${item.resizedWidth}x${item.resizedHeight}.${item.outputFormat || 'jpg'}`;
    downloadBlob(item.resizedBlob, filename);
  };

  return (
    <div className="space-y-4">
      {/* Batch Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            {doneItems.length}/{items.length}
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">
              {isAllDone ? 'All Images Successfully Resized' : 'Processing Image Queue'}
            </h4>
            <p className="text-xs text-slate-400">
              {items.length} photo{items.length > 1 ? 's' : ''} in queue • 100% private in-browser engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {doneItems.length > 1 && (
            <button
              type="button"
              onClick={handleDownloadAll}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              Download All ({doneItems.length})
            </button>
          )}

          <button
            type="button"
            disabled={disabled}
            onClick={onClearAll}
            className="px-3.5 py-2.5 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-slate-300 transition-all"
          >
            {/* Thumbnail + Dimensions Info */}
            <div className="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.resizedPreviewUrl || item.originalPreviewUrl}
                  alt={item.originalName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-slate-900 text-sm truncate max-w-[220px]">
                    {item.originalName}
                  </h5>
                  {item.outputFormat && (
                    <span className="text-[10px] uppercase font-extrabold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                      {item.outputFormat}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                  <span className="font-medium text-slate-600">
                    {item.originalWidth} × {item.originalHeight} px
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="font-bold text-blue-600">
                    {item.resizedWidth} × {item.resizedHeight} px
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>{formatFileSize(item.resizedSize || item.originalSize)}</span>
                </div>
              </div>
            </div>

            {/* Status & Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
              {item.status === 'processing' && (
                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold px-3 py-1.5 bg-blue-50 rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Resizing...</span>
                </div>
              )}

              {item.status === 'error' && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold px-3 py-1.5 bg-red-50 rounded-xl">
                  <AlertCircle className="w-4 h-4" />
                  <span>Failed</span>
                </div>
              )}

              {item.status === 'done' && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                    title="Compare / Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(item)}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Resized Preview & Inspection</h4>
                <p className="text-xs text-slate-500">{activeModalItem.originalName}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Original */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Original Photo</span>
                  <span>{activeModalItem.originalWidth} × {activeModalItem.originalHeight} px</span>
                </div>
                <div className="h-64 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeModalItem.originalPreviewUrl}
                    alt="Original"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>
                <div className="text-[11px] text-slate-400 text-center">
                  Size: {formatFileSize(activeModalItem.originalSize)}
                </div>
              </div>

              {/* Resized */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Resized Output</span>
                  <span>{activeModalItem.resizedWidth} × {activeModalItem.resizedHeight} px</span>
                </div>
                <div className="h-64 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-2 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeModalItem.resizedPreviewUrl || activeModalItem.originalPreviewUrl}
                    alt="Resized"
                    className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                  />
                </div>
                <div className="text-[11px] text-slate-500 text-center font-medium">
                  Size: {formatFileSize(activeModalItem.resizedSize || 0)} • {activeModalItem.outputFormat?.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadSingle(activeModalItem);
                  setActiveModalItem(null);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30"
              >
                <Download className="w-4 h-4" />
                Download Resized
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
