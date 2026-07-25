import { MoreVertical, Edit2, Users, FileText, CheckSquare, Trash2, Eye } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import GroupStats from './GroupStats';
import GroupProgress from './GroupProgress';

export default function GroupCard({ group, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCourseBadgeVariant = (course) => {
    switch (course.toLowerCase()) {
      case 'frontend':
        return 'blue';
      case 'backend':
        return 'orange';
      case 'mobile':
        return 'green';
      case 'cyber security':
        return 'red';
      default:
        return 'neutral';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative flex flex-col rounded-[24px] border border-[#e1e2ed] bg-white p-5 shadow-[0_4px_12px_rgba(25,27,35,0.02)] transition-shadow hover:shadow-[0_12px_24px_rgba(25,27,35,0.06)] dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <Badge variant={getCourseBadgeVariant(group.course)} className="mb-3 uppercase tracking-wider">
            {group.course}
          </Badge>
          <h3 className="text-xl font-bold text-[#191b23] dark:text-white">{group.name}</h3>
        </div>

        {/* Three dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f3f3fe] hover:text-[#191b23] dark:text-slate-400 dark:hover:bg-slate-700/40 dark:hover:text-white"
          >
            <MoreVertical size={20} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full z-10 mt-1 w-48 overflow-hidden rounded-xl border border-[#e1e2ed] bg-white py-1.5 shadow-[0_12px_24px_rgba(25,27,35,0.12)] dark:border-slate-700 dark:bg-slate-800"
              >
                <button
                  onClick={() => { setMenuOpen(false); navigate(`/mentor/groups/${group.id}`); }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-400 dark:hover:bg-slate-700/40"
                >
                  <Eye size={16} /> Ko'rish
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onEdit(group); }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-400 dark:hover:bg-slate-700/40"
                >
                  <Edit2 size={16} /> Tahrirlash
                </button>
                <button className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-400 dark:hover:bg-slate-700/40">
                  <CheckSquare size={16} /> Davomat
                </button>
                <button className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-400 dark:hover:bg-slate-700/40">
                  <FileText size={16} /> Vazifalar
                </button>
                <button className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb] dark:text-slate-400 dark:hover:bg-slate-700/40">
                  <Users size={16} /> O'quvchilar
                </button>
                <div className="my-1.5 h-px bg-[#e1e2ed] dark:bg-slate-700" />
                <button
                  onClick={() => { setMenuOpen(false); onDelete(group); }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-[#dc2626] hover:bg-[#fef2f2] dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={16} /> O'chirish
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#434655] dark:text-slate-400">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f3f3fe] text-xs dark:bg-slate-700">👨‍🏫</span>
        {group.mentor}
      </div>

      <GroupStats 
        students={group.students} 
        attendance={group.attendance} 
        progress={group.progress} 
        rating={group.rating} 
      />

      <GroupProgress progress={group.progress} />

      {/* Buttons */}
      <div className="mt-6 flex items-center gap-3">
        <Button 
          variant="primary" 
          className="flex-1" 
          onClick={() => navigate(`/mentor/groups/${group.id}`)}
        >
          Ko'rish
        </Button>
        <Button 
          variant="ghost" 
          className="flex-1 border border-[#e1e2ed] dark:border-slate-700"
          onClick={() => onEdit(group)}
        >
          Tahrirlash
        </Button>
      </div>
    </motion.div>
  );
}
