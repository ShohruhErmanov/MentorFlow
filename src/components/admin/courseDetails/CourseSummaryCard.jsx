import { BookOpen, Clock, GraduationCap, Layers } from 'lucide-react';
import Card from '../../ui/Card';
import AdminStatCard from '../AdminStatCard';
import StatusBadge from '../courses/StatusBadge';

export default function CourseSummaryCard({ course }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="overflow-hidden">
        <img src={course.coverImageUrl} alt={course.name} className="h-44 w-full object-cover" />
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-[#191b23] dark:text-white">{course.name}</h2>
            <StatusBadge status={course.status} />
          </div>
          <p className="mt-2 text-sm font-medium text-[#737686] dark:text-slate-400">{course.shortDescription}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#434655] dark:text-slate-300">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f3f3fe] px-2.5 py-1 dark:bg-slate-700/50">
              <BookOpen size={12} />
              {course.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap size={13} />
              {course.studentCount} ta o'quvchi
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers size={13} />
              {course.price.toLocaleString('en-US')} so'm
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <AdminStatCard label="O'quvchilar" value={String(course.studentCount)} icon={GraduationCap} tone="blue" />
        <AdminStatCard label="Darslar" value={String(course.lessons.length)} icon={BookOpen} tone="orange" />
        <AdminStatCard label="Vazifalar" value={String(course.assignments.length)} icon={Layers} tone="green" />
        <AdminStatCard label="Progress" value={`${course.progressPercent}%`} icon={Clock} tone="rose" />
      </div>
    </div>
  );
}
