import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download } from 'lucide-react';
import { useState } from 'react';

export default function AssignmentReviewModal({ isOpen, onClose, assignment, onSave }) {
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');

  const handleSave = () => {
    onSave(assignment.id, {
      score: parseInt(score, 10),
      comment,
    });
    setScore('');
    setComment('');
    onClose();
  };

  const modal = (
    <AnimatePresence>
      {isOpen && assignment && (
        <motion.div
          key="review-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          onClick={onClose}
        >
          <motion.div
            key="review-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-800 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)]"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '896px', // max-w-4xl roughly
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="border-b border-gray-100 dark:border-slate-700" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 32px', flexShrink: 0
            }}>
              <h2 className="text-gray-900 dark:text-white" style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Vazifani tekshirish</h2>
              <button
                onClick={onClose}
                className="text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700/40 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                style={{
                  width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: 'none', background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Student info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {assignment.avatar ? (
                  <img
                    src={assignment.avatar}
                    alt={assignment.studentName}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div className="bg-blue-100 text-blue-600" style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '20px', flexShrink: 0
                  }}>
                    {assignment.studentName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-gray-900 dark:text-white" style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px' }}>{assignment.studentName}</h3>
                  <p className="text-gray-500 dark:text-slate-400" style={{ fontSize: '14px', margin: 0 }}>{assignment.group}</p>
                </div>
              </div>

              {/* Assignment info */}
              <div>
                <h4 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px' }}>{assignment.assignmentTitle}</h4>
                <p className="text-gray-500 dark:text-slate-400" style={{ fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{assignment.description}</p>
              </div>

              {/* Attachments */}
              {assignment.attachments && assignment.attachments.length > 0 && (
                <div>
                  <h4 className="text-gray-700 dark:text-slate-300" style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 12px' }}>Biriktirilgan fayllar</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                    {assignment.attachments.map((file, idx) => (
                      <div key={idx} className="border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px', borderRadius: '12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                          <FileText size={16} className="text-blue-500" style={{ flexShrink: 0 }} />
                          <span className="text-gray-700 dark:text-slate-300" style={{ fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</span>
                        </div>
                        <button className="text-gray-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" style={{
                          border: 'none', background: 'transparent', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Score + Comment */}
              <div className="border-t border-gray-100 dark:border-slate-700" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '16px' }}>
                <div>
                  <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                    Baho (0–100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="0"
                    className="border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
                    style={{
                      width: '128px', height: '40px', padding: '0 12px',
                      borderRadius: '8px', fontSize: '14px',
                      outline: 'none', transition: 'all 0.15s'
                    }}
                  />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                    Fikr qoldirish
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Vazifa haqida o'z fikringizni yozing..."
                    className="border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white bg-white dark:bg-slate-800 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
                    style={{
                      width: '100%', padding: '12px', boxSizing: 'border-box',
                      borderRadius: '12px', fontSize: '14px',
                      outline: 'none', resize: 'none', transition: 'all 0.15s', fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px',
              padding: '20px 32px', flexShrink: 0
            }}>
              <button
                onClick={onClose}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/40 transition-colors"
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                disabled={!score}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px',
                  border: 'none', cursor: !score ? 'not-allowed' : 'pointer'
                }}
              >
                Saqlash
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
