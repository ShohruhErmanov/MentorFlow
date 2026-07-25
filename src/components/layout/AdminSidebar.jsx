import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  UsersRound,
} from 'lucide-react';
import SidebarFrame from './SidebarFrame';
import { useAuth } from '../../contexts/AuthContext';

const navigationItems = [
  { label: 'Boshqaruv paneli', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Foydalanuvchilar', path: '/admin/users', icon: Users },
  { label: 'Mentorlar', path: '/admin/mentors', icon: UsersRound },
  { label: "O'quvchilar", path: '/admin/students', icon: GraduationCap },
  { label: 'Ota-onalar', path: '/admin/parents', icon: UsersRound },
  { label: 'Guruhlar', path: '/admin/groups', icon: ClipboardList },
  { label: 'Kurslar', path: '/admin/courses', icon: BookOpen },
  { label: 'Vazifalar', path: '/admin/assignments', icon: ClipboardList },
  { label: 'Davomat', path: '/admin/attendance', icon: CalendarCheck },
  { label: "To'lovlar", path: '/admin/payments', icon: CreditCard },
  { label: 'Hisobotlar', path: '/admin/reports', icon: FileBarChart },
];

export default function AdminSidebar({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <SidebarFrame
      open={open}
      onClose={onClose}
      subtitle="ADMIN PANEL"
      navigationItems={navigationItems}
      footerItems={[
        { type: 'link', label: 'Sozlamalar', path: '/admin/settings', icon: Settings },
        { type: 'action', label: 'Chiqish', icon: LogOut, tone: 'danger', onClick: handleLogout },
      ]}
    />
  );
}
