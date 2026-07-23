import { Search, Filter } from 'lucide-react';
import SearchInput from '../ui/SearchInput';
import Button from '../ui/Button';

export default function SearchToolbar({ searchQuery, onSearchChange }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:max-w-md">
        <SearchInput
          placeholder="O'quvchini qidirish..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="ghost" className="bg-white border border-[#e1e2ed] hover:border-[#2563eb] hover:bg-[#f3f3fe]">
        <Filter size={18} />
        <span>Filtr</span>
      </Button>
    </div>
  );
}
