import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const options = [
  { id: 'light', label: "Yorug'", icon: Sun },
  { id: 'dark', label: "Qorong'i", icon: Moon },
  { id: 'system', label: 'Tizim', icon: Monitor },
];

export default function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex gap-2 ${className}`}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.id;

        return (
          <motion.button
            key={opt.id}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setTheme(opt.id)}
            className={[
              'flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all duration-200',
              isActive
                ? 'border-[#2563eb] bg-[#2563eb] text-white shadow-sm'
                : 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:border-slate-400',
            ].join(' ')}
            aria-pressed={isActive}
          >
            <Icon size={15} />
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
