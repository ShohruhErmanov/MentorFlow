import ActivityCard from '../../components/dashboard/ActivityCard';
import StatCard from '../../components/dashboard/StatCard';
import UpcomingDeadlines from '../../components/dashboard/UpcomingDeadlines';
import WeeklyPerformanceChart from '../../components/dashboard/WeeklyPerformanceChart';
import WelcomeSection from '../../components/dashboard/WelcomeSection';
import { stats } from '../../services/dashboardService';

export default function MentorDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
      <WelcomeSection />

      <section aria-label="Bugungi statistika" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]" aria-label="Asosiy ko'rsatkichlar">
        <WeeklyPerformanceChart />
        <aside className="grid gap-6 xl:block xl:space-y-6">
          <ActivityCard />
          <UpcomingDeadlines />
        </aside>
      </section>
    </div>
  );
}
