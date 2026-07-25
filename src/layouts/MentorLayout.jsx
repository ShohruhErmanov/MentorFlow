import AppShell from '../components/layout/AppShell';
import MentorSidebar from '../components/layout/MentorSidebar';
import { useSidebar } from '../hooks/useSidebar';

export default function MentorLayout() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <AppShell
      Sidebar={MentorSidebar}
      sidebarOpen={isOpen}
      onToggleSidebar={toggle}
      onCloseSidebar={close}
    />
  );
}
