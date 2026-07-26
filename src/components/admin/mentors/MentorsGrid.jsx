import { UserX } from 'lucide-react';
import MentorCard from './MentorCard';
import AddMentorCard from './AddMentorCard';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

export default function MentorsGrid({
  mentors,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onAddMentor,
  hasFilters,
  onClearFilters,
}) {
  if (mentors.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          icon={UserX}
          title="Mentorlar topilmadi"
          description={
            hasFilters
              ? "Qidiruv yoki filter shartlariga mos mentor topilmadi. Filterlarni tozalab ko'ring."
              : "Hozircha hech qanday mentor qo'shilmagan."
          }
          buttonText={hasFilters ? 'Filterlarni tozalash' : 'Yangi mentor qo\'shish'}
          onAction={hasFilters ? onClearFilters : onAddMentor}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} onView={onView} onEdit={onEdit} />
        ))}
        <AddMentorCard onAdd={onAddMentor} />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
