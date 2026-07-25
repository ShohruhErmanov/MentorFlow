import { motion } from 'framer-motion';

export default function AttendanceProgress({ percentage }) {
  const getColor = (p) => {
    if (p >= 95) return 'bg-emerald-500 dark:bg-emerald-400';
    if (p >= 80) return 'bg-blue-500 dark:bg-blue-400';
    if (p >= 60) return 'bg-orange-500 dark:bg-orange-400';
    return 'bg-red-500 dark:bg-red-400';
  };

  return (
    <div className="flex w-full items-center gap-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${getColor(percentage)}`}
        />
      </div>
      <span className="w-10 text-right text-xs font-bold text-[#434655] dark:text-slate-400">{percentage}%</span>
    </div>
  );
}
