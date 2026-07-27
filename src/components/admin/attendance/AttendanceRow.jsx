import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';
import Dropdown from '../../ui/Dropdown';
import Button from '../../ui/Button';
import AttendanceBadge from './AttendanceBadge';
import WeeklyAttendanceBars from './WeeklyAttendanceBars';

function monthlyTone(percent) {
  if (percent >= 90) return 'bg-emerald-500';
  if (percent >= 75) return 'bg-[#2563eb]';
  if (percent >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

export default function AttendanceRow({ student, index, onView, onEdit, onMark, onHistory, onComment, onParent }) {
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
          {student.avatarUrl ? (
            <img
              src={student.avatarUrl}
              alt={`${student.firstName} ${student.lastName}`}
              className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dbe1ff] text-xs font-bold text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400">
              {student.firstName[0]}
              {student.lastName[0]}
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-[#191b23] dark:text-white">
              {student.firstName} {student.lastName}
            </p>
            <p className="text-xs font-medium text-[#737686] dark:text-slate-400">ID: {student.id}</p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-semibold text-[#191b23] dark:text-white">{student.group.label}</p>
        <p className="mt-0.5 text-xs font-medium text-[#737686] dark:text-slate-400">{student.group.mentor}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <AttendanceBadge status={student.todayStatus} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <WeeklyAttendanceBars week={student.weeklyHistory} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-bold text-[#191b23] dark:text-white">{student.monthlyPercent}%</p>
        <span className={clsx('mt-1 block h-1 w-10 rounded-full', monthlyTone(student.monthlyPercent))} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-300">{student.lastAttendedDisplay}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right">
        <Dropdown
          trigger={
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737686] dark:text-slate-400 group-hover:text-[#2563eb]">
              <MoreHorizontal size={18} />
            </Button>
          }
        >
          <div className="min-w-[170px] py-1">
            <button
              onClick={() => onView(student)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40"
            >
              Ko'rish
            </button>
            <button
              onClick={() => onEdit(student)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40"
            >
              Tahrirlash
            </button>
            <button
              onClick={() => onMark(student)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40"
            >
              Davomat belgilash
            </button>
            <button
              onClick={() => onHistory(student)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40"
            >
              Davomat tarixi
            </button>
            <button
              onClick={() => onComment(student)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40"
            >
              Izoh qoldirish
            </button>
            <div className="my-1 h-px bg-[#e1e2ed] dark:bg-slate-700" />
            <button
              onClick={() => onParent(student)}
              className="flex w-full items-center px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-[#f3f3fe] dark:text-blue-400 dark:hover:bg-blue-500/10"
            >
              Ota-onaga xabar
            </button>
          </div>
        </Dropdown>
      </td>
    </motion.tr>
  );
}
