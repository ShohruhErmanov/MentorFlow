import { motion } from 'framer-motion';

export default function AttendanceProgress({ percentage }) {
  const getColor = (p) => {
    if (p >= 95) return 'bg-emerald-500';
    if (p >= 80) return 'bg-blue-500';
    if (p >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex w-full items-center gap-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${getColor(percentage)}`}
        />
      </div>
      <span className="w-10 text-right text-xs font-bold text-[#434655]">{percentage}%</span>
    </div>
  );
}
