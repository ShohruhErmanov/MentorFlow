import { AnimatePresence } from 'framer-motion';
import { Download, UserX } from 'lucide-react';
import SearchInput from '../../ui/SearchInput';
import Button from '../../ui/Button';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';
import GroupStudentRow from './GroupStudentRow';

export default function GroupStudentsTable({
  students,
  searchQuery,
  onSearchChange,
  onExport,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onAssignments,
  onMessageParent,
  onRemove,
  hasFilters,
  onClearFilters,
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <SearchInput
            placeholder="O'quvchini qidiring..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 border border-[#e1e2ed] text-[#434655] dark:border-slate-700 dark:text-slate-300"
          onClick={onExport}
          aria-label="Yuklab olish"
          title="Yuklab olish"
        >
          <Download size={18} />
        </Button>
      </div>

      {students.length === 0 ? (
        <EmptyState
          icon={UserX}
          title="O'quvchilar topilmadi"
          description={
            hasFilters
              ? "Qidiruv shartiga mos o'quvchi topilmadi."
              : "Bu guruhda hali o'quvchilar yo'q."
          }
          buttonText={hasFilters ? 'Qidiruvni tozalash' : null}
          onAction={hasFilters ? onClearFilters : undefined}
        />
      ) : (
        <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-[#e1e2ed] bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
                  <th className="px-6 py-4">F.I.SH</th>
                  <th className="px-6 py-4">Telefon</th>
                  <th className="px-6 py-4">Davomat</th>
                  <th className="px-6 py-4">O'rtacha baho</th>
                  <th className="px-6 py-4">Reyting</th>
                  <th className="px-6 py-4">Holati</th>
                  <th className="px-6 py-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
                <AnimatePresence>
                  {students.map((student, index) => (
                    <GroupStudentRow
                      key={student.id}
                      student={student}
                      index={index}
                      onView={onView}
                      onEdit={onEdit}
                      onAssignments={onAssignments}
                      onMessageParent={onMessageParent}
                      onRemove={onRemove}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
