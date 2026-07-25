import { Bell, Menu, Settings } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import SearchInput from '../ui/SearchInput';

const defaultActionIcons = [
  { icon: Bell, label: 'Bildirishnomalar' },
  { icon: Settings, label: 'Sozlamalar' },
];

export default function Header({ onMenuClick, actionIcons = defaultActionIcons, user }) {
  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[#e1e2ed] bg-white/92 backdrop-blur-xl dark:border-slate-800 dark:bg-gray-900/92">
      <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Button
          variant="icon"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Menyuni ochish"
        >
          <Menu size={22} aria-hidden="true" />
        </Button>

        <div className="min-w-0 flex-1">
          <SearchInput placeholder="Qidirish..." className="max-w-[440px]" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {actionIcons.map(({ icon: Icon, label, dot }) => (
            <Button key={label} variant="icon" size="icon" className="relative" aria-label={label}>
              <Icon size={21} strokeWidth={2.1} aria-hidden="true" />
              {dot && (
                <span
                  className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"
                  aria-hidden="true"
                />
              )}
            </Button>
          ))}

          {user && (
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-sm font-bold text-[#191b23] dark:text-white">{user.name}</p>
              <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{user.role}</p>
            </div>
          )}
          <Avatar initials={user?.initials ?? 'MF'} size="md" alt={user ? `${user.name} profili` : 'Mentor profili'} />
        </div>
      </div>
    </header>
  );
}
