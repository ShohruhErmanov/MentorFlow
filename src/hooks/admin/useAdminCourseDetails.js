import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { mockCourses } from '../../constants/mockCourses';

const TAB_INDEX = {
  overview: 0,
  mentor: 1,
  groups: 2,
  students: 3,
  lessons: 4,
  assignments: 5,
};

export function useAdminCourseDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(() => mockCourses.find((c) => c.id === id) ?? null);
  const [activeTabIndex, setActiveTabIndex] = useState(
    TAB_INDEX[location.state?.initialTab] ?? TAB_INDEX.overview,
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => setToast({ message, isVisible: true });
  const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

  const saveCourseEdits = (data) => {
    setCourse((prev) => (prev ? { ...prev, ...data } : prev));
    setEditModalOpen(false);
    showToast("Kurs ma'lumotlari yangilandi");
  };

  return {
    isLoading,
    course,
    activeTabIndex,
    setActiveTabIndex,
    toast,
    hideToast,
    editModalOpen,
    openEditModal: () => setEditModalOpen(true),
    closeEditModal: () => setEditModalOpen(false),
    saveCourseEdits,
  };
}
