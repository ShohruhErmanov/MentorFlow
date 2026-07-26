import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, CircleCheck, FileBarChart, FileSpreadsheet, GraduationCap, Layers, Plus, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import AdminStatCard from '../../components/admin/AdminStatCard';
import FilterBar from '../../components/admin/groups/FilterBar';
import GroupsGrid from '../../components/admin/groups/GroupsGrid';
import GroupModal from '../../components/admin/groups/GroupModal';
import { useAdminGroups } from '../../hooks/admin/useAdminGroups';

export default function GroupsPage() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const goToGroup = (group, initialTab) => {
    navigate(`/admin/groups/${group.id}`, { state: initialTab ? { initialTab } : undefined });
  };

  const {
    isLoading,
    currentGroups,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    mentorFilter,
    setMentorFilter,
    statusFilter,
    setStatusFilter,
    startDateFilter,
    setStartDateFilter,
    hasFilters,
    clearFilters,
    stats,
    toast,
    showToast,
    hideToast,
    createModalOpen,
    openCreateModal,
    closeCreateModal,
    editGroup,
    openEditModal,
    closeEditModal,
    archiveGroup,
    openArchiveDialog,
    closeArchiveDialog,
    deleteGroup,
    openDeleteDialog,
    closeDeleteDialog,
    addGroup,
    saveEditedGroup,
    confirmArchive,
    confirmDelete,
  } = useAdminGroups();

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileSelected = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    showToast(`"${file.name}" fayli import uchun qabul qilindi`);
  };

  const handleReport = () => showToast('Hisobot tayyorlanmoqda va yuklab olindi');

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-96 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-[152px] rounded-xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
          ))}
        </div>
        <div className="h-16 rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[380px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
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
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">Guruhlar</h1>
          <p className="mt-2 max-w-xl text-sm text-[#737686] dark:text-slate-400">
            Barcha guruhlarni boshqaring, o'quvchilarni kuzating va dars jarayonini nazorat qiling.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Button
            variant="ghost"
            className="border border-[#e1e2ed] bg-white text-sm dark:border-slate-700 dark:bg-slate-800"
            onClick={handleImportClick}
          >
            <FileSpreadsheet size={16} />
            Excel import
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
            Yangi guruh
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

      <section aria-label="Guruhlar statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard label="Jami guruhlar" value={String(stats.total)} icon={Layers} tone="blue" />
        <AdminStatCard label="Faol guruhlar" value={String(stats.active)} icon={CircleCheck} tone="green" />
        <AdminStatCard label="Jami o'quvchilar" value={stats.totalStudents.toLocaleString('en-US')} icon={GraduationCap} tone="blue" />
        <AdminStatCard label="Jami mentorlar" value={String(stats.totalMentors)} icon={Users} tone="orange" />
        <AdminStatCard label="Bugungi darslar" value={String(stats.todayLessons)} icon={CalendarCheck} tone="orange" />
      </section>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        courseFilter={courseFilter}
        onCourseFilterChange={setCourseFilter}
        mentorFilter={mentorFilter}
        onMentorFilterChange={setMentorFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        startDateFilter={startDateFilter}
        onStartDateFilterChange={setStartDateFilter}
      />

      <GroupsGrid
        groups={currentGroups}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={(group) => goToGroup(group)}
        onEdit={openEditModal}
        onSchedule={(group) => goToGroup(group, 'schedule')}
        onStudents={(group) => goToGroup(group, 'students')}
        onAttendance={(group) => goToGroup(group, 'attendance')}
        onAssignments={(group) => goToGroup(group, 'assignments')}
        onArchive={openArchiveDialog}
        onDelete={openDeleteDialog}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
        onCreateGroup={openCreateModal}
      />

      <GroupModal mode="create" isOpen={createModalOpen} onClose={closeCreateModal} onSubmit={addGroup} />

      <GroupModal mode="edit" isOpen={!!editGroup} onClose={closeEditModal} onSubmit={saveEditedGroup} group={editGroup} />

      <ConfirmDialog
        isOpen={!!archiveGroup}
        onClose={closeArchiveDialog}
        onConfirm={confirmArchive}
        tone="danger"
        title="Guruhni arxivlash"
        confirmLabel="Arxivlash"
        message={`"${archiveGroup?.name}" guruhini arxivlamoqchimisiz? Arxivlangan guruhlar faol ro'yxatdan chiqariladi.`}
      />

      <ConfirmDialog
        isOpen={!!deleteGroup}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        tone="danger"
        title="Guruhni o'chirish"
        confirmLabel="O'chirish"
        message={`Siz rostda ham "${deleteGroup?.name}" guruhini o'chirib tashlamoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
