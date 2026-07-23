import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import AttendanceBadge from './AttendanceBadge';
import ProgressIndicator from './ProgressIndicator';

export default function StudentRow({ student, index }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="group border-b border-[#e1e2ed] bg-white transition-colors hover:bg-[#faf8ff] last:border-none"
    >
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar initials={getInitials(student.name)} size="md" />
          <div>
            <p className="text-sm font-semibold text-[#191b23]">{student.name}</p>
            <p className="text-xs font-medium text-[#737686]">ID: #{student.id}</p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655]">{student.phone}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <ProgressIndicator value={student.progress} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <AttendanceBadge value={student.attendance} />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right">
        <Dropdown
          trigger={
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737686] group-hover:text-[#2563eb]">
              <MoreHorizontal size={18} />
            </Button>
          }
        >
          <div className="py-1">
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb]">Ko'rish</button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb]">Tahrirlash</button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb]">Davomat</button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb]">Topshiriqlar</button>
            <div className="my-1 h-px bg-[#e1e2ed]"></div>
            <button className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">O'chirish</button>
          </div>
        </Dropdown>
      </td>
    </motion.tr>
  );
}
