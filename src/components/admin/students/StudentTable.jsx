import { AnimatePresence } from 'framer-motion';
import { UserX } from 'lucide-react';
import StudentRow from './StudentRow';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

export default function StudentTable({
  students,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onAttendance,
  onPayment,
  onToggleBlock,
  onDelete,
  hasFilters,
  onClearFilters,
}) {
  if (students.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          icon={UserX}
          title="O'quvchilar topilmadi"
          description={
            hasFilters
              ? "Qidiruv yoki filter shartlariga mos o'quvchi topilmadi. Filterlarni tozalab ko'ring."
              : "Hozircha hech qanday o'quvchi qo'shilmagan."
          }
          buttonText={hasFilters ? 'Filterlarni tozalash' : null}
          onAction={hasFilters ? onClearFilters : undefined}
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left">
          <thead>
            <tr className="border-b border-[#e1e2ed] bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
              <th className="px-6 py-4">O'quvchi</th>
              <th className="px-6 py-4">Telefon</th>
              <th className="px-6 py-4">Mentor</th>
              <th className="px-6 py-4">Guruh</th>
              <th className="px-6 py-4">Davomat</th>
              <th className="px-6 py-4">Reyting</th>
              <th className="px-6 py-4">To'lov</th>
              <th className="px-6 py-4">Holati</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
            <AnimatePresence>
              {students.map((student, index) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  index={index}
                  onView={onView}
                  onEdit={onEdit}
                  onAttendance={onAttendance}
                  onPayment={onPayment}
                  onToggleBlock={onToggleBlock}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
