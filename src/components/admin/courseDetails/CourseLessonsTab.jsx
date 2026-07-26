import { CheckCircle2, Circle } from 'lucide-react';
import Card from '../../ui/Card';

export default function CourseLessonsTab({ course }) {
  if (course.lessons.length === 0) {
    return (
      <Card className="p-6 text-center text-sm font-medium text-[#737686] dark:text-slate-400">
        Bu kurs uchun hali darslar qo'shilmagan.
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">Darslar ({course.lessons.length})</h3>
      <ul className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
        {course.lessons.map((lesson) => (
          <li key={lesson.id} className="flex items-center gap-3 py-3">
            {lesson.completed ? (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
            ) : (
              <Circle size={18} className="shrink-0 text-[#737686] dark:text-slate-500" />
            )}
            <span className="flex-1 text-sm font-semibold text-[#191b23] dark:text-white">{lesson.title}</span>
            <span className="text-xs font-medium text-[#737686] dark:text-slate-400">{lesson.durationMinutes} daqiqa</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
