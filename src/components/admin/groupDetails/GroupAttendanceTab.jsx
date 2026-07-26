import Card from '../../ui/Card';
import ProgressBar from '../../ui/ProgressBar';

export default function GroupAttendanceTab({ group }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
              O'rtacha davomat
            </p>
            <p className="mt-1 text-3xl font-bold text-[#191b23] dark:text-white">{group.attendance}%</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">Davomat tarixi</h3>
        <div className="space-y-4">
          {group.attendanceHistory.map((entry, index) => (
            <div key={index}>
              <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
                <span className="text-[#434655] dark:text-slate-300">
                  {new Date(entry.date).toLocaleDateString('uz-UZ')}
                </span>
                <span className="text-[#737686] dark:text-slate-400">
                  {entry.presentCount}/{entry.totalCount} keldi
                </span>
              </div>
              <ProgressBar value={entry.presentCount} max={entry.totalCount} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
