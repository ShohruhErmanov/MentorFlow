import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';

export default function DeleteAssignmentDialog({ isOpen, onClose, onConfirm, assignmentTitle }) {
  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="delete-backdrop"
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
            key="delete-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-800 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.65)]"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '448px', // max-w-md
              borderRadius: '16px', // rounded-2xl
              padding: '32px', // p-8
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400" style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <Trash2 size={24} />
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700/40 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                style={{
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: 'none', background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-gray-900 dark:text-white" style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
              Topshirilgan vazifani o'chirmoqchimisiz?
            </h2>
            <p className="text-gray-500 dark:text-slate-400" style={{ fontSize: '14px', margin: '0 0 32px', lineHeight: 1.6 }}>
              Siz rostda ham <strong className="text-gray-700 dark:text-slate-300">{assignmentTitle}</strong> vazifasini o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
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
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="bg-red-600 hover:bg-red-700 text-white transition-colors"
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px',
                  border: 'none', cursor: 'pointer'
                }}
              >
                O'chirish
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
