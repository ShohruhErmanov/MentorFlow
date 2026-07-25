import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Calendar as CalendarIcon } from 'lucide-react';
import { studentCommentsMock } from '../../data/attendanceMockData';

export default function AttendanceCommentModal({ isOpen, onClose, student, onSave }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (isOpen && student) {
      setNewComment('');
      setComments(studentCommentsMock[student.id] || studentCommentsMock.default);
    }
  }, [isOpen, student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onSave(student.id, newComment);
  };

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
              className="relative w-full max-w-xl min-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[85vh] dark:bg-slate-800"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between shrink-0">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Izoh</h3>
                    <p className="text-sm font-medium text-gray-500 mt-1 dark:text-slate-400">{student.name}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                  {/* New Comment Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <MessageSquare size={18} className="absolute left-3.5 top-3.5 text-gray-400 dark:text-slate-500" />
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Yangi izoh kiriting..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3.5 pl-11 text-[15px] outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-700"
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-600/20"
                      >
                        Saqlash
                      </button>
                    </div>
                  </form>

                  {/* Previous Comments */}
                  {comments.length > 0 && (
                    <div>
                      <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">Oldingi izohlar</h4>
                      <div className="space-y-3">
                        {comments.map((comment) => (
                          <div key={comment.id} className="rounded-xl bg-gray-50 p-4 border border-gray-100 dark:bg-slate-900/40 dark:border-slate-700">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">Mentor</span>
                              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-slate-500">
                                <CalendarIcon size={12} /> {comment.date}
                              </span>
                            </div>
                            <p className="text-[15px] text-gray-600 leading-relaxed dark:text-slate-400">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
