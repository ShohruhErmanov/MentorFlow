import { motion } from 'framer-motion';
import { MoreHorizontal, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import AttendanceProgress from './AttendanceProgress';

export default function StudentRow({ student, index, onView, onEdit, onDelete }) {
  const renderTrendIcon = (score) => {
    if (score >= 85) return <TrendingUp size={14} className="text-emerald-500 dark:text-emerald-400" />;
    if (score < 70) return <TrendingDown size={14} className="text-red-500 dark:text-red-400" />;
    return <Minus size={14} className="text-gray-400 dark:text-slate-500" />;
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="group bg-white transition-colors hover:bg-[#faf8ff] dark:bg-slate-800 dark:hover:bg-slate-700/40"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
          />
          <div>
            <p className="text-sm font-bold text-[#191b23] dark:text-white">{student.name}</p>
            <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{student.id} • {student.group}</p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-400">{student.phone}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="w-32">
          <AttendanceProgress percentage={student.attendance} />
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-[#191b23] dark:text-white">{student.score}%</span>
          {renderTrendIcon(student.score)}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <StatusBadge status={student.status} />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right">
        <Dropdown
          trigger={
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737686] dark:text-slate-400 group-hover:text-[#2563eb]">
              <MoreHorizontal size={18} />
            </Button>
          }
        >
          <div className="py-1 min-w-[140px]">
            <button onClick={() => onView(student)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] dark:text-slate-300 hover:bg-[#f3f3fe] dark:hover:bg-slate-700/40 hover:text-[#2563eb]">
              Ko'rish
            </button>
            <button onClick={() => onEdit(student)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] dark:text-slate-300 hover:bg-[#f3f3fe] dark:hover:bg-slate-700/40 hover:text-[#2563eb]">
              Tahrirlash
            </button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] dark:text-slate-300 hover:bg-[#f3f3fe] dark:hover:bg-slate-700/40 hover:text-[#2563eb]">
              Davomat
            </button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] dark:text-slate-300 hover:bg-[#f3f3fe] dark:hover:bg-slate-700/40 hover:text-[#2563eb]">
              Vazifalar
            </button>
            <div className="my-1 h-px bg-[#e1e2ed] dark:bg-slate-700"></div>
            <button onClick={() => onDelete(student)} className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
              O'chirish
            </button>
          </div>
        </Dropdown>
      </td>
    </motion.tr>
  );
}
