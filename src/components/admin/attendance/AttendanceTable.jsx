import { AnimatePresence } from 'framer-motion';
import { CalendarX } from 'lucide-react';
import AttendanceRow from './AttendanceRow';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

export default function AttendanceTable({
  students,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onMark,
  onHistory,
  onComment,
  onParent,
  hasFilters,
  onClearFilters,
}) {
  if (students.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          icon={CalendarX}
          title="Davomat ma'lumotlari topilmadi"
          description={
            hasFilters
              ? "Qidiruv yoki filter shartlariga mos o'quvchi topilmadi. Filterlarni tozalab ko'ring."
              : 'Hozircha hech qanday davomat yozuvi mavjud emas.'
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
              <th className="px-6 py-4">Guruh &amp; Mentor</th>
              <th className="px-6 py-4">Bugungi holati</th>
              <th className="px-6 py-4">Haftalik</th>
              <th className="px-6 py-4">Oylik %</th>
              <th className="px-6 py-4">Oxirgi kelgan</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
            <AnimatePresence>
              {students.map((student, index) => (
                <AttendanceRow
                  key={student.id}
                  student={student}
                  index={index}
                  onView={onView}
                  onEdit={onEdit}
                  onMark={onMark}
                  onHistory={onHistory}
                  onComment={onComment}
                  onParent={onParent}
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
