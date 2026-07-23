import clsx from 'clsx';

export default function Skeleton({ className, rounded = 'rounded-xl' }) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-slate-200 dark:bg-slate-700',
        rounded,
        className
      )}
      aria-hidden="true"
    />
  );
}
