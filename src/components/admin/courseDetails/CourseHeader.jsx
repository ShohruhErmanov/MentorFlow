import { Link } from 'react-router-dom';
import { ChevronRight, Pencil } from 'lucide-react';
import Button from '../../ui/Button';

export default function CourseHeader({ course, onEdit }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <nav className="flex items-center gap-1.5 text-sm text-[#737686] dark:text-slate-400">
          <Link to="/admin/courses" className="hover:text-[#2563eb] dark:hover:text-blue-400">
            Kurslar
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-[#434655] dark:text-slate-300">{course.name}</span>
        </nav>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">
          Kurs Tafsilotlari
        </h1>
      </div>

      <Button
        variant="ghost"
        className="shrink-0 border border-[#e1e2ed] bg-white text-sm dark:border-slate-700 dark:bg-slate-800"
        onClick={onEdit}
      >
        <Pencil size={16} />
        Tahrirlash
      </Button>
    </div>
  );
}
