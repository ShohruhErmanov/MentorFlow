import clsx from 'clsx';

const statuses = ['Barchasi', 'Faol', 'Yakunlangan', 'Arxiv'];
const courses = ['Barchasi', 'Frontend', 'Backend', 'Mobile', 'AI', 'Cyber Security'];
const sortOptions = [
  { value: 'eng_yangi', label: 'Eng yangi' },
  { value: 'eski', label: 'Eski' },
  { value: 'oquvchilar', label: "O'quvchilar soni" },
  { value: 'davomat', label: 'Davomat' },
  { value: 'ozlashtirish', label: "O'zlashtirish" },
];

export default function GroupFilters({ 
  statusFilter, 
  setStatusFilter, 
  courseFilter, 
  setCourseFilter, 
  sortBy, 
  setSortBy 
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center rounded-lg bg-[#f3f3fe] p-1">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={clsx(
                'rounded-md px-3 py-1.5 text-sm font-semibold transition-all',
                statusFilter === status
                  ? 'bg-white text-[#2563eb] shadow-[0_2px_8px_rgba(25,27,35,0.08)]'
                  : 'text-[#737686] hover:text-[#191b23]'
              )}
            >
              {status}
            </button>
          ))}
        </div>

        <span className="hidden h-5 w-px bg-[#e1e2ed] lg:block"></span>

        {/* Course Filter */}
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm font-semibold text-[#434655] outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
        >
          {courses.map((course) => (
            <option key={course} value={course}>
              {course === 'Barchasi' ? 'Barcha kurslar' : course}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-[#737686]">Saralash:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm font-semibold text-[#434655] outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
