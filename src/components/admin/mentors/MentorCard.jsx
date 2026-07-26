import { Star } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import WeeklyActivityChart from './WeeklyActivityChart';

export default function MentorCard({ mentor, onView, onEdit }) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <img
            src={mentor.avatarUrl}
            alt={`${mentor.firstName} ${mentor.lastName}`}
            className="h-12 w-12 rounded-full object-cover shadow-sm"
          />
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-800 ${
              mentor.isOnline ? 'bg-emerald-500' : 'bg-amber-400'
            }`}
            aria-label={mentor.isOnline ? 'Onlayn' : 'Oflayn'}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-[#191b23] dark:text-white">
            {mentor.firstName} {mentor.lastName}
          </p>
          <p className="truncate text-xs font-semibold text-[#2563eb] dark:text-blue-400">
            {mentor.specializationLabel}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-sm">
        <Star size={14} className="fill-amber-400 text-amber-400" />
        <span className="font-bold text-[#191b23] dark:text-white">{mentor.rating.toFixed(1)}</span>
        <span className="text-[#737686] dark:text-slate-400">&bull;</span>
        <span className="font-medium text-[#737686] dark:text-slate-400">{mentor.studentCount} o'quvchi</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#f7f8ff] px-3 py-2 dark:bg-slate-900/60">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">Guruhlar</p>
          <p className="mt-0.5 truncate text-sm font-bold text-[#191b23] dark:text-white">{mentor.groups.join(', ')}</p>
        </div>
        <div className="rounded-xl bg-[#f7f8ff] px-3 py-2 dark:bg-slate-900/60">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">Davomat</p>
          <p className="mt-0.5 text-sm font-bold text-[#191b23] dark:text-white">{mentor.attendance}%</p>
        </div>
      </div>

      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">
          Haftalik faollik
        </p>
        <WeeklyActivityChart data={mentor.weeklyActivity} trend={mentor.activityTrend} />
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          variant="ghost"
          className="flex-1 border border-[#e1e2ed] bg-white text-sm dark:border-slate-700 dark:bg-slate-800"
          onClick={() => onView(mentor)}
        >
          Ko'rish
        </Button>
        <Button
          variant="ghost"
          className="flex-1 bg-[#dbe1ff] text-sm text-[#2563eb] hover:bg-[#c7d2ff] dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
          onClick={() => onEdit(mentor)}
        >
          Tahrirlash
        </Button>
      </div>
    </Card>
  );
}
