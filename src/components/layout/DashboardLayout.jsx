import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useDashboard } from '../../hooks/useDashboard';

export default function DashboardLayout() {
  const { sidebarOpen, closeSidebar, toggleSidebar } = useDashboard();

  return (
    <div className="min-h-dvh bg-[#faf8ff] text-[#191b23] dark:bg-slate-900 dark:text-white">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="min-h-dvh lg:pl-[280px]">
        <Header onMenuClick={toggleSidebar} />
        <main className="min-h-[calc(100dvh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
