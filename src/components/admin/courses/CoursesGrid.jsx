import { BookX } from 'lucide-react';
import CourseCard from './CourseCard';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

export default function CoursesGrid({
  courses,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onStudents,
  onMentor,
  onGroups,
  onStatistics,
  onArchive,
  onDelete,
  hasFilters,
  onClearFilters,
  onCreateCourse,
}) {
  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          icon={BookX}
          title="Kurslar topilmadi"
          description={
            hasFilters
              ? "Qidiruv yoki filter shartlariga mos kurs topilmadi. Filterlarni tozalab ko'ring."
              : "Hozircha hech qanday kurs qo'shilmagan."
          }
          buttonText={hasFilters ? 'Filterlarni tozalash' : '+ Yangi kurs'}
          onAction={hasFilters ? onClearFilters : onCreateCourse}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onView={onView}
            onEdit={onEdit}
            onStudents={onStudents}
            onMentor={onMentor}
            onGroups={onGroups}
            onStatistics={onStatistics}
            onArchive={onArchive}
            onDelete={onDelete}
          />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
