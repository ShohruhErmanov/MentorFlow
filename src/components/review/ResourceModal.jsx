import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const TYPE_META = {
  github: { label: 'GitHub Repository', headerBg: '#111827', headerText: '#ffffff' },
  vercel: { label: 'Vercel Deployment',  headerBg: '#000000', headerText: '#ffffff' },
  figma:  { label: 'Figma Design',       headerBg: '#7c3aed', headerText: '#ffffff' },
  pdf:    { label: 'PDF Document',       headerBg: '#dc2626', headerText: '#ffffff' },
};

export default function ResourceModal({ isOpen, onClose, resource }) {
  const meta = resource ? (TYPE_META[resource.type] ?? TYPE_META.pdf) : null;

  const modal = (
    <AnimatePresence>
      {isOpen && resource && (
        /* Single motion.div is the backdrop + centering container.
           No translate tricks — pure flex centering.
           Inline styles guarantee no Tailwind v4 portal class-resolution issues. */
        <motion.div
          key="resource-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          onClick={onClose}
        >
          <motion.div
            key="resource-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.35)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Colored header ── */}
            <div style={{
              backgroundColor: meta.headerBg,
              color: meta.headerText,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
            }}>
              <div>
                <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px', fontWeight: 500, margin: '0 0 4px' }}>
                  {meta.label}
                </p>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 2px' }}>
                  {resource.title}
                </h3>
                <p style={{ fontSize: '14px', opacity: 0.75, margin: 0 }}>
                  {resource.subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  flexShrink: 0,
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: 'none',
                  background: 'rgba(255,255,255,0.15)',
                  color: meta.headerText,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Body ── */}
            <div style={{ padding: '24px' }}>
              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                border: '1px solid #f3f4f6',
              }}>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px', fontWeight: 500, margin: '0 0 4px' }}>
                  URL manzil
                </p>
                <p style={{ fontSize: '14px', color: '#374151', fontWeight: 500, wordBreak: 'break-all', margin: 0 }}>
                  {resource.url}
                </p>
              </div>

              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px', lineHeight: 1.6, margin: '0 0 20px' }}>
                Bu manba o'quvchi tomonidan topshirilgan vazifaga biriktirilgan.
                Haqiqiy loyihada ushbu havola tashqi resurslarga yo'naltiriladi.
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1, height: '40px',
                    borderRadius: '12px', fontWeight: 500, fontSize: '14px',
                    color: '#374151', backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb', cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                  Yopish
                </button>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1, height: '40px',
                    borderRadius: '12px', fontWeight: 500, fontSize: '14px',
                    color: '#ffffff', backgroundColor: '#2563eb',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  <ExternalLink size={15} />
                  Ko'rish
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
