import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function ReturnDialog({ isOpen, onClose, onReturn, studentName }) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onReturn(reason);
    setReason('');
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="return-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="return-card"
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
              {/* Icon + title */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  className="bg-orange-100 dark:bg-orange-500/10"
                  style={{
                    width: '64px', height: '64px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <AlertTriangle size={32} className="text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-gray-900 dark:text-white" style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
                  Vazifani qaytarish
                </h2>
              </div>

              {/* Textarea */}
              <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                <label className="text-gray-700 dark:text-slate-300" style={{
                  display: 'block', fontSize: '14px', fontWeight: 600,
                  marginBottom: '8px',
                }}>
                  Qaytarish sababi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="O'quvchiga nima sababdan qaytarayotganingizni yozing..."
                  className="border-gray-200 text-gray-700 placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-500/20"
                  style={{
                    width: '100%', padding: '16px',
                    border: '1px solid', borderRadius: '12px',
                    fontSize: '14px', outline: 'none', resize: 'none',
                    fontFamily: 'inherit', transition: 'border-color 0.15s, box-shadow 0.15s',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Buttons */}
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
                  onClick={handleConfirm}
                  disabled={!reason.trim()}
                  className={reason.trim()
                    ? 'text-white bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600'
                    : 'text-white bg-gray-300 dark:bg-slate-600'}
                  style={{
                    flex: 1, height: '48px',
                    borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                    border: 'none',
                    cursor: reason.trim() ? 'pointer' : 'not-allowed',
                    opacity: reason.trim() ? 1 : 0.6,
                    transition: 'background 0.15s',
                  }}
                >
                  Qaytarish
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
