import { Users, Calendar, TrendingUp, Star } from 'lucide-react';

export default function GroupStats({ students, attendance, progress, rating }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* O'quvchilar */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e2ed] bg-white p-3 transition-colors hover:bg-[#f3f3fe]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737686]">
          <Users size={14} />
          O'quvchilar
        </div>
        <div className="text-lg font-bold text-[#191b23]">
          {students.count}
          <span className="text-sm font-medium text-[#737686]">/{students.max}</span>
        </div>
      </div>

      {/* Davomat */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e2ed] bg-white p-3 transition-colors hover:bg-[#f3f3fe]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737686]">
          <Calendar size={14} />
          Davomat
        </div>
        <div className="text-lg font-bold text-[#191b23]">{attendance}%</div>
      </div>

      {/* O'zlashtirish */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e2ed] bg-white p-3 transition-colors hover:bg-[#f3f3fe]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737686]">
          <TrendingUp size={14} />
          O'zlashtirish
        </div>
        <div className="text-lg font-bold text-[#191b23]">{progress}%</div>
      </div>

      {/* Reyting */}
      <div className="flex flex-col gap-2 rounded-xl border border-[#e1e2ed] bg-white p-3 transition-colors hover:bg-[#f3f3fe]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#737686]">
          <Star size={14} />
          O'rtacha ball
        </div>
        <div className="text-lg font-bold text-[#191b23]">{rating}</div>
      </div>
    </div>
  );
}
