import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, CheckCircle, Pencil, History, MessageSquare } from 'lucide-react';

const statusConfig = {
  present: { label: 'Kelgan', className: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' },
  late: { label: 'Kechikkan', className: 'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20' },
  absent: { label: "Yo'q", className: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' },
  vacation: { label: "Ta'tilda", className: 'bg-gray-100 text-gray-500 border border-gray-200 dark:bg-slate-700/40 dark:text-slate-400 dark:border-slate-600' },
};

const menuItems = [
  { label: 'Belgila', icon: CheckCircle, type: 'status' },
  { label: 'Tahrirlash', icon: Pencil, type: 'edit' },
  { label: 'Tarix', icon: History, type: 'history' },
  { label: 'Izoh', icon: MessageSquare, type: 'comment' },
];

export default function AttendanceRow({ student, index, onOpenModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [menuOpen]);

  const badge = statusConfig[student.status] || statusConfig.present;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors dark:border-slate-700/60 dark:hover:bg-slate-700/40"
    >
      {/* # */}
      <td className="py-3.5 pl-5 pr-2 text-sm font-semibold text-gray-400 whitespace-nowrap dark:text-slate-500">
        {index + 1}
      </td>

      {/* Student */}
      <td className="py-3.5 px-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {student.avatar ? (
            <img
              src={student.avatar}
              alt={student.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 ring-2 ring-white dark:bg-blue-500/20 dark:text-blue-400 dark:ring-slate-800">
              {student.initials}
            </div>
          )}
          <span className="text-sm font-semibold text-gray-800 dark:text-white">{student.name}</span>
        </div>
      </td>

      {/* Date */}
      <td className="py-3.5 px-3 text-sm text-gray-500 whitespace-nowrap dark:text-slate-400">
        {student.date}
      </td>

      {/* Status */}
      <td className="py-3.5 px-3 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}>
          {badge.label}
        </span>
      </td>

      {/* Comment */}
      <td className="py-3.5 px-3 text-sm text-gray-500 whitespace-nowrap max-w-[180px] truncate dark:text-slate-400">
        {student.comment}
      </td>

      {/* Actions */}
      <td className={`py-3.5 pl-3 pr-5 whitespace-nowrap ${menuOpen ? 'relative z-50' : ''}`}>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
          >
            <MoreVertical size={16} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl shadow-gray-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30"
              >
                {menuItems.map(({ label, icon: Icon, type }) => (
                  <button
                    key={label}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMenuOpen(false);
                      onOpenModal(type, student.id);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-700/40 dark:hover:text-white"
                  >
                    <Icon size={15} className="text-gray-400 dark:text-slate-500" />
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </motion.tr>
  );
}
