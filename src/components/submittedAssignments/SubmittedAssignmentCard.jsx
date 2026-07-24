import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, MoreVertical, Eye, FileCheck, Download, Copy, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubmittedAssignmentCard({ 
  assignment, 
  onReview, 
  onPreview, 
  onDelete,
  onDownload,
  onCopy
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const goToReview = () => navigate(`/mentor/submitted-assignments/${assignment.id}/review`);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isPending = assignment.status === 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg p-6 flex flex-col h-full relative"
    >
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <MoreVertical size={18} />
        </button>
        
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl overflow-hidden z-[50] py-1"
            >
              {isPending ? (
                <button onClick={() => { goToReview(); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
                  <FileCheck size={16} /> Tekshirish
                </button>
              ) : (
                <button onClick={() => { onPreview(); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
                  <Eye size={16} /> Ko'rish
                </button>
              )}
              <button onClick={() => { onDownload(); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
                <Download size={16} /> Yuklab olish
              </button>
              <button onClick={() => { onCopy(); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
                <Copy size={16} /> Nusxalash
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button onClick={() => { onDelete(); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors">
                <Trash2 size={16} /> O'chirish
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-start gap-3 pr-10 mb-5">
        {assignment.avatar ? (
          <img src={assignment.avatar} alt={assignment.studentName} className="w-12 h-12 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
            {assignment.studentName.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="font-bold text-gray-900 leading-tight">{assignment.studentName}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{assignment.group}</p>
        </div>
      </div>

      <div className="mb-4">
        {isPending ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 text-xs font-semibold">
            <Clock size={12} strokeWidth={2.5} /> Kutilmoqda
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-600 text-xs font-semibold">
            <CheckCircle size={12} strokeWidth={2.5} /> Qabul qilindi
          </span>
        )}
      </div>

      <h4 className="font-bold text-[17px] text-gray-900 mb-4 line-clamp-2 leading-snug flex-grow">
        {assignment.assignmentTitle}
      </h4>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
        <Clock size={14} />
        {isPending ? `Yuborildi: ${assignment.submittedAt}` : `Tekshirildi: ${assignment.reviewedAt || assignment.submittedAt}`}
      </div>

      <div className="mt-auto">
        {isPending ? (
          <button
            onClick={goToReview}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-600/20"
          >
            Tekshirish <span className="text-lg leading-none">&rarr;</span>
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <div className="font-bold text-blue-600 text-[17px]">
              Baho: <span className="text-xl">{assignment.score}</span><span className="text-gray-400 text-sm">/100</span>
            </div>
            <button
              onClick={goToReview} // Added goToReview here for "Qayta ko'rish" based on user requirements.
              className="h-10 px-5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Qayta ko'rish
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
