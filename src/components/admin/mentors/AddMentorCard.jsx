import { Plus } from 'lucide-react';
import Button from '../../ui/Button';

export default function AddMentorCard({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#e1e2ed] bg-white p-5 text-center dark:border-slate-700 dark:bg-slate-800/60">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3f3fe] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400">
        <Plus size={22} />
      </div>
      <div>
        <p className="text-sm font-bold text-[#191b23] dark:text-white">Yangi Mentor</p>
        <p className="mt-1 text-xs font-medium text-[#737686] dark:text-slate-400">
          Jamoangizga yangi mutaxassis qo'shing va o'qishni davom ettiring.
        </p>
      </div>
      <Button variant="primary" className="w-full text-sm" onClick={onAdd}>
        Qo'shish
      </Button>
    </div>
  );
}
