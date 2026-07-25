export default function AdminDashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-80 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="flex gap-3">
          <div className="h-11 w-40 rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-11 w-32 rounded-lg bg-gray-100 dark:bg-slate-800" />
          <div className="h-11 w-32 rounded-lg bg-gray-100 dark:bg-slate-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-[152px] rounded-xl border border-[#e1e2ed] bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <div className="h-11 w-11 rounded-xl bg-gray-200 dark:bg-slate-700" />
            <div className="mt-5 h-7 w-20 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="mt-2 h-4 w-28 rounded bg-gray-100 dark:bg-slate-800" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-[436px] rounded-xl border border-[#e1e2ed] bg-white p-6 dark:border-slate-700 dark:bg-slate-800" />
        <div className="h-[436px] rounded-xl border border-[#e1e2ed] bg-white p-6 dark:border-slate-700 dark:bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="h-[340px] rounded-xl border border-[#e1e2ed] bg-white p-6 dark:border-slate-700 dark:bg-slate-800" />
        <div className="h-[340px] rounded-xl border border-[#e1e2ed] bg-white p-6 dark:border-slate-700 dark:bg-slate-800" />
      </div>
    </div>
  );
}
