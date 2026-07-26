import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, UserCheck, UserPlus, Users, UserX, Upload } from 'lucide-react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import AdminStatCard from '../../components/admin/AdminStatCard';
import FilterBar from '../../components/admin/users/FilterBar';
import UsersTable from '../../components/admin/users/UsersTable';
import UserModal from '../../components/admin/users/UserModal';
import FloatingCreateButton from '../../components/assignments/FloatingCreateButton';
import { useAdminUsers } from '../../hooks/admin/useAdminUsers';

export default function UsersPage() {
  const fileInputRef = useRef(null);

  const {
    isLoading,
    currentUsers,
    filteredCount,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
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
    viewUser,
    openViewModal,
    closeViewModal,
    editUser,
    openEditModal,
    closeEditModal,
    blockUser,
    openBlockDialog,
    closeBlockDialog,
    deleteUser,
    openDeleteDialog,
    closeDeleteDialog,
    existingUsernamesExcluding,
    addUser,
    saveEditedUser,
    confirmToggleBlock,
    confirmDelete,
  } = useAdminUsers();

  const handleExport = () => {
    // Simulated export — there's no backend to generate a real file against.
    showToast("Foydalanuvchilar ro'yxati yuklab olindi");
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileSelected = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    showToast(`"${file.name}" fayli import uchun qabul qilindi`);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-8 w-56 rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-80 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[152px] rounded-xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
          ))}
        </div>
        <div className="h-[420px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
      </div>
    );
  }

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, filteredCount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">
            Foydalanuvchilar
          </h1>
          <p className="mt-2 text-sm text-[#737686] dark:text-slate-400">
            Platformaning barcha a'zolarini boshqarish va nazorat qilish markazi.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="border border-[#e1e2ed] bg-white text-sm dark:border-slate-700 dark:bg-slate-800"
            onClick={handleExport}
          >
            <Download size={16} />
            Export
          </Button>
          <Button
            variant="ghost"
            className="border border-[#e1e2ed] bg-white text-sm dark:border-slate-700 dark:bg-slate-800"
            onClick={handleImportClick}
          >
            <Upload size={16} />
            Import
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

      <section aria-label="Foydalanuvchilar statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Jami foydalanuvchilar"
          value={stats.total.toLocaleString('en-US')}
          trend="+12%"
          trendTone="positive"
          icon={Users}
          tone="blue"
        />
        <AdminStatCard
          label="Faol foydalanuvchilar"
          value={stats.active.toLocaleString('en-US')}
          trend="Faol"
          trendTone="success"
          icon={UserCheck}
          tone="green"
        />
        <AdminStatCard
          label="Yangi (shu oy)"
          value={String(stats.newThisMonth)}
          trend="Yangi"
          trendTone="info"
          icon={UserPlus}
          tone="blue"
        />
        <AdminStatCard
          label="Bloklanganlar"
          value={String(stats.blocked)}
          trend="Blokda"
          trendTone="danger"
          icon={UserX}
          tone="rose"
        />
      </section>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        totalCount={filteredCount}
      />

      <UsersTable
        users={currentUsers}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={openViewModal}
        onEdit={openEditModal}
        onToggleBlock={openBlockDialog}
        onDelete={openDeleteDialog}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      <FloatingCreateButton onClick={openCreateModal} label="Yangi foydalanuvchi" />

      <UserModal
        mode="create"
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onSubmit={addUser}
        existingUsernames={existingUsernamesExcluding(null)}
      />

      <UserModal mode="view" isOpen={!!viewUser} onClose={closeViewModal} user={viewUser} />

      <UserModal
        mode="edit"
        isOpen={!!editUser}
        onClose={closeEditModal}
        onSubmit={saveEditedUser}
        user={editUser}
        existingUsernames={editUser ? existingUsernamesExcluding(editUser.id) : []}
      />

      <ConfirmDialog
        isOpen={!!blockUser}
        onClose={closeBlockDialog}
        onConfirm={confirmToggleBlock}
        tone={blockUser?.status === 'blocked' ? 'success' : 'danger'}
        title={blockUser?.status === 'blocked' ? 'Foydalanuvchini faollashtirish' : 'Foydalanuvchini bloklash'}
        confirmLabel={blockUser?.status === 'blocked' ? 'Faollashtirish' : 'Bloklash'}
        message={
          blockUser?.status === 'blocked'
            ? `${blockUser?.firstName} ${blockUser?.lastName} tizimga qayta kira oladigan bo'ladi. Davom etasizmi?`
            : `${blockUser?.firstName} ${blockUser?.lastName} tizimga kira olmaydigan bo'ladi. Davom etasizmi?`
        }
      />

      <ConfirmDialog
        isOpen={!!deleteUser}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        tone="danger"
        title="Foydalanuvchini o'chirish"
        confirmLabel="O'chirish"
        message={`Siz rostda ham ${deleteUser?.firstName} ${deleteUser?.lastName} ni ro'yxatdan o'chirib tashlamoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
