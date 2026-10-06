'use client';

import { useState } from 'react';
import {
  ResizeSettings,
  ResizeMode,
  FitMode,
  OutputFormat,
  SocialPreset,
} from '@/types/resizer';
import { SOCIAL_PRESETS } from '@/lib/tools/resizer/browser-resizer';
import {
  Sliders,
  Maximize2,
  Percent,
  LayoutGrid,
  Lock,
  Unlock,
  ArrowRightLeft,
  Sparkles,
  Crop,
  Layers,
  Palette,
} from 'lucide-react';

interface ResizerControlsProps {
  settings: ResizeSettings;
  onSettingsChange: (newSettings: Partial<ResizeSettings>) => void;
  disabled?: boolean;
  baseWidth: number;
  baseHeight: number;
}

export default function ResizerControls({
  settings,
  onSettingsChange,
  disabled = false,
  baseWidth,
  baseHeight,
}: ResizerControlsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Instagram');

  // Handle Dimension Width change
  const handleWidthChange = (val: number) => {
    if (settings.lockAspectRatio && baseWidth > 0 && baseHeight > 0) {
      const ratio = baseHeight / baseWidth;
      onSettingsChange({
        width: val,
        height: Math.round(val * ratio),
        selectedPresetId: undefined,
      });
    } else {
      onSettingsChange({ width: val, selectedPresetId: undefined });
    }
  };

  // Handle Dimension Height change
  const handleHeightChange = (val: number) => {
    if (settings.lockAspectRatio && baseWidth > 0 && baseHeight > 0) {
      const ratio = baseWidth / baseHeight;
      onSettingsChange({
        width: Math.round(val * ratio),
        height: val,
        selectedPresetId: undefined,
      });
    } else {
      onSettingsChange({ height: val, selectedPresetId: undefined });
    }
  };

  // Swap Width and Height
  const handleSwap = () => {
    onSettingsChange({
      width: settings.height,
      height: settings.width,
      selectedPresetId: undefined,
    });
  };

  // Quick Preset Selection
  const handleSelectPreset = (preset: SocialPreset) => {
    onSettingsChange({
      mode: 'preset',
      width: preset.width,
      height: preset.height,
      selectedPresetId: preset.id,
      fit: 'cover',
    });
  };

  const categories = ['Instagram', 'YouTube', 'Twitter / X', 'LinkedIn', 'Facebook', 'Standard'];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">Resize Configuration</h3>
            <p className="text-xs text-slate-500">
              Select custom pixel dimensions, percentage scale, or ready-to-use social presets
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSettingsChange({ mode: 'dimensions' })}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              settings.mode === 'dimensions'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Dimensions
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSettingsChange({ mode: 'percentage' })}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              settings.mode === 'percentage'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            Percentage
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSettingsChange({ mode: 'preset' })}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              settings.mode === 'preset'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Presets
          </button>
        </div>
      </div>

      {/* MODE 1: Custom Dimensions */}
      {settings.mode === 'dimensions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end">
            {/* Width Input */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex justify-between">
                <span>Width (Pixels)</span>
                {baseWidth > 0 && <span className="text-slate-400 font-normal">Original: {baseWidth}px</span>}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  disabled={disabled}
                  value={settings.width || ''}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)}
                  placeholder="Width"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">px</span>
              </div>
            </div>

            {/* Middle Controls (Lock & Swap) */}
            <div className="flex items-center justify-center gap-2 pb-1">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSettingsChange({ lockAspectRatio: !settings.lockAspectRatio })}
                title={settings.lockAspectRatio ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'}
                className={`p-2.5 rounded-xl border transition-all ${
                  settings.lockAspectRatio
                    ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                }`}
              >
                {settings.lockAspectRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>

              <button
                type="button"
                disabled={disabled}
                onClick={handleSwap}
                title="Swap Width and Height"
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Height Input */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex justify-between">
                <span>Height (Pixels)</span>
                {baseHeight > 0 && <span className="text-slate-400 font-normal">Original: {baseHeight}px</span>}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  disabled={disabled}
                  value={settings.height || ''}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)}
                  placeholder="Height"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">px</span>
              </div>
            </div>
          </div>

          {/* Quick Ratios */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-500">Quick Aspect Ratios:</span>
            {[
              { label: '1:1 Square', w: 1080, h: 1080 },
              { label: '4:5 Portrait', w: 1080, h: 1350 },
              { label: '16:9 Landscape', w: 1920, h: 1080 },
              { label: '9:16 Story/Reel', w: 1080, h: 1920 },
            ].map((ratio) => (
              <button
                key={ratio.label}
                type="button"
                disabled={disabled}
                onClick={() => onSettingsChange({ width: ratio.w, height: ratio.h, lockAspectRatio: false })}
                className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                {ratio.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODE 2: Percentage Scaling */}
      {settings.mode === 'percentage' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Scale Percentage
            </label>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-full">
              {settings.percentage}%
            </span>
          </div>

          {/* Quick Pills */}
          <div className="grid grid-cols-5 gap-2">
            {[25, 50, 75, 150, 200].map((pct) => (
              <button
                key={pct}
                type="button"
                disabled={disabled}
                onClick={() => onSettingsChange({ percentage: pct })}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  settings.percentage === pct
                    ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="space-y-1 pt-2">
            <input
              type="range"
              min="10"
              max="400"
              step="5"
              disabled={disabled}
              value={settings.percentage}
              onChange={(e) => onSettingsChange({ percentage: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>10% (Tiny)</span>
              <span>100% (Original)</span>
              <span>400% (4x Enlarge)</span>
            </div>
          </div>

          {baseWidth > 0 && baseHeight > 0 && (
            <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
              Target Dimensions: <strong className="text-slate-800">{Math.round(baseWidth * (settings.percentage / 100))} × {Math.round(baseHeight * (settings.percentage / 100))} px</strong>
            </p>
          )}
        </div>
      )}

      {/* MODE 3: Social & Display Presets */}
      {settings.mode === 'preset' && (
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                disabled={disabled}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Presets Grid for Active Category */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {SOCIAL_PRESETS.filter((p) => p.category === activeCategory).map((preset) => {
              const isSelected = settings.selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{preset.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{preset.aspectRatio}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-blue-600">
                    {preset.width} × {preset.height} px
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fit Mode & Background Color */}
      <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fit Mode */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Crop className="w-3.5 h-3.5 text-blue-600" />
            Fit Behavior
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'cover' as FitMode, name: 'Cover / Crop', desc: 'Fills canvas; center crops excess without stretching' },
              { id: 'contain' as FitMode, name: 'Contain / Fit', desc: 'Fits entire photo inside canvas with background padding' },
              { id: 'fill' as FitMode, name: 'Stretch / Fill', desc: 'Directly stretches image to exact dimensions' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                disabled={disabled}
                onClick={() => onSettingsChange({ fit: f.id })}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  settings.fit === f.id
                    ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold text-xs">{f.name}</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Format & Quality */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Target Format & Quality
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'original' as OutputFormat, name: 'Original' },
              { id: 'webp' as OutputFormat, name: 'WebP (Fast)' },
              { id: 'jpeg' as OutputFormat, name: 'JPG' },
              { id: 'png' as OutputFormat, name: 'PNG' },
            ].map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                disabled={disabled}
                onClick={() => onSettingsChange({ format: fmt.id })}
                className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                  settings.format === fmt.id
                    ? 'border-blue-600 bg-blue-50 text-blue-600 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {fmt.name}
              </button>
            ))}
          </div>

          {settings.format !== 'png' && (
            <div className="pt-2 flex items-center gap-3">
              <span className="text-[11px] font-semibold text-slate-600 whitespace-nowrap">
                Quality: {settings.quality}%
              </span>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                disabled={disabled}
                value={settings.quality}
                onChange={(e) => onSettingsChange({ quality: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
