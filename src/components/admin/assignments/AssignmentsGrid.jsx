import { ClipboardX } from 'lucide-react';
import AssignmentCard from './AssignmentCard';
import AddAssignmentCard from './AddAssignmentCard';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

export default function AssignmentsGrid({
  assignments,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onSubmissions,
  onResults,
  onExtendDeadline,
  onArchive,
  onDelete,
  hasFilters,
  onClearFilters,
  onCreateAssignment,
}) {
  if (assignments.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          icon={ClipboardX}
          title="Vazifalar topilmadi"
          description={
            hasFilters
              ? "Qidiruv yoki filter shartlariga mos vazifa topilmadi. Filterlarni tozalab ko'ring."
              : "Hozircha hech qanday vazifa qo'shilmagan."
          }
          buttonText={hasFilters ? 'Filterlarni tozalash' : "+ Yangi vazifa"}
          onAction={hasFilters ? onClearFilters : onCreateAssignment}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onView={onView}
            onEdit={onEdit}
            onSubmissions={onSubmissions}
            onResults={onResults}
            onExtendDeadline={onExtendDeadline}
            onArchive={onArchive}
            onDelete={onDelete}
          />
        ))}
        <AddAssignmentCard onAdd={onCreateAssignment} />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
