import { NavLink } from 'react-router-dom';
import { Plus, UserRound, X } from 'lucide-react';
import clsx from 'clsx';
import Button from '../ui/Button';
import { navigationItems } from '../../services/dashboardService';

function LogoMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563eb] text-base font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)]">
      M
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <LogoMark />
      <div>
        <p className="text-[20px] font-bold leading-6 text-[#191b23]">MentorFlow</p>
        <p className="mt-0.5 text-xs font-medium leading-4 text-[#737686]">Mentor Dashboard</p>
      </div>
    </div>
  );
}

function NavigationItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        clsx(
          'group flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors',
          isActive
            ? 'bg-[#dbe1ff] text-[#003ea8] shadow-[inset_3px_0_0_#2563eb]'
            : 'text-[#434655] hover:bg-[#f3f3fe] hover:text-[#191b23]',
        )
      }
    >
      <Icon size={20} strokeWidth={2.1} aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}

export default function Sidebar({ open = false, onClose }) {
  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-[#191b23]/35 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 flex h-dvh w-[280px] flex-col border-r border-[#e1e2ed] bg-white transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Mentor navigatsiyasi"
      >
        <div className="flex h-full flex-col px-6 py-6">
          <div className="flex items-start justify-between">
            <Brand />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#434655] hover:bg-[#f3f3fe] lg:hidden"
              onClick={onClose}
              aria-label="Menyuni yopish"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <Button className="mt-8 h-12 w-full justify-center rounded-lg text-[15px]" aria-label="Yangi vazifa yaratish">
            <Plus size={19} strokeWidth={2.2} aria-hidden="true" />
            Yangi vazifa
          </Button>

          <nav className="mt-8 flex-1" aria-label="Asosiy bo'limlar">
            <ul className="space-y-1.5">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <NavigationItem item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-[#e1e2ed] pt-4">
            <NavLink
              to="/mentor/profile"
              className="flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-[#434655] transition-colors hover:bg-[#f3f3fe] hover:text-[#191b23]"
            >
              <UserRound size={20} strokeWidth={2.1} aria-hidden="true" />
              Profil
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}
