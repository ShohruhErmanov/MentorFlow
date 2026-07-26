import { BookOpen, Calendar, Filter, UserRound } from 'lucide-react';
import SearchInput from '../../ui/SearchInput';
import { COURSE_OPTIONS, MENTOR_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockGroups';

function IconSelect({ icon: Icon, label, value, onChange, options }) {
  return (
    <label className="relative inline-flex">
      <span className="sr-only">{label}</span>
      <Icon
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] dark:text-slate-400"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-lg border border-[#e1e2ed] bg-white pl-9 pr-8 text-sm font-medium text-[#434655] outline-none hover:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
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
  mentorFilter,
  onMentorFilterChange,
  statusFilter,
  onStatusFilterChange,
  startDateFilter,
  onStartDateFilterChange,
}) {
  const mentorOptions = MENTOR_OPTIONS.map((m) => m.name);

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#e1e2ed] bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="sm:max-w-xs sm:flex-1">
        <SearchInput
          placeholder="Guruh nomini qidiring..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <IconSelect icon={BookOpen} label="Kurs" value={courseFilter} onChange={onCourseFilterChange} options={COURSE_OPTIONS} />
      <IconSelect icon={UserRound} label="Mentor" value={mentorFilter} onChange={onMentorFilterChange} options={mentorOptions} />
      <IconSelect
        icon={Filter}
        label="Holati"
        value={statusFilter}
        onChange={onStatusFilterChange}
        options={STATUS_OPTIONS}
      />

      <label className="relative inline-flex">
        <span className="sr-only">Boshlanish sanasi</span>
        <Calendar
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] dark:text-slate-400"
        />
        <input
          type="date"
          value={startDateFilter}
          onChange={(e) => onStartDateFilterChange(e.target.value)}
          className="h-11 rounded-lg border border-[#e1e2ed] bg-white pl-9 pr-3 text-sm font-medium text-[#434655] outline-none hover:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </label>
    </div>
  );
}
