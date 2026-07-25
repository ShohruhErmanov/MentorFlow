export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-700"></div>
          <div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
          </div>
        </div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
      </div>
      <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2"></div>
      <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-6"></div>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
        <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded-lg w-28"></div>
      </div>
    </div>
  );
}
