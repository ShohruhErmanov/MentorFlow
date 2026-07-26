import clsx from 'clsx';

const STATUS_META = {
  active: { label: 'Faol', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  warned: { label: 'Ogohlantirilgan', className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
  graduated: { label: 'Bitirgan', className: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400' },
};

export default function StudentStatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.active;

  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold', meta.className)}>
      {meta.label}
    </span>
  );
}
