import { forwardRef } from 'react';
import clsx from 'clsx';
import ValidationMessage from './ValidationMessage';

const DatePicker = forwardRef(function DatePicker({ label, error, className, disabled, ...props }, ref) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#191b23] dark:text-slate-200">{label}</label>}
      <input
        ref={ref}
        type="date"
        disabled={disabled}
        aria-invalid={hasError}
        className={clsx(
          'w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#191b23] outline-none transition-all dark:bg-slate-800 dark:text-white',
          'focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]',
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-slate-900' : '',
          hasError
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20 dark:border-red-500/60'
            : 'border-[#e1e2ed] hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500',
          className,
        )}
        {...props}
      />
      <ValidationMessage message={error} />
    </div>
  );
});

export default DatePicker;
