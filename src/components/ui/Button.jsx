import clsx from 'clsx';

const variants = {
  primary:
    'bg-[#2563eb] text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] hover:bg-[#1d4ed8] focus-visible:ring-[#2563eb]',
  ghost:
    'bg-transparent text-[#434655] hover:bg-[#f3f3fe] focus-visible:ring-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/50',
  icon:
    'bg-transparent text-[#434655] hover:bg-[#f3f3fe] focus-visible:ring-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/50',
};

const sizes = {
  md: 'h-11 px-4 text-sm',
  icon: 'h-10 w-10 p-0',
};

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
