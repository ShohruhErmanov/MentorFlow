import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X, AlertTriangle } from 'lucide-react';
import { createPortal } from 'react-dom';

function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/*
           * ── Centering shell ──────────────────────────────────────
           * WHY a plain div and not motion.div for the outer shell:
           * Framer Motion's x/y string values ("-50%") in animate props
           * inject them via its own transform pipeline and create an
           * inline size-context that collapses width to fit-content.
           * Centering MUST be done with static CSS only.
           * Framer Motion ONLY drives opacity + scale on the inner box.
           */}
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Explicit-width container — Framer Motion NEVER sets width here */}
            <div className="w-full max-w-[480px] pointer-events-auto">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-title"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative w-full rounded-3xl bg-white p-7 shadow-2xl dark:bg-slate-800"
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-lg p-1.5 text-[#737686] hover:bg-[#f3f3fe] hover:text-[#191b23] transition-colors dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                  aria-label="Yopish"
                >
                  <X size={18} />
                </button>

                {/* Warning icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
                  <AlertTriangle size={22} className="text-red-500 dark:text-red-400" />
                </div>

                {/* Title */}
                <h2 id="logout-title" className="mb-2 text-lg font-bold text-[#191b23] dark:text-white">
                  Tizimdan chiqmoqchimisiz?
                </h2>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-[#737686] dark:text-slate-400">
                  Barcha saqlanmagan o'zgarishlar yo'qolishi mumkin.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl border border-[#e1e2ed] bg-white py-2.5 text-sm font-semibold text-[#434655] transition-colors hover:bg-[#f3f3fe] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-colors hover:bg-red-600"
                  >
                    Chiqish
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function LogoutCard() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    // In a real app: call auth logout, redirect to /login
    window.location.href = '/login';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-[#e1e2ed] bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400 bg-white py-2.5 text-sm font-bold text-red-500 transition-all duration-200 hover:bg-red-50 hover:shadow-sm dark:bg-slate-800 dark:hover:bg-red-500/10"
        >
          <LogOut size={16} />
          Tizimdan chiqish
        </motion.button>
      </motion.div>

      <LogoutModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
