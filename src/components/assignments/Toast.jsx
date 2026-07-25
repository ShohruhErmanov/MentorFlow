import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const iconMap = {
  success: <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />,
  error:   <XCircle   size={18} className="text-red-600 dark:text-red-400" />,
  info:    <Info      size={18} className="text-blue-600 dark:text-blue-400" />,
};

const variantClass = {
  success: 'border-emerald-100 dark:border-emerald-500/30',
  error:   'border-red-100 dark:border-red-500/30',
  info:    'border-blue-100 dark:border-blue-500/30',
};

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const toast = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`bg-white dark:bg-slate-800 border ${variantClass[type] || variantClass.success}`}
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 18px',
            borderRadius: 14,
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            minWidth: 260,
            maxWidth: 380,
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          <span style={{ flexShrink: 0 }}>{iconMap[type] || iconMap.success}</span>
          <span className="text-gray-900 dark:text-white" style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(toast, document.body);
};

export default Toast;
