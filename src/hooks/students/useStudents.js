import { useState, useMemo } from 'react';

const mockStudents = Array.from({ length: 40 }).map((_, i) => {
  const statuses = ['Faol', 'Kutish', 'To\'xtatilgan', 'Yangi'];
  const groups = ['Frontend-019', 'Backend-001', 'Mobile-005', 'AI-002'];
  const status = statuses[i % statuses.length];
  const group = groups[i % groups.length];
  
  // Random score and attendance logic for variety
  const avgScore = Math.floor(Math.random() * 41) + 60; // 60 to 100
  const attendance = Math.floor(Math.random() * 51) + 50; // 50 to 100
  
  return {
    id: `ST-${1000 + i}`,
    name: `O'quvchi Ismi ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?u=${i}`,
    phone: `+998 90 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`,
    attendance,
    score: avgScore,
    group,
    status,
    email: `student${i+1}@example.com`,
    completedAssignments: Math.floor(Math.random() * 15)
  };
});

export default function useStudents() {
  const [students, setStudents] = useState(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState(''); // E.g., '>90', '80-90'
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [toast, setToast] = useState({ message: '', isVisible: false });

  const showToast = (message) => {
    setToast({ message, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.phone.includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.group.toLowerCase().includes(q)
      );
    }

    // Filter by group
    if (groupFilter && groupFilter !== 'Barchasi') {
      result = result.filter((s) => s.group === groupFilter);
    }

    // Filter by status
    if (statusFilter && statusFilter !== 'Barchasi') {
      result = result.filter((s) => s.status === statusFilter);
    }

    // Filter by attendance (mock logic)
    if (attendanceFilter) {
      if (attendanceFilter === '>95') result = result.filter(s => s.attendance >= 95);
      else if (attendanceFilter === '80-94') result = result.filter(s => s.attendance >= 80 && s.attendance < 95);
      else if (attendanceFilter === '60-79') result = result.filter(s => s.attendance >= 60 && s.attendance < 80);
      else if (attendanceFilter === '<60') result = result.filter(s => s.attendance < 60);
    }

    // Sort
    if (sortBy === 'newest') {
      // Assuming mock data is ordered by newest initially, id descending
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortBy === 'highestScore') {
      result.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'lowestScore') {
      result.sort((a, b) => a.score - b.score);
    }

    return result;
  }, [students, searchQuery, groupFilter, statusFilter, attendanceFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedStudents.length / itemsPerPage);
  
  const currentStudents = filteredAndSortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUpdateStudent = (id, data) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    showToast("O'quvchi ma'lumotlari tahrirlandi!");
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast("O'quvchi ro'yxatdan o'chirildi!");
    if (currentStudents.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    students,
    searchQuery, setSearchQuery,
    groupFilter, setGroupFilter,
    statusFilter, setStatusFilter,
    attendanceFilter, setAttendanceFilter,
    sortBy, setSortBy,
    currentPage, setCurrentPage,
    totalPages,
    currentStudents,
    filteredCount: filteredAndSortedStudents.length,
    itemsPerPage,
    toast, hideToast, showToast,
    handleUpdateStudent,
    handleDeleteStudent
  };
}
