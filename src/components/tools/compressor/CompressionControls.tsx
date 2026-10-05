'use client';

import { CompressionPreset, CompressionSettings, OutputFormat } from '@/types/compressor';
import { Sliders, Zap, Sparkles, Feather, Image as ImageIcon } from 'lucide-react';

interface CompressionControlsProps {
  settings: CompressionSettings;
  preset: CompressionPreset;
  onPresetChange: (preset: CompressionPreset) => void;
  onSettingsChange: (newSettings: Partial<CompressionSettings>) => void;
  disabled?: boolean;
}

export default function CompressionControls({
  settings,
  preset,
  onPresetChange,
  onSettingsChange,
  disabled = false,
}: CompressionControlsProps) {
  const handlePresetSelect = (selectedPreset: CompressionPreset) => {
    onPresetChange(selectedPreset);
    if (selectedPreset === 'balanced') {
      onSettingsChange({ quality: 75 });
    } else if (selectedPreset === 'aggressive') {
      onSettingsChange({ quality: 55 });
    } else if (selectedPreset === 'light') {
      onSettingsChange({ quality: 90 });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Compression Settings</h3>
            <p className="text-xs text-slate-500">Fine-tune compression ratio, target format, and resolution</p>
          </div>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Compression Mode Preset
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Balanced */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => handlePresetSelect('balanced')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              preset === 'balanced'
                ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Balanced
              </span>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full">
                75%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Best balance of high quality & ~70% size cut.
            </p>
          </button>

          {/* Aggressive */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => handlePresetSelect('aggressive')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              preset === 'aggressive'
                ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Max Reduction
              </span>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full">
                55%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Aggressive byte saving for mobile loading.
            </p>
          </button>

          {/* Light / High Quality */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => handlePresetSelect('light')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              preset === 'light'
                ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5 text-emerald-600" />
                Light
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                90%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Maximum sharpness for high-res photography.
            </p>
          </button>

          {/* Custom Slider */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => handlePresetSelect('custom')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              preset === 'custom'
                ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                Custom
              </span>
              <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded-full">
                {settings.quality}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Manual quality & precision slider.
            </p>
          </button>
        </div>
      </div>

      {/* Custom Quality Slider (active when custom or fine-tuning) */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">Quality Factor: {settings.quality}%</span>
          <span className="text-slate-500 font-medium">
            {settings.quality >= 85
              ? 'Near-Lossless / Crystal Clear'
              : settings.quality >= 65
              ? 'Optimal Web Balance'
              : 'High Compression Ratio'}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          step="1"
          disabled={disabled}
          value={settings.quality}
          onChange={(e) => {
            onPresetChange('custom');
            onSettingsChange({ quality: parseInt(e.target.value, 10) });
          }}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>10% (Smallest file)</span>
          <span>50%</span>
          <span>75% (Recommended)</span>
          <span>100% (Best quality)</span>
        </div>
      </div>

      {/* Grid of Output Format & Resolution options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Output Format */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Output Format
          </label>
          <select
            disabled={disabled}
            value={settings.format}
            onChange={(e) => onSettingsChange({ format: e.target.value as OutputFormat })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:outline-none cursor-pointer"
          >
            <option value="original">Original Format (Keep unchanged)</option>
            <option value="webp">Convert to WebP (Recommended for SEO & Web)</option>
            <option value="jpeg">Convert to JPEG (Universal compatibility)</option>
            <option value="png">Convert to PNG (Lossless graphics)</option>
          </select>
        </div>

        {/* Max Dimension */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Max Image Width
          </label>
          <select
            disabled={disabled}
            value={settings.maxWidth}
            onChange={(e) => onSettingsChange({ maxWidth: parseInt(e.target.value, 10) })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:outline-none cursor-pointer"
          >
            <option value={0}>Original Dimensions (No Resizing)</option>
            <option value={1920}>Full HD (Max 1920px width - Great for Web)</option>
            <option value={1200}>Standard Web (Max 1200px width - Articles & Blogs)</option>
            <option value={800}>Mobile Optimized (Max 800px width)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
