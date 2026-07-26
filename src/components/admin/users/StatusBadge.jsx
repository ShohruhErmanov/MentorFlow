import clsx from 'clsx';

const STATUS_META = {
  active: { label: 'Faol', dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400' },
  inactive: { label: 'Nofaol', dot: 'bg-gray-400', text: 'text-gray-600 dark:text-slate-400' },
  blocked: { label: 'Bloklangan', dot: 'bg-red-500', text: 'text-red-700 dark:text-red-400' },
};

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.inactive;

  return (
    <span className={clsx('inline-flex items-center gap-1.5 text-xs font-bold', meta.text)}>
      <span className={clsx('h-1.5 w-1.5 rounded-full', meta.dot)} aria-hidden="true" />
      {meta.label}
    </span>
  );
}
