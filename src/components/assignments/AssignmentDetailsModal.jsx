import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Users, Star, BarChart3, FileText,
  Paperclip, User, Clock, Edit2,
} from 'lucide-react';
import AssignmentStatusBadge from './AssignmentStatusBadge';

// Mock teacher and instructions data per assignment id
const mockDetails = {
  teacher: 'Murod Hasanov',
  instructions:
    "Ushbu vazifani bajarish uchun quyidagi qadamlarni bajaring:\n1. Mavzuni diqqat bilan o'qing.\n2. Misollar yozing va ishga solip ko'ring.\n3. Natijalarni skrinshotga oling.\n4. ZIP arxivida topshiring.",
  files: [
    { name: 'instructions.pdf', size: '1.2 MB' },
    { name: 'starter-template.zip', size: '340 KB' },
  ],
  stats: {
    submitted: 14,
    total: 24,
    reviewed: 8,
    late: 2,
  },
  createdAt: '12 Okt, 2026',
};

const difficultyColors = {
  Easy:   { bg: 'rgba(16,185,129,0.1)',  color: '#059669', label: 'Oson'     },
  Medium: { bg: 'rgba(245,158,11,0.1)',  color: '#d97706', label: "O'rtacha" },
  Hard:   { bg: 'rgba(239,68,68,0.1)',   color: '#dc2626', label: 'Qiyin'    },
};

const InfoRow = ({ icon: Icon, label, children }) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={16} color="#6b7280" />
    </div>
    <div>
      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</p>
      <div style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{children}</div>
    </div>
  </div>
);

const StatBox = ({ label, value, color }) => (
  <div style={{ flex: 1, textAlign: 'center', padding: '16px 8px', borderRadius: 12, background: color + '15', border: `1px solid ${color}30` }}>
    <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color }}>{value}</p>
    <p style={{ margin: '4px 0 0', fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{label}</p>
  </div>
);

const AssignmentDetailsModal = ({ assignment, isOpen, onClose, onEdit }) => {
  if (!assignment) return null;

  const diff = difficultyColors[assignment.difficulty] || difficultyColors.Easy;
  const d = mockDetails;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="details-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding: 16,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="details-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 28 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            style={{
              position: 'relative', width: '100%', maxWidth: 860, minWidth: 320,
              background: '#fff', borderRadius: 24,
              boxShadow: '0 30px 80px -12px rgba(0,0,0,0.3)',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              maxHeight: '90vh',
            }}
          >
            {/* Header */}
            <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid #f3f4f6', flexShrink: 0, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#2563eb', flexShrink: 0 }}>
                {assignment.name.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111827' }}>{assignment.name}</h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>{assignment.description}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => { onClose(); onEdit(assignment); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  <Edit2 size={14} /> Tahrirlash
                </button>
                <button
                  onClick={onClose}
                  style={{ padding: 8, background: 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#9ca3af', display: 'flex' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div style={{ overflowY: 'auto', padding: '24px 32px', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {/* Left column */}
                <div>
                  <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Umumiy ma'lumot</h4>

                  <InfoRow icon={Users} label="Guruh">
                    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 6, background: '#f3f4f6', fontSize: 13 }}>{assignment.group}</span>
                  </InfoRow>

                  <InfoRow icon={Calendar} label="Muddat">
                    <span style={{ color: assignment.isLate ? '#ef4444' : '#111827' }}>{assignment.deadline}</span>
                  </InfoRow>

                  <InfoRow icon={Star} label="Holat">
                    <AssignmentStatusBadge status={assignment.status} />
                  </InfoRow>

                  <InfoRow icon={BarChart3} label="Maks. ball">
                    <strong style={{ fontSize: 18, color: '#111827' }}>{assignment.maxScore}</strong>
                    <span style={{ color: '#9ca3af', marginLeft: 4, fontSize: 13 }}>ball</span>
                  </InfoRow>

                  <InfoRow icon={FileText} label="Qiyinchilik">
                    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, background: diff.bg, color: diff.color, fontSize: 12, fontWeight: 600 }}>
                      {diff.label}
                    </span>
                  </InfoRow>

                  <InfoRow icon={User} label="O'qituvchi">
                    <span>{d.teacher}</span>
                  </InfoRow>

                  <InfoRow icon={Clock} label="Yaratilgan sana">
                    <span>{d.createdAt}</span>
                  </InfoRow>
                </div>

                {/* Right column */}
                <div>
                  {/* Stats */}
                  <h4 style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Statistika</h4>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                    <StatBox label="Topshirildi"  value={d.stats.submitted} color="#2563eb" />
                    <StatBox label="Tekshirildi"  value={d.stats.reviewed}  color="#059669" />
                    <StatBox label="Kechikkan"    value={d.stats.late}      color="#ef4444" />
                    <StatBox label="Jami"         value={d.stats.total}     color="#7c3aed" />
                  </div>

                  {/* Submission progress bar */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Topshirish darajasi</span>
                      <span style={{ fontSize: 12, color: '#111827', fontWeight: 600 }}>{Math.round((d.stats.submitted / d.stats.total) * 100)}%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 100, background: '#f3f4f6', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(d.stats.submitted / d.stats.total) * 100}%`, background: 'linear-gradient(90deg, #2563eb, #60a5fa)', borderRadius: 100 }} />
                    </div>
                  </div>

                  {/* Instructions */}
                  <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ko'rsatmalar</h4>
                  <div style={{ background: '#f9fafb', borderRadius: 12, padding: '14px 16px', fontSize: 13, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: 20 }}>
                    {d.instructions}
                  </div>

                  {/* Files */}
                  <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ilova fayllar</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {d.files.map((f) => (
                      <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: '#f3f4f6', fontSize: 13 }}>
                        <Paperclip size={14} color="#6b7280" />
                        <span style={{ flex: 1, fontWeight: 500, color: '#374151' }}>{f.name}</span>
                        <span style={{ color: '#9ca3af', fontSize: 11 }}>{f.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '16px 32px', borderTop: '1px solid #f3f4f6', background: '#f9fafb', flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={onClose}
                style={{ padding: '10px 24px', fontSize: 14, fontWeight: 500, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, cursor: 'pointer' }}
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
};

export default AssignmentDetailsModal;
