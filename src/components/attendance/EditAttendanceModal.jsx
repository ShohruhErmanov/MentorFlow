import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';

const statuses = [
  { id: 'present', label: 'Kelgan' },
  { id: 'late', label: 'Kechikkan' },
  { id: 'absent', label: "Yo'q" },
  { id: 'vacation', label: "Ta'tilda" },
];

export default function EditAttendanceModal({ isOpen, onClose, student, onSave }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    status: 'present',
    comment: '',
  });

  useEffect(() => {
    if (isOpen && student) {
      const [datePart, timePart] = (student.date || '').split(', ');
      setFormData({
        date: datePart || new Date().toLocaleDateString('uz-UZ').replace(/\//g, '.'),
        time: timePart || '00:00',
        status: student.status || 'present',
        comment: student.comment && student.comment !== '-' ? student.comment : '',
      });
    }
  }, [isOpen, student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(student.id, formData);
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl min-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Tahrirlash</h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">{student.name}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-700">Sana</label>
                      <div className="relative">
                        <CalendarIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-[15px] outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-700">Vaqt</label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-[15px] outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Select */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">Holat</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-[15px] outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">Izoh</label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Izoh kiriting (ixtiyoriy)..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-[15px] outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 rounded-xl bg-gray-100 py-3.5 text-[15px] font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-blue-600 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                    >
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>,
        document.body
      )}
    </AnimatePresence>
  );
}
