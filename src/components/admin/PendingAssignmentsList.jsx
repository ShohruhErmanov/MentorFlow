import { FileText } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { pendingAssignments } from '../../data/adminDashboardData';

export default function PendingAssignmentsList() {
  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[20px] font-bold leading-7 tracking-[0] text-[#191b23] dark:text-white">
          Tekshirilishi kerak bo'lgan vazifalar
        </h2>
        <Badge variant="red">{pendingAssignments.length} ta</Badge>
      </div>

      {pendingAssignments.length === 0 ? (
        <p className="py-10 text-center text-sm font-medium text-[#737686] dark:text-slate-400">
          Tekshirilishi kerak bo'lgan vazifalar yo'q.
        </p>
      ) : (
        <ul className="space-y-3">
          {pendingAssignments.map((assignment) => (
            <li
              key={assignment.id}
              className="flex items-center gap-4 rounded-xl border border-[#e1e2ed] p-4 dark:border-slate-700"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400">
                <FileText size={18} strokeWidth={2.1} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#191b23] dark:text-white">{assignment.title}</p>
                <p className="mt-0.5 truncate text-xs font-medium text-[#737686] dark:text-slate-400">
                  Guruh: {assignment.group} &bull; Talaba: {assignment.student}
                </p>
              </div>
              <Button variant="primary" size="md" className="h-9 shrink-0 px-4 text-xs">
                Tekshirish
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
