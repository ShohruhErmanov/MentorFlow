import { FolderOpen } from 'lucide-react';
import Button from '../ui/Button';

export default function EmptyState({ onCreateClick }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#e1e2ed] bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f3fe] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400">
        <FolderOpen size={32} />
      </div>
      <h3 className="mb-2 text-xl font-bold text-[#191b23] dark:text-white">Guruhlar topilmadi</h3>
      <p className="mb-6 max-w-sm text-sm font-medium text-[#737686] dark:text-slate-400">
        Hozircha hech qanday guruh mavjud emas. Yangi guruh yaratishni boshlang.
      </p>
      <Button variant="primary" onClick={onCreateClick}>
        + Yangi guruh
      </Button>
    </div>
  );
}
