import { motion } from 'framer-motion';

/** Single resource row card */
export default function ResourceItem({ resource, onClick }) {
  const icons = {
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#24292f]">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    vercel: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
    figma: (
      <svg viewBox="0 0 38 57" fill="none" className="w-5 h-7">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.51 9.51 0 0 1 19 28.5z" fill="#1ABCFE"/>
        <path d="M9.5 57A9.5 9.5 0 0 1 9.5 38h9.5v9.5A9.5 9.5 0 0 1 9.5 57z" fill="#0ACF83"/>
        <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#A259FF"/>
        <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E"/>
        <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" fill="#FF7262"/>
      </svg>
    ),
    pdf: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-red-500">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-100 hover:shadow-sm transition-all cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:hover:border-blue-500/30"
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 dark:bg-slate-900">
        {icons[resource.type] ?? icons.pdf}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-sm dark:text-slate-100">{resource.title}</p>
        <p className="text-xs text-gray-500 truncate dark:text-slate-400">{resource.subtitle}</p>
      </div>
      <button className="h-8 px-4 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors shrink-0 dark:text-blue-400 dark:bg-blue-500/10 dark:hover:bg-blue-500/20">
        Ochish
      </button>
    </motion.div>
  );
}
