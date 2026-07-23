import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';

export default function Modal({ isOpen, onClose, title, children, className }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#191b23]/35 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, type: 'spring', bounce: 0.3 }}
              className={clsx(
                'relative flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_rgba(25,27,35,0.12)] sm:max-h-[calc(100vh-4rem)]',
                className || 'max-w-lg'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#e1e2ed] px-6 py-4">
                <h2 className="text-lg font-bold text-[#191b23]">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-[#737686] transition-colors hover:bg-[#f3f3fe] hover:text-[#191b23]"
                  aria-label="Yopish"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
