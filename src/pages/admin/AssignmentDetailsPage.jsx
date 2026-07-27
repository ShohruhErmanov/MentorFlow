import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Toast from '../../components/ui/Toast';
import AssignmentModal from '../../components/admin/assignments/AssignmentModal';
import AssignmentHeader from '../../components/admin/assignmentDetails/AssignmentHeader';
import AssignmentStats from '../../components/admin/assignmentDetails/AssignmentStats';
import AssignmentTabs from '../../components/admin/assignmentDetails/AssignmentTabs';
import { useAdminAssignmentDetails } from '../../hooks/admin/useAdminAssignmentDetails';

export default function AssignmentDetailsPage() {
  const {
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
    openEditModal,
    closeEditModal,
    saveAssignmentEdits,
  } = useAdminAssignmentDetails();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="h-56 rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-[110px] rounded-xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
          ))}
        </div>
        <div className="h-96 rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-[#191b23] dark:text-white">Vazifa topilmadi</p>
        <p className="mt-2 text-sm text-[#737686] dark:text-slate-400">
          Siz qidirayotgan vazifa mavjud emas yoki o'chirilgan.
        </p>
        <Link to="/admin/assignments" className="mt-4 inline-block text-sm font-semibold text-[#2563eb] hover:underline dark:text-blue-400">
          Vazifalarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <AssignmentHeader assignment={assignment} onEdit={openEditModal} />

      <AssignmentStats stats={stats} />

      <AssignmentTabs
        assignment={assignment}
        submissions={submissions}
        stats={stats}
        activeTabIndex={activeTabIndex}
        onTabChange={setActiveTabIndex}
        selectedSubmissionId={selectedSubmissionId}
        onSelectSubmission={setSelectedSubmissionId}
        onGoToReview={goToReview}
        onGrade={gradeSubmission}
        onReturn={returnSubmission}
      />

      <AssignmentModal mode="edit" isOpen={editModalOpen} onClose={closeEditModal} onSubmit={saveAssignmentEdits} assignment={assignment} />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
