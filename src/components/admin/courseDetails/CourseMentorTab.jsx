import { Mail } from 'lucide-react';
import Card from '../../ui/Card';

export default function CourseMentorTab({ course }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <img src={course.mentor.avatarUrl} alt={course.mentor.name} className="h-16 w-16 rounded-full object-cover shadow-sm" />
        <div>
          <p className="text-lg font-bold text-[#191b23] dark:text-white">{course.mentor.name}</p>
          <p className="text-sm font-semibold text-[#2563eb] dark:text-blue-400">{course.mentor.position}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-[#f7f8ff] p-4 text-sm text-[#434655] dark:bg-slate-900/60 dark:text-slate-300">
        <p className="flex items-center gap-2">
          <Mail size={14} />
          {course.mentor.name.toLowerCase().replace(' ', '.')}@mentorflow.uz
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[#737686] dark:text-slate-400">
        {course.mentor.name} ushbu kursning asosiy mentori bo'lib, {course.studentCount} nafar o'quvchi bilan ishlaydi.
      </p>
    </Card>
  );
}
