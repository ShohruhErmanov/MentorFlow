import { motion } from 'framer-motion';

export default function GroupProgress({ progress }) {
  return (
    <div className="mt-5 space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-[#191b23]">Kurs kursi</span>
        <span className="text-[#2563eb]">{progress}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f3f3fe]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-[#2563eb]"
        />
      </div>
    </div>
  );
}
