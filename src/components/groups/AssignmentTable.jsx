import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, FileText } from 'lucide-react';
import Badge from '../ui/Badge';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';

export default function AssignmentTable({ assignments, onEdit, onDelete }) {
  if (!assignments || assignments.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800">
        <EmptyState
          title="Vazifalar topilmadi"
          description="Hozircha ushbu guruh uchun vazifalar qo'shilmagan."
          buttonText={null}
        />
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-500/10 dark:text-red-400';
      case 'Medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-500/10 dark:text-orange-400';
      case 'Low': return 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className="border-b border-[#e1e2ed] bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
              <th className="px-6 py-4">Vazifa</th>
              <th className="px-6 py-4">Muddat (Deadline)</th>
              <th className="px-6 py-4">Max Ball</th>
              <th className="px-6 py-4">Muhimlik</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
            <AnimatePresence>
              {assignments.map((assignment, idx) => (
                <motion.tr
                  key={assignment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="group bg-white transition-colors hover:bg-[#faf8ff] dark:bg-slate-800 dark:hover:bg-slate-700/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f3fe] text-[#2563eb] dark:bg-slate-700">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#191b23] dark:text-white">{assignment.title}</p>
                        <p className="text-xs font-medium text-[#737686] line-clamp-1 dark:text-slate-400">{assignment.description || 'Ta\'rif yo\'q'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="text-sm font-medium text-[#434655] dark:text-slate-400">{assignment.deadline}</p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      {assignment.maxScore} ball
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737686] group-hover:text-[#2563eb] dark:text-slate-400">
                          <MoreHorizontal size={18} />
                        </Button>
                      }
                    >
                      <div className="py-1">
                        <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-400 dark:hover:bg-slate-700/40">Ko'rish</button>
                        <button
                          onClick={() => onEdit(assignment)}
                          className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-400 dark:hover:bg-slate-700/40"
                        >
                          Tahrirlash
                        </button>
                        <div className="my-1 h-px bg-[#e1e2ed] dark:bg-slate-700"></div>
                        <button
                          onClick={() => onDelete(assignment)}
                          className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                        >
                          O'chirish
                        </button>
                      </div>
                    </Dropdown>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
