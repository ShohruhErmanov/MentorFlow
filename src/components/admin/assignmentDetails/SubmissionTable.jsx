import { useMemo, useState } from 'react';
import { Eye, UserSearch } from 'lucide-react';
import clsx from 'clsx';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import SearchInput from '../../ui/SearchInput';
import Pagination from '../../ui/Pagination';
import EmptyState from '../../ui/EmptyState';

const ITEMS_PER_PAGE = 8;

const STATUS_META = {
  onTime: { label: 'Topshirdi', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  late: { label: 'Kechikdi', className: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' },
  pending: { label: 'Kutilmoqda', className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
};

export default function SubmissionTable({ submissions, maxScore, onView, onReview }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (!searchQuery) return submissions;
    const q = searchQuery.toLowerCase();
    return submissions.filter((s) => s.studentName.toLowerCase().includes(q) || s.group.toLowerCase().includes(q));
  }, [submissions, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const currentItems = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  return (
    <div>
      <div className="mb-4 max-w-xs">
        <SearchInput
          placeholder="O'quvchi yoki guruh bo'yicha qidirish..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {currentItems.length === 0 ? (
        <Card className="p-6">
          <EmptyState
            icon={UserSearch}
            title="Topshiriqlar topilmadi"
            description="Qidiruv shartiga mos o'quvchi topilmadi."
            buttonText={null}
          />
        </Card>
      ) : (
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-[#e1e2ed] text-xs font-semibold uppercase tracking-wider text-[#737686] dark:border-slate-700 dark:text-slate-400">
                  <th className="py-3 pr-4">O'quvchi</th>
                  <th className="py-3 pr-4">Guruh</th>
                  <th className="py-3 pr-4">Topshirish vaqti</th>
                  <th className="py-3 pr-4">Ball</th>
                  <th className="py-3 pr-4">Holati</th>
                  <th className="py-3 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
                {currentItems.map((submission) => {
                  const meta = STATUS_META[submission.status];
                  return (
                    <tr key={submission.id}>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <img src={submission.avatarUrl} alt={submission.studentName} className="h-8 w-8 rounded-full object-cover" />
                          <span className="text-sm font-semibold text-[#191b23] dark:text-white">{submission.studentName}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm font-medium text-[#434655] dark:text-slate-300">{submission.group}</td>
                      <td className="py-3 pr-4 text-sm font-medium text-[#434655] dark:text-slate-300">
                        {submission.submittedAt ? new Date(submission.submittedAt).toLocaleString('uz-UZ') : '—'}
                      </td>
                      <td className="py-3 pr-4 text-sm font-semibold text-[#191b23] dark:text-white">
                        {submission.score !== null ? `${submission.score}/${maxScore}` : '—'}
                      </td>
                      <td className="py-3 pr-4">
                        <span className={clsx('inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold', meta.className)}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#737686] hover:text-[#2563eb] dark:text-slate-400"
                            onClick={() => onView(submission)}
                            aria-label="Ko'rish"
                            title="Ko'rish"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="md"
                            className="h-8 px-3 text-xs"
                            disabled={submission.status === 'pending'}
                            onClick={() => onReview(submission)}
                          >
                            Tekshirish
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </Card>
      )}
    </div>
  );
}
