import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const statuses = [
  { id: 'present', label: 'Kelgan', color: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' },
  { id: 'late', label: 'Kechikkan', color: 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-500 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20' },
  { id: 'absent', label: "Yo'q", color: 'bg-red-50 text-red-600 border-red-200 ring-red-500 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' },
  { id: 'vacation', label: "Ta'tilda", color: 'bg-gray-100 text-gray-600 border-gray-200 ring-gray-400 dark:bg-slate-700/40 dark:text-slate-400 dark:border-slate-600' },
];

export default function AttendanceStatusModal({ isOpen, onClose, student, onSave }) {
  const [selectedStatus, setSelectedStatus] = useState('present');

  useEffect(() => {
    if (isOpen && student) {
      setSelectedStatus(student.status || 'present');
    }
  }, [isOpen, student]);

  return (
    <AnimatePresence>
      {isOpen && student && createPortal(
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] dark:bg-black/60"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl min-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto dark:bg-slate-800"
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Davomatni belgilash</h3>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Student Info */}
                <div className="mb-6 flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
                  {student.avatar ? (
                    <img src={student.avatar} alt={student.name} className="h-12 w-12 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-slate-800" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 shadow-sm ring-2 ring-white dark:bg-blue-500/20 dark:text-blue-400 dark:ring-slate-800">
                      {student.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-900 text-lg dark:text-white">{student.name}</p>
                    <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Bugungi sana: {new Date().toLocaleDateString('uz-UZ')}</p>
                  </div>
                </div>

                {/* Status Selection */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {statuses.map((status) => {
                    const isSelected = selectedStatus === status.id;
                    return (
                      <button
                        key={status.id}
                        onClick={() => setSelectedStatus(status.id)}
                        className={`
                          relative flex items-center justify-between rounded-xl border p-4 transition-all
                          ${isSelected ? `ring-2 ${status.color} bg-white shadow-sm dark:bg-slate-800` : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-white hover:border-gray-300 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:border-slate-600'}
                        `}
                      >
                        <span className="font-semibold text-[15px]">{status.label}</span>
                        {isSelected && <Check size={18} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl bg-gray-100 py-3.5 text-[15px] font-semibold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={() => onSave(student.id, selectedStatus)}
                    className="flex-1 rounded-xl bg-blue-600 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>,
        document.body
      )}
    </AnimatePresence>
  );
}
