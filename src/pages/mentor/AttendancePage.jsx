import { useState, useMemo } from 'react';
import {
  attendanceStats,
  calendarDays,
  calendarWeekDays,
  todayLesson,
  groupOptions,
  monthOptions,
  attendanceStudents,
} from '../../data/attendanceData';

import AttendanceHeader from '../../components/attendance/AttendanceHeader';
import AttendanceStats from '../../components/attendance/AttendanceStats';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';
import TodayLessonCard from '../../components/attendance/TodayLessonCard';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import Toast from '../../components/ui/Toast';

import AttendanceStatusModal from '../../components/attendance/AttendanceStatusModal';
import EditAttendanceModal from '../../components/attendance/EditAttendanceModal';
import AttendanceHistoryDrawer from '../../components/attendance/AttendanceHistoryDrawer';
import AttendanceCommentModal from '../../components/attendance/AttendanceCommentModal';

export default function AttendancePage() {
  const [selectedGroup, setSelectedGroup] = useState(groupOptions[0]);
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[1]); // Oktabr, 2025

  // Lifted state
  const [students, setStudents] = useState(attendanceStudents);
  const [stats, setStats] = useState(attendanceStats);
  const [calendar, setCalendar] = useState(calendarDays);

  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'status' | 'edit' | 'history' | 'comment' | null
  const [activeStudent, setActiveStudent] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const openModal = (type, studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setActiveStudent(student);
      setActiveModal(type);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setActiveStudent(null), 300); // delay clear for exit animation
  };

  // Handlers for updating mock data
  const handleStatusChange = (studentId, newStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status: newStatus } : s))
    );
    showToast('Davomat belgilandi');
    closeModal();
    // In a real app, we'd also update the stats and calendar indicators here based on the new data
  };

  const handleEditAttendance = (studentId, data) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, date: `${data.date}, ${data.time}`, status: data.status, comment: data.comment }
          : s
      )
    );
    showToast("Ma'lumot yangilandi");
    closeModal();
  };

  const handleAddComment = (studentId, newComment) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, comment: newComment } : s))
    );
    showToast('Izoh saqlandi');
    closeModal();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <AttendanceHeader
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        groupOptions={groupOptions}
        monthOptions={monthOptions}
      />

      {/* Stats */}
      <AttendanceStats stats={stats} />

      {/* Calendar + Today's Lesson */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <AttendanceCalendar weekDays={calendarWeekDays} days={calendar} />
        <TodayLessonCard lesson={todayLesson} />
      </div>

      {/* Student Table */}
      <AttendanceTable students={students} onOpenModal={openModal} />

      {/* Modals & Drawers */}
      <AttendanceStatusModal
        isOpen={activeModal === 'status'}
        onClose={closeModal}
        student={activeStudent}
        onSave={handleStatusChange}
      />

      <EditAttendanceModal
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        student={activeStudent}
        onSave={handleEditAttendance}
      />

      <AttendanceHistoryDrawer
        isOpen={activeModal === 'history'}
        onClose={closeModal}
        student={activeStudent}
      />

      <AttendanceCommentModal
        isOpen={activeModal === 'comment'}
        onClose={closeModal}
        student={activeStudent}
        onSave={handleAddComment}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}
