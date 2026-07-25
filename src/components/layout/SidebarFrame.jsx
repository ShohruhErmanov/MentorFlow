import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import clsx from 'clsx';

function LogoMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563eb] text-base font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)]">
      M
    </div>
  );
}

function Brand({ subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark />
      <div>
        <p className="text-[20px] font-bold leading-6 text-[#191b23] dark:text-white">MentorFlow</p>
        <p className="mt-0.5 text-xs font-medium leading-4 text-[#737686] dark:text-slate-400">{subtitle}</p>
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
            ? 'bg-[#dbe1ff] text-[#003ea8] shadow-[inset_3px_0_0_#2563eb] dark:bg-blue-500/15 dark:text-blue-300 dark:shadow-[inset_3px_0_0_#3b82f6]'
            : 'text-[#434655] hover:bg-[#f3f3fe] hover:text-[#191b23] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
        )
      }
    >
      <Icon size={20} strokeWidth={2.1} aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}

function FooterItem({ item }) {
  const Icon = item.icon;

  if (item.type === 'action') {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={clsx(
          'flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold transition-colors',
          item.tone === 'danger'
            ? 'text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10'
            : 'text-[#434655] hover:bg-[#f3f3fe] hover:text-[#191b23] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
        )}
      >
        <Icon size={20} strokeWidth={2.1} aria-hidden="true" />
        {item.label}
      </button>
    );
  }

  return (
    <NavLink
      to={item.path}
      className="flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-[#434655] transition-colors hover:bg-[#f3f3fe] hover:text-[#191b23] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      <Icon size={20} strokeWidth={2.1} aria-hidden="true" />
      {item.label}
    </NavLink>
  );
}

/**
 * Shared chrome (backdrop, aside shell, brand, nav list, optional footer items)
 * reused by every role-specific sidebar so each one only supplies its own data.
 */
export default function SidebarFrame({ open = false, onClose, subtitle, navigationItems, footerItems }) {
  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-[#191b23]/35 backdrop-blur-sm transition-opacity lg:hidden dark:bg-black/60',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 flex h-dvh w-[280px] flex-col border-r border-[#e1e2ed] bg-white transition-transform duration-300 lg:translate-x-0 dark:border-slate-800 dark:bg-gray-900',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Asosiy navigatsiya"
      >
        <div className="flex h-full flex-col px-6 py-6">
          <div className="flex items-start justify-between">
            <Brand subtitle={subtitle} />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#434655] hover:bg-[#f3f3fe] lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
              onClick={onClose}
              aria-label="Menyuni yopish"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-8 flex-1 overflow-y-auto" aria-label="Asosiy bo'limlar">
            <ul className="space-y-1.5">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <NavigationItem item={item} />
                </li>
              ))}
            </ul>
          </nav>

          {footerItems?.length > 0 && (
            <div className="space-y-1 border-t border-[#e1e2ed] pt-4 dark:border-slate-800">
              {footerItems.map((item) => (
                <FooterItem key={item.label} item={item} />
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
