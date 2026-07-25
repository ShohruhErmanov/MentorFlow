import { Users, Calendar, TrendingUp, Star } from 'lucide-react';

export default function GroupStats({ students, attendance, progress, rating }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* O'quvchilar */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e2ed] bg-white p-3 transition-colors hover:bg-[#f3f3fe] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/40">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737686] dark:text-slate-400">
          <Users size={14} />
          O'quvchilar
        </div>
        <div className="text-lg font-bold text-[#191b23] dark:text-white">
          {students.count}
          <span className="text-sm font-medium text-[#737686] dark:text-slate-400">/{students.max}</span>
        </div>
      </div>

      {/* Davomat */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e2ed] bg-white p-3 transition-colors hover:bg-[#f3f3fe] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/40">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737686] dark:text-slate-400">
          <Calendar size={14} />
          Davomat
        </div>
        <div className="text-lg font-bold text-[#191b23] dark:text-white">{attendance}%</div>
      </div>

      {/* O'zlashtirish */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e2ed] bg-white p-3 transition-colors hover:bg-[#f3f3fe] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/40">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737686] dark:text-slate-400">
          <TrendingUp size={14} />
          O'zlashtirish
        </div>
        <div className="text-lg font-bold text-[#191b23] dark:text-white">{progress}%</div>
      </div>

      {/* Reyting */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e2ed] bg-white p-3 transition-colors hover:bg-[#f3f3fe] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/40">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737686] dark:text-slate-400">
          <Star size={14} />
          O'rtacha ball
        </div>
        <div className="text-lg font-bold text-[#191b23] dark:text-white">{rating}</div>
      </div>
    </div>
  );
}
