import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import Dropdown from '../../ui/Dropdown';
import Button from '../../ui/Button';
import AttendanceProgress from '../../students/AttendanceProgress';
import StatusBadge from './StatusBadge';
import PaymentBadge from './PaymentBadge';

export default function StudentRow({ student, index, onView, onEdit, onAttendance, onPayment, onToggleBlock, onDelete }) {
  const isBlocked = student.status === 'blocked';

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
          <img
            src={student.avatarUrl}
            alt={`${student.firstName} ${student.lastName}`}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
          />
          <div>
            <p className="text-sm font-bold text-[#191b23] dark:text-white">
              {student.firstName} {student.lastName}
            </p>
            <p className="text-xs font-medium text-[#737686] dark:text-slate-400">ID: {student.id}</p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-300">{student.phone}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-300">{student.mentorName}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span className="inline-flex items-center rounded-lg bg-[#f3f3fe] px-2.5 py-1 text-xs font-semibold text-[#434655] dark:bg-slate-700/50 dark:text-slate-300">
          {student.group}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="w-28">
          <AttendanceProgress percentage={student.attendance} />
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span className="text-sm font-bold text-[#191b23] dark:text-white">{student.rating}</span>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <PaymentBadge status={student.paymentStatus} />
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
          <div className="min-w-[160px] py-1">
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
              onClick={() => onAttendance(student)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40"
            >
              Davomat
            </button>
            <button
              onClick={() => onPayment(student)}
              className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40"
            >
              To'lov
            </button>
            <div className="my-1 h-px bg-[#e1e2ed] dark:bg-slate-700" />
            <button
              onClick={() => onToggleBlock(student)}
              className="flex w-full items-center px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10"
            >
              {isBlocked ? 'Faollashtirish' : 'Bloklash'}
            </button>
            <button
              onClick={() => onDelete(student)}
              className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              O'chirish
            </button>
          </div>
        </Dropdown>
      </td>
    </motion.tr>
  );
}
