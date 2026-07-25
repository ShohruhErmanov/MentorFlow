import { motion } from 'framer-motion';

const TABS = [
  { id: 'assignments', label: 'Joriy vazifalar' },
  { id: 'performance', label: "O'zlashtirish" },
  { id: 'achievements', label: 'Yutuqlar' }
];

export default function StudentTabs({ activeTab, onTabChange }) {
  return (
    <div className="border-b border-[#f3f4f6] dark:border-slate-700">
      <nav className="-mb-px flex space-x-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative py-5 px-4 text-[17px] font-bold transition-colors ${
                isActive ? 'text-[#2563eb]' : 'text-[#737686] dark:text-slate-400 hover:text-[#191b23] dark:hover:text-white'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabProfile"
                  className="absolute bottom-[-1px] left-2 right-2 h-[3px] rounded-t-full bg-[#2563eb]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
