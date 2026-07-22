import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

/**
 * Reusable accessible input field with label, icon, error state, and password toggle.
 * @type {React.ForwardRefExoticComponent<InputFieldProps>}
 */
const InputField = forwardRef(function InputField(
  {
    id,
    label,
    type = 'text',
    placeholder,
    error,
    leftIcon: LeftIcon,
    showPasswordToggle = false,
    showPassword = false,
    onTogglePassword,
    rightLabel,
    onRightLabelClick,
    disabled = false,
    ...rest
  },
  ref
) {
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type
  const hasError = Boolean(error)

  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-medium text-heading dark:text-gray-200"
        >
          {label}
        </label>
        {rightLabel && (
          <button
            type="button"
            onClick={onRightLabelClick}
            className="text-xs font-medium text-primary hover:text-primary-hover transition-colors duration-150
                       hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
            aria-label={rightLabel}
          >
            {rightLabel}
          </button>
        )}
      </div>

      {/* Input wrapper */}
      <div className="relative group">
        {/* Left icon */}
        {LeftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-body group-focus-within:text-primary transition-colors duration-200"
               aria-hidden="true">
            <LeftIcon size={16} strokeWidth={2} />
          </div>
        )}

        {/* Input element */}
        <input
          ref={ref}
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={[
            'input-base',
            LeftIcon ? 'pl-10' : 'pl-4',
            showPasswordToggle || hasError ? 'pr-10' : 'pr-4',
            hasError ? 'input-error' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ].join(' ')}
          {...rest}
        />

        {/* Right: toggle or error icon */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {hasError && !showPasswordToggle && (
            <AlertCircle size={16} className="text-red-500" aria-hidden="true" />
          )}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="text-body hover:text-primary transition-colors duration-150 focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-primary/40 rounded p-0.5"
              aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
              tabIndex={0}
            >
              {showPassword
                ? <EyeOff size={16} strokeWidth={2} />
                : <Eye size={16} strokeWidth={2} />
              }
            </button>
          )}
        </div>
      </div>

      {/* Error message */}
      {hasError && (
        <motion.p
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-xs font-medium text-red-500"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </motion.p>
      )}
    </motion.div>
  )
})

export default InputField
