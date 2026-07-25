import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordField({ id, label, placeholder, value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            'w-full h-[48px] rounded-xl border bg-white px-4 pr-11 text-sm text-[#191b23] outline-none transition-all duration-200',
            'placeholder:text-gray-400',
            'focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]',
            'dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500',
            error
              ? 'border-red-400 ring-2 ring-red-400/15 focus:border-red-400 focus:ring-red-400/20'
              : 'border-[#e1e2ed] hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500',
          ].join(' ')}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#2563eb] transition-colors duration-150 focus:outline-none dark:text-slate-400"
          aria-label={show ? 'Parolni yashirish' : "Parolni ko'rsatish"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
