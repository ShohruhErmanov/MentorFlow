import { BookOpen, Calendar, Filter, RotateCcw, UserRound } from 'lucide-react';
import SearchInput from '../../ui/SearchInput';
import { COURSE_OPTIONS, GROUP_OPTIONS, MENTOR_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockAssignments';

function IconSelect({ icon: Icon, label, value, onChange, options }) {
  return (
    <label className="relative inline-flex flex-1 sm:flex-none">
      <span className="sr-only">{label}</span>
      <Icon
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] dark:text-slate-400"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-[#e1e2ed] bg-white pl-9 pr-8 text-sm font-medium text-[#434655] outline-none hover:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  groupFilter,
  onGroupFilterChange,
  mentorFilter,
  onMentorFilterChange,
  statusFilter,
  onStatusFilterChange,
  deadlineFilter,
  onDeadlineFilterChange,
  onReset,
}) {
  const mentorOptions = MENTOR_OPTIONS.map((m) => m.name);

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#e1e2ed] bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <SearchInput
        placeholder="Vazifa nomini qidiring..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <IconSelect icon={BookOpen} label="Barcha kurslar" value={courseFilter} onChange={onCourseFilterChange} options={COURSE_OPTIONS} />
        <IconSelect icon={Filter} label="Barcha guruhlar" value={groupFilter} onChange={onGroupFilterChange} options={GROUP_OPTIONS} />
        <IconSelect icon={UserRound} label="Barcha mentorlar" value={mentorFilter} onChange={onMentorFilterChange} options={mentorOptions} />
        <IconSelect icon={Filter} label="Barcha holatlar" value={statusFilter} onChange={onStatusFilterChange} options={STATUS_OPTIONS} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative inline-flex flex-1 sm:max-w-xs">
          <span className="sr-only">Deadline</span>
          <Calendar
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] dark:text-slate-400"
          />
          <input
            type="date"
            value={deadlineFilter}
            onChange={(e) => onDeadlineFilterChange(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#e1e2ed] bg-white pl-9 pr-3 text-sm font-medium text-[#434655] outline-none hover:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
        </label>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#737686] transition-colors hover:bg-[#f3f3fe] hover:text-[#191b23] dark:text-slate-400 dark:hover:bg-slate-700/40 dark:hover:text-white"
        >
          <RotateCcw size={16} />
          Filterlarni tozalash
        </button>
      </div>
    </div>
  );
}
