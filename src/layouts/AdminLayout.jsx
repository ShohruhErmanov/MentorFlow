import { Bell, Calendar, Mail } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import AdminSidebar from '../components/layout/AdminSidebar';
import { useSidebar } from '../hooks/useSidebar';
import { useAuth } from '../contexts/AuthContext';
import { getRoleLabel } from '../routes/roleRoutes';

const adminActionIcons = [
  { icon: Bell, label: 'Bildirishnomalar', dot: true },
  { icon: Mail, label: 'Xabarlar' },
  { icon: Calendar, label: 'Kalendar' },
];

export default function AdminLayout() {
  const { isOpen, toggle, close } = useSidebar();
  const { user } = useAuth();

  const headerProps = {
    actionIcons: adminActionIcons,
    user: {
      name: user?.name ?? 'Administrator',
      role: getRoleLabel(user?.role ?? 'admin'),
      initials: (user?.name ?? 'A').charAt(0).toUpperCase(),
    },
  };

  return (
    <AppShell
      Sidebar={AdminSidebar}
      sidebarOpen={isOpen}
      onToggleSidebar={toggle}
      onCloseSidebar={close}
      headerProps={headerProps}
    />
  );
}
