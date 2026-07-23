import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { initialAssignments } from '../components/assignments/mockData';
import SearchBar from '../components/assignments/SearchBar';
import FilterModal from '../components/assignments/FilterModal';
import AssignmentTable from '../components/assignments/AssignmentTable';
import Pagination from '../components/assignments/Pagination';
import FloatingCreateButton from '../components/assignments/FloatingCreateButton';
import CreateAssignmentModal from '../components/assignments/CreateAssignmentModal';
import AssignmentDetailsModal from '../components/assignments/AssignmentDetailsModal';
import DeleteAssignmentDialog from '../components/assignments/DeleteAssignmentDialog';
import Toast from '../components/assignments/Toast';

const AssignmentsPage = () => {
  // ── Data ──────────────────────────────────────────────────────────────────
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading]     = useState(true);

  // ── Filtering / Search ────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters]         = useState({ status: '', group: '', difficulty: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ── Modal flags ───────────────────────────────────────────────────────────
  const [isFilterOpen,  setIsFilterOpen]  = useState(false);
  const [isCreateOpen,  setIsCreateOpen]  = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen,  setIsDeleteOpen]  = useState(false);

  // ── Selected assignment (for view / edit / delete) ────────────────────────
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') =>
    setToast({ show: true, message, type });

  // ── Simulate data fetch ───────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setAssignments(initialAssignments);
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  // ── Filtering + Search ────────────────────────────────────────────────────
  const filteredAssignments = useMemo(() => {
    let result = assignments;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q),
      );
    }
    if (filters.status)     result = result.filter((a) => a.status     === filters.status);
    if (filters.group)      result = result.filter((a) => a.group      === filters.group);
    if (filters.difficulty) result = result.filter((a) => a.difficulty === filters.difficulty);
    return result;
  }, [assignments, searchQuery, filters]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages          = Math.ceil(filteredAssignments.length / itemsPerPage);
  const paginatedAssignments = filteredAssignments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ── ACTION: View ──────────────────────────────────────────────────────────
  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailsOpen(true);
  };

  // ── ACTION: Edit (open pre-filled modal) ──────────────────────────────────
  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setIsCreateOpen(true);
  };

  // ── ACTION: Duplicate ─────────────────────────────────────────────────────
  const handleDuplicate = (assignment) => {
    const copy = {
      ...assignment,
      id:   Math.random().toString(36).substr(2, 9),
      name: `${assignment.name} (Nusxa)`,
    };

    // Insert the copy directly after the original in the full list
    setAssignments((prev) => {
      const idx = prev.findIndex((a) => a.id === assignment.id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });

    showToast('Vazifa muvaffaqiyatli nusxalandi', 'success');
  };

  // ── ACTION: Open delete dialog ────────────────────────────────────────────
  const handleDeletePrompt = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteOpen(true);
  };

  // ── ACTION: Confirm delete ────────────────────────────────────────────────
  const handleDeleteConfirm = () => {
    setAssignments((prev) => prev.filter((a) => a.id !== selectedAssignment.id));
    setIsDeleteOpen(false);
    setSelectedAssignment(null);
    showToast("Vazifa o'chirildi", 'success');
    if (paginatedAssignments.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ── ACTION: Save (create or update) ──────────────────────────────────────
  const handleSave = (formData) => {
    if (selectedAssignment) {
      setAssignments((prev) =>
        prev.map((a) => (a.id === selectedAssignment.id ? { ...formData, id: a.id } : a)),
      );
      showToast('Vazifa muvaffaqiyatli yangilandi', 'success');
    } else {
      const newAssignment = { ...formData, id: Math.random().toString(36).substr(2, 9) };
      setAssignments((prev) => [newAssignment, ...prev]);
      showToast('Yangi vazifa yaratildi', 'success');
    }
    setIsCreateOpen(false);
    setSelectedAssignment(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-[1600px] mx-auto min-h-screen pb-24"
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Vazifalar</h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <SearchBar
          value={searchQuery}
          onChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
        />
        <button
          onClick={() => setIsFilterOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
            Object.values(filters).some((f) => f)
              ? 'border-blue-500 text-blue-600 bg-blue-50'
              : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filtr
          {Object.values(filters).filter((f) => f).length > 0 && (
            <span className="flex items-center justify-center w-5 h-5 ml-1 text-xs text-white bg-blue-600 rounded-full">
              {Object.values(filters).filter((f) => f).length}
            </span>
          )}
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <AssignmentTable
          assignments={paginatedAssignments}
          isLoading={isLoading}
          onView={handleView}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDeletePrompt}
          onAdd={() => { setSelectedAssignment(null); setIsCreateOpen(true); }}
        />

        {!isLoading && filteredAssignments.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAssignments.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Floating Create Button */}
      <FloatingCreateButton
        onClick={() => { setSelectedAssignment(null); setIsCreateOpen(true); }}
      />

      {/* ── Modals ─────────────────────────────────────────────────────────── */}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={() => { setIsFilterOpen(false); setCurrentPage(1); }}
      />

      {/* View Details */}
      <AssignmentDetailsModal
        isOpen={isDetailsOpen}
        assignment={selectedAssignment}
        onClose={() => { setIsDetailsOpen(false); setSelectedAssignment(null); }}
        onEdit={(a) => { setIsDetailsOpen(false); handleEdit(a); }}
      />

      {/* Create / Edit */}
      <CreateAssignmentModal
        isOpen={isCreateOpen}
        onClose={() => { setIsCreateOpen(false); setSelectedAssignment(null); }}
        onSave={handleSave}
        initialData={selectedAssignment}
      />

      {/* Delete Confirmation */}
      <DeleteAssignmentDialog
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelectedAssignment(null); }}
        onConfirm={handleDeleteConfirm}
        assignmentName={selectedAssignment?.name}
      />

      {/* Toast */}
      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </motion.div>
  );
};

export default AssignmentsPage;
