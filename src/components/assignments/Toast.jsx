import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const iconMap = {
  success: <CheckCircle size={18} color="#059669" />,
  error:   <XCircle   size={18} color="#dc2626" />,
  info:    <Info      size={18} color="#2563eb" />,
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
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 18px',
            background: '#ffffff',
            borderRadius: 14,
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            border: '1px solid #f1f3f9',
            minWidth: 260,
            maxWidth: 380,
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          <span style={{ flexShrink: 0 }}>{iconMap[type] || iconMap.success}</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#111827', flex: 1 }}>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(toast, document.body);
};

export default Toast;
