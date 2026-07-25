import { ChevronDown } from 'lucide-react';

export default function LoadMoreButton({ onClick, isLoading }) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="flex items-center gap-2 h-10 px-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Yuklanmoqda...' : 'Yana yuklash'}
        {!isLoading && <ChevronDown size={18} className="text-gray-500 dark:text-slate-400" />}
      </button>
    </div>
  );
}
