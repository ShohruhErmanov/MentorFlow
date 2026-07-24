import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export default function DownloadAssignmentDialog({ isOpen, onClose, onConfirm, assignmentTitle }) {
  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="download-backdrop"
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
            key="download-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '448px', // max-w-md
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.35)',
              padding: '32px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe', // sky-100
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0284c7', // sky-600
                flexShrink: 0
              }}>
                <Download size={24} />
              </div>
              <button
                onClick={onClose}
                style={{
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: 'none', background: 'transparent',
                  color: '#9ca3af', cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#4b5563'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}
              >
                <X size={20} />
              </button>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
              Topshiriqni yuklab olish
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 32px', lineHeight: 1.6 }}>
              Bu faqat UI namoyishi. <strong style={{ color: '#374151' }}>{assignmentTitle}</strong> fayllarini yuklab olish imitatsiyasi.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={onClose}
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px', color: '#374151',
                  backgroundColor: '#ffffff', border: '1px solid #e5e7eb',
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px', color: '#ffffff',
                  backgroundColor: '#0284c7', border: 'none',
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
              >
                Yuklab olish
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
