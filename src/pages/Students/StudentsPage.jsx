import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStudents from '../../hooks/students/useStudents';
import StudentTable from '../../components/students/StudentTable';
import FilterModal from '../../components/students/FilterModal';
import ExportModal from '../../components/students/ExportModal';
import EditStudentModal from '../../components/students/EditStudentModal';
import DeleteStudentDialog from '../../components/students/DeleteStudentDialog';
import Toast from '../../components/ui/Toast';
import Button from '../../components/ui/Button';
import SearchInput from '../../components/ui/SearchInput';

export default function StudentsPage() {
  const navigate = useNavigate();
  const {
    students,
    searchQuery, setSearchQuery,
    groupFilter, setGroupFilter,
    statusFilter, setStatusFilter,
    attendanceFilter, setAttendanceFilter,
    sortBy, setSortBy,
    currentPage, setCurrentPage,
    totalPages,
    currentStudents,
    filteredCount,
    itemsPerPage,
    toast, hideToast, showToast,
    handleUpdateStudent,
    handleDeleteStudent
  } = useStudents();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);

  const [tempFilters, setTempFilters] = useState({ group: '', status: '', attendance: '' });

  const handleOpenFilter = () => {
    setTempFilters({ group: groupFilter, status: statusFilter, attendance: attendanceFilter });
    setIsFilterModalOpen(true);
  };

  const handleApplyFilters = () => {
    setGroupFilter(tempFilters.group);
    setStatusFilter(tempFilters.status);
    setAttendanceFilter(tempFilters.attendance);
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  const handleExport = (format) => {
    setIsExportModalOpen(false);
    showToast(`O'quvchilar ro'yxati ${format.toUpperCase()} formatida yuklab olindi!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[#191b23] dark:text-white sm:text-3xl">O'quvchilar</h1>
        <p className="mt-2 text-sm text-[#737686] dark:text-slate-400">Barcha o'quvchilar ro'yxati va ularning joriy holati.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-3 sm:max-w-md">
          <div className="flex-1">
            <SearchInput
              placeholder="O'quvchini qidirish..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Button variant="ghost" onClick={handleOpenFilter} className="border border-[#e1e2ed] bg-white text-sm shrink-0 dark:border-slate-700 dark:bg-slate-800">
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm font-medium text-[#434655] outline-none hover:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            <option value="newest">Eng yangi</option>
            <option value="oldest">Eng eski</option>
            <option value="highestScore">Eng yuqori ball</option>
            <option value="lowestScore">Eng past ball</option>
          </select>
          <Button variant="primary" onClick={() => setIsExportModalOpen(true)} className="text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <StudentTable
        students={currentStudents}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredCount}
        onView={(student) => navigate(`/mentor/students/${student.id}`)}
        onEdit={setEditStudent}
        onDelete={setDeleteStudent}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={tempFilters}
        setFilters={setTempFilters}
        onApply={handleApplyFilters}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      <EditStudentModal
        isOpen={!!editStudent}
        onClose={() => setEditStudent(null)}
        onSave={(id, data) => {
          handleUpdateStudent(id, data);
          setEditStudent(null);
        }}
        student={editStudent}
      />

      <DeleteStudentDialog
        isOpen={!!deleteStudent}
        onClose={() => setDeleteStudent(null)}
        onConfirm={() => {
          handleDeleteStudent(deleteStudent.id);
          setDeleteStudent(null);
        }}
        studentName={deleteStudent?.name}
      />

      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </motion.div>
  );
}
