import clsx from 'clsx';

const STATUS_META = {
  present: { label: 'Qatnashdi', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  absent: { label: 'Kelmadi', className: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' },
  late: { label: 'Kechikdi', className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
  excused: { label: 'Ruxsatli', className: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400' },
};

export default function AttendanceBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.present;

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider',
        meta.className,
      )}
    >
      {meta.label}
    </span>
  );
}

export { STATUS_META as ATTENDANCE_STATUS_META };
