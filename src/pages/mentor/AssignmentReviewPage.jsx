import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { reviewAssignmentsData } from '../../data/reviewAssignments';

import ReviewHeader from '../../components/review/ReviewHeader';
import ResourcesCard from '../../components/review/ResourcesCard';
import AssignmentPreviewCard from '../../components/review/AssignmentPreviewCard';
import ReviewScoreCard from '../../components/review/ReviewScoreCard';
import CommentsHistory from '../../components/review/CommentsHistory';
import AssignmentPreviewModal from '../../components/review/AssignmentPreviewModal';
import AcceptDialog from '../../components/review/AcceptDialog';
import ReturnDialog from '../../components/review/ReturnDialog';
import ResourceModal from '../../components/review/ResourceModal';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.07 },
  }),
};

function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[10000]">
      <div className={`px-4 py-3 rounded-xl shadow-lg text-white font-medium flex items-center gap-2 ${type === 'success' ? 'bg-green-600' : 'bg-orange-500'}`}>
        {message}
        <button onClick={onClose} className="ml-4 opacity-80 hover:opacity-100">
          ✕
        </button>
      </div>
    </div>
  );
}

export default function AssignmentReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Load from mock data; fall back to first item if not found
  const found = reviewAssignmentsData.find((a) => String(a.id) === String(id));
  const initial = found ?? reviewAssignmentsData[0];

  const [assignment, setAssignment] = useState(initial);
  const [score, setScore] = useState(initial.score);
  const [comment, setComment] = useState(initial.mentorComment);

  // Modals
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [acceptOpen, setAcceptOpen]             = useState(false);
  const [returnOpen, setReturnOpen]             = useState(false);
  const [resourceModal, setResourceModal]       = useState(null); // resource object
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  if (!assignment) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 text-center">
        <p className="text-gray-500 dark:text-slate-400 text-lg">Topshiriq topilmadi.</p>
        <button
          onClick={() => navigate('/mentor/submitted-assignments')}
          className="mt-4 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          ← Orqaga qaytish
        </button>
      </div>
    );
  }

  const handleAccept = () => {
    setAssignment((prev) => ({ ...prev, status: 'completed', score, mentorComment: comment }));
    setAcceptOpen(false);
    showToast('Vazifa muvaffaqiyatli qabul qilindi', 'success');
  };

  const handleReturn = (reason) => {
    setAssignment((prev) => ({ ...prev, status: 'returned', mentorComment: comment }));
    setReturnOpen(false);
    showToast('Vazifa qaytarildi', 'warning');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Page header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <ReviewHeader assignment={{ ...assignment, status: assignment.status }} />
      </motion.div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-8">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-6">
          {/* Resources */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <ResourcesCard
              resources={assignment.resources}
              onOpenResource={(r) => setResourceModal(r)}
            />
          </motion.div>

          {/* Preview image */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <AssignmentPreviewCard
              previewImage={assignment.previewImage}
              onOpen={() => setImagePreviewOpen(true)}
            />
          </motion.div>

          {/* Comments history (below preview on mobile, stays left on desktop) */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="lg:hidden">
            <CommentsHistory comments={assignment.comments} />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-6">
          {/* Scoring */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <ReviewScoreCard
              score={score}
              onScoreChange={setScore}
              comment={comment}
              onCommentChange={setComment}
              onReturn={() => setReturnOpen(true)}
              onAccept={() => setAcceptOpen(true)}
            />
          </motion.div>

          {/* Comments history – only on desktop */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="hidden lg:block">
            <CommentsHistory comments={assignment.comments} />
          </motion.div>
        </div>
      </div>

      {/* ── Modals ── */}
      <AssignmentPreviewModal
        isOpen={imagePreviewOpen}
        onClose={() => setImagePreviewOpen(false)}
        previewImage={assignment.previewImage}
      />

      <AcceptDialog
        isOpen={acceptOpen}
        onClose={() => setAcceptOpen(false)}
        onAccept={handleAccept}
        score={score}
        studentName={assignment.student.name}
      />

      <ReturnDialog
        isOpen={returnOpen}
        onClose={() => setReturnOpen(false)}
        onReturn={handleReturn}
        studentName={assignment.student.name}
      />

      <ResourceModal
        isOpen={!!resourceModal}
        onClose={() => setResourceModal(null)}
        resource={resourceModal}
      />

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
}
