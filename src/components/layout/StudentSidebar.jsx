import { LayoutDashboard } from 'lucide-react';
import SidebarFrame from './SidebarFrame';

const navigationItems = [
  { label: 'Boshqaruv paneli', path: '/student/dashboard', icon: LayoutDashboard },
];

export default function StudentSidebar({ open, onClose }) {
  return (
    <SidebarFrame
      open={open}
      onClose={onClose}
      subtitle="Student Dashboard"
      navigationItems={navigationItems}
    />
  );
}
