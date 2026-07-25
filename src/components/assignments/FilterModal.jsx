import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, filters, setFilters, onApply }) => {
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

  const selectStyle = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 14,
    borderRadius: 10,
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  };

  const selectClass =
    'border border-gray-200 bg-white text-gray-900 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500';

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="filter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="bg-black/40 dark:bg-black/60"
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
            key="filter-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="bg-white dark:bg-slate-800 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)]"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 480,
              minWidth: 300,
              borderRadius: 24,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
          >
            {/* Header */}
            <div className="border-b border-gray-100 dark:border-slate-700" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px 20px', flexShrink: 0 }}>
              <h3 className="text-gray-900 dark:text-white" style={{ margin: 0, fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Filter size={18} className="text-gray-500 dark:text-slate-400" />
                Filtrlash
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:bg-gray-100 dark:text-slate-500 dark:hover:bg-slate-700"
                style={{ padding: 8, background: 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Status */}
              <div>
                <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Holat</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  style={selectStyle}
                  className={selectClass}
                >
                  <option value="">Barcha holatlar</option>
                  <option value="FAOL">Faol</option>
                  <option value="TEKSHIRILMOQDA">Tekshirilmoqda</option>
                  <option value="QABUL QILINDI">Qabul qilindi</option>
                  <option value="YAKUNLANGAN">Yakunlangan</option>
                  <option value="KECHIKKAN">Kechikkan</option>
                </select>
              </div>

              {/* Group */}
              <div>
                <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Guruh</label>
                <select
                  value={filters.group}
                  onChange={(e) => setFilters({ ...filters, group: e.target.value })}
                  style={selectStyle}
                  className={selectClass}
                >
                  <option value="">Barcha guruhlar</option>
                  <option value="Frontend G1">Frontend G1</option>
                  <option value="Frontend G2">Frontend G2</option>
                  <option value="Frontend G3">Frontend G3</option>
                  <option value="Design G1">Design G1</option>
                  <option value="Design G2">Design G2</option>
                  <option value="Backend G1">Backend G1</option>
                  <option value="Backend G2">Backend G2</option>
                  <option value="Mobile G1">Mobile G1</option>
                  <option value="Cyber G1">Cyber G1</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-gray-700 dark:text-slate-300" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Qiyinchilik</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  style={selectStyle}
                  className={selectClass}
                >
                  <option value="">Barchasi</option>
                  <option value="Easy">Oson</option>
                  <option value="Medium">O'rtacha</option>
                  <option value="Hard">Qiyin</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-100 dark:bg-slate-900/40 dark:border-slate-700" style={{ padding: '16px 28px 24px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
              <button
                onClick={() => { setFilters({ status: '', group: '', difficulty: '' }); onApply(); }}
                className="text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700"
                style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, borderRadius: 10, cursor: 'pointer', transition: 'background 0.15s' }}
              >
                Tozalash
              </button>
              <button
                onClick={onApply}
                style={{ padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#ffffff', background: '#2563eb', border: 'none', borderRadius: 10, cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.3)', transition: 'background 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
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
};

export default FilterModal;
