import { ChevronDown } from 'lucide-react';

export default function LoadMoreButton({ onClick, isLoading }) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="flex items-center gap-2 h-10 px-6 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Yuklanmoqda...' : 'Yana yuklash'}
        {!isLoading && <ChevronDown size={18} className="text-gray-500" />}
      </button>
    </div>
  );
}
