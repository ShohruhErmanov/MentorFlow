import { useEffect, useMemo, useState } from 'react';
import { mockMentors, MENTOR_STAT_BASELINE } from '../../constants/mockMentors';

const ITEMS_PER_PAGE = 5;

export function useAdminMentors() {
  const [isLoading, setIsLoading] = useState(true);
  const [mentors, setMentors] = useState(mockMentors);

  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({ search: '', specialization: '', status: '', sortBy: 'rating' });

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewMentor, setViewMentor] = useState(null);
  const [editMentor, setEditMentor] = useState(null);
  const [deleteMentor, setDeleteMentor] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const hasFilters = Boolean(searchQuery || specializationFilter || statusFilter);

  const openFilterModal = () => {
    setTempFilters({ search: searchQuery, specialization: specializationFilter, status: statusFilter, sortBy });
    setIsFilterModalOpen(true);
  };
  const closeFilterModal = () => setIsFilterModalOpen(false);

  const applyFilters = () => {
    setSearchQuery(tempFilters.search);
    setSpecializationFilter(tempFilters.specialization);
    setStatusFilter(tempFilters.status);
    setSortBy(tempFilters.sortBy);
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  const resetFilters = () => {
    setTempFilters({ search: '', specialization: '', status: '', sortBy: 'rating' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSpecializationFilter('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const filteredAndSortedMentors = useMemo(() => {
    let result = [...mentors];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
          m.username.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.specializationLabel.toLowerCase().includes(q),
      );
    }

    if (specializationFilter) {
      result = result.filter((m) => m.specialization === specializationFilter);
    }

    if (statusFilter) {
      result = result.filter((m) => m.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'students') return b.studentCount - a.studentCount;
      return b.rating - a.rating;
    });

    return result;
  }, [mentors, searchQuery, specializationFilter, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedMentors.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentMentors = filteredAndSortedMentors.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const stats = useMemo(() => {
    const groupsCount = mentors.reduce((sum, m) => sum + m.groups.length, 0);
    const seedGroupsCount = mockMentors.reduce((sum, m) => sum + m.groups.length, 0);

    return {
      total: MENTOR_STAT_BASELINE.total + (mentors.length - mockMentors.length),
      avgRating: MENTOR_STAT_BASELINE.avgRating,
      attendanceRate: MENTOR_STAT_BASELINE.attendanceRate,
      groupsCount: MENTOR_STAT_BASELINE.groupsCount + (groupsCount - seedGroupsCount),
    };
  }, [mentors]);

  const existingUsernamesExcluding = (excludeId) =>
    mentors.filter((m) => m.id !== excludeId).map((m) => m.username);

  const addMentor = (data) => {
    const id = `MT-${1000 + Math.floor(Math.random() * 9000)}`;
    const newMentor = {
      ...data,
      id,
      specializationLabel: data.specialization,
      isOnline: false,
      rating: 0,
      studentCount: 0,
      attendance: 0,
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
      activityTrend: 0,
      createdAt: new Date().toISOString(),
    };
    setMentors((prev) => [newMentor, ...prev]);
    setCreateModalOpen(false);
    showToast("Mentor muvaffaqiyatli qo'shildi");
  };

  const saveEditedMentor = (data) => {
    setMentors((prev) =>
      prev.map((m) => (m.id === editMentor.id ? { ...m, ...data, specializationLabel: data.specialization } : m)),
    );
    setEditMentor(null);
    showToast("Mentor ma'lumotlari yangilandi");
  };

  const confirmDelete = () => {
    setMentors((prev) => prev.filter((m) => m.id !== deleteMentor.id));
    showToast("Mentor ro'yxatdan o'chirildi");
    setDeleteMentor(null);
    if (currentMentors.length === 1 && safePage > 1) {
      setCurrentPage(safePage - 1);
    }
  };

  return {
    isLoading,
    currentMentors,
    filteredCount: filteredAndSortedMentors.length,
    totalPages,
    currentPage: safePage,
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
    openCreateModal: () => setCreateModalOpen(true),
    closeCreateModal: () => setCreateModalOpen(false),
    viewMentor,
    openViewModal: setViewMentor,
    closeViewModal: () => setViewMentor(null),
    editMentor,
    openEditModal: setEditMentor,
    closeEditModal: () => setEditMentor(null),
    deleteMentor,
    openDeleteDialog: setDeleteMentor,
    closeDeleteDialog: () => setDeleteMentor(null),
    existingUsernamesExcluding,
    addMentor,
    saveEditedMentor,
    confirmDelete,
  };
}
