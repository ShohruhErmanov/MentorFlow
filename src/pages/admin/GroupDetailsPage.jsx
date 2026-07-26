import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Toast from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Tabs from '../../components/ui/Tabs';
import GroupHeader from '../../components/admin/groupDetails/GroupHeader';
import GroupSummaryCard from '../../components/admin/groupDetails/GroupSummaryCard';
import GroupOverviewTab from '../../components/admin/groupDetails/GroupOverviewTab';
import GroupStudentsTable from '../../components/admin/groupDetails/GroupStudentsTable';
import GroupAssignmentsTab from '../../components/admin/groupDetails/GroupAssignmentsTab';
import GroupAttendanceTab from '../../components/admin/groupDetails/GroupAttendanceTab';
import GroupRankingTab from '../../components/admin/groupDetails/GroupRankingTab';
import GroupScheduleTab from '../../components/admin/groupDetails/GroupScheduleTab';
import GroupModal from '../../components/admin/groups/GroupModal';
import AddStudentModal from '../../components/admin/groupDetails/AddStudentModal';
import StudentProfileModal from '../../components/admin/groupDetails/StudentProfileModal';
import EditGroupStudentModal from '../../components/admin/groupDetails/EditGroupStudentModal';
import { useAdminGroupDetails } from '../../hooks/admin/useAdminGroupDetails';

export default function GroupDetailsPage() {
  const {
    isLoading,
    group,
    activeTabIndex,
    setActiveTabIndex,
    goToTab,
    rankedStudents,
    currentStudents,
    hasFilters,
    clearFilters,
    searchQuery,
    setSearchQuery,
    currentPage,
    totalPages,
    setCurrentPage,
    toast,
    hideToast,
    exportStudents,
    editGroupModalOpen,
    openEditGroupModal,
    closeEditGroupModal,
    addStudentModalOpen,
    openAddStudentModal,
    closeAddStudentModal,
    viewStudent,
    openViewStudent,
    closeViewStudent,
    editStudent,
    openEditStudent,
    closeEditStudent,
    removeStudent,
    openRemoveStudentDialog,
    closeRemoveStudentDialog,
    saveGroupEdits,
    addStudent,
    saveStudentEdits,
    confirmRemoveStudent,
    sendParentMessage,
  } = useAdminGroupDetails();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-gray-100 dark:bg-slate-800" />
          <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="h-[220px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
        <div className="h-[420px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-[#191b23] dark:text-white">Guruh topilmadi</p>
        <p className="mt-2 text-sm text-[#737686] dark:text-slate-400">
          Siz qidirayotgan guruh mavjud emas yoki o'chirilgan.
        </p>
        <Link to="/admin/groups" className="mt-4 inline-block text-sm font-semibold text-[#2563eb] hover:underline dark:text-blue-400">
          Guruhlarga qaytish
        </Link>
      </div>
    );
  }

  const tabs = [
    { label: 'Umumiy', content: <GroupOverviewTab group={group} /> },
    {
      label: "O'quvchilar",
      content: (
        <GroupStudentsTable
          students={currentStudents}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={exportStudents}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onView={openViewStudent}
          onEdit={openEditStudent}
          onAssignments={() => goToTab('assignments')}
          onMessageParent={sendParentMessage}
          onRemove={openRemoveStudentDialog}
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
        />
      ),
    },
    { label: 'Vazifalar', content: <GroupAssignmentsTab group={group} /> },
    { label: 'Davomat', content: <GroupAttendanceTab group={group} /> },
    { label: 'Reyting', content: <GroupRankingTab students={rankedStudents} /> },
    { label: 'Dars jadvali', content: <GroupScheduleTab group={group} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <GroupHeader group={group} onEdit={openEditGroupModal} onAddStudent={openAddStudentModal} />

      <GroupSummaryCard group={group} />

      <Tabs tabs={tabs} activeTab={activeTabIndex} onTabChange={setActiveTabIndex} />

      <GroupModal mode="edit" isOpen={editGroupModalOpen} onClose={closeEditGroupModal} onSubmit={saveGroupEdits} group={group} />

      <AddStudentModal
        isOpen={addStudentModalOpen}
        onClose={closeAddStudentModal}
        onSubmit={addStudent}
        group={group}
        existingNames={group.students.map((s) => s.name)}
      />

      <StudentProfileModal isOpen={!!viewStudent} onClose={closeViewStudent} student={viewStudent} />

      <EditGroupStudentModal
        isOpen={!!editStudent}
        onClose={closeEditStudent}
        onSubmit={saveStudentEdits}
        student={editStudent}
      />

      <ConfirmDialog
        isOpen={!!removeStudent}
        onClose={closeRemoveStudentDialog}
        onConfirm={confirmRemoveStudent}
        tone="danger"
        title="Guruhdan chiqarish"
        confirmLabel="Chiqarish"
        message={`${removeStudent?.name} ni "${group.name}" guruhidan chiqarmoqchimisiz?`}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
