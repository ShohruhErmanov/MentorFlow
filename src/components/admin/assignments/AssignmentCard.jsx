import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { MoreVertical } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import ProgressBar from '../../ui/ProgressBar';
import { getDeadlineStatus } from './deadlineStatus';
import { getSubmissionCountsForAssignment } from '../../../constants/mockSubmissions';

export default function AssignmentCard({ assignment, onView, onEdit, onSubmissions, onResults, onExtendDeadline, onArchive, onDelete }) {
  const deadlineStatus = getDeadlineStatus(assignment);
  const { totalCount, submittedCount, lateCount } = getSubmissionCountsForAssignment(assignment.id);
  const progressPercent = Math.round((submittedCount / totalCount) * 100) || 0;
  const onTimeCount = submittedCount - lateCount;

  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-lg bg-[#e4e0ff] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4c1d95] dark:bg-violet-500/10 dark:text-violet-300">
            {assignment.category}
          </span>
          <span className="inline-flex items-center rounded-lg bg-[#f3f3fe] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#434655] dark:bg-slate-700/50 dark:text-slate-300">
            {assignment.group}
          </span>
        </div>

        <Dropdown
          trigger={
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-[#737686] dark:text-slate-400">
              <MoreVertical size={16} />
            </Button>
          }
        >
          <div className="min-w-[180px] py-1">
            <button onClick={() => onView(assignment)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Ko'rish
            </button>
            <button onClick={() => onEdit(assignment)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Tahrirlash
            </button>
            <button onClick={() => onSubmissions(assignment)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Topshirganlar
            </button>
            <button onClick={() => onResults(assignment)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Natijalar
            </button>
            <button onClick={() => onExtendDeadline(assignment)} className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-slate-700/40">
              Muddatni uzaytirish
            </button>
            <div className="my-1 h-px bg-[#e1e2ed] dark:bg-slate-700" />
            <button onClick={() => onArchive(assignment)} className="flex w-full items-center px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10">
              Arxivlash
            </button>
            <button onClick={() => onDelete(assignment)} className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
              O'chirish
            </button>
          </div>
        </Dropdown>
      </div>

      <div>
        <p className="text-sm font-bold text-[#191b23] dark:text-white">{assignment.title}</p>
        <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-[#737686] dark:text-slate-400">
          {assignment.shortDescription}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <img src={assignment.mentor.avatarUrl} alt={assignment.mentor.name} className="h-8 w-8 rounded-full object-cover" />
          <p className="truncate text-xs font-bold text-[#191b23] dark:text-white">{assignment.mentor.name}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">Maks. ball</p>
          <p className="text-sm font-bold text-[#191b23] dark:text-white">{assignment.maxScore} ball</p>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
          <span className="text-[#191b23] dark:text-white">Topshirilganlar ko'rsatkichi</span>
          <span className="text-[#737686] dark:text-slate-400">
            {submittedCount}/{totalCount}
          </span>
        </div>
        <ProgressBar value={submittedCount} max={totalCount} />
        <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold">
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {onTimeCount} ta topshirdi
            </span>
            <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {lateCount} ta kechikdi
            </span>
          </span>
          <span className="text-[#737686] dark:text-slate-400">{progressPercent}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#e1e2ed] pt-3 dark:border-slate-700">
        <span
          className={clsx(
            'text-xs font-semibold',
            deadlineStatus.tone === 'danger'
              ? 'text-red-600 dark:text-red-400'
              : 'text-[#737686] dark:text-slate-400',
          )}
        >
          {deadlineStatus.label}
        </span>
        <Link
          to={`/admin/assignments/${assignment.id}`}
          className="text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] dark:text-blue-400 dark:hover:text-blue-300"
        >
          Batafsil
        </Link>
      </div>
    </Card>
  );
}
