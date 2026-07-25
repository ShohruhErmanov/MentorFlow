import { UserRound } from 'lucide-react';
import SidebarFrame from './SidebarFrame';
import { navigationItems } from '../../services/dashboardService';

export default function MentorSidebar({ open, onClose }) {
  return (
    <SidebarFrame
      open={open}
      onClose={onClose}
      subtitle="Mentor Dashboard"
      navigationItems={navigationItems}
      footerItems={[{ type: 'link', label: 'Profil', path: '/mentor/profile', icon: UserRound }]}
    />
  );
}
