import Card from '../../ui/Card';
import ProgressBar from '../../ui/ProgressBar';

export default function CourseAssignmentsTab({ course }) {
  if (course.assignments.length === 0) {
    return (
      <Card className="p-6 text-center text-sm font-medium text-[#737686] dark:text-slate-400">
        Bu kurs uchun hali vazifalar mavjud emas.
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {course.assignments.map((assignment) => (
        <Card key={assignment.id} className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-[#191b23] dark:text-white">{assignment.title}</p>
            <p className="text-xs font-medium text-[#737686] dark:text-slate-400">
              Muddat: {new Date(assignment.dueDate).toLocaleDateString('uz-UZ')}
            </p>
          </div>
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
              <span className="text-[#434655] dark:text-slate-300">Topshirilgan</span>
              <span className="text-[#737686] dark:text-slate-400">
                {assignment.submittedCount}/{assignment.totalCount}
              </span>
            </div>
            <ProgressBar value={assignment.submittedCount} max={Math.max(1, assignment.totalCount)} />
          </div>
        </Card>
      ))}
    </div>
  );
}
