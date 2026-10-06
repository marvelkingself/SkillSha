import Link from 'next/link';
import { ToolConfig } from '@/types/tools';
import {
  Sparkles,
  Image as ImageIcon,
  Maximize2,
  QrCode,
  Link2,
  Globe,
  Code,
  FileText,
  ArrowRight,
  Clock,
  Bot,
  Briefcase,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Image: ImageIcon,
  Maximize2,
  QrCode,
  Link2,
  Globe,
  Code,
  FileText,
  Bot,
  Briefcase,
};

interface ToolCardProps {
  tool: ToolConfig;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = ICON_MAP[tool.iconName] || Sparkles;
  const isActive = tool.status === 'active';

  return (
    <div
      className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl transition-all duration-300 ${
        isActive
          ? 'bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 hover:border-blue-500/40'
          : 'bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/5 opacity-80'
      }`}
    >
      <div className="space-y-4">
        {/* Top Meta: Category + Badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {tool.category}
          </span>
          {tool.badge && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-300/40 dark:border-zinc-700/40'
              }`}
            >
              {tool.badge}
            </span>
          )}
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 pt-1">
          <div
            className={`p-3.5 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${
              isActive
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {tool.shortDescription}
            </p>
            {tool.secondaryText && (
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium pt-0.5 line-clamp-1">
                {tool.secondaryText}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-white/5">
        {isActive ? (
          <Link
            href={tool.route}
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all group-hover:shadow-blue-500/40"
          >
            <span>{tool.ctaText || 'Open Tool'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/60 cursor-not-allowed">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>In Development</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider">Coming Soon</span>
          </div>
        )}
      </div>
    </div>
  );
}
