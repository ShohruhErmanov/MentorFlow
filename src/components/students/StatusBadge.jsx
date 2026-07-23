import clsx from 'clsx';

export default function StatusBadge({ status }) {
  const getBadgeStyle = (s) => {
    switch (s) {
      case 'Faol':
        return 'bg-emerald-100 text-emerald-700';
      case 'Kutish':
        return 'bg-amber-100 text-amber-700';
      case 'To\'xtatilgan':
        return 'bg-red-100 text-red-700';
      case 'Yangi':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
