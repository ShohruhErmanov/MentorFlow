import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function GroupTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'students', label: "O'quvchilar" },
    { id: 'tasks', label: "Vazifalar" },
    { id: 'attendance', label: "Davomat" },
    { id: 'rating', label: "Reyting" },
  ];

  return (
    <div className="mb-6 flex gap-6 border-b border-[#e1e2ed] dark:border-slate-700 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'relative pb-4 text-sm font-semibold transition-colors whitespace-nowrap',
            activeTab === tab.id ? 'text-[#2563eb]' : 'text-[#737686] hover:text-[#191b23] dark:text-slate-400 dark:hover:text-white'
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="groupDetailsTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb]"
            />
          )}
        </button>
      ))}
    </div>
  );
}
