import { AnimatePresence } from 'framer-motion';
import StudentRow from './StudentRow';
import Pagination from '../ui/Pagination';
import EmptyState from '../ui/EmptyState';

export default function StudentTable({ 
  students, 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  totalItems,
  onView,
  onEdit,
  onDelete
}) {
  return (
    <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm">
      {students.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="O'quvchilar topilmadi"
            description="Qidiruv yoki filter natijasiga mos o'quvchi topilmadi. Filterlarni o'zgartirib ko'ring."
            buttonText={null}
          />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-[#e1e2ed] bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-[#737686]">
                  <th className="px-6 py-4">F.I.O</th>
                  <th className="px-6 py-4">Telefon</th>
                  <th className="px-6 py-4">Davomat</th>
                  <th className="px-6 py-4">O'rtacha ball</th>
                  <th className="px-6 py-4">Holati</th>
                  <th className="px-6 py-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e2ed]">
                <AnimatePresence>
                  {students.map((student, idx) => (
                    <StudentRow 
                      key={student.id} 
                      student={student} 
                      index={idx} 
                      onView={onView}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="mt-6 border-t border-[#e1e2ed] pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
