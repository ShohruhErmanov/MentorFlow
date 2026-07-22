import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

/**
 * MentorFlow brand logo with graduation cap icon.
 * @param {{ size?: 'sm' | 'md' | 'lg', className?: string }} props
 */
export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { icon: 16, text: 'text-base', gap: 'gap-1.5' },
    md: { icon: 22, text: 'text-xl',  gap: 'gap-2'   },
    lg: { icon: 28, text: 'text-2xl', gap: 'gap-2.5'  },
  }
  const s = sizes[size]

  return (
    <motion.div
      className={`flex items-center ${s.gap} ${className}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label="MentorFlow - Bosh sahifaga qaytish"
      role="img"
    >
      {/* Icon badge */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-400 shadow-md shadow-primary/30">
        <GraduationCap size={s.icon} className="text-white" strokeWidth={2} />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success rounded-full border-2 border-white" />
      </div>

      {/* Text */}
      <span className={`font-bold ${s.text} text-heading tracking-tight`}>
        Mentor<span className="text-primary">Flow</span>
      </span>
    </motion.div>
  )
}
