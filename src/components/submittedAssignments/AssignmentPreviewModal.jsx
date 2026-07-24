import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download } from 'lucide-react';

export default function AssignmentPreviewModal({ isOpen, onClose, assignment }) {
  const modal = (
    <AnimatePresence>
      {isOpen && assignment && (
        <motion.div
          key="preview-backdrop"
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
            key="preview-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '672px', // max-w-2xl
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 32px', borderBottom: '1px solid #f3f4f6', flexShrink: 0
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>Vazifa natijasi</h2>
              <button
                onClick={onClose}
                style={{
                  width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: 'none', background: 'transparent',
                  color: '#9ca3af', cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#4b5563'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Student + score */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {assignment.avatar ? (
                    <img
                      src={assignment.avatar}
                      alt={assignment.studentName}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dbeafe', color: '#2563eb',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '20px', flexShrink: 0
                    }}>
                      {assignment.studentName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{assignment.studentName}</h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{assignment.group}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280', margin: '0 0 4px' }}>Qo'yilgan baho</p>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#2563eb', margin: 0 }}>
                    {assignment.score}<span style={{ fontSize: '18px', color: '#9ca3af', fontWeight: 500 }}>/100</span>
                  </div>
                </div>
              </div>

              {/* Assignment info */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>{assignment.assignmentTitle}</h4>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{assignment.description}</p>
              </div>

              {/* Attachments */}
              {assignment.attachments && assignment.attachments.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', margin: '0 0 12px' }}>Biriktirilgan fayllar</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                    {assignment.attachments.map((file, idx) => (
                      <div key={idx} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px', border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: '#f9fafb'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                          <FileText size={16} color="#3b82f6" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</span>
                        </div>
                        <button style={{
                          border: 'none', background: 'transparent', color: '#9ca3af', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher comment */}
              {assignment.comment && (
                <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1e3a8a', margin: '0 0 8px' }}>Ustoz fikri</h4>
                  <p style={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>{assignment.comment}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              padding: '20px 32px', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb', flexShrink: 0
            }}>
              <button
                onClick={onClose}
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px', color: '#374151', backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'background 0.15s',
                  width: '100%'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                Yopish
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
