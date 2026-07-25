import { Plus, Download, Upload } from 'lucide-react';
import Button from '../ui/Button';
import SearchInput from '../ui/SearchInput';

export default function GroupActions({ searchQuery, onSearchChange, onCreateClick, onImportClick, onExportClick }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:max-w-xs">
        <SearchInput
          placeholder="Guruh qidirish..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" className="border border-[#e1e2ed] dark:border-slate-700 text-sm" onClick={onImportClick}>
          <Upload size={16} />
          Import
        </Button>
        <Button variant="ghost" className="border border-[#e1e2ed] dark:border-slate-700 text-sm" onClick={onExportClick}>
          <Download size={16} />
          Export
        </Button>
        <Button variant="primary" onClick={onCreateClick} className="text-sm">
          <Plus size={16} />
          Yangi guruh
        </Button>
      </div>
    </div>
  );
}
