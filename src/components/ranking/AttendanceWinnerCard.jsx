import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';

export default function AttendanceWinnerCard({ attendance }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-sm dark:border-emerald-900/40 dark:from-emerald-950/40 dark:to-green-950/30"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 shadow-md shadow-emerald-200">
          <CalendarCheck size={22} className="text-white" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Eng yaxshi davomat</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">{attendance.group}</span>{' '}
            {attendance.week}{' '}
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {attendance.percentage}%
            </span>{' '}
            davomat ko'rsatdi.
          </p>

          {/* Badge */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-3 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-sm"
          >
            {attendance.badge}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
