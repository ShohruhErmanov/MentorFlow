import { useEffect, useState } from 'react';
import AdminWelcomeHeader from '../../components/admin/AdminWelcomeHeader';
import AdminStatCard from '../../components/admin/AdminStatCard';
import StudentGrowthChart from '../../components/admin/StudentGrowthChart';
import RevenueDonutChart from '../../components/admin/RevenueDonutChart';
import RecentPaymentsTable from '../../components/admin/RecentPaymentsTable';
import PendingAssignmentsList from '../../components/admin/PendingAssignmentsList';
import AdminDashboardSkeleton from '../../components/admin/AdminDashboardSkeleton';
import { adminActivityCount, adminStats } from '../../data/adminDashboardData';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
        <AdminDashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
      <AdminWelcomeHeader activityCount={adminActivityCount} />

      <section aria-label="Tizim statistikasi" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {adminStats.map((stat) => (
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
    </div>
  );
}
