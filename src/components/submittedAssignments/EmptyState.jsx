import { motion } from 'framer-motion';

export default function EmptyState({ onReset }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-48 h-48 mb-6 text-gray-200 dark:text-slate-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <path d="M13 8h4" />
          <path d="M13 12h4" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Topshirilgan vazifalar topilmadi</h3>
      <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-sm">
        Hozircha hech qanday topshirilgan vazifa mavjud emas.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="h-10 px-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors"
        >
          Qayta yuklash
        </button>
      )}
    </motion.div>
  );
}
