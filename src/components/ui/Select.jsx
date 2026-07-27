import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import ValidationMessage from './ValidationMessage';

const Select = forwardRef(function Select(
  { label, error, options = [], className, disabled, ...props },
  ref
) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#191b23] dark:text-slate-200">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          disabled={disabled}
          className={clsx(
            'w-full appearance-none rounded-xl border bg-white px-4 py-3 text-sm text-[#191b23] outline-none transition-all dark:bg-slate-800 dark:text-white',
            'focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]',
            disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-slate-900' : '',
            hasError
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20 dark:border-red-500/60'
              : 'border-[#e1e2ed] hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500',
            className
          )}
          {...props}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#737686] dark:text-slate-400">
          <ChevronDown size={16} strokeWidth={2} />
        </div>
      </div>
      <ValidationMessage message={error} />
    </div>
  );
});

export default Select;
