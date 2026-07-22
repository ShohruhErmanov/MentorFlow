import {
  ClipboardList,
  ClipboardCheck,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import MetricCard from './MetricCard';
import WeeklyPerformanceChart from './WeeklyPerformanceChart';
import FeedAndDeadlines from './FeedAndDeadlines';

const metrics = [
  {
    label: 'Bugungi vazifalar',
    value: '24',
    subLabel: '12%',
    isTrending: true,
    icon: ClipboardList,
    iconColor: 'text-primary',
  },
  {
    label: 'Tekshirilishi kerak',
    value: '18',
    subLabel: 'Kutilyapti',
    icon: ClipboardCheck,
    iconColor: 'text-tertiary-container',
  },
  {
    label: 'Kechikkan vazifalar',
    value: '5',
    subLabel: 'Shoshilinch',
    isUrgent: true,
    icon: AlertTriangle,
    iconColor: 'text-error',
  },
  {
    label: 'Bugungi darslar',
    value: '3',
    subLabel: 'Guruhlar',
    icon: BookOpen,
    iconColor: 'text-secondary',
  },
];

export default function DashboardContent() {
  return (
    <main className="flex-1 p-md md:p-lg lg:p-xl space-y-xl max-w-[1440px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-lg">
        <div>
          <h2 className="text-2xl md:text-headline-lg font-semibold text-on-background mb-xs tracking-tight">
            Boshqaruv paneli
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Xush kelibsiz! Bugungi holat bilan tanishing.
          </p>
        </div>
        <div className="self-start sm:self-auto text-label-md font-medium text-secondary bg-surface-container px-3 py-1 rounded-full border border-outline-variant whitespace-nowrap">
          Sentyabr 24, 2024
        </div>
      </div>

      {/* Bento Grid — Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </section>

      {/* Chart + Feed/Deadlines */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyPerformanceChart />
        <FeedAndDeadlines />
      </section>
    </main>
  );
}
