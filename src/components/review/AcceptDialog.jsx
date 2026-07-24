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
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.3)',
              overflow: 'auto',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '32px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px',
                  backgroundColor: '#dcfce7',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <CheckCircle size={32} style={{ color: '#16a34a' }} />
                </div>

                <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 700, color: '#111827' }}>
                  Vazifani qabul qilish
                </h2>
                <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#6b7280' }}>
                  O'quvchi vazifasini qabul qilmoqchimisiz?
                </p>

                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  backgroundColor: '#eff6ff', color: '#1d4ed8',
                  padding: '16px 32px', borderRadius: '12px',
                  marginBottom: '32px', width: '100%', maxWidth: '200px',
                  marginLeft: 'auto', marginRight: 'auto',
                }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#3b82f6', opacity: 0.7 }}>
                    Umumiy ball
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '36px', lineHeight: 1 }}>
                    {score}<span style={{ color: '#93c5fd', fontSize: '18px', fontWeight: 500 }}>/100</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={onClose}
                    style={{
                      flex: 1, height: '48px',
                      borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                      color: '#374151', backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb', cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={onAccept}
                    style={{
                      flex: 1, height: '48px',
                      borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                      color: '#ffffff', backgroundColor: '#2563eb',
                      border: 'none', cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
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
