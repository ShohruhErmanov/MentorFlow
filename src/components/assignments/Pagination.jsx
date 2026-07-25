import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 bg-white/50 rounded-b-2xl dark:border-slate-700 dark:bg-slate-800/50">
      <div className="text-sm text-gray-500 dark:text-slate-400">
        Jami <span className="font-medium text-gray-900 dark:text-white">{totalItems}</span> ta vazifa, <span className="font-medium text-gray-900 dark:text-white">{startItem}-{endItem}</span> ko'rsatilmoqda
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700/40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700/40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
