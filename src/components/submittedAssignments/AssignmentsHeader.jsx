import { Filter } from 'lucide-react';
import GroupDropdown from './GroupDropdown';

export default function AssignmentsHeader({ selectedGroup, setSelectedGroup, onOpenFilter }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-[32px] font-bold text-gray-900 leading-tight">
          Topshirilgan vazifalar
        </h1>
        <p className="mt-2 text-gray-500">
          O'quvchilar tomonidan yuborilgan so'nggi vazifalarni ko'rib chiqing va baholang.
        </p>
      </div>
      
      <div className="flex items-center gap-3 self-start md:self-auto">
        <GroupDropdown selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
        
        <button
          onClick={onOpenFilter}
          className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          <Filter size={18} />
          Filtr
        </button>
      </div>
    </div>
  );
}
