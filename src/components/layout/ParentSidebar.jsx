import { LayoutDashboard } from 'lucide-react';
import SidebarFrame from './SidebarFrame';

const navigationItems = [
  { label: 'Boshqaruv paneli', path: '/parent/dashboard', icon: LayoutDashboard },
];

export default function ParentSidebar({ open, onClose }) {
  return (
    <SidebarFrame
      open={open}
      onClose={onClose}
      subtitle="Parent Dashboard"
      navigationItems={navigationItems}
    />
  );
}
