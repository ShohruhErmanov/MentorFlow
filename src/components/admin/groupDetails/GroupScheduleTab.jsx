import clsx from 'clsx';
import Card from '../../ui/Card';

const WEEK_DAYS = [
  { code: 'Du', label: 'Dushanba' },
  { code: 'Se', label: 'Seshanba' },
  { code: 'Cho', label: 'Chorshanba' },
  { code: 'Pay', label: 'Payshanba' },
  { code: 'Ju', label: 'Juma' },
  { code: 'Sha', label: 'Shanba' },
  { code: 'Ya', label: 'Yakshanba' },
];

export default function GroupScheduleTab({ group }) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">Haftalik dars jadvali</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
        {WEEK_DAYS.map((day) => {
          const isLessonDay = group.scheduleDays.includes(day.code);
          return (
            <div
              key={day.code}
              className={clsx(
                'rounded-xl border p-4 text-center',
                isLessonDay
                  ? 'border-[#2563eb] bg-[#dbe1ff] dark:border-blue-500/40 dark:bg-blue-500/10'
                  : 'border-[#e1e2ed] bg-[#f7f8ff] dark:border-slate-700 dark:bg-slate-900/40',
              )}
            >
              <p
                className={clsx(
                  'text-xs font-bold uppercase tracking-wider',
                  isLessonDay ? 'text-[#2563eb] dark:text-blue-300' : 'text-[#737686] dark:text-slate-400',
                )}
              >
                {day.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#191b23] dark:text-white">
                {isLessonDay ? group.scheduleTime : '—'}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
