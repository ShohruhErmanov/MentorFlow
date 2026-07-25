import AppShell from '../components/layout/AppShell';
import ParentSidebar from '../components/layout/ParentSidebar';
import { useSidebar } from '../hooks/useSidebar';

export default function ParentLayout() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <AppShell
      Sidebar={ParentSidebar}
      sidebarOpen={isOpen}
      onToggleSidebar={toggle}
      onCloseSidebar={close}
    />
  );
}
