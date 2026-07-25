import { motion } from 'framer-motion';
import { QrCode, PenLine, BookOpen } from 'lucide-react';

export default function TodayLessonCard({ lesson }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.22 }}
      className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 p-6 text-white shadow-lg shadow-blue-500/20 flex flex-col justify-between"
    >
      {/* Icon + Title */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <BookOpen size={20} />
          </div>
          <h3 className="text-lg font-bold">Bugungi Dars</h3>
        </div>

        <p className="text-sm text-blue-100 font-medium">{lesson.date}</p>
        <p className="mt-1 text-xl font-extrabold leading-tight">{lesson.course}</p>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white/20 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <QrCode size={18} />
          QR orqali belgilash
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          <PenLine size={18} />
          Qo'lda kiritish
        </motion.button>
      </div>
    </motion.div>
  );
}
