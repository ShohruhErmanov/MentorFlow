import { AnimatePresence } from 'framer-motion';
import { UserX } from 'lucide-react';
import UserRow from './UserRow';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

export default function UsersTable({
  users,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onToggleBlock,
  onDelete,
  hasFilters,
  onClearFilters,
}) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          icon={UserX}
          title="Foydalanuvchilar topilmadi"
          description={
            hasFilters
              ? "Qidiruv yoki filter shartlariga mos foydalanuvchi topilmadi. Filterlarni tozalab ko'ring."
              : "Hozircha hech qanday foydalanuvchi qo'shilmagan."
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
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-[#e1e2ed] bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
              <th className="px-6 py-4">Foydalanuvchi</th>
              <th className="px-6 py-4">Aloqa</th>
              <th className="px-6 py-4">Rol</th>
              <th className="px-6 py-4">Holati</th>
              <th className="px-6 py-4">Oxirgi kirish</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
            <AnimatePresence>
              {users.map((user, index) => (
                <UserRow
                  key={user.id}
                  user={user}
                  index={index}
                  onView={onView}
                  onEdit={onEdit}
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
