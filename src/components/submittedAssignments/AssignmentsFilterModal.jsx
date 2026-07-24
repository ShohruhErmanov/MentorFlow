import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function AssignmentsFilterModal({ isOpen, onClose, onApply }) {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [group, setGroup] = useState('');

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="filter-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
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
            key="filter-modal"
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
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px', borderBottom: '1px solid #f3f4f6'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>Filtrlash</h2>
              <button
                onClick={onClose}
                style={{
                  width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: 'none', background: 'transparent',
                  color: '#9ca3af', cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#4b5563'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Holati</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setStatus(status === 'pending' ? '' : 'pending')}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                      border: '1px solid',
                      backgroundColor: status === 'pending' ? '#fff7ed' : '#ffffff',
                      borderColor: status === 'pending' ? '#fed7aa' : '#e5e7eb',
                      color: status === 'pending' ? '#c2410c' : '#374151',
                      transition: 'all 0.15s'
                    }}
                  >
                    Kutilmoqda
                  </button>
                  <button
                    onClick={() => setStatus(status === 'completed' ? '' : 'completed')}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                      border: '1px solid',
                      backgroundColor: status === 'completed' ? '#f0fdf4' : '#ffffff',
                      borderColor: status === 'completed' ? '#bbf7d0' : '#e5e7eb',
                      color: status === 'completed' ? '#15803d' : '#374151',
                      transition: 'all 0.15s'
                    }}
                  >
                    Qabul qilindi
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Vaqt oralig'i</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Bugun', 'Shu hafta', 'Shu oy'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setDate(date === t ? '' : t)}
                      style={{
                        padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                        border: '1px solid',
                        backgroundColor: date === t ? '#eff6ff' : '#ffffff',
                        borderColor: date === t ? '#bfdbfe' : '#e5e7eb',
                        color: date === t ? '#1d4ed8' : '#374151',
                        transition: 'all 0.15s'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Yo'nalish</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Frontend', 'Backend', 'Design'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGroup(group === g ? '' : g)}
                      style={{
                        padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                        border: '1px solid',
                        backgroundColor: group === g ? '#eff6ff' : '#ffffff',
                        borderColor: group === g ? '#bfdbfe' : '#e5e7eb',
                        color: group === g ? '#1d4ed8' : '#374151',
                        transition: 'all 0.15s'
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', gap: '12px', padding: '20px 24px', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb' }}>
              <button
                onClick={() => { setStatus(''); setDate(''); setGroup(''); }}
                style={{
                  flex: 1, height: '40px', borderRadius: '12px', fontWeight: 500, fontSize: '14px',
                  color: '#374151', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                Tozalash
              </button>
              <button
                onClick={() => { onApply({ status, date, group }); onClose(); }}
                style={{
                  flex: 1, height: '40px', borderRadius: '12px', fontWeight: 500, fontSize: '14px',
                  color: '#ffffff', backgroundColor: '#2563eb', border: 'none', cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                Qo'llash
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
