import { useEffect, useMemo, useState } from 'react';
import { mockParents, PARENT_STAT_BASELINE } from '../../constants/mockParents';

const ITEMS_PER_PAGE = 8;

export function useAdminParents() {
  const [isLoading, setIsLoading] = useState(true);
  const [parents, setParents] = useState(mockParents);

  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [mentorFilter, setMentorFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewParent, setViewParent] = useState(null);
  const [editParent, setEditParent] = useState(null);
  const [messageParent, setMessageParent] = useState(null);
  const [blockParent, setBlockParent] = useState(null);
  const [deleteParent, setDeleteParent] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });
  const [createdCount, setCreatedCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const hasFilters = Boolean(searchQuery || groupFilter || mentorFilter || paymentFilter || statusFilter);

  const clearFilters = () => {
    setSearchQuery('');
    setGroupFilter('');
    setMentorFilter('');
    setPaymentFilter('');
    setStatusFilter('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const filteredParents = useMemo(() => {
    let result = [...parents];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.children.some((c) => c.name.toLowerCase().includes(q)),
      );
    }

    if (groupFilter) result = result.filter((p) => p.children.some((c) => c.group === groupFilter));
    if (mentorFilter) result = result.filter((p) => p.children.some((c) => c.mentor === mentorFilter));
    if (paymentFilter) result = result.filter((p) => p.paymentStatus === paymentFilter);
    if (statusFilter) result = result.filter((p) => p.status === statusFilter);

    result.sort((a, b) => {
      if (sortBy === 'name') return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      const diff = new Date(b.createdAt) - new Date(a.createdAt);
      return sortBy === 'oldest' ? -diff : diff;
    });

    return result;
  }, [parents, searchQuery, groupFilter, mentorFilter, paymentFilter, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredParents.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentParents = filteredParents.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const stats = useMemo(() => {
    const activeCount = parents.filter((p) => p.status === 'active').length;
    const seedActiveCount = mockParents.filter((p) => p.status === 'active').length;
    const overdueCount = parents.filter((p) => p.paymentStatus === 'overdue').length;
    const seedOverdueCount = mockParents.filter((p) => p.paymentStatus === 'overdue').length;
    const childrenCount = parents.reduce((sum, p) => sum + p.children.length, 0);
    const seedChildrenCount = mockParents.reduce((sum, p) => sum + p.children.length, 0);

    return {
      total: PARENT_STAT_BASELINE.total + (parents.length - mockParents.length),
      active: PARENT_STAT_BASELINE.active + (activeCount - seedActiveCount),
      childrenCount: PARENT_STAT_BASELINE.childrenCount + (childrenCount - seedChildrenCount),
      overdueCount: PARENT_STAT_BASELINE.overdueCount + (overdueCount - seedOverdueCount),
      todayLogins: PARENT_STAT_BASELINE.todayLogins + createdCount,
    };
  }, [parents, createdCount]);

  const existingUsernamesExcluding = (excludeId) =>
    parents.filter((p) => p.id !== excludeId).map((p) => p.username);

  const addParent = (data) => {
    const id = `PR-${4000 + Math.floor(Math.random() * 9000)}`;
    const newParent = {
      ...data,
      id,
      avatarUrl: data.avatarUrl ?? null,
      paymentStatus: 'pending',
      overdueDays: 0,
      lastLoginDisplay: 'Hali kirmagan',
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setParents((prev) => [newParent, ...prev]);
    setCreatedCount((prev) => prev + 1);
    setCreateModalOpen(false);
    showToast("Ota-ona muvaffaqiyatli qo'shildi");
  };

  const saveEditedParent = (data) => {
    setParents((prev) =>
      prev.map((p) =>
        p.id === editParent.id
          ? { ...p, ...data, avatarUrl: data.avatarUrl ?? p.avatarUrl }
          : p,
      ),
    );
    setEditParent(null);
    showToast("Ota-ona ma'lumotlari yangilandi");
  };

  const sendMessage = () => {
    setMessageParent(null);
    showToast('Xabar muvaffaqiyatli yuborildi');
  };

  const confirmToggleBlock = () => {
    setParents((prev) =>
      prev.map((p) =>
        p.id === blockParent.id ? { ...p, status: p.status === 'inactive' ? 'active' : 'inactive' } : p,
      ),
    );
    showToast(blockParent.status === 'inactive' ? 'Ota-ona faollashtirildi' : 'Ota-ona bloklandi');
    setBlockParent(null);
  };

  const confirmDelete = () => {
    setParents((prev) => prev.filter((p) => p.id !== deleteParent.id));
    showToast("Ota-ona ro'yxatdan o'chirildi");
    setDeleteParent(null);
    if (currentParents.length === 1 && safePage > 1) {
      setCurrentPage(safePage - 1);
    }
  };

  return {
    isLoading,
    currentParents,
    filteredCount: filteredParents.length,
    totalPages,
    currentPage: safePage,
    setCurrentPage,
    searchQuery,
    setSearchQuery: (value) => {
      setSearchQuery(value);
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
    paymentFilter,
    setPaymentFilter: (value) => {
      setPaymentFilter(value);
      setCurrentPage(1);
    },
    statusFilter,
    setStatusFilter: (value) => {
      setStatusFilter(value);
      setCurrentPage(1);
    },
    sortBy,
    setSortBy,
    hasFilters,
    clearFilters,
    stats,
    toast,
    showToast,
    hideToast,
    createModalOpen,
    openCreateModal: () => setCreateModalOpen(true),
    closeCreateModal: () => setCreateModalOpen(false),
    viewParent,
    openViewModal: setViewParent,
    closeViewModal: () => setViewParent(null),
    editParent,
    openEditModal: setEditParent,
    closeEditModal: () => setEditParent(null),
    messageParent,
    openMessageModal: setMessageParent,
    closeMessageModal: () => setMessageParent(null),
    blockParent,
    openBlockDialog: setBlockParent,
    closeBlockDialog: () => setBlockParent(null),
    deleteParent,
    openDeleteDialog: setDeleteParent,
    closeDeleteDialog: () => setDeleteParent(null),
    existingUsernamesExcluding,
    addParent,
    saveEditedParent,
    sendMessage,
    confirmToggleBlock,
    confirmDelete,
  };
}
