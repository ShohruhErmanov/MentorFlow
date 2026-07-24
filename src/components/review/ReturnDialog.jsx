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
              {/* Icon + title */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '64px', height: '64px',
                  backgroundColor: '#ffedd5',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <AlertTriangle size={32} style={{ color: '#ea580c' }} />
                </div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111827' }}>
                  Vazifani qaytarish
                </h2>
              </div>

              {/* Textarea */}
              <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                <label style={{
                  display: 'block', fontSize: '14px', fontWeight: 600,
                  color: '#374151', marginBottom: '8px',
                }}>
                  Qaytarish sababi <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="O'quvchiga nima sababdan qaytarayotganingizni yozing..."
                  style={{
                    width: '100%', padding: '16px',
                    border: '1px solid #e5e7eb', borderRadius: '12px',
                    fontSize: '14px', outline: 'none', resize: 'none',
                    fontFamily: 'inherit', transition: 'border-color 0.15s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#fb923c';
                    e.target.style.boxShadow = '0 0 0 3px rgba(251,146,60,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Buttons */}
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
                  onClick={handleConfirm}
                  disabled={!reason.trim()}
                  style={{
                    flex: 1, height: '48px',
                    borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                    color: '#ffffff',
                    backgroundColor: reason.trim() ? '#f97316' : '#d1d5db',
                    border: 'none',
                    cursor: reason.trim() ? 'pointer' : 'not-allowed',
                    opacity: reason.trim() ? 1 : 0.6,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (reason.trim()) e.currentTarget.style.backgroundColor = '#ea580c';
                  }}
                  onMouseLeave={(e) => {
                    if (reason.trim()) e.currentTarget.style.backgroundColor = '#f97316';
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
