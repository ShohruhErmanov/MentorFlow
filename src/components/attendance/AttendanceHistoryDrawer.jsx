import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, MessageSquare } from 'lucide-react';
import { studentHistoryMock } from '../../data/attendanceMockData';

const statusConfig = {
  present: { label: 'Kelgan', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  late: { label: 'Kechikkan', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  absent: { label: "Yo'q", color: 'bg-red-50 text-red-600 border-red-200' },
  vacation: { label: "Ta'tilda", color: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default function AttendanceHistoryDrawer({ isOpen, onClose, student }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isOpen && student) {
      setHistory(studentHistoryMock[student.id] || studentHistoryMock.default);
    }
  }, [isOpen, student]);

  return (
    <AnimatePresence>
      {isOpen && student && createPortal(
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          />

          {/* Drawer Container */}
          <div className="fixed inset-0 z-[9999] flex justify-end pointer-events-none">
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:w-[500px] pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900">Davomat Tarixi</h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Student Info */}
              <div className="border-b border-gray-100 bg-gray-50/50 p-6">
                <div className="flex items-center gap-4">
                  {student.avatar ? (
                    <img src={student.avatar} alt={student.name} className="h-14 w-14 rounded-full object-cover ring-4 ring-white shadow-sm" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 ring-4 ring-white shadow-sm">
                      {student.initials}
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold text-gray-900">{student.name}</p>
                    <p className="text-sm font-medium text-gray-500">Frontend Guruhi (G9-12)</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {history.map((record) => {
                    const badge = statusConfig[record.status] || statusConfig.present;
                    return (
                      <div key={record.id} className="relative flex items-start gap-4">
                        {/* Dot */}
                        <div className="relative z-10 mt-1.5 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-blue-500 ring-4 ring-white shadow-sm ml-[15px]" />
                        
                        {/* Content Card */}
                        <div className="flex-1 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${badge.color} border`}>
                              {badge.label}
                            </span>
                            <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                              <span className="flex items-center gap-1"><CalendarIcon size={12}/> {record.date}</span>
                              {record.time !== '-' && <span className="flex items-center gap-1"><Clock size={12}/> {record.time}</span>}
                            </div>
                          </div>
                          
                          {record.comment !== '-' && (
                            <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-gray-50 p-2.5 text-[14px] text-gray-600">
                              <MessageSquare size={14} className="mt-0.5 shrink-0 text-gray-400" />
                              <p>{record.comment}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
