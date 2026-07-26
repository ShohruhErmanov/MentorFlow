import { Clock, Eye, MoreVertical, Pencil, Users } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import ProgressBar from '../../ui/ProgressBar';
import StatusBadge from './StatusBadge';

export default function CourseCard({ course, onView, onEdit, onStudents, onMentor, onGroups, onStatistics, onArchive, onDelete }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative">
        <img src={course.coverImageUrl} alt={course.name} className="h-40 w-full object-cover" />
        <StatusBadge status={course.status} className="absolute right-3 top-3" />
        <span className="absolute bottom-3 left-3 rounded-lg bg-black/55 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-bold text-[#191b23] dark:text-white">{course.name}</p>
          <Dropdown
            trigger={
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-[#737686] dark:text-slate-400">
                <MoreVertical size={16} />
              </Button>
            }
          >
            <div className="min-w-[170px] py-1">
              <button onClick={() => onView(course)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
                Ko'rish
              </button>
              <button onClick={() => onEdit(course)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
                Tahrirlash
              </button>
              <button onClick={() => onStudents(course)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
                O'quvchilar
              </button>
              <button onClick={() => onMentor(course)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
                Mentor
              </button>
              <button onClick={() => onGroups(course)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
                Guruhlar
              </button>
              <button onClick={() => onStatistics(course)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
                Statistika
              </button>
              <div className="my-1 h-px bg-[#e1e2ed] dark:bg-slate-700" />
              <button onClick={() => onArchive(course)} className="flex w-full items-center px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10">
                Arxivlash
              </button>
              <button onClick={() => onDelete(course)} className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
                O'chirish
              </button>
            </div>
          </Dropdown>
        </div>

        <p className="line-clamp-2 text-xs font-medium leading-relaxed text-[#737686] dark:text-slate-400">
          {course.shortDescription}
        </p>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#434655] dark:text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users size={13} />
            {course.studentCount} ta
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <img src={course.mentor.avatarUrl} alt={course.mentor.name} className="h-8 w-8 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-[#191b23] dark:text-white">{course.mentor.name}</p>
            <p className="truncate text-[11px] font-medium text-[#737686] dark:text-slate-400">{course.mentor.position}</p>
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-[#191b23] dark:text-white">Joriy o'zlashtirish</span>
            <span className="text-[#737686] dark:text-slate-400">{course.progressPercent}%</span>
          </div>
          <ProgressBar value={course.progressPercent} max={100} />
        </div>

        <div className="mt-auto flex gap-2 pt-1">
          <Button variant="primary" className="flex-1 text-sm" onClick={() => onView(course)}>
            <Eye size={15} />
            Ko'rish
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="border border-[#e1e2ed] text-[#434655] dark:border-slate-700 dark:text-slate-300"
            onClick={() => onEdit(course)}
            aria-label="Tahrirlash"
            title="Tahrirlash"
          >
            <Pencil size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
