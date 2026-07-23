import { motion } from 'framer-motion';

export default function ProgressIndicator({ value }) {
  let color = 'bg-red-500';
  if (value >= 90) color = 'bg-emerald-500';
  else if (value >= 75) color = 'bg-blue-500';
  else if (value >= 50) color = 'bg-orange-500';

  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-xs font-semibold text-[#191b23]">{value}%</span>
    </div>
  );
}
