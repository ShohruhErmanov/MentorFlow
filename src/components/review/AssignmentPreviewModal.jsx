import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

export default function AssignmentPreviewModal({ isOpen, onClose, previewImage }) {
  const [zoom, setZoom] = useState(1);

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="img-preview-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={onClose}
        >
          <motion.div
            key="img-preview-box"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1024px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Controls bar ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                  style={{
                    width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none', borderRadius: '8px',
                    color: '#ffffff', cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                >
                  <ZoomOut size={18} />
                </button>
                <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500 }}>
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(z => Math.min(3, z + 0.25))}
                  style={{
                    width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none', borderRadius: '8px',
                    color: '#ffffff', cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                >
                  <ZoomIn size={18} />
                </button>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none', borderRadius: '8px',
                  color: '#ffffff', cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Image viewer ── */}
            <div style={{ overflow: 'auto', flex: 1, borderRadius: '12px' }}>
              <img
                src={previewImage}
                alt="Vazifa preview"
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.2s',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
