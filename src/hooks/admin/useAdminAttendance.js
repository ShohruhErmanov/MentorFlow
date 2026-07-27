import { useEffect, useMemo, useState } from 'react';
import { ATTENDANCE_STAT_BASELINE, mockAttendanceStudents } from '../../constants/mockAttendance';

const ITEMS_PER_PAGE = 10;
const STATUS_SCORE = { present: 1, late: 0.5, excused: 0.5, absent: 0 };

function recomputeMonthlyPercent(history) {
  if (history.length === 0) return 0;
  const sample = history.slice(0, 30);
  const sum = sample.reduce((acc, entry) => acc + (STATUS_SCORE[entry.status] ?? 0), 0);
  return Math.round((sum / sample.length) * 100);
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function useAdminAttendance() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState(mockAttendanceStudents);

  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [mentorFilter, setMentorFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [markModalOpen, setMarkModalOpen] = useState(false);
  const [markPresetStudent, setMarkPresetStudent] = useState(null);
  const [profileStudent, setProfileStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [historyStudent, setHistoryStudent] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const hasFilters = Boolean(searchQuery || courseFilter || groupFilter || mentorFilter || dateFilter);

  const clearFilters = () => {
    setSearchQuery('');
    setCourseFilter('');
    setGroupFilter('');
    setMentorFilter('');
    setDateFilter('');
    setCurrentPage(1);
  };

  const filteredStudents = useMemo(() => {
    let result = [...students];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
          s.group.label.toLowerCase().includes(q) ||
          s.group.mentor.toLowerCase().includes(q),
      );
    }

    if (courseFilter) result = result.filter((s) => s.group.course === courseFilter);
    if (groupFilter) result = result.filter((s) => s.group.code === groupFilter);
    if (mentorFilter) result = result.filter((s) => s.group.mentor === mentorFilter);
    if (dateFilter) {
      result = result.filter((s) => s.history.some((h) => h.date.slice(0, 10) === dateFilter));
    }

    return result;
  }, [students, searchQuery, courseFilter, groupFilter, mentorFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentStudents = filteredStudents.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const stats = useMemo(() => {
    const countBy = (list, status) => list.filter((s) => s.todayStatus === status).length;
    const initialPresent = countBy(mockAttendanceStudents, 'present');
    const initialAbsent = countBy(mockAttendanceStudents, 'absent');
    const initialLate = countBy(mockAttendanceStudents, 'late');
    const currentPresent = countBy(students, 'present');
    const currentAbsent = countBy(students, 'absent');
    const currentLate = countBy(students, 'late');

    return {
      total: ATTENDANCE_STAT_BASELINE.totalStudents,
      presentToday: ATTENDANCE_STAT_BASELINE.presentToday + (currentPresent - initialPresent),
      absentToday: ATTENDANCE_STAT_BASELINE.absentToday + (currentAbsent - initialAbsent),
      lateToday: ATTENDANCE_STAT_BASELINE.lateToday + (currentLate - initialLate),
      avgAttendance: ATTENDANCE_STAT_BASELINE.avgAttendance,
    };
  }, [students]);

  const markAttendance = ({ date, studentIds, status, comment }) => {
    const isToday = date === todayIso();
    setStudents((prev) =>
      prev.map((s) => {
        if (!studentIds.includes(s.id)) return s;
        const history = [{ date: new Date(date).toISOString(), status, comment: comment || null }, ...s.history];
        return {
          ...s,
          todayStatus: isToday ? status : s.todayStatus,
          history,
          monthlyPercent: recomputeMonthlyPercent(history),
        };
      }),
    );
    setMarkModalOpen(false);
    setMarkPresetStudent(null);
    showToast(`Davomat ${studentIds.length} ta o'quvchi uchun belgilandi`);
  };

  const editAttendance = (studentId, { date, status, comment }) => {
    const isToday = date === todayIso();
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const isoDate = new Date(date).toISOString();
        const existingIndex = s.history.findIndex((h) => h.date.slice(0, 10) === date);
        const history =
          existingIndex >= 0
            ? s.history.map((h, i) => (i === existingIndex ? { date: isoDate, status, comment: comment || null } : h))
            : [{ date: isoDate, status, comment: comment || null }, ...s.history];
        return {
          ...s,
          todayStatus: isToday ? status : s.todayStatus,
          history,
          monthlyPercent: recomputeMonthlyPercent(history),
        };
      }),
    );
    setEditStudent(null);
    showToast("O'quvchi davomati yangilandi");
  };

  const notifyParent = (student) => {
    showToast(`${student.parentName} ga xabar yuborildi (${student.parentPhone})`);
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
    dateFilter,
    setDateFilter: (value) => {
      setDateFilter(value);
      setCurrentPage(1);
    },
    hasFilters,
    clearFilters,
    stats,
    allStudents: students,
    toast,
    showToast,
    hideToast,
    markModalOpen,
    markPresetStudent,
    openMarkModal: (student = null) => {
      setMarkPresetStudent(student);
      setMarkModalOpen(true);
    },
    closeMarkModal: () => {
      setMarkModalOpen(false);
      setMarkPresetStudent(null);
    },
    profileStudent,
    openProfileModal: setProfileStudent,
    closeProfileModal: () => setProfileStudent(null),
    editStudent,
    openEditModal: setEditStudent,
    closeEditModal: () => setEditStudent(null),
    historyStudent,
    openHistoryModal: setHistoryStudent,
    closeHistoryModal: () => setHistoryStudent(null),
    markAttendance,
    editAttendance,
    notifyParent,
  };
}
