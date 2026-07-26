import { AnimatePresence } from 'framer-motion';
import { UserX } from 'lucide-react';
import ParentRow from './ParentRow';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

export default function ParentTable({
  parents,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onMessage,
  onToggleBlock,
  onDelete,
  hasFilters,
  onClearFilters,
}) {
  if (parents.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          icon={UserX}
          title="Ota-onalar topilmadi"
          description={
            hasFilters
              ? "Qidiruv yoki filter shartlariga mos ota-ona topilmadi. Filterlarni tozalab ko'ring."
              : "Hozircha hech qanday ota-ona qo'shilmagan."
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
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="border-b border-[#e1e2ed] bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
              <th className="px-6 py-4">Ota-ona</th>
              <th className="px-6 py-4">Kontakt</th>
              <th className="px-6 py-4">Farzand(lar)</th>
              <th className="px-6 py-4">Guruh / Mentor</th>
              <th className="px-6 py-4">To'lov holati</th>
              <th className="px-6 py-4">Oxirgi kirish</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
            <AnimatePresence>
              {parents.map((parent, index) => (
                <ParentRow
                  key={parent.id}
                  parent={parent}
                  index={index}
                  onView={onView}
                  onEdit={onEdit}
                  onMessage={onMessage}
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
