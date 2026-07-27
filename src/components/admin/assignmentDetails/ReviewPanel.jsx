import { useEffect, useState } from 'react';
import { Download, FileText, Send, Undo2 } from 'lucide-react';
import clsx from 'clsx';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import Textarea from '../../ui/Textarea';
import AttachmentCard from './AttachmentCard';

export default function ReviewPanel({ submissions, maxScore, selectedId, onSelect, onGrade, onReturn }) {
  const reviewable = submissions.filter((s) => s.status !== 'pending');
  const selected = reviewable.find((s) => s.id === selectedId) ?? reviewable[0] ?? null;

  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (selected) {
      setScore(selected.score ?? '');
      setFeedback(selected.feedback ?? '');
    }
  }, [selected?.id]);

  if (!selected) {
    return (
      <Card className="p-6 text-center text-sm font-medium text-[#737686] dark:text-slate-400">
        Hozircha tekshirish uchun topshirilgan ishlar yo'q.
      </Card>
    );
  }

  const handleGrade = () => {
    const numericScore = Number(score);
    if (!numericScore && numericScore !== 0) return;
    if (numericScore < 0 || numericScore > maxScore) return;
    onGrade(selected.id, { score: numericScore, feedback });
  };

  const handleReturn = () => {
    onReturn(selected.id, { feedback });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <Card className="max-h-[560px] overflow-y-auto p-3">
        <ul className="space-y-1">
          {reviewable.map((submission) => (
            <li key={submission.id}>
              <button
                type="button"
                onClick={() => onSelect(submission.id)}
                className={clsx(
                  'flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors',
                  submission.id === selected.id
                    ? 'bg-[#dbe1ff] dark:bg-blue-500/10'
                    : 'hover:bg-[#f3f3fe] dark:hover:bg-slate-700/40',
                )}
              >
                <img src={submission.avatarUrl} alt={submission.studentName} className="h-8 w-8 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#191b23] dark:text-white">{submission.studentName}</p>
                  <p className="text-xs font-medium text-[#737686] dark:text-slate-400">
                    {submission.score !== null ? `${submission.score}/${maxScore} ball` : 'Baholanmagan'}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <img src={selected.avatarUrl} alt={selected.studentName} className="h-11 w-11 rounded-full object-cover" />
          <div>
            <p className="text-base font-bold text-[#191b23] dark:text-white">{selected.studentName}</p>
            <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{selected.group}</p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Topshirilgan ishlar
          </p>
          <div className="space-y-2">
            {selected.submittedFiles.map((file) => (
              <AttachmentCard
                key={file.name}
                icon={FileText}
                actionIcon={Download}
                tone="blue"
                name={file.name}
                meta={file.sizeLabel}
                href={file.url}
              />
            ))}
          </div>
        </div>

        {selected.feedback && (
          <div className="mt-5 rounded-xl bg-[#f7f8ff] p-4 text-sm text-[#434655] dark:bg-slate-900/60 dark:text-slate-300">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">
              Avvalgi izoh
            </p>
            {selected.feedback}
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
          <InputField
            id="review-score"
            label={`Ball (max ${maxScore})`}
            type="number"
            min="0"
            max={maxScore}
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <Textarea
            id="review-feedback"
            label="Fikr-mulohaza"
            rows={3}
            placeholder="O'quvchiga izoh yozing..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="mt-5 flex justify-end gap-3 border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
          <Button
            variant="ghost"
            className="border border-[#e1e2ed] dark:border-slate-700"
            onClick={handleReturn}
          >
            <Undo2 size={15} />
            Qaytarish
          </Button>
          <Button variant="primary" onClick={handleGrade}>
            <Send size={15} />
            Baholash
          </Button>
        </div>
      </Card>
    </div>
  );
}
