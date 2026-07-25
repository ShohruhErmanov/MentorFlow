import { Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssignmentPreviewCard({ previewImage, onOpen }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Vazifa ko'rinishi</h2>
        <button
          onClick={onOpen}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-slate-700"
          title="To'liq ekranda ko'rish"
        >
          <Maximize2 size={16} />
        </button>
      </div>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="relative cursor-pointer overflow-hidden bg-gray-100 dark:bg-slate-900"
        onClick={onOpen}
      >
        <img
          src={previewImage}
          alt="Vazifa preview"
          className="w-full h-[280px] object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="hidden w-full h-[280px] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900"
          style={{ display: 'none' }}
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-3 dark:bg-blue-500/10">
              <Maximize2 size={28} className="text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-gray-400 text-sm dark:text-slate-500">Preview mavjud emas</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
