import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, max = 100, label, color = 'bg-[#2563eb]' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="text-[#191b23]">{label}</span>
          <span className="text-[#737686]">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f3fe]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}
