import { useEffect, useMemo, useState } from 'react';
import { mockStudents, STUDENT_STAT_BASELINE } from '../../constants/mockStudents';

const ITEMS_PER_PAGE = 8;

export function useAdminStudents() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState(mockStudents);

  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [mentorFilter, setMentorFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [attendanceStudent, setAttendanceStudent] = useState(null);
  const [paymentStudent, setPaymentStudent] = useState(null);
  const [blockStudent, setBlockStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });
  const [createdCount, setCreatedCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const hasFilters = Boolean(searchQuery || groupFilter || mentorFilter || paymentFilter);

  const clearFilters = () => {
    setSearchQuery('');
    setGroupFilter('');
    setMentorFilter('');
    setPaymentFilter('');
    setCurrentPage(1);
  };

  const filteredStudents = useMemo(() => {
    let result = [...students];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
          s.username.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q),
      );
    }

    if (groupFilter) result = result.filter((s) => s.group === groupFilter);
    if (mentorFilter) result = result.filter((s) => s.mentorName === mentorFilter);
    if (paymentFilter) result = result.filter((s) => s.paymentStatus === paymentFilter);

    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [students, searchQuery, groupFilter, mentorFilter, paymentFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentStudents = filteredStudents.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const stats = useMemo(
    () => ({
      total: STUDENT_STAT_BASELINE.total + (students.length - mockStudents.length),
      avgRating: STUDENT_STAT_BASELINE.avgRating,
      attendanceRate: STUDENT_STAT_BASELINE.attendanceRate,
      monthlyRevenue: STUDENT_STAT_BASELINE.monthlyRevenue + createdCount * 1.2,
    }),
    [students, createdCount],
  );

  const existingUsernamesExcluding = (excludeId) =>
    students.filter((s) => s.id !== excludeId).map((s) => s.username);

  const addStudent = (data) => {
    const id = `ST-${5000 + Math.floor(Math.random() * 9000)}`;
    const newStudent = {
      ...data,
      id,
      balance: 0,
      attendance: 0,
      rating: 0,
      attendanceHistory: [],
      payments: [],
      assignments: { completed: 0, total: 0 },
      createdAt: new Date().toISOString(),
    };
    setStudents((prev) => [newStudent, ...prev]);
    setCreatedCount((prev) => prev + 1);
    setCreateModalOpen(false);
    showToast("O'quvchi muvaffaqiyatli qo'shildi");
  };

  const saveEditedStudent = (data) => {
    setStudents((prev) => prev.map((s) => (s.id === editStudent.id ? { ...s, ...data } : s)));
    setEditStudent(null);
    showToast("O'quvchi ma'lumotlari yangilandi");
  };

  const updateAttendance = (studentId, status) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              attendanceHistory: [{ date: new Date().toISOString(), status }, ...s.attendanceHistory],
            }
          : s,
      ),
    );
    setAttendanceStudent(null);
    showToast('Davomat yangilandi');
  };

  const addPayment = (studentId, amount) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const newBalance = Math.max(0, s.balance - amount);
        return {
          ...s,
          balance: newBalance,
          paymentStatus: newBalance === 0 ? 'paid' : s.paymentStatus,
          payments: [
            { id: `PMT-${Date.now()}`, date: new Date().toISOString(), amount, method: 'Naqd', status: 'paid' },
            ...s.payments,
          ],
        };
      }),
    );
    setPaymentStudent(null);
    showToast("To'lov qabul qilindi");
  };

  const confirmToggleBlock = () => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === blockStudent.id ? { ...s, status: s.status === 'blocked' ? 'active' : 'blocked' } : s,
      ),
    );
    showToast(blockStudent.status === 'blocked' ? "O'quvchi faollashtirildi" : 'O\'quvchi bloklandi');
    setBlockStudent(null);
  };

  const confirmDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteStudent.id));
    showToast("O'quvchi ro'yxatdan o'chirildi");
    setDeleteStudent(null);
    if (currentStudents.length === 1 && safePage > 1) {
      setCurrentPage(safePage - 1);
    }
  };

  return {
    isLoading,
    currentStudents,
    filteredCount: filteredStudents.length,
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
    hasFilters,
    clearFilters,
    stats,
    toast,
    hideToast,
    createModalOpen,
    openCreateModal: () => setCreateModalOpen(true),
    closeCreateModal: () => setCreateModalOpen(false),
    viewStudent,
    openViewModal: setViewStudent,
    closeViewModal: () => setViewStudent(null),
    editStudent,
    openEditModal: setEditStudent,
    closeEditModal: () => setEditStudent(null),
    attendanceStudent,
    openAttendanceModal: setAttendanceStudent,
    closeAttendanceModal: () => setAttendanceStudent(null),
    paymentStudent,
    openPaymentModal: setPaymentStudent,
    closePaymentModal: () => setPaymentStudent(null),
    blockStudent,
    openBlockDialog: setBlockStudent,
    closeBlockDialog: () => setBlockStudent(null),
    deleteStudent,
    openDeleteDialog: setDeleteStudent,
    closeDeleteDialog: () => setDeleteStudent(null),
    existingUsernamesExcluding,
    addStudent,
    saveEditedStudent,
    updateAttendance,
    addPayment,
    confirmToggleBlock,
    confirmDelete,
  };
}
