'use client';

import { useState } from 'react';
import {
  MetadataScanResult,
  MetadataField,
} from '@/types/tools';
import {
  Camera,
  MapPin,
  FileCode,
  FileSpreadsheet,
  Fingerprint,
  Bot,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
} from 'lucide-react';

interface MetadataReportProps {
  scanResult: MetadataScanResult;
}

export default function MetadataReport({ scanResult }: MetadataReportProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    exif: true,
    gps: true,
    ai: true,
  });
  const [showExactGps, setShowExactGps] = useState(false);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { exif, gps, xmp, iptc, c2pa, aiMetadata } = scanResult;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Metadata Inspection Report
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {scanResult.hasAnyMetadata
              ? `Detected ${scanResult.rawFieldCount} metadata attributes across image headers.`
              : 'Clean image: No embedded metadata tags detected.'}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            scanResult.hasAnyMetadata
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
          }`}
        >
          {scanResult.hasAnyMetadata ? 'Metadata Detected' : 'No Metadata Found'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* 1. EXIF Category */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <Camera className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                EXIF Data
              </h4>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                exif.detected
                  ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {exif.detected ? `${exif.fields.length} Found` : 'None'}
            </span>
          </div>

          {exif.detected ? (
            <div className="space-y-1.5 text-xs">
              {exif.make && (
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-white/5">
                  <span className="text-zinc-500">Make:</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{exif.make}</span>
                </div>
              )}
              {exif.model && (
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-white/5">
                  <span className="text-zinc-500">Model:</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{exif.model}</span>
                </div>
              )}
              {exif.software && (
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-white/5">
                  <span className="text-zinc-500">Software:</span>
                  <span className="font-medium text-zinc-900 dark:text-white truncate max-w-[130px]">{exif.software}</span>
                </div>
              )}
              {exif.dateTime && (
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Date/Time:</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{exif.dateTime}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-zinc-400 italic">No camera hardware or exposure metadata present.</p>
          )}
        </div>

        {/* 2. GPS Geotags */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                GPS Location
              </h4>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                gps.detected
                  ? 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-extrabold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {gps.detected ? 'GPS Detected' : 'None'}
            </span>
          </div>

          {gps.detected ? (
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-red-50/70 dark:bg-red-950/30 border border-red-200/60 dark:border-red-900/30 text-red-700 dark:text-red-300">
                <div className="font-semibold flex items-center justify-between">
                  <span>Geotag Detected</span>
                  <button
                    onClick={() => setShowExactGps(!showExactGps)}
                    className="flex items-center gap-1 text-[11px] underline cursor-pointer"
                  >
                    {showExactGps ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showExactGps ? 'Hide' : 'Reveal'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                  {showExactGps
                    ? `Lat: ${gps.latitude?.toFixed(4)}, Lon: ${gps.longitude?.toFixed(4)}`
                    : 'Location coordinates masked for privacy.'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-zinc-400 italic">No GPS coordinates or altitude records found.</p>
          )}
        </div>

        {/* 3. AI Metadata / Prompts */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                <Bot className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                AI Prompt Tags
              </h4>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                aiMetadata.detected
                  ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {aiMetadata.detected ? aiMetadata.generator || 'Detected' : 'None'}
            </span>
          </div>

          {aiMetadata.detected ? (
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-purple-700 dark:text-purple-300">
                {aiMetadata.generator || 'AI Generator Tag Detected'}
              </p>
              {aiMetadata.promptSnippet && (
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 italic bg-purple-50/50 dark:bg-purple-950/20 p-2 rounded-lg line-clamp-3">
                  &ldquo;{aiMetadata.promptSnippet}&rdquo;
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-zinc-400 italic">No AI generation prompts or parameters detected in headers.</p>
          )}
        </div>

        {/* 4. C2PA / Content Credentials */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Fingerprint className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                C2PA Provenance
              </h4>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                c2pa.detected
                  ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {c2pa.detected ? 'Manifest Found' : 'None'}
            </span>
          </div>

          {c2pa.detected ? (
            <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <p className="font-medium text-zinc-900 dark:text-white">{c2pa.boxType}</p>
              <p className="text-[11px]">{c2pa.details}</p>
            </div>
          ) : (
            <p className="text-xs text-zinc-400 italic">No C2PA / JUMBF cryptographic manifest detected.</p>
          )}
        </div>

        {/* 5. XMP Metadata */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <FileCode className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                XMP Dublin Core
              </h4>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                xmp.detected
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {xmp.detected ? `${xmp.fields.length} Found` : 'None'}
            </span>
          </div>

          {xmp.detected ? (
            <div className="space-y-1 text-xs">
              {xmp.creatorTool && (
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-white/5">
                  <span className="text-zinc-500">Tool:</span>
                  <span className="font-medium text-zinc-900 dark:text-white truncate max-w-[130px]">{xmp.creatorTool}</span>
                </div>
              )}
              {xmp.creator && (
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-white/5">
                  <span className="text-zinc-500">Creator:</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{xmp.creator}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-zinc-400 italic">No XML-based XMP schema records present.</p>
          )}
        </div>

        {/* 6. IPTC Industry Info */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                IPTC Publishing
              </h4>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                iptc.detected
                  ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {iptc.detected ? `${iptc.fields.length} Found` : 'None'}
            </span>
          </div>

          {iptc.detected ? (
            <div className="space-y-1 text-xs">
              {iptc.creator && (
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-white/5">
                  <span className="text-zinc-500">By-line:</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{iptc.creator}</span>
                </div>
              )}
              {iptc.copyright && (
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Copyright:</span>
                  <span className="font-medium text-zinc-900 dark:text-white truncate max-w-[130px]">{iptc.copyright}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-zinc-400 italic">No press or publication copyright entries detected.</p>
          )}
        </div>
      </div>
    </div>
  );
}
