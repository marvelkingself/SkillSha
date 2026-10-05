'use client';

import { CleaningMode } from '@/types/tools';
import { Layers, RefreshCw, Sliders, ShieldAlert, Sparkles } from 'lucide-react';

interface CleaningModeSelectorProps {
  selectedMode: CleaningMode;
  onModeChange: (mode: CleaningMode) => void;
  quality: number;
  onQualityChange: (quality: number) => void;
  onCleanClick: () => void;
  isProcessing: boolean;
}

export default function CleaningModeSelector({
  selectedMode,
  onModeChange,
  quality,
  onQualityChange,
  onCleanClick,
  isProcessing,
}: CleaningModeSelectorProps) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm space-y-6">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Choose Cleaning Mode</span>
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Select how deeply you want the image cleaned and rebuilt.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mode 1: Metadata Only */}
        <div
          onClick={() => onModeChange('metadata-only')}
          className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedMode === 'metadata-only'
              ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm'
              : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl ${
                    selectedMode === 'metadata-only'
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Metadata Only
                </h4>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Recommended
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Remove supported EXIF, GPS, XMP, IPTC, and AI metadata while preserving original image pixel streams and compression profiles.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            <span>Preserves exact pixel dimensions & color depth</span>
          </div>
        </div>

        {/* Mode 2: Re-encode Image */}
        <div
          onClick={() => onModeChange('re-encode')}
          className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedMode === 're-encode'
              ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm'
              : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl ${
                    selectedMode === 're-encode'
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Re-encode Image
                </h4>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Deep Clean
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Creates a fresh encoded image buffer from raw canvas to strip embedded container headers. File characteristics and quality may slightly adapt.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500">
            <span>Guarantees 100% new container headers</span>
          </div>
        </div>
      </div>

      {/* Quality Slider for Re-encode Mode */}
      {selectedMode === 're-encode' && (
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-white/5 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-700 dark:text-zinc-300">Re-encoding Quality</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{quality}%</span>
          </div>

          <input
            type="range"
            min="70"
            max="100"
            step="5"
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase">
            <span>70% (Smaller size)</span>
            <span>90% (Optimal Default)</span>
            <span>100% (Maximum Quality)</span>
          </div>
        </div>
      )}

      {/* Action CTA Button */}
      <button
        onClick={onCleanClick}
        disabled={isProcessing}
        className="w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Cleaning & Verifying Metadata...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Clean & Verify Image Metadata</span>
          </>
        )}
      </button>
    </div>
  );
}
