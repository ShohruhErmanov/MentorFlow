import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings2 } from 'lucide-react';
import Select from '../ui/Select';
import ThemeToggle from '../theme/ThemeToggle';

export default function SystemSettings({ languages }) {
  const [language, setLanguage] = useState('uz');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-500/10">
          <Settings2 size={16} className="text-purple-500 dark:text-purple-400" />
        </div>
        <h2 className="text-base font-bold text-[#191b23] dark:text-white">Tizim</h2>
      </div>

      <div className="space-y-5">
        {/* Language */}
        <div>
          <Select
            label="TIL"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={languages}
          />
        </div>

        {/* Theme */}
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            MAVZU
          </p>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
}
