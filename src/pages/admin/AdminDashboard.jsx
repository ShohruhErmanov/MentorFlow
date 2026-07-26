import { useEffect, useState } from 'react';
import AdminWelcomeHeader from '../../components/admin/AdminWelcomeHeader';
import AdminStatCard from '../../components/admin/AdminStatCard';
import StudentGrowthChart from '../../components/admin/StudentGrowthChart';
import RevenueDonutChart from '../../components/admin/RevenueDonutChart';
import RecentPaymentsTable from '../../components/admin/RecentPaymentsTable';
import PendingAssignmentsList from '../../components/admin/PendingAssignmentsList';
import AdminDashboardSkeleton from '../../components/admin/AdminDashboardSkeleton';
import AddUserModal from '../../components/admin/AddUserModal';
import AddGroupModal from '../../components/admin/AddGroupModal';
import AddCourseModal from '../../components/admin/AddCourseModal';
import Toast from '../../components/ui/Toast';
import { adminActivityCount, buildAdminStats } from '../../data/adminDashboardData';
import { useAdminQuickActions } from '../../hooks/admin/useAdminQuickActions';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const {
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
  } = useAdminQuickActions();

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
        <AdminDashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
      <AdminWelcomeHeader
        activityCount={adminActivityCount}
        onAddUser={openUserModal}
        onAddGroup={openGroupModal}
        onAddCourse={openCourseModal}
      />

      <section aria-label="Tizim statistikasi" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {buildAdminStats(stats).map((stat) => (
          <AdminStatCard key={stat.id} {...stat} />
        ))}
      </section>

      <section
        aria-label="O'quvchilar o'sishi va tushumlar tahlili"
        className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"
      >
        <StudentGrowthChart />
        <RevenueDonutChart />
      </section>

      <section aria-label="To'lovlar va tekshirilishi kerak bo'lgan vazifalar" className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentPaymentsTable />
        <PendingAssignmentsList />
      </section>

      <AddUserModal
        isOpen={activeModal === 'user'}
        onClose={closeModal}
        onCreate={addUser}
        existingUsernames={existingUsernames}
      />
      <AddGroupModal
        isOpen={activeModal === 'group'}
        onClose={closeModal}
        onCreate={addGroup}
        mentorOptions={mentorDirectory}
        courseOptions={courseDirectory}
      />
      <AddCourseModal
        isOpen={activeModal === 'course'}
        onClose={closeModal}
        onCreate={addCourse}
        mentorOptions={mentorDirectory}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
    </div>
  );
}
