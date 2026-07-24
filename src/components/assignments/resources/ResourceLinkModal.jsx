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
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
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
            style={{
              position: 'relative', width: '100%', maxWidth: 440, minWidth: 300,
              backgroundColor: '#fff', borderRadius: 20,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={20} color="#6b7280" />
                {title}
              </h3>
              <button
                onClick={onClose}
                style={{ padding: 6, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#9ca3af' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ padding: '24px' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 8 }}>
                  URL Havola
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setError(''); }}
                  placeholder={placeholder}
                  style={{
                    width: '100%', padding: '12px 14px', fontSize: 14,
                    border: `1px solid ${error ? '#f87171' : '#e5e7eb'}`,
                    borderRadius: 10, outline: 'none',
                    boxShadow: error ? '0 0 0 3px rgba(248,113,113,0.1)' : 'none',
                    transition: 'all 0.15s'
                  }}
                  onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = error ? e.currentTarget.style.boxShadow : '0 0 0 3px rgba(59,130,246,0.1)' }}
                  onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none' }}
                />
                {error && <p style={{ margin: '6px 0 0', fontSize: 12, color: '#ef4444' }}>{error}</p>}
              </div>

              <div style={{ padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{ padding: '9px 16px', fontSize: 13, fontWeight: 500, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer' }}
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
