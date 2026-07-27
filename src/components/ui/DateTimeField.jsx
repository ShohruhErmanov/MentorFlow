import { forwardRef } from 'react';
import { Calendar } from 'lucide-react';
import clsx from 'clsx';
import FormField from './FormField';

const DateTimeField = forwardRef(function DateTimeField({ id, label, error, className, disabled, ...props }, ref) {
  const hasError = Boolean(error);

  return (
    <FormField id={id} label={label} error={error}>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type="datetime-local"
          disabled={disabled}
          aria-invalid={hasError}
          className={clsx(
            'w-full rounded-xl border bg-white py-3 pl-4 pr-10 text-sm text-[#191b23] outline-none transition-all dark:bg-slate-800 dark:text-white',
            'focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]',
            disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-slate-900' : '',
            hasError
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20 dark:border-red-500/60'
              : 'border-[#e1e2ed] hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500',
            className,
          )}
          {...props}
        />
        <Calendar
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737686] dark:text-slate-400"
        />
      </div>
    </FormField>
  );
});

export default DateTimeField;
