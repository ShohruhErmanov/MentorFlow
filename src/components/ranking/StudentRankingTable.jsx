import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Minus, TrendingDown } from 'lucide-react';

function WeeklyBadge({ weeklyXp, weeklyChange }) {
  if (weeklyChange === 'up') {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        <TrendingUp size={12} />+{weeklyXp.toLocaleString()} bu hafta
      </span>
    );
  }
  if (weeklyChange === 'down') {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-red-400 dark:text-red-400">
        <TrendingDown size={12} />Kamaydi
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 dark:text-slate-400">
      <Minus size={12} />O'zgarmas
    </span>
  );
}

function ProgressBar({ progress, delay = 0 }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-700">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.9, delay, ease: 'easeOut' }}
      />
    </div>
  );
}

function StudentRow({ student, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 hover:bg-blue-50/60"
    >
      {/* Rank */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-bold text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-200 dark:bg-slate-700 dark:text-slate-400">
        {student.rank}
      </div>

      {/* Avatar */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
        style={{ backgroundColor: student.avatarColor }}
      >
        {student.initials}
      </div>

      {/* Name & Group */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{student.name}</p>
        <p className="truncate text-xs text-gray-500 dark:text-slate-400">{student.group}</p>
      </div>

      {/* XP + Progress */}
      <div className="hidden min-w-[120px] sm:block">
        <ProgressBar progress={student.progress} delay={index * 0.07 + 0.3} />
      </div>

      {/* XP & Weekly */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-blue-600">
          {student.xp.toLocaleString()}{' '}
          <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-400">XP</span>
        </p>
        <WeeklyBadge weeklyXp={student.weeklyXp} weeklyChange={student.weeklyChange} />
      </div>
    </motion.div>
  );
}

export default function StudentRankingTable({ students }) {
  const [filter, setFilter] = useState('week');

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Barcha o'quvchilar</h2>

        {/* Toggle */}
        <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-semibold dark:bg-slate-700">
          <button
            onClick={() => setFilter('week')}
            className={[
              'rounded-lg px-3 py-1.5 transition-all duration-200',
              filter === 'week'
                ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800'
                : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200',
            ].join(' ')}
          >
            Bu hafta
          </button>
          <button
            onClick={() => setFilter('month')}
            className={[
              'rounded-lg px-3 py-1.5 transition-all duration-200',
              filter === 'month'
                ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800'
                : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200',
            ].join(' ')}
          >
            Oy
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-100 dark:bg-slate-700" />

      {/* Rows */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-1"
        >
          {students.map((student, i) => (
            <StudentRow key={student.id} student={student} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
