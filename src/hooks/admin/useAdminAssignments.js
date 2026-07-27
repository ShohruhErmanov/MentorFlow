import { useEffect, useMemo, useState } from 'react';
import { mockAssignments, ASSIGNMENT_STAT_BASELINE } from '../../constants/mockAssignments';

const ITEMS_PER_PAGE = 9;

function countByStatus(list, status) {
  return list.filter((a) => a.status === status).length;
}

export function useAdminAssignments() {
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState(mockAssignments);

  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [mentorFilter, setMentorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deadlineFilter, setDeadlineFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);
  const [extendAssignment, setExtendAssignment] = useState(null);
  const [archiveAssignment, setArchiveAssignment] = useState(null);
  const [deleteAssignment, setDeleteAssignment] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const hasFilters = Boolean(
    searchQuery || courseFilter || groupFilter || mentorFilter || statusFilter || deadlineFilter,
  );

  const clearFilters = () => {
    setSearchQuery('');
    setCourseFilter('');
    setGroupFilter('');
    setMentorFilter('');
    setStatusFilter('');
    setDeadlineFilter('');
    setCurrentPage(1);
  };

  const filteredAssignments = useMemo(() => {
    let result = [...assignments];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.course.toLowerCase().includes(q) ||
          a.group.toLowerCase().includes(q) ||
          a.mentor.name.toLowerCase().includes(q),
      );
    }

    if (courseFilter) result = result.filter((a) => a.course === courseFilter);
    if (groupFilter) result = result.filter((a) => a.group === groupFilter);
    if (mentorFilter) result = result.filter((a) => a.mentor.name === mentorFilter);
    if (statusFilter) result = result.filter((a) => a.status === statusFilter);
    if (deadlineFilter) {
      result = result.filter((a) => new Date(a.deadline) <= new Date(deadlineFilter));
    }

    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [assignments, searchQuery, courseFilter, groupFilter, mentorFilter, statusFilter, deadlineFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAssignments.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentAssignments = filteredAssignments.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const stats = useMemo(() => {
    const deltaFor = (status) => countByStatus(assignments, status) - countByStatus(mockAssignments, status);

    return {
      total: ASSIGNMENT_STAT_BASELINE.total + (assignments.length - mockAssignments.length),
      active: ASSIGNMENT_STAT_BASELINE.active + deltaFor('active'),
      submitted: ASSIGNMENT_STAT_BASELINE.submitted + deltaFor('submitted'),
      overdue: ASSIGNMENT_STAT_BASELINE.overdue + deltaFor('overdue'),
      reviewing: ASSIGNMENT_STAT_BASELINE.reviewing + deltaFor('reviewing'),
    };
  }, [assignments]);

  const addAssignment = (data) => {
    const id = `ASG-${8000 + Math.floor(Math.random() * 9000)}`;
    const newAssignment = {
      ...data,
      id,
      category: 'Umumiy',
      fullDescription: data.shortDescription,
      technologies: [],
      note: null,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setAssignments((prev) => [newAssignment, ...prev]);
    setCreateModalOpen(false);
    showToast("Vazifa muvaffaqiyatli qo'shildi");
  };

  const saveEditedAssignment = (data) => {
    setAssignments((prev) => prev.map((a) => (a.id === editAssignment.id ? { ...a, ...data } : a)));
    setEditAssignment(null);
    showToast('Vazifa ma\'lumotlari yangilandi');
  };

  const saveExtendedDeadline = (assignmentId, newDeadline) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, deadline: new Date(newDeadline).toISOString() } : a)),
    );
    setExtendAssignment(null);
    showToast('Topshirish muddati uzaytirildi');
  };

  const confirmArchive = () => {
    setAssignments((prev) => prev.map((a) => (a.id === archiveAssignment.id ? { ...a, status: 'archived' } : a)));
    showToast('Vazifa arxivlandi');
    setArchiveAssignment(null);
  };

  const confirmDelete = () => {
    setAssignments((prev) => prev.filter((a) => a.id !== deleteAssignment.id));
    showToast("Vazifa ro'yxatdan o'chirildi");
    setDeleteAssignment(null);
    if (currentAssignments.length === 1 && safePage > 1) {
      setCurrentPage(safePage - 1);
    }
  };

  return {
    isLoading,
    currentAssignments,
    filteredCount: filteredAssignments.length,
    totalPages,
    currentPage: safePage,
    setCurrentPage,
    searchQuery,
    setSearchQuery: (value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    courseFilter,
    setCourseFilter: (value) => {
      setCourseFilter(value);
      setCurrentPage(1);
    },
    groupFilter,
    setGroupFilter: (value) => {
      setGroupFilter(value);
      setCurrentPage(1);
    },
    mentorFilter,
    setMentorFilter: (value) => {
      setMentorFilter(value);
      setCurrentPage(1);
    },
    statusFilter,
    setStatusFilter: (value) => {
      setStatusFilter(value);
      setCurrentPage(1);
    },
    deadlineFilter,
    setDeadlineFilter: (value) => {
      setDeadlineFilter(value);
      setCurrentPage(1);
    },
    hasFilters,
    clearFilters,
    stats,
    toast,
    hideToast,
    createModalOpen,
    openCreateModal: () => setCreateModalOpen(true),
    closeCreateModal: () => setCreateModalOpen(false),
    editAssignment,
    openEditModal: setEditAssignment,
    closeEditModal: () => setEditAssignment(null),
    extendAssignment,
    openExtendModal: setExtendAssignment,
    closeExtendModal: () => setExtendAssignment(null),
    archiveAssignment,
    openArchiveDialog: setArchiveAssignment,
    closeArchiveDialog: () => setArchiveAssignment(null),
    deleteAssignment,
    openDeleteDialog: setDeleteAssignment,
    closeDeleteDialog: () => setDeleteAssignment(null),
    addAssignment,
    saveEditedAssignment,
    saveExtendedDeadline,
    confirmArchive,
    confirmDelete,
  };
}
