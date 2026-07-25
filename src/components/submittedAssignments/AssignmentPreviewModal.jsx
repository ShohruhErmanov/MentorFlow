import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download } from 'lucide-react';

export default function AssignmentPreviewModal({ isOpen, onClose, assignment }) {
  const modal = (
    <AnimatePresence>
      {isOpen && assignment && (
        <motion.div
          key="preview-backdrop"
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
            key="preview-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-800 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)]"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '672px', // max-w-2xl
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-100 dark:border-slate-700" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 32px', flexShrink: 0
            }}>
              <h2 className="text-gray-900 dark:text-white" style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Vazifa natijasi</h2>
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

            {/* Scrollable body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Student + score */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <div style={{ textAlign: 'right' }}>
                  <p className="text-gray-500 dark:text-slate-400" style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>Qo'yilgan baho</p>
                  <div className="text-blue-600" style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
                    {assignment.score}<span className="text-gray-400 dark:text-slate-500" style={{ fontSize: '18px', fontWeight: 500 }}>/100</span>
                  </div>
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

              {/* Teacher comment */}
              {assignment.comment && (
                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20" style={{ padding: '16px', borderRadius: '12px' }}>
                  <h4 className="text-blue-900 dark:text-blue-300" style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>Ustoz fikri</h4>
                  <p className="text-blue-800 dark:text-blue-200" style={{ fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{assignment.comment}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              padding: '20px 32px', flexShrink: 0
            }}>
              <button
                onClick={onClose}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/40 transition-colors"
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Yopish
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
