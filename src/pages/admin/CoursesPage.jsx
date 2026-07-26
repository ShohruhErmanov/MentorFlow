import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CircleCheck, FileBarChart, GraduationCap, Plus, TriangleAlert, Upload, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import AdminStatCard from '../../components/admin/AdminStatCard';
import FilterBar from '../../components/admin/courses/FilterBar';
import AdvancedFilterModal from '../../components/admin/courses/AdvancedFilterModal';
import CoursesGrid from '../../components/admin/courses/CoursesGrid';
import CourseModal from '../../components/admin/courses/CourseModal';
import { useAdminCourses } from '../../hooks/admin/useAdminCourses';

export default function CoursesPage() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const goToCourse = (course, initialTab) => {
    navigate(`/admin/courses/${course.id}`, { state: initialTab ? { initialTab } : undefined });
  };

  const {
    isLoading,
    currentCourses,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    mentorFilter,
    setMentorFilter,
    durationFilter,
    setDurationFilter,
    statusFilter,
    setStatusFilter,
    hasFilters,
    clearFilters,
    isAdvancedFilterOpen,
    openAdvancedFilter,
    closeAdvancedFilter,
    tempFilters,
    setTempFilters,
    applyAdvancedFilter,
    resetAdvancedFilter,
    stats,
    toast,
    showToast,
    hideToast,
    createModalOpen,
    openCreateModal,
    closeCreateModal,
    editCourse,
    openEditModal,
    closeEditModal,
    archiveCourse,
    openArchiveDialog,
    closeArchiveDialog,
    deleteCourse,
    openDeleteDialog,
    closeDeleteDialog,
    addCourse,
    saveEditedCourse,
    confirmArchive,
    confirmDelete,
  } = useAdminCourses();

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
          <div className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-slate-700" />
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
            <div key={i} className="h-[420px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
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
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">Kurslar</h1>
          <p className="mt-2 max-w-xl text-sm text-[#737686] dark:text-slate-400">
            Barcha kurslarni boshqaring va ularning rivojlanishini kuzating.
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
            Yangi kurs
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

      <section aria-label="Kurslar statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard label="Jami kurslar" value={String(stats.total)} icon={BookOpen} tone="blue" />
        <AdminStatCard
          label="Faol kurslar"
          value={String(stats.active)}
          trend="+12%"
          trendTone="positive"
          icon={CircleCheck}
          tone="green"
        />
        <AdminStatCard label="Jami o'quvchilar" value={stats.totalStudents.toLocaleString('en-US')} icon={GraduationCap} tone="blue" />
        <AdminStatCard label="Mentorlar" value={String(stats.totalMentors)} icon={Users} tone="orange" />
        <AdminStatCard
          label="Tugayotgan kurslar"
          value={String(stats.endingSoon)}
          icon={TriangleAlert}
          tone="red"
          highlight
        />
      </section>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        mentorFilter={mentorFilter}
        onMentorFilterChange={setMentorFilter}
        durationFilter={durationFilter}
        onDurationFilterChange={setDurationFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onOpenAdvancedFilter={openAdvancedFilter}
      />

      <CoursesGrid
        courses={currentCourses}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={(course) => goToCourse(course)}
        onEdit={openEditModal}
        onStudents={(course) => goToCourse(course, 'students')}
        onMentor={(course) => goToCourse(course, 'mentor')}
        onGroups={(course) => goToCourse(course, 'groups')}
        onStatistics={(course) => goToCourse(course, 'overview')}
        onArchive={openArchiveDialog}
        onDelete={openDeleteDialog}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
        onCreateCourse={openCreateModal}
      />

      <AdvancedFilterModal
        isOpen={isAdvancedFilterOpen}
        onClose={closeAdvancedFilter}
        filters={tempFilters}
        setFilters={setTempFilters}
        onApply={applyAdvancedFilter}
        onReset={resetAdvancedFilter}
      />

      <CourseModal mode="create" isOpen={createModalOpen} onClose={closeCreateModal} onSubmit={addCourse} />

      <CourseModal mode="edit" isOpen={!!editCourse} onClose={closeEditModal} onSubmit={saveEditedCourse} course={editCourse} />

      <ConfirmDialog
        isOpen={!!archiveCourse}
        onClose={closeArchiveDialog}
        onConfirm={confirmArchive}
        tone="danger"
        title="Kursni arxivlash"
        confirmLabel="Arxivlash"
        message={`"${archiveCourse?.name}" kursini arxivlamoqchimisiz? Arxivlangan kurslar faol ro'yxatdan chiqariladi.`}
      />

      <ConfirmDialog
        isOpen={!!deleteCourse}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        tone="danger"
        title="Kursni o'chirish"
        confirmLabel="O'chirish"
        message={`Siz rostda ham "${deleteCourse?.name}" kursini o'chirib tashlamoqchimisiz? Bu amalni bekor qilib bo'lmaydi.`}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
