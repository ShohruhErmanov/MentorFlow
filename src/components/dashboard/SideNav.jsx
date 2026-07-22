import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  CheckSquare,
  ClipboardCheck,
  CalendarCheck,
  BarChart2,
  User,
  Plus,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Boshqaruv paneli' },
  { to: '/guruhlar', icon: Users, label: "Guruhlar" },
  { to: '/oquvchilar', icon: GraduationCap, label: "O'quvchilar" },
  { to: '/vazifalar', icon: ClipboardList, label: 'Vazifalar' },
  { to: '/topshirilgan', icon: CheckSquare, label: 'Topshirilgan vazifalar' },
  { to: '/tekshirish', icon: ClipboardCheck, label: 'Vazifani tekshirish' },
  { to: '/davomat', icon: CalendarCheck, label: 'Davomat' },
  { to: '/reyting', icon: BarChart2, label: 'Reyting' },
];

export default function SideNav() {
  return (
    <nav className="bg-surface border-r border-outline-variant w-[280px] h-screen fixed left-0 top-0 hidden md:flex flex-col z-50">
      <div className="flex flex-col h-full p-lg overflow-y-auto w-full">
        {/* Logo */}
        <div className="mb-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary font-semibold text-base">
            M
          </div>
          <div>
            <h1 className="text-title-lg text-on-background tracking-tight font-semibold">MentorFlow</h1>
            <p className="text-label-md text-on-surface-variant">Mentor Dashboard</p>
          </div>
        </div>

        {/* New Task Button */}
        <button className="w-full bg-primary-container text-on-background text-body-md font-medium py-2 px-4 rounded-lg mb-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Plus size={18} />
          Yangi vazifa
        </button>

        {/* Nav Links */}
        <ul className="space-y-1 flex-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-label-md font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary bg-secondary-container/50'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`
                }
              >
                <Icon size={20} />
                <span className="text-sm">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile */}
        <div className="mt-auto">
          <NavLink
            to="/profil"
            className="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors duration-200"
          >
            <User size={20} />
            <span className="text-sm font-medium">Profil</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
