import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Tabs({ tabs = [] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex w-full gap-2 overflow-x-auto border-b border-[#e1e2ed] scrollbar-hide">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={clsx(
              'relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap',
              activeTab === idx ? 'text-[#2563eb]' : 'text-[#737686] hover:text-[#191b23]'
            )}
          >
            {tab.label}
            {activeTab === idx && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb]"
              />
            )}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
