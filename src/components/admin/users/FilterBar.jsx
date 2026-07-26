import { Filter, CalendarDays } from 'lucide-react';
import SearchInput from '../../ui/SearchInput';
import { ROLE_OPTIONS } from '../../../constants/mockUsers';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Eng yangi' },
  { value: 'oldest', label: 'Eng eski' },
];

export default function FilterBar({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  sortBy,
  onSortChange,
  rangeStart,
  rangeEnd,
  totalCount,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:max-w-xs sm:flex-1">
          <SearchInput
            placeholder="Foydalanuvchilarni qidirish..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <label className="relative inline-flex">
          <span className="sr-only">Rol bo'yicha filter</span>
          <Filter
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] dark:text-slate-400"
          />
          <select
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
            className="h-11 rounded-lg border border-[#e1e2ed] bg-white pl-9 pr-8 text-sm font-medium text-[#434655] outline-none hover:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            <option value="">Barcha rollar</option>
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="relative inline-flex">
          <span className="sr-only">Sana bo'yicha saralash</span>
          <CalendarDays
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] dark:text-slate-400"
          />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-11 rounded-lg border border-[#e1e2ed] bg-white pl-9 pr-8 text-sm font-medium text-[#434655] outline-none hover:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="whitespace-nowrap text-sm font-medium text-[#737686] dark:text-slate-400">
        Ko'rsatilmoqda: {totalCount === 0 ? 0 : rangeStart}-{rangeEnd} / {totalCount}
      </p>
    </div>
  );
}
