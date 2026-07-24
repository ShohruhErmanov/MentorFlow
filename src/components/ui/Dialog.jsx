import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dialog({ isOpen, onClose, title, description, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#191b23]/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            className="fixed left-1/2 top-1/2 z-[51] w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'dialog-title' : undefined}
          >
            {title && (
              <h2 id="dialog-title" className="mb-2 text-lg font-bold text-[#191b23]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mb-6 text-sm font-medium text-[#737686]">{description}</p>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
