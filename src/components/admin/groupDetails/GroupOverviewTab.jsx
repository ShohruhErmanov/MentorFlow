import Card from '../../ui/Card';
import ProgressBar from '../../ui/ProgressBar';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#191b23] dark:text-white">{value}</p>
    </div>
  );
}

export default function GroupOverviewTab({ group }) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">Guruh haqida to'liq ma'lumot</h3>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        <InfoField label="Kurs" value={group.course} />
        <InfoField label="Mentor" value={group.mentor.name} />
        <InfoField label="Xona" value={group.room} />
        <InfoField label="Maksimal o'quvchilar" value={group.capacity} />
        <InfoField label="Boshlanish sanasi" value={new Date(group.startDate).toLocaleDateString('uz-UZ')} />
        <InfoField label="Tugash sanasi" value={new Date(group.endDate).toLocaleDateString('uz-UZ')} />
        <InfoField label="Dars kunlari" value={group.scheduleDays.join(', ')} />
        <InfoField label="Dars vaqti" value={group.scheduleTime} />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="text-[#191b23] dark:text-white">Kurs o'zlashtirish</span>
          <span className="text-[#737686] dark:text-slate-400">
            {group.lessonsCompleted}/{group.lessonsTotal} Dars
          </span>
        </div>
        <ProgressBar value={group.progressPercent} max={100} />
      </div>
    </Card>
  );
}
