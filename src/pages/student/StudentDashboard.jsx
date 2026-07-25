import WelcomeSection from '../../components/dashboard/WelcomeSection';
import StatCard from '../../components/dashboard/StatCard';
import { studentStats } from '../../data/studentDashboardData';

export default function StudentDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
      <WelcomeSection />

      <section aria-label="Shaxsiy statistika" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {studentStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>
    </div>
  );
}
