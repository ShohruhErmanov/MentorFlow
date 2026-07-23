import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingCreateButton = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-full shadow-lg shadow-blue-500/30 transition-colors"
    >
      <Plus className="w-5 h-5" />
      <span className="font-medium">Yangi vazifa</span>
    </motion.button>
  );
};

export default FloatingCreateButton;
