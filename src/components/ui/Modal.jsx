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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                'relative flex flex-col rounded-3xl bg-white shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] w-full max-w-[90vw] sm:w-[640px] sm:min-w-[520px]',
                className
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e1e2ed]">
                <h2 className="text-xl font-bold text-[#191b23]">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-[#737686] transition-colors hover:bg-[#f3f3fe] hover:text-[#191b23]"
                  aria-label="Yopish"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
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
