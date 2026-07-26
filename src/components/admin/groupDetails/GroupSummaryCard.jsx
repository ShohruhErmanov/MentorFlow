import { BookOpen, Building2, Clock, GraduationCap } from 'lucide-react';
import Card from '../../ui/Card';
import AdminStatCard from '../AdminStatCard';
import StatusBadge from '../groups/StatusBadge';

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{label}</p>
        <p className="text-sm font-bold text-[#191b23] dark:text-white">{value}</p>
      </div>
    </div>
  );
}

export default function GroupSummaryCard({ group }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold text-[#191b23] dark:text-white">{group.name}</h2>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f3f3fe] px-2.5 py-1 text-xs font-semibold text-[#434655] dark:bg-slate-700/50 dark:text-slate-300">
            <BookOpen size={12} />
            Kurs: {group.course}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            &bull; Holat: <StatusBadge status={group.status} />
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoRow icon={GraduationCap} label="Mentor" value={group.mentor.name} />
          <InfoRow icon={Building2} label="Xona" value={group.room} />
          <InfoRow icon={Clock} label="Vaqt" value={`${group.scheduleTime}, ${group.scheduleDays.join('-')}`} />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <AdminStatCard label="O'quvchilar" value={String(group.studentCount)} icon={GraduationCap} tone="blue" />
        <AdminStatCard label="Vazifalar" value={String(group.totalAssignments)} icon={BookOpen} tone="orange" />
        <AdminStatCard label="Davomat" value={`${group.attendance}%`} icon={Clock} tone="green" />
        <AdminStatCard label="O'rtacha baho" value={`${group.avgScore}%`} icon={GraduationCap} tone="rose" />
      </div>
    </div>
  );
}
