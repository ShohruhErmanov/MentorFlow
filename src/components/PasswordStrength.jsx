import { motion } from 'framer-motion'
import { getPasswordStrength } from '../hooks/useRegister.js'

/**
 * Live password strength bar — 3 segments, animated fill.
 * @param {{ password: string }} props
 */
export default function PasswordStrength({ password }) {
  const { score, label, color } = getPasswordStrength(password)

  if (!password) return null

  const segments = [1, 2, 3]

  return (
    <motion.div
      className="mt-1.5 space-y-1"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Bar segments */}
      <div className="flex gap-1" role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={3}
           aria-label={`Parol kuchi: ${label}`}>
        {segments.map((s) => (
          <div key={s} className="flex-1 h-1 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${s <= score ? color : 'bg-transparent'}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: s <= score ? 1 : 0 }}
              transition={{ duration: 0.3, delay: s * 0.06, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        ))}
      </div>

      {/* Label */}
      <p className={`text-[10px] font-semibold ${
        score === 1 ? 'text-red-500' : score === 2 ? 'text-amber-500' : 'text-emerald-600'
      }`}>
        Parol kuchi: {label}
      </p>
    </motion.div>
  )
}
