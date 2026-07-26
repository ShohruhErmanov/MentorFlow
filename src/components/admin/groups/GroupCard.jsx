import { Clock, MoreVertical, Pencil } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import ProgressBar from '../../ui/ProgressBar';
import StatusBadge from './StatusBadge';

export default function GroupCard({ group, onView, onEdit, onSchedule, onStudents, onAttendance, onAssignments, onArchive, onDelete }) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-bold text-[#191b23] dark:text-white">{group.name}</p>
            <StatusBadge status={group.status} />
          </div>
          <p className="mt-1 text-xs font-semibold text-[#2563eb] dark:text-blue-400">{group.course}</p>
        </div>

        <Dropdown
          trigger={
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-[#737686] dark:text-slate-400">
              <MoreVertical size={18} />
            </Button>
          }
        >
          <div className="min-w-[170px] py-1">
            <button onClick={() => onView(group)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Ko'rish
            </button>
            <button onClick={() => onEdit(group)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Tahrirlash
            </button>
            <button onClick={() => onSchedule(group)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Dars jadvali
            </button>
            <button onClick={() => onStudents(group)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              O'quvchilar
            </button>
            <button onClick={() => onAttendance(group)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Davomat
            </button>
            <button onClick={() => onAssignments(group)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Vazifalar
            </button>
            <div className="my-1 h-px bg-[#e1e2ed] dark:bg-slate-700" />
            <button onClick={() => onArchive(group)} className="flex w-full items-center px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10">
              Arxivlash
            </button>
            <button onClick={() => onDelete(group)} className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
              O'chirish
            </button>
          </div>
        </Dropdown>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={group.mentor.avatarUrl}
          alt={group.mentor.name}
          className="h-10 w-10 rounded-full object-cover shadow-sm"
        />
        <div>
          <p className="text-sm font-bold text-[#191b23] dark:text-white">{group.mentor.name}</p>
          <p className="text-xs font-medium text-[#737686] dark:text-slate-400">Mentor</p>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="text-[#191b23] dark:text-white">Kurs o'zlashtirish ({group.progressPercent}%)</span>
          <span className="text-[#737686] dark:text-slate-400">
            {group.lessonsCompleted}/{group.lessonsTotal} Dars
          </span>
        </div>
        <ProgressBar value={group.progressPercent} max={100} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-[#f7f8ff] px-3 py-2 text-center dark:bg-slate-900/60">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">O'quvchilar</p>
          <p className="mt-0.5 text-sm font-bold text-[#191b23] dark:text-white">{group.studentCount} ta</p>
        </div>
        <div className="rounded-xl bg-[#f7f8ff] px-3 py-2 text-center dark:bg-slate-900/60">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">O'rt. ball</p>
          <p className="mt-0.5 text-sm font-bold text-[#191b23] dark:text-white">{group.avgScore}%</p>
        </div>
        <div className="rounded-xl bg-[#f7f8ff] px-3 py-2 text-center dark:bg-slate-900/60">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">Davomat</p>
          <p className="mt-0.5 text-sm font-bold text-[#191b23] dark:text-white">{group.attendance}%</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-medium text-[#737686] dark:text-slate-400">
        <Clock size={14} />
        <span>{group.scheduleDays.join(' • ')}</span>
        <span>&bull;</span>
        <span>{group.scheduleTime}</span>
      </div>

      <div className="flex gap-2 pt-1">
        <Button variant="primary" className="flex-1 text-sm" onClick={() => onView(group)}>
          Ko'rish
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-[#e1e2ed] text-[#434655] dark:border-slate-700 dark:text-slate-300"
          onClick={() => onEdit(group)}
          aria-label="Tahrirlash"
          title="Tahrirlash"
        >
          <Pencil size={16} />
        </Button>
      </div>
    </Card>
  );
}
