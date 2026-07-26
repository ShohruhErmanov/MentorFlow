import { motion } from 'framer-motion';
import { CalendarCheck, Filter, Layers, Star, UserPlus, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import AdminStatCard from '../../components/admin/AdminStatCard';
import MentorsGrid from '../../components/admin/mentors/MentorsGrid';
import MentorFilterModal from '../../components/admin/mentors/MentorFilterModal';
import MentorModal from '../../components/admin/mentors/MentorModal';
import ProfileModal from '../../components/admin/mentors/ProfileModal';
import { useAdminMentors } from '../../hooks/admin/useAdminMentors';

export default function MentorsPage() {
  const {
    isLoading,
    currentMentors,
    totalPages,
    currentPage,
    setCurrentPage,
    hasFilters,
    clearFilters,
    stats,
    toast,
    hideToast,
    isFilterModalOpen,
    openFilterModal,
    closeFilterModal,
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    createModalOpen,
    openCreateModal,
    closeCreateModal,
    viewMentor,
    openViewModal,
    closeViewModal,
    editMentor,
    openEditModal,
    closeEditModal,
    deleteMentor,
    openDeleteDialog,
    closeDeleteDialog,
    existingUsernamesExcluding,
    addMentor,
    saveEditedMentor,
    confirmDelete,
  } = useAdminMentors();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-96 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[152px] rounded-xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[320px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
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
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">Mentorlar</h1>
          <p className="mt-2 max-w-xl text-sm text-[#737686] dark:text-slate-400">
            O'quv markazidagi barcha mentorlar va ularning ko'rsatkichlarini boshqaruvi.
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <Button
            variant="ghost"
            className="border border-[#e1e2ed] bg-white text-sm dark:border-slate-700 dark:bg-slate-800"
            onClick={openFilterModal}
          >
            <Filter size={16} />
            Filtrlar
          </Button>
          <Button variant="primary" className="text-sm" onClick={openCreateModal}>
            <UserPlus size={16} />
            Yangi mentor qo'shish
          </Button>
        </div>
      </div>

      <section aria-label="Mentorlar statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Jami mentorlar"
          value={String(stats.total)}
          trend="+5"
          trendTone="positive"
          icon={Users}
          tone="blue"
        />
        <AdminStatCard
          label="O'rtacha reyting"
          value={stats.avgRating.toFixed(1)}
          trend="A'lo"
          trendTone="success"
          icon={Star}
          tone="orange"
        />
        <AdminStatCard
          label="Davomat ko'rsatkichi"
          value={`${stats.attendanceRate}%`}
          trend="Barqaror"
          trendTone="neutral"
          icon={CalendarCheck}
          tone="green"
        />
        <AdminStatCard
          label="Guruhlar soni"
          value={String(stats.groupsCount)}
          trend="+8"
          trendTone="info"
          icon={Layers}
          tone="rose"
        />
      </section>

      <MentorsGrid
        mentors={currentMentors}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={openViewModal}
        onEdit={openEditModal}
        onAddMentor={openCreateModal}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      <MentorFilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        filters={tempFilters}
        setFilters={setTempFilters}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      <MentorModal
        mode="create"
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onSubmit={addMentor}
        existingUsernames={existingUsernamesExcluding(null)}
      />

      <MentorModal
        mode="edit"
        isOpen={!!editMentor}
        onClose={closeEditModal}
        onSubmit={saveEditedMentor}
        mentor={editMentor}
        existingUsernames={editMentor ? existingUsernamesExcluding(editMentor.id) : []}
      />

      <ProfileModal isOpen={!!viewMentor} onClose={closeViewModal} mentor={viewMentor} />

      <ConfirmDialog
        isOpen={!!deleteMentor}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        tone="danger"
        title="Mentorni o'chirish"
        confirmLabel="O'chirish"
        message={`Siz rostda ham ${deleteMentor?.firstName} ${deleteMentor?.lastName} ni ro'yxatdan o'chirib tashlamoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
