import { forwardRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Accessible custom checkbox with animated check indicator.
 * @type {React.ForwardRefExoticComponent}
 */
const Checkbox = forwardRef(function Checkbox(
  { id, label, disabled = false, className = '', ...rest },
  ref
) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2.5 cursor-pointer group select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {/* Hidden native checkbox */}
      <input
        ref={ref}
        id={id}
        type="checkbox"
        disabled={disabled}
        className="sr-only peer"
        aria-label={label}
        {...rest}
      />

      {/* Custom checkbox visual */}
      <div
        className="relative w-[18px] h-[18px] rounded-[5px] border-2 border-border bg-white dark:border-slate-600 dark:bg-slate-800
                   transition-all duration-200
                   peer-checked:bg-primary peer-checked:border-primary
                   peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-1
                   group-hover:border-primary/60 flex-shrink-0"
        aria-hidden="true"
      >
        {/* Checkmark SVG */}
        <motion.svg
          viewBox="0 0 10 8"
          fill="none"
          className="absolute inset-0 m-auto w-3 h-2.5"
          initial={false}
        >
          <motion.path
            d="M1 4L3.5 6.5L9 1"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={rest.checked !== undefined
              ? { pathLength: rest.checked ? 1 : 0, opacity: rest.checked ? 1 : 0 }
              : undefined
            }
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </motion.svg>
      </div>

      {/* Label text */}
      <span className="text-sm text-body dark:text-gray-400 group-hover:text-heading transition-colors duration-150">
        {label}
      </span>
    </label>
  )
})

export default Checkbox
