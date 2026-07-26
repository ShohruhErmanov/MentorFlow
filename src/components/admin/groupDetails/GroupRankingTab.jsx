import { Trophy } from 'lucide-react';
import clsx from 'clsx';
import Card from '../../ui/Card';
import Avatar from '../../ui/Avatar';

const RANK_TONE = {
  1: 'text-amber-500',
  2: 'text-slate-400',
  3: 'text-orange-500',
};

export default function GroupRankingTab({ students }) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">O'quvchilar reytingi</h3>
      <ul className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
        {students.map((student) => (
          <li key={student.id} className="flex items-center gap-4 py-3">
            <span
              className={clsx(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3f3fe] text-sm font-bold dark:bg-slate-700/50',
                RANK_TONE[student.rank] ?? 'text-[#434655] dark:text-slate-300',
              )}
            >
              {student.rank <= 3 ? <Trophy size={14} /> : student.rank}
            </span>
            <Avatar
              initials={student.name.split(' ').map((p) => p[0]).join('')}
              src={student.avatarUrl}
              size="sm"
            />
            <span className="flex-1 truncate text-sm font-semibold text-[#191b23] dark:text-white">{student.name}</span>
            <span className="text-xs font-semibold text-[#737686] dark:text-slate-400">Davomat: {student.attendance}%</span>
            <span className="text-sm font-bold text-[#2563eb] dark:text-blue-400">{student.score}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
