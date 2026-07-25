import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const DeleteAssignmentDialog = ({ isOpen, onClose, onConfirm, assignmentName }) => {
  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ESC key support
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="delete-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="bg-black/45 dark:bg-black/60"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding: 16,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="delete-dialog"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-white dark:bg-slate-800 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.28)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)]"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 480,
              minWidth: 300,
              borderRadius: 24,
              overflow: 'hidden',
            }}
          >
            {/* Body */}
            <div style={{ padding: '36px 32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* Icon */}
              <div
                className="bg-red-50 dark:bg-red-500/10"
                style={{
                  width: 60, height: 60, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <AlertTriangle size={28} className="text-red-600 dark:text-red-400" />
              </div>

              <h3 className="text-gray-900 dark:text-white" style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700 }}>
                Vazifani o'chirish
              </h3>
              <p className="text-gray-500 dark:text-slate-400" style={{ margin: '0 0 28px', fontSize: 14, lineHeight: 1.6 }}>
                Siz haqiqatan ham{' '}
                <strong className="text-gray-700 dark:text-slate-200">"{assignmentName}"</strong>{' '}
                vazifasini o'chirmoqchimisiz?{' '}
                <span className="text-red-500">Bu amalni ortga qaytarib bo'lmaydi.</span>
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                <button
                  onClick={onClose}
                  className="text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
                  style={{
                    flex: 1, padding: '11px 20px',
                    fontSize: 14, fontWeight: 500,
                    border: 'none', borderRadius: 12,
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                >
                  Bekor qilish
                </button>
                <button
                  onClick={onConfirm}
                  style={{
                    flex: 1, padding: '11px 20px',
                    fontSize: 14, fontWeight: 600,
                    color: '#ffffff',
                    background: '#dc2626',
                    border: 'none', borderRadius: 12,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(220,38,38,0.35)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#b91c1c')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#dc2626')}
                >
                  O'chirish
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
};

export default DeleteAssignmentDialog;
