import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download } from 'lucide-react';
import { useState } from 'react';

export default function AssignmentReviewModal({ isOpen, onClose, assignment, onSave }) {
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');

  const handleSave = () => {
    onSave(assignment.id, {
      score: parseInt(score, 10),
      comment,
    });
    setScore('');
    setComment('');
    onClose();
  };

  const modal = (
    <AnimatePresence>
      {isOpen && assignment && (
        <motion.div
          key="review-backdrop"
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
            key="review-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '896px', // max-w-4xl roughly
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 32px', borderBottom: '1px solid #f3f4f6', flexShrink: 0
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>Vazifani tekshirish</h2>
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

            {/* ── Scrollable body ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Student info */}
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

              {/* Score + Comment */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                    Baho (0–100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="0"
                    style={{
                      width: '128px', height: '40px', padding: '0 12px',
                      border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px',
                      outline: 'none', transition: 'all 0.15s'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                    Fikr qoldirish
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Vazifa haqida o'z fikringizni yozing..."
                    style={{
                      width: '100%', padding: '12px', boxSizing: 'border-box',
                      border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px',
                      outline: 'none', resize: 'none', transition: 'all 0.15s', fontFamily: 'inherit'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px',
              padding: '20px 32px', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb', flexShrink: 0
            }}>
              <button
                onClick={onClose}
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px', color: '#374151', backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                disabled={!score}
                style={{
                  height: '40px', padding: '0 20px', borderRadius: '12px',
                  fontWeight: 500, fontSize: '14px', color: '#ffffff', backgroundColor: '#2563eb',
                  border: 'none', cursor: !score ? 'not-allowed' : 'pointer', transition: 'background 0.15s',
                  opacity: !score ? 0.5 : 1
                }}
                onMouseEnter={(e) => { if(score) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
                onMouseLeave={(e) => { if(score) e.currentTarget.style.backgroundColor = '#2563eb'; }}
              >
                Saqlash
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
