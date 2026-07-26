import { useEffect, useMemo, useState } from 'react';
import { mockUsers, USER_STAT_BASELINE } from '../../constants/mockUsers';

const ITEMS_PER_PAGE = 8;

function countByStatus(list) {
  return {
    active: list.filter((u) => u.status === 'active').length,
    blocked: list.filter((u) => u.status === 'blocked').length,
  };
}

export function useAdminUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(mockUsers);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [blockUser, setBlockUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });
  const [createdThisMonthCount, setCreatedThisMonthCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const seedStatusCounts = useMemo(() => countByStatus(mockUsers), []);

  const hasFilters = Boolean(searchQuery || roleFilter);

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.toLowerCase().includes(q),
      );
    }

    if (roleFilter) {
      result = result.filter((u) => u.role === roleFilter);
    }

    result.sort((a, b) => {
      const diff = new Date(b.createdAt) - new Date(a.createdAt);
      return sortBy === 'oldest' ? -diff : diff;
    });

    return result;
  }, [users, searchQuery, roleFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedUsers.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentUsers = filteredAndSortedUsers.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const stats = useMemo(() => {
    const current = countByStatus(users);
    return {
      total: USER_STAT_BASELINE.total + (users.length - mockUsers.length),
      active: USER_STAT_BASELINE.active + (current.active - seedStatusCounts.active),
      newThisMonth: USER_STAT_BASELINE.newThisMonth + createdThisMonthCount,
      blocked: USER_STAT_BASELINE.blocked + (current.blocked - seedStatusCounts.blocked),
    };
  }, [users, seedStatusCounts, createdThisMonthCount]);

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('');
    setCurrentPage(1);
  };

  const existingUsernamesExcluding = (excludeId) =>
    users.filter((u) => u.id !== excludeId).map((u) => u.username);

  const addUser = (data) => {
    const id = `MF-${1000 + Math.floor(Math.random() * 9000)}`;
    const newUser = {
      ...data,
      id,
      avatarColor: '#2563eb',
      lastLoginDisplay: 'Hali kirmagan',
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [newUser, ...prev]);
    setCreatedThisMonthCount((prev) => prev + 1);
    setCreateModalOpen(false);
    showToast("Foydalanuvchi muvaffaqiyatli qo'shildi");
  };

  const saveEditedUser = (data) => {
    setUsers((prev) => prev.map((u) => (u.id === editUser.id ? { ...u, ...data } : u)));
    setEditUser(null);
    showToast("Foydalanuvchi ma'lumotlari yangilandi");
  };

  const confirmToggleBlock = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === blockUser.id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u,
      ),
    );
    showToast(blockUser.status === 'blocked' ? 'Foydalanuvchi faollashtirildi' : 'Foydalanuvchi bloklandi');
    setBlockUser(null);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    showToast("Foydalanuvchi ro'yxatdan o'chirildi");
    setDeleteUser(null);
    if (currentUsers.length === 1 && safePage > 1) {
      setCurrentPage(safePage - 1);
    }
  };

  return {
    isLoading,
    currentUsers,
    filteredCount: filteredAndSortedUsers.length,
    totalPages,
    currentPage: safePage,
    setCurrentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    searchQuery,
    setSearchQuery: (value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    roleFilter,
    setRoleFilter: (value) => {
      setRoleFilter(value);
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
    viewUser,
    openViewModal: setViewUser,
    closeViewModal: () => setViewUser(null),
    editUser,
    openEditModal: setEditUser,
    closeEditModal: () => setEditUser(null),
    blockUser,
    openBlockDialog: setBlockUser,
    closeBlockDialog: () => setBlockUser(null),
    deleteUser,
    openDeleteDialog: setDeleteUser,
    closeDeleteDialog: () => setDeleteUser(null),
    existingUsernamesExcluding,
    addUser,
    saveEditedUser,
    confirmToggleBlock,
    confirmDelete,
  };
}
