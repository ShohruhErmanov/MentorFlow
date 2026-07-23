import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-white p-4 pr-12 shadow-[0_12px_24px_rgba(25,27,35,0.12)] border border-[#e1e2ed]"
          role="alert"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={18} />
          </div>
          <p className="text-sm font-semibold text-[#191b23]">{message}</p>
          <button 
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#191b23] transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
