import { useRef } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, CheckCircle2, Clock3, FileBarChart, FileSpreadsheet, Percent, UserX, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import AdminStatCard from '../../components/admin/AdminStatCard';
import FilterBar from '../../components/admin/attendance/FilterBar';
import AttendanceTable from '../../components/admin/attendance/AttendanceTable';
import AttendanceModal from '../../components/admin/attendance/AttendanceModal';
import ProfileModal from '../../components/admin/attendance/ProfileModal';
import HistoryModal from '../../components/admin/attendance/HistoryModal';
import { useAdminAttendance } from '../../hooks/admin/useAdminAttendance';

export default function AttendancePage() {
  const fileInputRef = useRef(null);

  const {
    isLoading,
    currentStudents,
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
    dateFilter,
    setDateFilter,
    hasFilters,
    clearFilters,
    stats,
    allStudents,
    toast,
    showToast,
    hideToast,
    markModalOpen,
    markPresetStudent,
    openMarkModal,
    closeMarkModal,
    profileStudent,
    openProfileModal,
    closeProfileModal,
    editStudent,
    openEditModal,
    closeEditModal,
    historyStudent,
    openHistoryModal,
    closeHistoryModal,
    markAttendance,
    editAttendance,
    notifyParent,
  } = useAdminAttendance();

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
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">Davomat</h1>
          <p className="mt-2 max-w-xl text-sm text-[#737686] dark:text-slate-400">
            Barcha guruhlar va o'quvchilarning davomat holatini kuzating.
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
          <Button variant="primary" className="text-sm" onClick={() => openMarkModal(null)}>
            <CalendarCheck size={16} />
            Davomat belgilash
          </Button>
          <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFileSelected} />
        </div>
      </div>

      <section aria-label="Davomat statistikasi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard label="Jami o'quvchilar" value={stats.total.toLocaleString('en-US')} icon={Users} tone="blue" />
        <AdminStatCard
          label="Bugun qatnashganlar"
          value={stats.presentToday.toLocaleString('en-US')}
          trend="+4%"
          trendTone="positive"
          icon={CheckCircle2}
          tone="green"
        />
        <AdminStatCard
          label="Kelmaganlar"
          value={stats.absentToday.toLocaleString('en-US')}
          trend="-2%"
          trendTone="negative"
          icon={UserX}
          tone="red"
          highlight
        />
        <AdminStatCard label="Kechikkanlar" value={stats.lateToday.toLocaleString('en-US')} icon={Clock3} tone="orange" />
        <AdminStatCard
          label="O'rtacha davomat"
          value={`${stats.avgAttendance}%`}
          icon={Percent}
          tone="blue"
          highlight
        />
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
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        onReset={clearFilters}
      />

      <AttendanceTable
        students={currentStudents}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={openProfileModal}
        onEdit={openEditModal}
        onMark={openMarkModal}
        onHistory={openHistoryModal}
        onComment={openEditModal}
        onParent={notifyParent}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      <AttendanceModal
        mode="mark"
        isOpen={markModalOpen}
        onClose={closeMarkModal}
        onSubmit={markAttendance}
        presetStudent={markPresetStudent}
        allStudents={allStudents}
      />

      <AttendanceModal
        mode="edit"
        isOpen={!!editStudent}
        onClose={closeEditModal}
        onSubmit={editAttendance}
        student={editStudent}
      />

      <ProfileModal isOpen={!!profileStudent} onClose={closeProfileModal} student={profileStudent} />

      <HistoryModal isOpen={!!historyStudent} onClose={closeHistoryModal} student={historyStudent} />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
