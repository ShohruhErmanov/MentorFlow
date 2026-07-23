import { Bell, Settings, Search } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="h-[72px] sticky top-0 z-40 backdrop-blur-md bg-surface/80 border-b border-outline-variant">
      <div className="flex justify-between items-center w-full h-full px-lg">
        {/* Brand name (desktop only) */}
        <div className="text-headline-md font-semibold text-primary hidden md:block">
          MentorFlow
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              placeholder="Qidirish..."
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-all">
            <Bell size={22} />
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-all">
            <Settings size={22} />
          </button>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-secondary-container overflow-hidden border border-outline-variant flex items-center justify-center text-on-secondary-container font-semibold text-sm">
              <User size={22} />
          </div>
        </div>
      </div>
    </header>
  );
}
