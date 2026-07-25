import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Eye, Edit2, Copy, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AssignmentStatusBadge from './AssignmentStatusBadge';

const AssignmentRow = ({ assignment, onView, onEdit, onDuplicate, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    const handleEsc = (e) => { if (e.key === 'Escape') setShowMenu(false); };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const closeAndRun = (fn) => {
    setShowMenu(false);
    fn(assignment);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group grid grid-cols-[minmax(250px,1fr)_120px_150px_150px_100px_80px] gap-4 items-center p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors dark:border-slate-700 dark:hover:bg-slate-700/40"
    >
      {/* Name and Icon */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-lg flex-shrink-0 dark:bg-slate-700 dark:text-slate-400">
          {assignment.name.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm mb-0.5 dark:text-white">{assignment.name}</h4>
          <p className="text-xs text-gray-500 line-clamp-1 dark:text-slate-400">{assignment.description}</p>
        </div>
      </div>

      {/* Group */}
      <div>
        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium dark:bg-slate-700 dark:text-slate-300">
          {assignment.group}
        </span>
      </div>

      {/* Deadline */}
      <div className="flex items-center gap-1.5">
        {assignment.isLate ? (
          <AlertTriangle className="w-4 h-4 text-red-500" />
        ) : (
          <Calendar className="w-4 h-4 text-gray-400 dark:text-slate-500" />
        )}
        <span className={`text-sm ${assignment.isLate ? 'text-red-500 font-medium' : 'text-gray-600 dark:text-slate-400'}`}>
          {assignment.deadline}
        </span>
      </div>

      {/* Status */}
      <div>
        <AssignmentStatusBadge status={assignment.status} />
      </div>

      {/* Score */}
      <div className="font-semibold text-gray-900 text-sm dark:text-white">
        {assignment.maxScore}
      </div>

      {/* Actions Dropdown */}
      <div className="relative flex justify-end" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-700/40"
          aria-label="Amallar menyusi"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.13 }}
              className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 dark:bg-slate-800 dark:border-slate-700"
            >
              <button
                onClick={() => closeAndRun(onView)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors dark:text-slate-300 dark:hover:bg-slate-700/40"
              >
                <Eye className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                Ko'rish
              </button>
              <button
                onClick={() => closeAndRun(onEdit)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors dark:text-slate-300 dark:hover:bg-slate-700/40"
              >
                <Edit2 className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                Tahrirlash
              </button>
              <button
                onClick={() => closeAndRun(onDuplicate)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors dark:text-slate-300 dark:hover:bg-slate-700/40"
              >
                <Copy className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                Nusxalash
              </button>
              <div className="h-px bg-gray-100 my-1 dark:bg-slate-700" />
              <button
                onClick={() => closeAndRun(onDelete)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors dark:hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                O'chirish
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AssignmentRow;
