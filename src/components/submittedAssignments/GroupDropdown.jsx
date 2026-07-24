import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const options = [
  'Barcha guruhlar',
  'Frontend',
  'Backend',
  'Mobile',
  'Design',
  'Cyber Security'
];

export default function GroupDropdown({ selectedGroup, setSelectedGroup }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 h-10 px-4 min-w-[160px] border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        <span className="truncate">{selectedGroup}</span>
        <ChevronDown size={18} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 left-0 w-full min-w-[160px] bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden z-10"
          >
            {options.map((option) => (
              <button
                key={option}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  selectedGroup === option
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedGroup(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
