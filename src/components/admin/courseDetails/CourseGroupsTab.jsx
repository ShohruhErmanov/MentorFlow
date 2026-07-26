import { Layers } from 'lucide-react';
import Card from '../../ui/Card';

export default function CourseGroupsTab({ course }) {
  if (course.groups.length === 0) {
    return (
      <Card className="p-6 text-center text-sm font-medium text-[#737686] dark:text-slate-400">
        Bu kursga hali guruhlar biriktirilmagan.
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {course.groups.map((groupCode) => (
        <Card key={groupCode} className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400">
            <Layers size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#191b23] dark:text-white">{groupCode}</p>
            <p className="text-xs font-medium text-[#737686] dark:text-slate-400">Guruh</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
