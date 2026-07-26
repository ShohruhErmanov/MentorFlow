import clsx from 'clsx';

const STATUS_META = {
  active: { label: 'Faol', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  inactive: { label: 'Nofaol', className: 'bg-gray-100 text-gray-700 dark:bg-slate-700/40 dark:text-slate-300' },
};

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.inactive;

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider',
        meta.className,
      )}
    >
      {meta.label}
    </span>
  );
}
