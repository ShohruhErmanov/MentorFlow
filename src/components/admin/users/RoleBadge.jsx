import clsx from 'clsx';

const ROLE_META = {
  admin: { label: 'Admin', className: 'bg-[#e4e0ff] text-[#4c1d95] dark:bg-violet-500/10 dark:text-violet-300' },
  mentor: { label: 'Mentor', className: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400' },
  student: { label: "O'quvchi", className: 'bg-[#ffede6] text-[#bc4800] dark:bg-orange-500/10 dark:text-orange-400' },
  parent: { label: 'Ota-ona', className: 'bg-[#ffe1ec] text-[#c11d5e] dark:bg-pink-500/10 dark:text-pink-400' },
};

export default function RoleBadge({ role }) {
  const meta = ROLE_META[role] ?? { label: role, className: 'bg-gray-100 text-gray-700 dark:bg-slate-700/40 dark:text-slate-300' };

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
