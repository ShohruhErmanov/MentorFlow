import WelcomeSection from '../../components/dashboard/WelcomeSection';
import StatCard from '../../components/dashboard/StatCard';
import { parentStats } from '../../data/parentDashboardData';

export default function ParentDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
      <WelcomeSection />

      <section aria-label="Farzand statistikasi" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {parentStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>
    </div>
  );
}
