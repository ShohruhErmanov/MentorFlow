import { useEffect, useMemo, useState } from 'react';
import { mockCourses, COURSE_STAT_BASELINE } from '../../constants/mockCourses';

const ITEMS_PER_PAGE = 9;

export function useAdminCourses() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState(mockCourses);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [mentorFilter, setMentorFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({ search: '', category: '', mentor: '', duration: '', status: '' });

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [archiveCourse, setArchiveCourse] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const hasFilters = Boolean(searchQuery || categoryFilter || mentorFilter || durationFilter || statusFilter);

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setMentorFilter('');
    setDurationFilter('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const openAdvancedFilter = () => {
    setTempFilters({
      search: searchQuery,
      category: categoryFilter,
      mentor: mentorFilter,
      duration: durationFilter,
      status: statusFilter,
    });
    setIsAdvancedFilterOpen(true);
  };
  const closeAdvancedFilter = () => setIsAdvancedFilterOpen(false);

  const applyAdvancedFilter = () => {
    setSearchQuery(tempFilters.search);
    setCategoryFilter(tempFilters.category);
    setMentorFilter(tempFilters.mentor);
    setDurationFilter(tempFilters.duration);
    setStatusFilter(tempFilters.status);
    setCurrentPage(1);
    setIsAdvancedFilterOpen(false);
  };

  const resetAdvancedFilter = () => {
    setTempFilters({ search: '', category: '', mentor: '', duration: '', status: '' });
  };

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.mentor.name.toLowerCase().includes(q),
      );
    }

    if (categoryFilter) result = result.filter((c) => c.category === categoryFilter);
    if (mentorFilter) result = result.filter((c) => c.mentor.name === mentorFilter);
    if (durationFilter) result = result.filter((c) => c.duration === durationFilter);
    if (statusFilter) result = result.filter((c) => c.status === statusFilter);

    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [courses, searchQuery, categoryFilter, mentorFilter, durationFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentCourses = filteredCourses.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const stats = useMemo(() => {
    const activeCount = courses.filter((c) => c.status === 'active').length;
    const seedActiveCount = mockCourses.filter((c) => c.status === 'active').length;
    const endingSoonCount = courses.filter((c) => c.status === 'upcoming').length;
    const seedEndingSoonCount = mockCourses.filter((c) => c.status === 'upcoming').length;

    return {
      total: COURSE_STAT_BASELINE.total + (courses.length - mockCourses.length),
      active: COURSE_STAT_BASELINE.active + (activeCount - seedActiveCount),
      totalStudents: COURSE_STAT_BASELINE.totalStudents,
      totalMentors: COURSE_STAT_BASELINE.totalMentors,
      endingSoon: COURSE_STAT_BASELINE.endingSoon + (endingSoonCount - seedEndingSoonCount),
    };
  }, [courses]);

  const addCourse = (data) => {
    const id = `CRS-${7000 + Math.floor(Math.random() * 9000)}`;
    const newCourse = {
      ...data,
      id,
      studentCount: 0,
      progressPercent: 0,
      groups: [],
      lessons: [],
      assignments: [],
      createdAt: new Date().toISOString(),
    };
    setCourses((prev) => [newCourse, ...prev]);
    setCreateModalOpen(false);
    showToast("Kurs muvaffaqiyatli qo'shildi");
  };

  const saveEditedCourse = (data) => {
    setCourses((prev) => prev.map((c) => (c.id === editCourse.id ? { ...c, ...data } : c)));
    setEditCourse(null);
    showToast("Kurs ma'lumotlari yangilandi");
  };

  const confirmArchive = () => {
    setCourses((prev) => prev.map((c) => (c.id === archiveCourse.id ? { ...c, status: 'archived' } : c)));
    showToast('Kurs arxivlandi');
    setArchiveCourse(null);
  };

  const confirmDelete = () => {
    setCourses((prev) => prev.filter((c) => c.id !== deleteCourse.id));
    showToast("Kurs ro'yxatdan o'chirildi");
    setDeleteCourse(null);
    if (currentCourses.length === 1 && safePage > 1) {
      setCurrentPage(safePage - 1);
    }
  };

  return {
    isLoading,
    currentCourses,
    filteredCount: filteredCourses.length,
    totalPages,
    currentPage: safePage,
    setCurrentPage,
    searchQuery,
    setSearchQuery: (value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    categoryFilter,
    setCategoryFilter: (value) => {
      setCategoryFilter(value);
      setCurrentPage(1);
    },
    mentorFilter,
    setMentorFilter: (value) => {
      setMentorFilter(value);
      setCurrentPage(1);
    },
    durationFilter,
    setDurationFilter: (value) => {
      setDurationFilter(value);
      setCurrentPage(1);
    },
    statusFilter,
    setStatusFilter: (value) => {
      setStatusFilter(value);
      setCurrentPage(1);
    },
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
    openCreateModal: () => setCreateModalOpen(true),
    closeCreateModal: () => setCreateModalOpen(false),
    editCourse,
    openEditModal: setEditCourse,
    closeEditModal: () => setEditCourse(null),
    archiveCourse,
    openArchiveDialog: setArchiveCourse,
    closeArchiveDialog: () => setArchiveCourse(null),
    deleteCourse,
    openDeleteDialog: setDeleteCourse,
    closeDeleteDialog: () => setDeleteCourse(null),
    addCourse,
    saveEditedCourse,
    confirmArchive,
    confirmDelete,
  };
}
