import clsx from 'clsx';

const STATUS_META = {
  active: { label: 'Faol', className: 'bg-emerald-500 text-white' },
  upcoming: { label: 'Tez kunda', className: 'bg-amber-500 text-white' },
  inactive: { label: 'Nofaol', className: 'bg-gray-500 text-white' },
  archived: { label: 'Arxivlangan', className: 'bg-slate-600 text-white' },
};

export default function StatusBadge({ status, className }) {
  const meta = STATUS_META[status] ?? STATUS_META.inactive;

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm',
        meta.className,
        className,
      )}
    >
      {meta.label}
    </span>
  );
}
