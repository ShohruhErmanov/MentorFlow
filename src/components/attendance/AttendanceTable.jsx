import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import AttendanceRow from './AttendanceRow';

const ROWS_PER_PAGE = 5;

const statusFilters = [
  { key: 'all', label: 'Barchasi' },
  { key: 'present', label: 'Kelgan' },
  { key: 'late', label: 'Kechikkan' },
  { key: 'absent', label: "Yo'q" },
];

export default function AttendanceTable({ students, onOpenModal }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...students];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.status === statusFilter);
    }
    return result;
  }, [students, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  // Reset page when filters change
  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };
  const handleFilter = (key) => {
    setStatusFilter(key);
    setPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.28 }}
      className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Toolbar */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Talabalar Ro'yxati</h3>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status filters */}
          <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-slate-900/60">
            {statusFilters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleFilter(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === key
                    ? 'bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Ism bo'yicha qidirish..."
              className="h-9 w-56 rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-shadow dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-gray-400 dark:border-slate-700 dark:text-slate-500">
              <th className="py-3 pl-5 pr-2">#</th>
              <th className="py-3 px-3">O'quvchi</th>
              <th className="py-3 px-3">Sana</th>
              <th className="py-3 px-3">Holat</th>
              <th className="py-3 px-3">Izoh</th>
              <th className="py-3 pl-3 pr-5">Amal</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((student, idx) => (
                <AttendanceRow
                  key={student.id}
                  student={student}
                  index={(page - 1) * ROWS_PER_PAGE + idx}
                  onOpenModal={onOpenModal}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-gray-400 dark:text-slate-500">
                  Natija topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > ROWS_PER_PAGE && (
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 dark:border-slate-700">
          <p className="text-xs text-gray-400 dark:text-slate-500">
            {(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)} / {filtered.length} talaba
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  p === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
