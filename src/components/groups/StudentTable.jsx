import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentRow from './StudentRow';
import Pagination from '../ui/Pagination';
import EmptyState from '../ui/EmptyState';
import SearchToolbar from './SearchToolbar';

export default function StudentTable({ students }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.includes(searchQuery)
    );
  }, [students, searchQuery]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <SearchToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {filteredStudents.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="O'quvchilar topilmadi"
            description="Qidiruv natijasiga mos o'quvchi topilmadi. Yoki hali o'quvchilar qo'shilmagan."
            buttonText="O'quvchi qo'shish"
          />
        </div>
      ) : (
        <>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-[#e1e2ed] text-xs font-semibold uppercase tracking-wider text-[#737686] dark:border-slate-700 dark:text-slate-400">
                  <th className="px-6 py-4">O'quvchi</th>
                  <th className="px-6 py-4">Telefon</th>
                  <th className="px-6 py-4">O'zlashtirish</th>
                  <th className="px-6 py-4">Davomat</th>
                  <th className="px-6 py-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
                <AnimatePresence>
                  {currentStudents.map((student, idx) => (
                    <StudentRow key={student.id} student={student} index={idx} />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="mt-6 border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredStudents.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
