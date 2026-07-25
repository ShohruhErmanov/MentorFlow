import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function AcceptDialog({ isOpen, onClose, onAccept, score, studentName }) {
  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="accept-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="accept-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-800 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)]"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              borderRadius: '16px',
              overflow: 'auto',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '32px' }}>
              <div style={{ textAlign: 'center' }}>
                <div
                  className="bg-green-100 dark:bg-green-500/10"
                  style={{
                    width: '64px', height: '64px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                </div>

                <h2 className="text-gray-900 dark:text-white" style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 700 }}>
                  Vazifani qabul qilish
                </h2>
                <p className="text-gray-500 dark:text-slate-400" style={{ margin: '0 0 24px', fontSize: '14px' }}>
                  O'quvchi vazifasini qabul qilmoqchimisiz?
                </p>

                <div
                  className="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                    padding: '16px 32px', borderRadius: '12px',
                    marginBottom: '32px', width: '100%', maxWidth: '200px',
                    marginLeft: 'auto', marginRight: 'auto',
                  }}
                >
                  <span className="text-blue-500 dark:text-blue-400" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7 }}>
                    Umumiy ball
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '36px', lineHeight: 1 }}>
                    {score}<span className="text-blue-300 dark:text-blue-400/70" style={{ fontSize: '18px', fontWeight: 500 }}>/100</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={onClose}
                    className="text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 dark:text-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-600"
                    style={{
                      flex: 1, height: '48px',
                      borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                      cursor: 'pointer', transition: 'background 0.15s',
                    }}
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={onAccept}
                    className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    style={{
                      flex: 1, height: '48px',
                      borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                      border: 'none', cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    Qabul qilish
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
