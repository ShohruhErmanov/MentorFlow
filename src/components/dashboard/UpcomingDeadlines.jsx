import clsx from 'clsx';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { upcomingDeadlines } from '../../services/dashboardService';

const borderTones = {
  red: 'border-l-[#ba1a1a]',
  orange: 'border-l-[#bc4800]',
  blue: 'border-l-[#2563eb]',
};

const badgeTones = {
  red: 'red',
  orange: 'orange',
  blue: 'blue',
};

export default function UpcomingDeadlines() {
  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-[20px] font-bold leading-7 text-[#191b23] dark:text-white">Yaqinlashayotgan muddatlar</h2>

      <ul className="mt-5 space-y-3">
        {upcomingDeadlines.map((deadline) => (
          <li
            key={deadline.id}
            className={clsx(
              'rounded-lg border border-l-4 border-[#e1e2ed] bg-[#fafbff] p-4 dark:border-slate-700 dark:bg-slate-800',
              borderTones[deadline.tone],
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold leading-5 text-[#191b23] dark:text-white">{deadline.title}</p>
                <p className="mt-1 text-[13px] font-semibold leading-5 text-[#737686] dark:text-slate-400">{deadline.course}</p>
              </div>
              <Badge variant={badgeTones[deadline.tone]} className="shrink-0 rounded-md px-2.5 py-1">
                {deadline.deadline}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
