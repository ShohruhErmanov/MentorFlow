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
            className="bg-white dark:bg-slate-800 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)]"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '448px', // max-w-md
              borderRadius: '16px',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-100 dark:border-slate-700" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px'
            }}>
              <h2 className="text-gray-900 dark:text-white" style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Filtrlash</h2>
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

            {/* Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Holati</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setStatus(status === 'pending' ? '' : 'pending')}
                    className={`border ${
                      status === 'pending'
                        ? 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-500/10 dark:border-orange-500/30 dark:text-orange-400'
                        : 'bg-white border-gray-200 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                    }`}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    Kutilmoqda
                  </button>
                  <button
                    onClick={() => setStatus(status === 'completed' ? '' : 'completed')}
                    className={`border ${
                      status === 'completed'
                        ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400'
                        : 'bg-white border-gray-200 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                    }`}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    Qabul qilindi
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Vaqt oralig'i</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Bugun', 'Shu hafta', 'Shu oy'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setDate(date === t ? '' : t)}
                      className={`border ${
                        date === t
                          ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400'
                          : 'bg-white border-gray-200 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                      }`}
                      style={{
                        padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Yo'nalish</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Frontend', 'Backend', 'Design'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGroup(group === g ? '' : g)}
                      className={`border ${
                        group === g
                          ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400'
                          : 'bg-white border-gray-200 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                      }`}
                      style={{
                        padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
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
            <div className="bg-gray-50 dark:bg-slate-900/40 border-t border-gray-100 dark:border-slate-700" style={{ display: 'flex', gap: '12px', padding: '20px 24px' }}>
              <button
                onClick={() => { setStatus(''); setDate(''); setGroup(''); }}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/40 transition-colors"
                style={{
                  flex: 1, height: '40px', borderRadius: '12px', fontWeight: 500, fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Tozalash
              </button>
              <button
                onClick={() => { onApply({ status, date, group }); onClose(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                style={{
                  flex: 1, height: '40px', borderRadius: '12px', fontWeight: 500, fontSize: '14px',
                  border: 'none', cursor: 'pointer'
                }}
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
