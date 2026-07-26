import { FolderOpen } from 'lucide-react';
import GroupCard from './GroupCard';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

export default function GroupsGrid({
  groups,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onSchedule,
  onStudents,
  onAttendance,
  onAssignments,
  onArchive,
  onDelete,
  hasFilters,
  onClearFilters,
  onCreateGroup,
}) {
  if (groups.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          icon={FolderOpen}
          title="Guruhlar topilmadi"
          description={
            hasFilters
              ? "Qidiruv yoki filter shartlariga mos guruh topilmadi. Filterlarni tozalab ko'ring."
              : "Hozircha hech qanday guruh qo'shilmagan."
          }
          buttonText={hasFilters ? 'Filterlarni tozalash' : '+ Yangi guruh'}
          onAction={hasFilters ? onClearFilters : onCreateGroup}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onView={onView}
            onEdit={onEdit}
            onSchedule={onSchedule}
            onStudents={onStudents}
            onAttendance={onAttendance}
            onAssignments={onAssignments}
            onArchive={onArchive}
            onDelete={onDelete}
          />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
