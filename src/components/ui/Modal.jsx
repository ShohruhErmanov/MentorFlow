import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ isOpen, onClose, title, subtitle, icon: Icon, children, className }) {
  const panelRef = useRef(null);

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

  // Autofocus the first focusable element when the modal opens
  useEffect(() => {
    if (isOpen) {
      panelRef.current?.querySelector(FOCUSABLE_SELECTOR)?.focus();
    }
  }, [isOpen]);

  // ESC closes the modal; Tab/Shift+Tab is trapped inside the panel
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
            className="fixed inset-0 z-50 bg-[#191b23]/35 backdrop-blur-sm dark:bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'fixed left-1/2 top-1/2 z-[9999] flex flex-col rounded-3xl bg-white shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-[90vw] sm:w-[640px] sm:min-w-[520px] dark:bg-slate-800 dark:shadow-black/40',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#e1e2ed] dark:border-slate-700">
              <div className="flex items-start gap-3">
                {Icon && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                )}
                <div>
                  <h2 id="modal-title" className="text-xl font-bold text-[#191b23] dark:text-white">{title}</h2>
                  {subtitle && (
                    <p className="mt-0.5 text-sm font-medium text-[#737686] dark:text-slate-400">{subtitle}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-[#737686] transition-colors hover:bg-[#f3f3fe] hover:text-[#191b23] dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
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
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
