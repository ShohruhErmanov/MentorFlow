import AppShell from '../components/layout/AppShell';
import StudentSidebar from '../components/layout/StudentSidebar';
import { useSidebar } from '../hooks/useSidebar';

export default function StudentLayout() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <AppShell
      Sidebar={StudentSidebar}
      sidebarOpen={isOpen}
      onToggleSidebar={toggle}
      onCloseSidebar={close}
    />
  );
}
