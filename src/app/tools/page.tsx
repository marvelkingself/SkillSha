'use client';

import { useState, useMemo } from 'react';
import { TOOLS_CONFIG, TOOL_CATEGORIES } from '@/config/tools';
import { ToolCategory } from '@/types/tools';
import ToolsHero from '@/components/tools/ToolsHero';
import ToolCategoryFilter from '@/components/tools/ToolCategoryFilter';
import ToolCard from '@/components/tools/ToolCard';
import { SearchX, Sparkles, Shield, Cpu, Zap } from 'lucide-react';

export default function ToolsHomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tool of TOOLS_CONFIG) {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    return TOOLS_CONFIG.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'All' && tool.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesDesc = tool.shortDescription.toLowerCase().includes(query);
        const matchesCat = tool.category.toLowerCase().includes(query);
        const matchesKeywords = tool.keywords?.some((k) => k.toLowerCase().includes(query));

        return matchesName || matchesDesc || matchesCat || matchesKeywords;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Hero with Search */}
      <ToolsHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalTools={TOOLS_CONFIG.length}
      />

      {/* Category Pills Filter */}
      <ToolCategoryFilter
        categories={TOOL_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Tools Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>
              {selectedCategory === 'All' ? 'All Available Utilities' : selectedCategory}
            </span>
            <span className="text-xs font-normal text-zinc-400">
              ({filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'})
            </span>
          </h2>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-200/60 dark:bg-zinc-800 text-zinc-400 w-fit mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              No matching tools found
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              We couldn&apos;t find any tool matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset your category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Platform Features Section */}
      <section className="mt-20 pt-16 border-t border-zinc-200/80 dark:border-white/10 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            Built for High-Velocity Digital Teams
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Professional browser-grade tools designed with modern privacy, zero server storage, and production reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-white/5 space-y-3 shadow-sm">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              Strict Zero-Storage Privacy
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Files are held in volatile execution buffers and purged immediately after processing. Never saved, never indexed, never trained on.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-white/5 space-y-3 shadow-sm">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              Binary-Level Accuracy
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Powered by native high-performance libvips and segment parsers to guarantee pixel integrity and uncompromised file headers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-white/5 space-y-3 shadow-sm">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              No Sign-Up or Paywalls
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every utility on Skillsha Tools is completely free to use without login barriers, daily credit throttles, or intrusive ads.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
