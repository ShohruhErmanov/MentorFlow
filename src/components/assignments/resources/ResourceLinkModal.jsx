import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ResourceLinkModal = ({ isOpen, onClose, onSave, title, icon: Icon, placeholder, validator, initialValue = '' }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUrl(initialValue);
      setError('');
    }
  }, [isOpen, initialValue]);

  // Handle ESC and body scroll
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Havola kiritilishi shart');
      return;
    }
    
    if (validator && !validator(url)) {
      setError("Noto'g'ri havola formati kiritildi");
      return;
    }

    onSave(url);
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="link-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="bg-black/40 dark:bg-black/60"
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            padding: 16,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="link-modal-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-white dark:bg-slate-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
            style={{
              position: 'relative', width: '100%', maxWidth: 440, minWidth: 300,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <div className="border-b border-gray-100 dark:border-slate-700" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
              <h3 className="text-gray-900 dark:text-white" style={{ margin: 0, fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={20} className="text-gray-500 dark:text-slate-400" />
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:bg-gray-100 dark:text-slate-500 dark:hover:bg-slate-700"
                style={{ padding: 6, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ padding: '24px' }}>
                <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
                  URL Havola
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setError(''); }}
                  placeholder={placeholder}
                  className={`bg-white text-gray-900 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 ${
                    error
                      ? 'border border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/10 dark:border-red-500'
                      : 'border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-600 dark:focus:border-blue-500'
                  }`}
                  style={{
                    width: '100%', padding: '12px 14px', fontSize: 14,
                    borderRadius: 10, outline: 'none',
                    transition: 'all 0.15s'
                  }}
                />
                {error && <p className="text-red-500" style={{ margin: '6px 0 0', fontSize: 12 }}>{error}</p>}
              </div>

              <div className="bg-gray-50 border-t border-gray-100 dark:bg-slate-900/40 dark:border-slate-700" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700"
                  style={{ padding: '9px 16px', fontSize: 13, fontWeight: 500, borderRadius: 8, cursor: 'pointer' }}
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 16px', fontSize: 13, fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 1px 2px rgba(37,99,235,0.3)' }}
                >
                  Saqlash
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
};

export default ResourceLinkModal;
