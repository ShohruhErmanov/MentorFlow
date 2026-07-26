import { useMemo, useState } from 'react';
import { mockUsers } from '../../auth/mockUsers';
import { ADMIN_BASE_COUNTS, courseDirectorySeed, mentorDirectorySeed } from '../../data/adminDashboardData';

/**
 * Local-state store backing the three "quick action" modals on the Admin
 * Dashboard: creating users, groups and courses, plus the derived stats
 * and directory options (mentors/courses) that grow as records are added.
 */
export function useAdminQuickActions() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);

  const [activeModal, setActiveModal] = useState(null); // 'user' | 'group' | 'course' | null
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const openUserModal = () => setActiveModal('user');
  const openGroupModal = () => setActiveModal('group');
  const openCourseModal = () => setActiveModal('course');
  const closeModal = () => setActiveModal(null);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const existingUsernames = useMemo(
    () => [...mockUsers.map((u) => u.username), ...users.map((u) => u.username)],
    [users],
  );

  const mentorDirectory = useMemo(
    () => [
      ...mentorDirectorySeed,
      ...users.filter((u) => u.role === 'mentor').map((u) => `${u.firstName} ${u.lastName}`),
    ],
    [users],
  );

  const courseDirectory = useMemo(
    () => [...courseDirectorySeed, ...courses.map((c) => c.name)],
    [courses],
  );

  const stats = useMemo(() => {
    const newStudents = users.filter((u) => u.role === 'student').length;
    const newMentors = users.filter((u) => u.role === 'mentor').length;
    const newActiveGroups = groups.filter((g) => g.status === 'active').length;

    return {
      studentsCount: ADMIN_BASE_COUNTS.students + newStudents,
      mentorsCount: ADMIN_BASE_COUNTS.mentors + newMentors,
      groupsCount: ADMIN_BASE_COUNTS.groups + groups.length,
      activeGroupsCount: ADMIN_BASE_COUNTS.activeGroups + newActiveGroups,
    };
  }, [users, groups]);

  const addUser = (user) => {
    setUsers((prev) => [...prev, { id: Date.now(), ...user }]);
    closeModal();
    showToast("Foydalanuvchi muvaffaqiyatli qo'shildi");
  };

  const addGroup = (group) => {
    setGroups((prev) => [...prev, { id: Date.now(), ...group }]);
    closeModal();
    showToast("Guruh muvaffaqiyatli qo'shildi");
  };

  const addCourse = (course) => {
    setCourses((prev) => [...prev, { id: Date.now(), ...course }]);
    closeModal();
    showToast("Kurs muvaffaqiyatli qo'shildi");
  };

  return {
    activeModal,
    openUserModal,
    openGroupModal,
    openCourseModal,
    closeModal,
    toast,
    hideToast,
    existingUsernames,
    mentorDirectory,
    courseDirectory,
    stats,
    addUser,
    addGroup,
    addCourse,
  };
}
