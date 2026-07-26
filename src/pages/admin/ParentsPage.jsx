import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Baby, FileBarChart, FileSpreadsheet, LogIn, TriangleAlert, UserCheck, UserPlus, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import AdminStatCard from '../../components/admin/AdminStatCard';
import FilterBar from '../../components/admin/parents/FilterBar';
import ParentTable from '../../components/admin/parents/ParentTable';
import ParentModal from '../../components/admin/parents/ParentModal';
import ProfileModal from '../../components/admin/parents/ProfileModal';
import MessageModal from '../../components/admin/parents/MessageModal';
import { useAdminParents } from '../../hooks/admin/useAdminParents';

export default function ParentsPage() {
  const fileInputRef = useRef(null);

  const {
    isLoading,
    currentParents,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    groupFilter,
    setGroupFilter,
    mentorFilter,
    setMentorFilter,
    paymentFilter,
    setPaymentFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    hasFilters,
    clearFilters,
    stats,
    toast,
    showToast,
    hideToast,
    createModalOpen,
    openCreateModal,
    closeCreateModal,
    viewParent,
    openViewModal,
    closeViewModal,
    editParent,
    openEditModal,
    closeEditModal,
    messageParent,
    openMessageModal,
    closeMessageModal,
    blockParent,
    openBlockDialog,
    closeBlockDialog,
    deleteParent,
    openDeleteDialog,
    closeDeleteDialog,
    existingUsernamesExcluding,
    addParent,
    saveEditedParent,
    sendMessage,
    confirmToggleBlock,
    confirmDelete,
  } = useAdminParents();

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
        <div className="h-[420px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
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
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">Ota-onalar</h1>
          <p className="mt-2 max-w-xl text-sm text-[#737686] dark:text-slate-400">
            Barcha ota-onalarni boshqaring va ularning farzandlari faoliyatini kuzating.
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
            <UserPlus size={16} />
            Yangi ota-ona
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

      <section aria-label="Ota-onalar statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          label="Jami ota-onalar"
          value={stats.total.toLocaleString('en-US')}
          trend="+12%"
          trendTone="positive"
          icon={Users}
          tone="blue"
        />
        <AdminStatCard
          label="Faol ota-onalar"
          value={stats.active.toLocaleString('en-US')}
          trend="+12%"
          trendTone="positive"
          icon={UserCheck}
          tone="green"
        />
        <AdminStatCard
          label="Farzandlar soni"
          value={stats.childrenCount.toLocaleString('en-US')}
          trend="Jami"
          trendTone="neutral"
          icon={Baby}
          tone="orange"
        />
        <AdminStatCard
          label="To'lovi kechikkanlar"
          value={String(stats.overdueCount)}
          trend="Diqqat"
          trendTone="negative"
          icon={TriangleAlert}
          tone="red"
          highlight
        />
        <AdminStatCard
          label="Bugun tizimga kirganlar"
          value={String(stats.todayLogins)}
          trend="Onlayn"
          trendTone="info"
          icon={LogIn}
          tone="rose"
        />
      </section>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        groupFilter={groupFilter}
        onGroupFilterChange={setGroupFilter}
        mentorFilter={mentorFilter}
        onMentorFilterChange={setMentorFilter}
        paymentFilter={paymentFilter}
        onPaymentFilterChange={setPaymentFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <ParentTable
        parents={currentParents}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={openViewModal}
        onEdit={openEditModal}
        onMessage={openMessageModal}
        onToggleBlock={openBlockDialog}
        onDelete={openDeleteDialog}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      <ParentModal
        mode="create"
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onSubmit={addParent}
        existingUsernames={existingUsernamesExcluding(null)}
      />

      <ParentModal
        mode="edit"
        isOpen={!!editParent}
        onClose={closeEditModal}
        onSubmit={saveEditedParent}
        parent={editParent}
        existingUsernames={editParent ? existingUsernamesExcluding(editParent.id) : []}
      />

      <ProfileModal isOpen={!!viewParent} onClose={closeViewModal} parent={viewParent} />

      <MessageModal
        isOpen={!!messageParent}
        onClose={closeMessageModal}
        parent={messageParent}
        onSend={sendMessage}
      />

      <ConfirmDialog
        isOpen={!!blockParent}
        onClose={closeBlockDialog}
        onConfirm={confirmToggleBlock}
        tone={blockParent?.status === 'inactive' ? 'success' : 'danger'}
        title={blockParent?.status === 'inactive' ? 'Ota-onani faollashtirish' : 'Ota-onani bloklash'}
        confirmLabel={blockParent?.status === 'inactive' ? 'Faollashtirish' : 'Bloklash'}
        message={
          blockParent?.status === 'inactive'
            ? `${blockParent?.firstName} ${blockParent?.lastName} tizimga qayta kira oladigan bo'ladi. Davom etasizmi?`
            : `${blockParent?.firstName} ${blockParent?.lastName} tizimga kira olmaydigan bo'ladi. Davom etasizmi?`
        }
      />

      <ConfirmDialog
        isOpen={!!deleteParent}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        tone="danger"
        title="Ota-onani o'chirish"
        confirmLabel="O'chirish"
        message={`Siz rostda ham ${deleteParent?.firstName} ${deleteParent?.lastName} ni ro'yxatdan o'chirib tashlamoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
