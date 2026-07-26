import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { mockGroups } from '../../constants/mockGroups';

const ITEMS_PER_PAGE = 8;

const TAB_INDEX = {
  overview: 0,
  students: 1,
  assignments: 2,
  attendance: 3,
  ranking: 4,
  schedule: 5,
};

export function useAdminGroupDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState(() => mockGroups.find((g) => g.id === id) ?? null);
  const [activeTabIndex, setActiveTabIndex] = useState(
    TAB_INDEX[location.state?.initialTab] ?? TAB_INDEX.students,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [editGroupModalOpen, setEditGroupModalOpen] = useState(false);
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [removeStudent, setRemoveStudent] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const goToTab = (name) => setActiveTabIndex(TAB_INDEX[name] ?? 0);

  const rankedStudents = useMemo(() => {
    if (!group) return [];
    return [...group.students]
      .sort((a, b) => b.score - a.score)
      .map((student, index) => ({ ...student, rank: index + 1 }));
  }, [group]);

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return rankedStudents;
    const q = searchQuery.toLowerCase();
    return rankedStudents.filter(
      (s) => s.name.toLowerCase().includes(q) || s.phone.toLowerCase().includes(q) || s.id.toLowerCase().includes(q),
    );
  }, [rankedStudents, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const currentStudents = filteredStudents.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const updateGroup = (updater) => setGroup((prev) => (prev ? updater(prev) : prev));

  const saveGroupEdits = (data) => {
    updateGroup((prev) => ({ ...prev, ...data }));
    setEditGroupModalOpen(false);
    showToast("Guruh ma'lumotlari yangilandi");
  };

  const addStudent = (data) => {
    const newStudent = {
      id: String(Date.now()).slice(-3),
      name: data.studentName,
      avatarUrl: `https://i.pravatar.cc/150?u=newstudent-${Date.now()}`,
      phone: '—',
      attendance: 0,
      score: 0,
      status: data.status,
      parentName: '—',
      parentPhone: '—',
    };
    updateGroup((prev) => ({
      ...prev,
      students: [newStudent, ...prev.students],
      studentCount: prev.studentCount + 1,
    }));
    setAddStudentModalOpen(false);
    showToast("O'quvchi guruhga qo'shildi");
  };

  const saveStudentEdits = (studentId, data) => {
    updateGroup((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === studentId ? { ...s, ...data } : s)),
    }));
    setEditStudent(null);
    showToast("O'quvchi ma'lumotlari yangilandi");
  };

  const confirmRemoveStudent = () => {
    updateGroup((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== removeStudent.id),
      studentCount: Math.max(0, prev.studentCount - 1),
    }));
    showToast("O'quvchi guruhdan chiqarildi");
    setRemoveStudent(null);
  };

  const sendParentMessage = (student) => {
    showToast(`${student.parentName} (${student.parentPhone}) ga xabar yuborildi`);
  };

  const exportStudents = () => showToast("O'quvchilar ro'yxati yuklab olindi");

  return {
    isLoading,
    group,
    activeTabIndex,
    setActiveTabIndex,
    goToTab,
    rankedStudents,
    currentStudents,
    filteredCount: filteredStudents.length,
    hasFilters: Boolean(searchQuery),
    clearFilters: () => setSearchQuery(''),
    searchQuery,
    setSearchQuery: (value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    currentPage: safePage,
    totalPages,
    setCurrentPage,
    toast,
    hideToast,
    exportStudents,
    editGroupModalOpen,
    openEditGroupModal: () => setEditGroupModalOpen(true),
    closeEditGroupModal: () => setEditGroupModalOpen(false),
    addStudentModalOpen,
    openAddStudentModal: () => setAddStudentModalOpen(true),
    closeAddStudentModal: () => setAddStudentModalOpen(false),
    viewStudent,
    openViewStudent: setViewStudent,
    closeViewStudent: () => setViewStudent(null),
    editStudent,
    openEditStudent: setEditStudent,
    closeEditStudent: () => setEditStudent(null),
    removeStudent,
    openRemoveStudentDialog: setRemoveStudent,
    closeRemoveStudentDialog: () => setRemoveStudent(null),
    saveGroupEdits,
    addStudent,
    saveStudentEdits,
    confirmRemoveStudent,
    sendParentMessage,
  };
}
