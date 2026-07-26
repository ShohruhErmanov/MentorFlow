import { motion } from 'framer-motion';
import { CalendarCheck, CreditCard, Star, UserPlus, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import AdminStatCard from '../../components/admin/AdminStatCard';
import FilterBar from '../../components/admin/students/FilterBar';
import StudentTable from '../../components/admin/students/StudentTable';
import StudentModal from '../../components/admin/students/StudentModal';
import ProfileModal from '../../components/admin/students/ProfileModal';
import AttendanceModal from '../../components/admin/students/AttendanceModal';
import PaymentModal from '../../components/admin/students/PaymentModal';
import { useAdminStudents } from '../../hooks/admin/useAdminStudents';

export default function StudentsPage() {
  const {
    isLoading,
    currentStudents,
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
    hasFilters,
    clearFilters,
    stats,
    toast,
    hideToast,
    createModalOpen,
    openCreateModal,
    closeCreateModal,
    viewStudent,
    openViewModal,
    closeViewModal,
    editStudent,
    openEditModal,
    closeEditModal,
    attendanceStudent,
    openAttendanceModal,
    closeAttendanceModal,
    paymentStudent,
    openPaymentModal,
    closePaymentModal,
    blockStudent,
    openBlockDialog,
    closeBlockDialog,
    deleteStudent,
    openDeleteDialog,
    closeDeleteDialog,
    existingUsernamesExcluding,
    addStudent,
    saveEditedStudent,
    updateAttendance,
    addPayment,
    confirmToggleBlock,
    confirmDelete,
  } = useAdminStudents();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-80 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
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
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">
            O'quvchilar ro'yxati
          </h1>
          <p className="mt-2 text-sm text-[#737686] dark:text-slate-400">
            Tizimda jami {stats.total.toLocaleString('en-US')} ta faol o'quvchi mavjud.
          </p>
        </div>

        <Button variant="primary" className="shrink-0 text-sm" onClick={openCreateModal}>
          <UserPlus size={16} />
          Yangi o'quvchi qo'shish
        </Button>
      </div>

      <section aria-label="O'quvchilar statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Jami o'quvchilar"
          value={stats.total.toLocaleString('en-US')}
          trend="+12%"
          trendTone="positive"
          icon={Users}
          tone="blue"
        />
        <AdminStatCard
          label="O'rtacha reyting"
          value={`Avg. ${stats.avgRating.toFixed(1)}`}
          trend="A'lo"
          trendTone="success"
          icon={Star}
          tone="orange"
        />
        <AdminStatCard
          label="Davomat"
          value={`${stats.attendanceRate}%`}
          trend="-2%"
          trendTone="negative"
          icon={CalendarCheck}
          tone="red"
        />
        <AdminStatCard
          label="Tushum (oy)"
          value={`${stats.monthlyRevenue.toFixed(1)}M`}
          trend="92% to'langan"
          trendTone="success"
          icon={CreditCard}
          tone="green"
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
        onReset={clearFilters}
      />

      <StudentTable
        students={currentStudents}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={openViewModal}
        onEdit={openEditModal}
        onAttendance={openAttendanceModal}
        onPayment={openPaymentModal}
        onToggleBlock={openBlockDialog}
        onDelete={openDeleteDialog}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      <StudentModal
        mode="create"
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onSubmit={addStudent}
        existingUsernames={existingUsernamesExcluding(null)}
      />

      <StudentModal
        mode="edit"
        isOpen={!!editStudent}
        onClose={closeEditModal}
        onSubmit={saveEditedStudent}
        student={editStudent}
        existingUsernames={editStudent ? existingUsernamesExcluding(editStudent.id) : []}
      />

      <ProfileModal isOpen={!!viewStudent} onClose={closeViewModal} student={viewStudent} />

      <AttendanceModal
        isOpen={!!attendanceStudent}
        onClose={closeAttendanceModal}
        student={attendanceStudent}
        onUpdate={updateAttendance}
      />

      <PaymentModal
        isOpen={!!paymentStudent}
        onClose={closePaymentModal}
        student={paymentStudent}
        onAddPayment={addPayment}
      />

      <ConfirmDialog
        isOpen={!!blockStudent}
        onClose={closeBlockDialog}
        onConfirm={confirmToggleBlock}
        tone={blockStudent?.status === 'blocked' ? 'success' : 'danger'}
        title={blockStudent?.status === 'blocked' ? "O'quvchini faollashtirish" : "O'quvchini bloklash"}
        confirmLabel={blockStudent?.status === 'blocked' ? 'Faollashtirish' : 'Bloklash'}
        message={
          blockStudent?.status === 'blocked'
            ? `${blockStudent?.firstName} ${blockStudent?.lastName} tizimga qayta kira oladigan bo'ladi. Davom etasizmi?`
            : `${blockStudent?.firstName} ${blockStudent?.lastName} tizimga kira olmaydigan bo'ladi. Davom etasizmi?`
        }
      />

      <ConfirmDialog
        isOpen={!!deleteStudent}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        tone="danger"
        title="O'quvchini o'chirish"
        confirmLabel="O'chirish"
        message={`Siz rostda ham ${deleteStudent?.firstName} ${deleteStudent?.lastName} ni ro'yxatdan o'chirib tashlamoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
