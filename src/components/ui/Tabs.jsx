import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Tabs({ tabs = [], defaultTab = 0, activeTab: controlledActiveTab, onTabChange }) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab);
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (idx) => {
    if (!isControlled) setInternalActiveTab(idx);
    onTabChange?.(idx);
  };

  return (
    <div className="w-full">
      <div role="tablist" className="flex w-full gap-2 overflow-x-auto border-b border-[#e1e2ed] dark:border-slate-700 scrollbar-hide">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={activeTab === idx}
            onClick={() => handleTabClick(idx)}
            className={clsx(
              'relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap',
              activeTab === idx
                ? 'text-[#2563eb] dark:text-blue-400'
                : 'text-[#737686] hover:text-[#191b23] dark:text-slate-400 dark:hover:text-white'
            )}
          >
            {tab.label}
            {activeTab === idx && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb] dark:bg-blue-400"
              />
            )}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
