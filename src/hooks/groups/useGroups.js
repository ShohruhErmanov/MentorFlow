import { useState, useMemo } from 'react';
import { initialGroups } from '../../services/groups/groupsService';

export function useGroups() {
  const [groups, setGroups] = useState(initialGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Barchasi');
  const [courseFilter, setCourseFilter] = useState('Barchasi');
  const [sortBy, setSortBy] = useState('eng_yangi');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [deletingGroup, setDeletingGroup] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const showToast = (message) => {
    setToast({ message, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const filteredAndSortedGroups = useMemo(() => {
    let result = [...groups];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(query) ||
          g.course.toLowerCase().includes(query) ||
          g.mentor.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'Barchasi') {
      result = result.filter((g) => g.status === statusFilter);
    }

    // Course filter
    if (courseFilter !== 'Barchasi') {
      result = result.filter((g) => g.course === courseFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'eng_yangi':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'eski':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'oquvchilar':
          return b.students.count - a.students.count;
        case 'davomat':
          return b.attendance - a.attendance;
        case 'ozlashtirish':
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

    return result;
  }, [groups, searchQuery, statusFilter, courseFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedGroups.length / itemsPerPage);
  const currentGroups = filteredAndSortedGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCreateGroup = (data) => {
    const newGroup = {
      id: Date.now().toString(),
      ...data,
      students: { count: 0, max: parseInt(data.capacity, 10) },
      attendance: 0,
      progress: 0,
      rating: 0,
      status: data.status || 'Faol',
      createdAt: new Date().toISOString(),
    };
    setGroups([newGroup, ...groups]);
    setIsCreateModalOpen(false);
    showToast("Yangi guruh muvaffaqiyatli yaratildi!");
  };

  const handleUpdateGroup = (data) => {
    setGroups(groups.map((g) => (g.id === editingGroup.id ? { ...g, ...data, students: { ...g.students, max: parseInt(data.capacity, 10) } } : g)));
    setEditingGroup(null);
    showToast("Guruh muvaffaqiyatli tahrirlandi!");
  };

  const handleDeleteGroup = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
    setDeletingGroup(null);
    showToast("Guruh muvaffaqiyatli o'chirildi!");
  };

  const handleImport = (file) => {
    setIsImportModalOpen(false);
    showToast(`${file.name} muvaffaqiyatli import qilindi!`);
  };

  const handleExport = (format) => {
    setIsExportModalOpen(false);
    showToast(`Ma'lumotlar ${format.toUpperCase()} formatida yuklab olindi!`);
  };

  return {
    groups: currentGroups,
    allGroups: groups,
    totalGroups: groups.length,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    courseFilter,
    setCourseFilter,
    sortBy,
    setSortBy,
    currentPage,
    totalPages,
    handlePageChange,
    isCreateModalOpen,
    setIsCreateModalOpen,
    editingGroup,
    setEditingGroup,
    deletingGroup,
    setDeletingGroup,
    isImportModalOpen,
    setIsImportModalOpen,
    isExportModalOpen,
    setIsExportModalOpen,
    toast,
    hideToast,
    handleCreateGroup,
    handleUpdateGroup,
    handleDeleteGroup,
    handleImport,
    handleExport,
  };
}
