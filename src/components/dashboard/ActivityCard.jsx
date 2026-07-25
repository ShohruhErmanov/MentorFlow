import clsx from 'clsx';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import { recentActivities } from '../../services/dashboardService';

const avatarTones = {
  blue: 'bg-[#dbe1ff] text-[#003ea8] dark:bg-blue-500/10 dark:text-blue-400',
  orange: 'bg-[#ffede6] text-[#7d2d00] dark:bg-orange-500/10 dark:text-orange-400',
  green: 'bg-[#e8f6ed] text-[#20834a] dark:bg-emerald-500/10 dark:text-emerald-400',
  pink: 'bg-[#ffe0ee] text-[#8b1d4c] dark:bg-pink-500/10 dark:text-pink-400',
};

export default function ActivityCard() {
  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-[20px] font-bold leading-7 text-[#191b23] dark:text-white">So'nggi faollik</h2>

      <ul className="mt-5 divide-y divide-[#e1e2ed] dark:divide-slate-700">
        {recentActivities.map((activity) => (
          <li key={activity.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
            <Avatar
              initials={activity.initials}
              size="sm"
              className={clsx('border-transparent', avatarTones[activity.tone])}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold leading-5 text-[#191b23] dark:text-white">{activity.name}</p>
              <p className="mt-0.5 text-[13px] font-medium leading-5 text-[#434655] dark:text-slate-400">
                {activity.description}
              </p>
              <p className="mt-1 text-xs font-semibold leading-4 text-[#737686] dark:text-slate-400">{activity.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
