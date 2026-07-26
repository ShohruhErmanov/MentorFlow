import Card from '../../ui/Card';
import ProgressBar from '../../ui/ProgressBar';

export default function CourseStudentsTab({ course }) {
  if (course.students.length === 0) {
    return (
      <Card className="p-6 text-center text-sm font-medium text-[#737686] dark:text-slate-400">
        Bu kursga hali o'quvchilar yozilmagan.
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">
        O'quvchilar ({course.studentCount})
      </h3>
      <ul className="space-y-4">
        {course.students.map((student) => (
          <li key={student.id} className="flex items-center gap-4">
            <img src={student.avatarUrl} alt={student.name} className="h-9 w-9 rounded-full object-cover" />
            <span className="w-40 shrink-0 truncate text-sm font-semibold text-[#191b23] dark:text-white">
              {student.name}
            </span>
            <div className="flex-1">
              <ProgressBar value={student.progress} max={100} />
            </div>
          </li>
        ))}
      </ul>
      {course.studentCount > course.students.length && (
        <p className="mt-4 text-xs font-medium text-[#737686] dark:text-slate-400">
          va yana {course.studentCount - course.students.length} nafar o'quvchi...
        </p>
      )}
    </Card>
  );
}
