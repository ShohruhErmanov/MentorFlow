import { BarChart3, ClipboardX, Percent, RefreshCcw, Users } from 'lucide-react';
import AdminStatCard from '../AdminStatCard';

export default function AssignmentStats({ stats }) {
  return (
    <section aria-label="Vazifa statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <AdminStatCard
        label="Topshirganlar"
        value={`${stats.submittedCount}/${stats.totalCount}`}
        icon={Users}
        tone="blue"
      />
      <AdminStatCard label="Topshirmaganlar" value={String(stats.notSubmittedCount)} icon={ClipboardX} tone="red" />
      <AdminStatCard label="Kechikkanlar" value={String(stats.lateCount)} icon={RefreshCcw} tone="orange" />
      <AdminStatCard label="O'rtacha baho" value={stats.avgScore.toFixed(1)} icon={BarChart3} tone="rose" />
      <AdminStatCard label="Muvaffaqiyat" value={`${stats.successRate.toFixed(1)}%`} icon={Percent} tone="blue" />
    </section>
  );
}
