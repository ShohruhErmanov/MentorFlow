import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function RankingHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="flex items-start gap-4"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 shadow-md shadow-orange-200/50">
        <Award size={24} className="text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-3xl">
          Umumiy Reyting
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400 sm:text-base">
          Top o'quvchilar haftalik natijalari va yutuqlari.
        </p>
      </div>
    </motion.div>
  );
}
