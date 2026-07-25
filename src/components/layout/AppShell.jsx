import { Outlet } from 'react-router-dom';
import Header from './Header';

/**
 * Generic dashboard shell shared by every role layout — only the
 * sidebar component and its open/toggle/close wiring differ per role.
 */
export default function AppShell({ Sidebar, sidebarOpen, onToggleSidebar, onCloseSidebar, headerProps = {} }) {
  return (
    <div className="min-h-dvh bg-[#faf8ff] text-[#191b23] dark:bg-slate-900 dark:text-white">
      <Sidebar open={sidebarOpen} onClose={onCloseSidebar} />
      <div className="min-h-dvh lg:pl-[280px]">
        <Header onMenuClick={onToggleSidebar} {...headerProps} />
        <main className="min-h-[calc(100dvh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
