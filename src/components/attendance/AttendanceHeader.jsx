import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AttendanceHeader({
  selectedGroup,
  setSelectedGroup,
  selectedMonth,
  setSelectedMonth,
  groupOptions,
  monthOptions,
}) {
  const monthIdx = monthOptions.indexOf(selectedMonth);

  const prevMonth = () => {
    if (monthIdx > 0) setSelectedMonth(monthOptions[monthIdx - 1]);
  };
  const nextMonth = () => {
    if (monthIdx < monthOptions.length - 1) setSelectedMonth(monthOptions[monthIdx + 1]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight dark:text-white">Davomat</h1>
        <p className="mt-1 text-sm text-blue-600 font-medium">
          Joriy oydagi talabalar ishtiroki nazorati
        </p>
      </div>

      {/* Right controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Group selector */}
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="h-10 rounded-xl border border-gray-200 bg-white px-4 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-shadow cursor-pointer dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {groupOptions.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        {/* Month selector */}
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-1 dark:border-slate-700 dark:bg-slate-800">
          <button
            onClick={prevMonth}
            disabled={monthIdx === 0}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="min-w-[130px] text-center text-sm font-semibold text-gray-700 dark:text-slate-300">
            {selectedMonth}
          </span>
          <button
            onClick={nextMonth}
            disabled={monthIdx === monthOptions.length - 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
