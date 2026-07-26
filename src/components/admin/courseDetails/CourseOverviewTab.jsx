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

export default function CourseOverviewTab({ course }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-3 text-base font-bold text-[#191b23] dark:text-white">To'liq tavsif</h3>
        <p className="text-sm leading-relaxed text-[#434655] dark:text-slate-300">{course.fullDescription}</p>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">Kurs ma'lumotlari</h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          <InfoField label="Kategoriya" value={course.category} />
          <InfoField label="Davomiyligi" value={course.duration} />
          <InfoField label="Narxi" value={`${course.price.toLocaleString('en-US')} so'm`} />
          <InfoField label="Guruhlar soni" value={course.groups.length} />
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
            <span className="text-[#191b23] dark:text-white">Umumiy progress</span>
            <span className="text-[#737686] dark:text-slate-400">{course.progressPercent}%</span>
          </div>
          <ProgressBar value={course.progressPercent} max={100} />
        </div>
      </Card>
    </div>
  );
}
