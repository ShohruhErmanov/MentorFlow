import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import LearningResources from './resources/LearningResources';

/*
 * ROOT CAUSE OF BROKEN MODAL WIDTH:
 * ─────────────────────────────────
 * 1. STACKING CONTEXT: The modal was rendered INSIDE AssignmentsPage's
 *    <motion.div> which applies `transform` (from Framer Motion animations).
 *    Any CSS `transform` on a parent creates a NEW stacking context, making
 *    `position: fixed` children position relative to that element, NOT the
 *    viewport. The `max-w-[1600px]` container then constrained the dialog.
 *
 * 2. PORTAL FIX: We use ReactDOM.createPortal to render the modal directly
 *    onto document.body, completely escaping all parent transforms, overflows,
 *    and stacking contexts. This is the correct pattern for modals.
 *
 * 3. RESPONSIVE BREAKPOINTS: In Tailwind v4 with a v3 config shim,
 *    `md:grid-cols-2` inside a portal may not receive the responsive
 *    signal correctly. We use inline min-width instead to guarantee
 *    the 2-column layout on desktop regardless of breakpoint detection.
 */

const CreateAssignmentModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    group: 'Frontend G1',
    deadline: '',
    maxScore: 100,
    difficulty: 'Easy',
    status: 'FAOL',
  });

  const [resources, setResources] = useState({
    pdf: null,
    figma: null,
    github: null,
    video: null,
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setResources(initialData.resources || { pdf: null, figma: null, github: null, video: null });
    } else {
      setFormData({
        name: '',
        description: '',
        group: 'Frontend G1',
        deadline: '',
        maxScore: 100,
        difficulty: 'Easy',
        status: 'FAOL',
      });
      setResources({ pdf: null, figma: null, github: null, video: null });
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vazifa nomi kiritilishi shart';
    if (!formData.deadline.trim()) newErrors.deadline = 'Muddat kiritilishi shart';
    if (formData.maxScore <= 0) newErrors.maxScore = "Maksimal ball 0 dan katta bo'lishi kerak";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...formData, resources });
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors ${
      hasError
        ? 'border-red-400 focus:border-red-500 bg-red-50'
        : 'border-gray-200 focus:border-blue-500'
    }`;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── OVERLAY: fixed to viewport via portal, no parent transform ── */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              backgroundColor: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            onClick={onClose}
          />
          
          {/* ── DIALOG: explicit pixel width, never collapses ── */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.96, x: '-50%', y: '-50%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              zIndex: 9999,
              width: 'calc(100% - 2rem)',
              maxWidth: '768px',
              minWidth: '320px',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.28)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '28px 32px 24px',
                borderBottom: '1px solid #f1f3f9',
                flexShrink: 0,
              }}
            >
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111827' }}>
                {initialData ? 'Vazifani tahrirlash' : 'Yangi vazifa yaratish'}
              </h3>
              <button
                onClick={onClose}
                style={{
                  padding: '8px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Scrollable form body ── */}
            <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
              <form id="assignment-form" onSubmit={handleSubmit}>
                {/* Row 1: Full width — Assignment Name */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Vazifa nomi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masalan: HTML/CSS Asoslari"
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                </div>

                {/* Row 2: Full width — Description */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Qisqacha ta'rif
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Vazifa haqida qisqacha ma'lumot..."
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Row 3: 2-column — Group + Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Guruh</label>
                    <select
                      value={formData.group}
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                    >
                      <option value="Frontend G1">Frontend G1</option>
                      <option value="Frontend G2">Frontend G2</option>
                      <option value="Frontend G3">Frontend G3</option>
                      <option value="Design G1">Design G1</option>
                      <option value="Design G2">Design G2</option>
                      <option value="Backend G1">Backend G1</option>
                      <option value="Backend G2">Backend G2</option>
                      <option value="Mobile G1">Mobile G1</option>
                      <option value="Mobile G2">Mobile G2</option>
                      <option value="Cyber G1">Cyber G1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Holat</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                    >
                      <option value="FAOL">Faol</option>
                      <option value="TEKSHIRILMOQDA">Tekshirilmoqda</option>
                      <option value="QABUL QILINDI">Qabul qilindi</option>
                      <option value="YAKUNLANGAN">Yakunlangan</option>
                      <option value="KECHIKKAN">Kechikkan</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: 2-column — Deadline + Max Score */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Muddat <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="Masalan: 24 Okt, 23:59"
                      className={inputClass(errors.deadline)}
                    />
                    {errors.deadline && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.deadline}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Maks. ball <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.maxScore}
                      onChange={(e) =>
                        setFormData({ ...formData, maxScore: parseInt(e.target.value) || 0 })
                      }
                      className={inputClass(errors.maxScore)}
                    />
                    {errors.maxScore && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.maxScore}</p>
                    )}
                  </div>
                </div>

                {/* Row 5: Full width — Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qiyinchilik darajasi
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { value: 'Easy', label: 'Oson' },
                      { value: 'Medium', label: "O'rtacha" },
                      { value: 'Hard', label: 'Qiyin' },
                    ].map(({ value, label }) => (
                      <label
                        key={value}
                        style={{
                          flex: 1,
                          cursor: 'pointer',
                          border: `1px solid ${formData.difficulty === value ? '#3b82f6' : '#e5e7eb'}`,
                          borderRadius: '8px',
                          padding: '10px 16px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: formData.difficulty === value ? 600 : 400,
                          color: formData.difficulty === value ? '#1d4ed8' : '#6b7280',
                          backgroundColor: formData.difficulty === value ? '#eff6ff' : '#ffffff',
                          boxShadow: formData.difficulty === value ? '0 0 0 1px #3b82f6' : 'none',
                          transition: 'all 0.15s',
                        }}
                      >
                        <input
                          type="radio"
                          name="difficulty"
                          value={value}
                          className="sr-only"
                          checked={formData.difficulty === value}
                          onChange={() => setFormData({ ...formData, difficulty: value })}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </form>

              {/* ── Learning Resources Section ── */}
              <LearningResources resources={resources} setResources={setResources} />
            </div>

            {/* ── Footer ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
                padding: '20px 32px',
                backgroundColor: '#f9fafb',
                borderTop: '1px solid #f1f3f9',
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                form="assignment-form"
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#ffffff',
                  background: '#2563eb',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(37,99,235,0.3)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
              >
                Saqlash
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Portal to document.body escapes ALL parent stacking contexts & transforms
  return createPortal(modal, document.body);
};

export default CreateAssignmentModal;
