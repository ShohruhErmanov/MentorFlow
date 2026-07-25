import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReviewHeader({ assignment }) {
  const statusLabel  = assignment.status === 'completed' ? 'QABUL QILINDI' : 'KUTILYAPTI';
  const statusColor  = assignment.status === 'completed'
    ? 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30'
    : 'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30';

  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-slate-500 mb-4 flex-wrap">
        {assignment.breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i < assignment.breadcrumb.length - 1 ? (
              <>
                <Link
                  to="/mentor/submitted-assignments"
                  className="hover:text-blue-600 transition-colors"
                >
                  {crumb}
                </Link>
                <ChevronRight size={14} className="text-gray-300 dark:text-slate-600" />
              </>
            ) : (
              <span className="text-blue-600 font-medium">{crumb}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Title row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
            {assignment.title}
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-base flex items-center gap-2 flex-wrap">
            <span>Topshirdi:</span>
            <span className="font-semibold text-gray-700 dark:text-slate-300">{assignment.student.name}</span>
            <span className="text-gray-300 dark:text-slate-600">•</span>
            <span>{assignment.submittedAt}</span>
          </p>
        </div>

        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide shrink-0 ${statusColor}`}>
          STATUS: {statusLabel}
        </span>
      </div>
    </div>
  );
}
