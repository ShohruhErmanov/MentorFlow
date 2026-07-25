import clsx from 'clsx';

export default function StatusBadge({ status }) {
  const getBadgeStyle = (s) => {
    switch (s) {
      case 'Faol':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'Kutish':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
      case 'To\'xtatilgan':
        return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'Yangi':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-slate-700/40 dark:text-slate-300';
    }
  };

  return (
    <span className={clsx(
      'inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider',
      getBadgeStyle(status)
    )}>
      {status}
    </span>
  );
}
