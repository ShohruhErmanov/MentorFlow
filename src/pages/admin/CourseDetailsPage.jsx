import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Toast from '../../components/ui/Toast';
import Tabs from '../../components/ui/Tabs';
import CourseHeader from '../../components/admin/courseDetails/CourseHeader';
import CourseSummaryCard from '../../components/admin/courseDetails/CourseSummaryCard';
import CourseOverviewTab from '../../components/admin/courseDetails/CourseOverviewTab';
import CourseMentorTab from '../../components/admin/courseDetails/CourseMentorTab';
import CourseGroupsTab from '../../components/admin/courseDetails/CourseGroupsTab';
import CourseStudentsTab from '../../components/admin/courseDetails/CourseStudentsTab';
import CourseLessonsTab from '../../components/admin/courseDetails/CourseLessonsTab';
import CourseAssignmentsTab from '../../components/admin/courseDetails/CourseAssignmentsTab';
import CourseModal from '../../components/admin/courses/CourseModal';
import { useAdminCourseDetails } from '../../hooks/admin/useAdminCourseDetails';

export default function CourseDetailsPage() {
  const {
    isLoading,
    course,
    activeTabIndex,
    setActiveTabIndex,
    toast,
    hideToast,
    editModalOpen,
    openEditModal,
    closeEditModal,
    saveCourseEdits,
  } = useAdminCourseDetails();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-gray-100 dark:bg-slate-800" />
          <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="h-[260px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
        <div className="h-[420px] rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-[#191b23] dark:text-white">Kurs topilmadi</p>
        <p className="mt-2 text-sm text-[#737686] dark:text-slate-400">
          Siz qidirayotgan kurs mavjud emas yoki o'chirilgan.
        </p>
        <Link to="/admin/courses" className="mt-4 inline-block text-sm font-semibold text-[#2563eb] hover:underline dark:text-blue-400">
          Kurslarga qaytish
        </Link>
      </div>
    );
  }

  const tabs = [
    { label: 'Umumiy', content: <CourseOverviewTab course={course} /> },
    { label: 'Mentor', content: <CourseMentorTab course={course} /> },
    { label: 'Guruhlar', content: <CourseGroupsTab course={course} /> },
    { label: "O'quvchilar", content: <CourseStudentsTab course={course} /> },
    { label: 'Darslar', content: <CourseLessonsTab course={course} /> },
    { label: 'Vazifalar', content: <CourseAssignmentsTab course={course} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <CourseHeader course={course} onEdit={openEditModal} />

      <CourseSummaryCard course={course} />

      <Tabs tabs={tabs} activeTab={activeTabIndex} onTabChange={setActiveTabIndex} />

      <CourseModal mode="edit" isOpen={editModalOpen} onClose={closeEditModal} onSubmit={saveCourseEdits} course={course} />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </motion.div>
  );
}
