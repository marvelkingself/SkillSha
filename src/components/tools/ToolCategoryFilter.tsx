'use client';

import { ToolCategory } from '@/types/tools';

interface ToolCategoryFilterProps {
  categories: ToolCategory[];
  selectedCategory: ToolCategory | 'All';
  onSelectCategory: (category: ToolCategory | 'All') => void;
  categoryCounts: Record<string, number>;
}

export default function ToolCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: ToolCategoryFilterProps) {
  const allCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full justify-start md:justify-center">
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
          selectedCategory === 'All'
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
            : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10'
        }`}
      >
        <span>All Tools</span>
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] ${
            selectedCategory === 'All'
              ? 'bg-white/20 text-white'
              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
          }`}
        >
          {allCount}
        </span>
      </button>

      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const count = categoryCounts[category] || 0;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            <span>{category}</span>
            {count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
