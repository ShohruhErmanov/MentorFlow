import { Bell, Menu, Settings } from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import SearchInput from '../common/SearchInput';

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[#e1e2ed] bg-white/92 backdrop-blur-xl">
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
          <Button variant="icon" size="icon" aria-label="Bildirishnomalar">
            <Bell size={21} strokeWidth={2.1} aria-hidden="true" />
          </Button>
          <Button variant="icon" size="icon" aria-label="Sozlamalar">
            <Settings size={21} strokeWidth={2.1} aria-hidden="true" />
          </Button>
          <Avatar initials="MF" size="md" alt="Mentor profili" />
        </div>
      </div>
    </header>
  );
}
