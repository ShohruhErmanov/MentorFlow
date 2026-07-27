import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  ClipboardList,
  Clock,
  Eye,
  FileBarChart,
  Plus,
  TriangleAlert,
  Upload,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import AdminStatCard from '../../components/admin/AdminStatCard';
import FilterBar from '../../components/admin/assignments/FilterBar';
import AssignmentsGrid from '../../components/admin/assignments/AssignmentsGrid';
import AssignmentModal from '../../components/admin/assignments/AssignmentModal';
import ExtendDeadlineModal from '../../components/admin/assignments/ExtendDeadlineModal';
import { useAdminAssignments } from '../../hooks/admin/useAdminAssignments';

export default function AssignmentsPage() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const {
    isLoading,
    currentAssignments,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    groupFilter,
    setGroupFilter,
    mentorFilter,
    setMentorFilter,
    statusFilter,
    setStatusFilter,
    deadlineFilter,
    setDeadlineFilter,
    hasFilters,
    clearFilters,
    stats,
    toast,
    showToast,
    hideToast,
    createModalOpen,
    openCreateModal,
    closeCreateModal,
    editAssignment,
    openEditModal,
    closeEditModal,
    extendAssignment,
    openExtendModal,
    closeExtendModal,
    archiveAssignment,
    openArchiveDialog,
    closeArchiveDialog,
    deleteAssignment,
    openDeleteDialog,
    closeDeleteDialog,
    addAssignment,
    saveEditedAssignment,
    saveExtendedDeadline,
    confirmArchive,
    confirmDelete,
  } = useAdminAssignments();

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileSelected = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    showToast(`"${file.name}" fayli import uchun qabul qilindi`);
  };

  const handleReport = () => showToast('Hisobot tayyorlanmoqda va yuklab olindi');

  const goToAssignment = (assignment) => navigate(`/admin/assignments/${assignment.id}`);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-96 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-[152px] rounded-xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
          ))}
        </div>
        <div className="h-32 rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[340px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">Vazifalar</h1>
          <p className="mt-2 max-w-xl text-sm text-[#737686] dark:text-slate-400">
            Barcha vazifalarni boshqaring va ularning bajarilish jarayonini kuzating.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Button
            variant="ghost"
            className="border border-[#e1e2ed] bg-white text-sm dark:border-slate-700 dark:bg-slate-800"
            onClick={handleImportClick}
          >
            <Upload size={16} />
            Import
          </Button>
          <Button
            variant="ghost"
            className="border border-[#e1e2ed] bg-white text-sm dark:border-slate-700 dark:bg-slate-800"
            onClick={handleReport}
          >
            <FileBarChart size={16} />
            Hisobot
          </Button>
          <Button variant="primary" className="text-sm" onClick={openCreateModal}>
            <Plus size={16} />
            Yangi vazifa
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={handleFileSelected}
          />
        </div>
      </div>

      <section aria-label="Vazifalar statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          label="Jami vazifalar"
          value={String(stats.total)}
          trend="+12%"
          trendTone="positive"
          icon={ClipboardList}
          tone="blue"
        />
        <AdminStatCard label="Faol vazifalar" value={String(stats.active)} icon={Clock} tone="orange" />
        <AdminStatCard label="Topshirilgan" value={String(stats.submitted)} icon={ClipboardCheck} tone="green" />
        <AdminStatCard label="Kechikkan" value={String(stats.overdue)} trend="Xavfli" trendTone="danger" icon={TriangleAlert} tone="red" highlight />
        <AdminStatCard label="Tekshirilmoqda" value={String(stats.reviewing)} icon={Eye} tone="rose" />
      </section>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        courseFilter={courseFilter}
        onCourseFilterChange={setCourseFilter}
        groupFilter={groupFilter}
        onGroupFilterChange={setGroupFilter}
        mentorFilter={mentorFilter}
        onMentorFilterChange={setMentorFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        deadlineFilter={deadlineFilter}
        onDeadlineFilterChange={setDeadlineFilter}
        onReset={clearFilters}
      />

      <AssignmentsGrid
        assignments={currentAssignments}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={goToAssignment}
        onEdit={openEditModal}
        onSubmissions={goToAssignment}
        onResults={goToAssignment}
        onExtendDeadline={openExtendModal}
        onArchive={openArchiveDialog}
        onDelete={openDeleteDialog}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
        onCreateAssignment={openCreateModal}
      />

      <AssignmentModal mode="create" isOpen={createModalOpen} onClose={closeCreateModal} onSubmit={addAssignment} />

      <AssignmentModal
        mode="edit"
        isOpen={!!editAssignment}
        onClose={closeEditModal}
        onSubmit={saveEditedAssignment}
        assignment={editAssignment}
      />

      <ExtendDeadlineModal
        isOpen={!!extendAssignment}
        onClose={closeExtendModal}
        onSubmit={saveExtendedDeadline}
        assignment={extendAssignment}
      />

      <ConfirmDialog
        isOpen={!!archiveAssignment}
        onClose={closeArchiveDialog}
        onConfirm={confirmArchive}
        tone="danger"
        title="Vazifani arxivlash"
        confirmLabel="Arxivlash"
        message={`"${archiveAssignment?.title}" vazifasini arxivlamoqchimisiz? Arxivlangan vazifalar faol ro'yxatdan chiqariladi.`}
      />

      <ConfirmDialog
        isOpen={!!deleteAssignment}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        tone="danger"
        title="Vazifani o'chirish"
        confirmLabel="O'chirish"
        message={`Siz rostda ham "${deleteAssignment?.title}" vazifasini o'chirib tashlamoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
