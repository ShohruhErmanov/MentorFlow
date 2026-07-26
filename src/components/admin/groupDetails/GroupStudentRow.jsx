import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import AttendanceProgress from '../../students/AttendanceProgress';
import StudentStatusBadge from './StudentStatusBadge';

function ScoreBadge({ score }) {
  const tone =
    score >= 85
      ? 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400'
      : score >= 70
        ? 'bg-[#e8f6ed] text-[#20834a] dark:bg-emerald-500/10 dark:text-emerald-400'
        : 'bg-[#ffede6] text-[#bc4800] dark:bg-orange-500/10 dark:text-orange-400';

  return (
    <span className={clsx('inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold', tone)}>
      {score}
    </span>
  );
}

export default function GroupStudentRow({ student, index, onView, onEdit, onAssignments, onMessageParent, onRemove }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="group bg-white transition-colors hover:bg-[#faf8ff] dark:bg-slate-800 dark:hover:bg-slate-700/40"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar initials={student.name.split(' ').map((p) => p[0]).join('')} src={student.avatarUrl} alt={student.name} />
          <div>
            <p className="text-sm font-bold text-[#191b23] dark:text-white">{student.name}</p>
            <p className="text-xs font-medium text-[#737686] dark:text-slate-400">ID: {student.id}</p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-300">{student.phone}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="w-28">
          <AttendanceProgress percentage={student.attendance} />
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <ScoreBadge score={student.score} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span className="text-sm font-semibold text-[#434655] dark:text-slate-300">{student.rank}-o'rin</span>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <StudentStatusBadge status={student.status} />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right">
        <Dropdown
          trigger={
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737686] dark:text-slate-400 group-hover:text-[#2563eb]">
              <MoreVertical size={18} />
            </Button>
          }
        >
          <div className="min-w-[170px] py-1">
            <button onClick={() => onView(student)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Ko'rish
            </button>
            <button onClick={() => onEdit(student)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Tahrirlash
            </button>
            <button onClick={() => onView(student)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Davomat
            </button>
            <button onClick={() => onView(student)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Baholar
            </button>
            <button onClick={() => onAssignments(student)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Vazifalar
            </button>
            <button onClick={() => onMessageParent(student)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Ota-onasi
            </button>
            <div className="my-1 h-px bg-[#e1e2ed] dark:bg-slate-700" />
            <button onClick={() => onRemove(student)} className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
              Guruhdan chiqarish
            </button>
          </div>
        </Dropdown>
      </td>
    </motion.tr>
  );
}
