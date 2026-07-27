import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockAssignments } from '../../constants/mockAssignments';
import { getSubmissionsForAssignment } from '../../constants/mockSubmissions';

const REVIEW_TAB_INDEX = 2;

export function useAdminAssignmentDetails() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [assignment, setAssignment] = useState(() => mockAssignments.find((a) => a.id === id) ?? null);
  const [submissions, setSubmissions] = useState(() => getSubmissionsForAssignment(id));

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const stats = useMemo(() => {
    const submitted = submissions.filter((s) => s.status !== 'pending');
    const late = submissions.filter((s) => s.status === 'late');
    const graded = submissions.filter((s) => s.score !== null);
    const avgScore = graded.length ? graded.reduce((sum, s) => sum + s.score, 0) / graded.length : 0;
    const passThreshold = (assignment?.maxScore ?? 0) * 0.6;
    const successCount = graded.filter((s) => s.score >= passThreshold).length;
    const successRate = graded.length ? (successCount / graded.length) * 100 : 0;

    return {
      totalCount: submissions.length,
      submittedCount: submitted.length,
      notSubmittedCount: submissions.length - submitted.length,
      lateCount: late.length,
      avgScore,
      successRate,
    };
  }, [submissions, assignment]);

  const saveAssignmentEdits = (data) => {
    setAssignment((prev) => (prev ? { ...prev, ...data } : prev));
    setEditModalOpen(false);
    showToast("Vazifa ma'lumotlari yangilandi");
  };

  const goToReview = (submissionId) => {
    setSelectedSubmissionId(submissionId);
    setActiveTabIndex(REVIEW_TAB_INDEX);
  };

  const gradeSubmission = (submissionId, { score, feedback }) => {
    setSubmissions((prev) => prev.map((s) => (s.id === submissionId ? { ...s, score, feedback } : s)));
    showToast('Vazifa baholandi');
  };

  const returnSubmission = (submissionId, { feedback }) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'pending', score: null, feedback } : s)),
    );
    showToast('Vazifa qaytarildi');
  };

  return {
    isLoading,
    assignment,
    submissions,
    stats,
    activeTabIndex,
    setActiveTabIndex,
    selectedSubmissionId,
    setSelectedSubmissionId,
    goToReview,
    gradeSubmission,
    returnSubmission,
    toast,
    hideToast,
    editModalOpen,
    openEditModal: () => setEditModalOpen(true),
    closeEditModal: () => setEditModalOpen(false),
    saveAssignmentEdits,
  };
}
