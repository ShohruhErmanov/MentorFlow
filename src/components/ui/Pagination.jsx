import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-between border-t border-[#e1e2ed] dark:border-slate-700 pt-6">
      <div className="text-sm font-medium text-[#737686] dark:text-slate-400">
        Jami {totalPages} ta sahifadan {currentPage}-sahifa
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Oldingi sahifa"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e1e2ed] bg-white text-[#434655] transition-colors hover:bg-[#f3f3fe] disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors',
              page === currentPage
                ? 'bg-[#2563eb] text-white'
                : 'border border-[#e1e2ed] bg-white text-[#434655] hover:bg-[#f3f3fe] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Keyingi sahifa"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e1e2ed] bg-white text-[#434655] transition-colors hover:bg-[#f3f3fe] disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
