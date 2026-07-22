import { Search } from 'lucide-react';
import clsx from 'clsx';

export default function SearchInput({ className, ...props }) {
  return (
    <label className={clsx('relative block w-full', className)}>
      <span className="sr-only">Qidirish</span>
      <Search
        aria-hidden="true"
        size={18}
        strokeWidth={2}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#737686]"
      />
      <input
        type="search"
        className="h-11 w-full rounded-lg border border-[#e1e2ed] bg-[#f7f8ff] pl-11 pr-4 text-sm font-medium text-[#191b23] outline-none transition placeholder:text-[#737686] focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
        {...props}
      />
    </label>
  );
}
