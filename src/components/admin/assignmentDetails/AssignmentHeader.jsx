import { Link } from 'react-router-dom';
import { AlarmClock, Calendar, ChevronRight, Pencil } from 'lucide-react';
import clsx from 'clsx';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { getDeadlineStatus } from '../assignments/deadlineStatus';

const STATUS_META = {
  active: { label: 'Faol', className: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400' },
  submitted: { label: 'Topshirilgan', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  overdue: { label: 'Kechikkan', className: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' },
  reviewing: { label: 'Tekshirilmoqda', className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
  archived: { label: 'Arxivlangan', className: 'bg-gray-100 text-gray-700 dark:bg-slate-700/40 dark:text-slate-300' },
};

function MetaField({ label, children }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">{label}</p>
      <div className="mt-1 text-sm font-bold text-[#191b23] dark:text-white">{children}</div>
    </div>
  );
}

export default function AssignmentHeader({ assignment, onEdit }) {
  const statusMeta = STATUS_META[assignment.status] ?? STATUS_META.active;
  const deadlineStatus = getDeadlineStatus(assignment);
  const deadlineDate = new Date(assignment.deadline);

  return (
    <div className="mb-6">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-[#737686] dark:text-slate-400">
        <Link to="/admin/assignments" className="hover:text-[#2563eb] dark:hover:text-blue-400">
          Vazifalar
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-[#434655] dark:text-slate-300">{assignment.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider', statusMeta.className)}>
              {statusMeta.label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#737686] dark:text-slate-400">
              <Calendar size={13} />
              Yaratilgan: {new Date(assignment.createdAt).toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <h1 className="mt-3 text-xl font-bold leading-snug text-[#191b23] dark:text-white sm:text-2xl">
            {assignment.title}
          </h1>

          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <MetaField label="Kurs">{assignment.course}</MetaField>
            <MetaField label="Guruh">{assignment.group}</MetaField>
            <MetaField label="Mentor">
              <span className="flex items-center gap-1.5">
                <img src={assignment.mentor.avatarUrl} alt={assignment.mentor.name} className="h-5 w-5 rounded-full object-cover" />
                {assignment.mentor.name}
              </span>
            </MetaField>
            <MetaField label="Maks. ball">{assignment.maxScore} Ball</MetaField>
          </div>
        </Card>

        <Card className="flex flex-col justify-between gap-4 bg-[#f7f8ff] p-5 dark:bg-slate-900/60">
          <div>
            <p className="text-xs font-semibold text-[#737686] dark:text-slate-400">Muddat (Deadline)</p>
            <p
              className={clsx(
                'mt-2 flex items-center gap-2 text-base font-bold',
                deadlineStatus.tone === 'danger' ? 'text-red-600 dark:text-red-400' : 'text-[#191b23] dark:text-white',
              )}
            >
              <AlarmClock size={18} />
              {deadlineDate.toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <Button variant="primary" className="w-full text-sm" onClick={onEdit}>
            <Pencil size={15} />
            Vazifani Tahrirlash
          </Button>
        </Card>
      </div>
    </div>
  );
}
