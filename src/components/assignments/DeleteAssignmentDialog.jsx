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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.45)',
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
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 480,
              minWidth: 300,
              backgroundColor: '#ffffff',
              borderRadius: 24,
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.28)',
              overflow: 'hidden',
            }}
          >
            {/* Body */}
            <div style={{ padding: '36px 32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* Icon */}
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: '#fef2f2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <AlertTriangle size={28} color="#dc2626" />
              </div>

              <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: '#111827' }}>
                Vazifani o'chirish
              </h3>
              <p style={{ margin: '0 0 28px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                Siz haqiqatan ham{' '}
                <strong style={{ color: '#374151' }}>"{assignmentName}"</strong>{' '}
                vazifasini o'chirmoqchimisiz?{' '}
                <span style={{ color: '#ef4444' }}>Bu amalni ortga qaytarib bo'lmaydi.</span>
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1, padding: '11px 20px',
                    fontSize: 14, fontWeight: 500,
                    color: '#374151',
                    background: '#f3f4f6',
                    border: 'none', borderRadius: 12,
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
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
