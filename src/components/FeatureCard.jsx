import { motion } from 'framer-motion'

/**
 * Compact feature card — 72px height, 20px border-radius, hover lift.
 * @param {{ icon: string, title: string, description?: string, delay?: number }} props
 */
export default function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-3 bg-white rounded-xl2 border border-border shadow-feature
                 px-4 py-2.5 cursor-default select-none min-h-[64px]"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      whileHover={{
        y: -3,
        boxShadow: '0 10px 24px rgba(37, 99, 235, 0.11)',
        borderColor: 'rgba(37, 99, 235, 0.22)',
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      role="listitem"
      aria-label={title}
    >
      {/* Icon badge */}
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary-light to-blue-100
                      flex items-center justify-center">
        <span className="text-base" role="img" aria-hidden="true">{icon}</span>
      </div>

      {/* Text */}
      <div className="flex flex-col min-w-0">
        <span className="text-[13px] font-semibold text-heading truncate leading-tight">{title}</span>
        {description && (
          <span className="text-[11px] text-body mt-0.5 truncate">{description}</span>
        )}
      </div>

      {/* Decorative dot */}
      <div className="ml-auto flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/25" aria-hidden="true" />
    </motion.div>
  )
}
