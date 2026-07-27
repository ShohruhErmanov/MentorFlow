import clsx from 'clsx';

const BAR_COLORS = {
  present: 'bg-emerald-500',
  late: 'bg-amber-500',
  absent: 'bg-red-500',
  excused: 'bg-[#2563eb]',
  none: 'bg-gray-200 dark:bg-slate-700',
};

export default function WeeklyAttendanceBars({ week }) {
  return (
    <div className="flex items-end gap-1" role="img" aria-label="Haftalik davomat">
      {week.map((entry) => (
        <span key={entry.day} className="flex flex-col items-center gap-1" title={`${entry.day}: ${entry.status}`}>
          <span className={clsx('h-6 w-2 rounded-full', BAR_COLORS[entry.status] ?? BAR_COLORS.none)} />
          <span className="text-[10px] font-medium text-[#737686] dark:text-slate-500">{entry.day}</span>
        </span>
      ))}
    </div>
  );
}
