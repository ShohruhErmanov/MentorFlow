import clsx from 'clsx';

const variants = {
  neutral: 'border-[#e1e2ed] bg-[#f3f3fe] text-[#434655] dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300',
  blue: 'border-[#b4c5ff] bg-[#dbe1ff] text-[#003ea8] dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300',
  orange: 'border-[#ffb596] bg-[#ffede6] text-[#7d2d00] dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300',
  red: 'border-[#ffb4ab] bg-[#ffdad6] text-[#93000a] dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300',
};

export default function Badge({ children, variant = 'neutral', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold leading-none',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
