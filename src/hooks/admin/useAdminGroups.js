import { useEffect, useMemo, useState } from 'react';
import { mockGroups, GROUP_STAT_BASELINE } from '../../constants/mockGroups';

const ITEMS_PER_PAGE = 9;

export function useAdminGroups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState(mockGroups);

  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [mentorFilter, setMentorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editGroup, setEditGroup] = useState(null);
  const [archiveGroup, setArchiveGroup] = useState(null);
  const [deleteGroup, setDeleteGroup] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const hasFilters = Boolean(searchQuery || courseFilter || mentorFilter || statusFilter || startDateFilter);

  const clearFilters = () => {
    setSearchQuery('');
    setCourseFilter('');
    setMentorFilter('');
    setStatusFilter('');
    setStartDateFilter('');
    setCurrentPage(1);
  };

  const filteredGroups = useMemo(() => {
    let result = [...groups];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.course.toLowerCase().includes(q) ||
          g.mentor.name.toLowerCase().includes(q),
      );
    }

    if (courseFilter) result = result.filter((g) => g.course === courseFilter);
    if (mentorFilter) result = result.filter((g) => g.mentor.name === mentorFilter);
    if (statusFilter) result = result.filter((g) => g.status === statusFilter);
    if (startDateFilter) {
      result = result.filter((g) => new Date(g.startDate) >= new Date(startDateFilter));
    }

    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [groups, searchQuery, courseFilter, mentorFilter, statusFilter, startDateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredGroups.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentGroups = filteredGroups.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const stats = useMemo(() => {
    const activeCount = groups.filter((g) => g.status === 'active').length;
    const seedActiveCount = mockGroups.filter((g) => g.status === 'active').length;

    return {
      total: GROUP_STAT_BASELINE.total + (groups.length - mockGroups.length),
      active: GROUP_STAT_BASELINE.active + (activeCount - seedActiveCount),
      totalStudents: GROUP_STAT_BASELINE.totalStudents,
      totalMentors: GROUP_STAT_BASELINE.totalMentors,
      todayLessons: GROUP_STAT_BASELINE.todayLessons,
    };
  }, [groups]);

  const addGroup = (data) => {
    const id = `GRP-${6000 + Math.floor(Math.random() * 9000)}`;
    const newGroup = {
      ...data,
      id,
      studentCount: 0,
      avgScore: 0,
      attendance: 0,
      lessonsCompleted: 0,
      lessonsTotal: 24,
      progressPercent: 0,
      students: [],
      createdAt: new Date().toISOString(),
    };
    setGroups((prev) => [newGroup, ...prev]);
    setCreateModalOpen(false);
    showToast("Guruh muvaffaqiyatli qo'shildi");
  };

  const saveEditedGroup = (data) => {
    setGroups((prev) => prev.map((g) => (g.id === editGroup.id ? { ...g, ...data } : g)));
    setEditGroup(null);
    showToast('Guruh ma\'lumotlari yangilandi');
  };

  const confirmArchive = () => {
    setGroups((prev) => prev.map((g) => (g.id === archiveGroup.id ? { ...g, status: 'archived' } : g)));
    showToast('Guruh arxivlandi');
    setArchiveGroup(null);
  };

  const confirmDelete = () => {
    setGroups((prev) => prev.filter((g) => g.id !== deleteGroup.id));
    showToast("Guruh ro'yxatdan o'chirildi");
    setDeleteGroup(null);
    if (currentGroups.length === 1 && safePage > 1) {
      setCurrentPage(safePage - 1);
    }
  };

  return {
    isLoading,
    currentGroups,
    filteredCount: filteredGroups.length,
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
    startDateFilter,
    setStartDateFilter: (value) => {
      setStartDateFilter(value);
      setCurrentPage(1);
    },
    hasFilters,
    clearFilters,
    stats,
    toast,
    showToast,
    hideToast,
    createModalOpen,
    openCreateModal: () => setCreateModalOpen(true),
    closeCreateModal: () => setCreateModalOpen(false),
    editGroup,
    openEditModal: setEditGroup,
    closeEditModal: () => setEditGroup(null),
    archiveGroup,
    openArchiveDialog: setArchiveGroup,
    closeArchiveDialog: () => setArchiveGroup(null),
    deleteGroup,
    openDeleteDialog: setDeleteGroup,
    closeDeleteDialog: () => setDeleteGroup(null),
    addGroup,
    saveEditedGroup,
    confirmArchive,
    confirmDelete,
  };
}
