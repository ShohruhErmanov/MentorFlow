import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

/**
 * Reusable button with variants: primary | social | ghost
 * @param {{ variant?: 'primary'|'social'|'ghost', isLoading?: boolean, disabled?: boolean,
 *           icon?: React.ReactNode, children: React.ReactNode, className?: string,
 *           type?: string, onClick?: () => void }} props
 */
export default function Button({
  variant = 'primary',
  isLoading = false,
  disabled = false,
  icon,
  children,
  className = '',
  type = 'button',
  onClick,
}) {
  const isDisabled = disabled || isLoading

  const base = `relative flex items-center justify-center gap-2.5 w-full h-[44px] rounded-xl
                font-semibold text-sm transition-all duration-200 focus:outline-none
                focus-visible:ring-2 focus-visible:ring-offset-2 select-none overflow-hidden
                disabled:opacity-60 disabled:cursor-not-allowed`

  const variants = {
    primary: `bg-primary text-white shadow-md shadow-primary/25
              hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30
              focus-visible:ring-primary active:scale-[0.98]`,
    social: `bg-white text-heading border border-border
             hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm
             focus-visible:ring-primary/40 active:scale-[0.98]`,
    ghost: `bg-transparent text-primary hover:bg-primary-light
            focus-visible:ring-primary/40`,
  }

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={!isDisabled ? { scale: 1.01 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
    >
      {/* Shimmer overlay on hover (primary only) */}
      {variant === 'primary' && !isDisabled && (
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                     translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
          aria-hidden="true"
        />
      )}

      {/* Loading spinner */}
      {isLoading ? (
        <>
          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          <span>Kirilmoqda...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0 flex items-center" aria-hidden="true">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  )
}
