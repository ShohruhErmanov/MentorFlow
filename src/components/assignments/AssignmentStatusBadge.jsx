import React from 'react';

const statusConfig = {
  'FAOL': { color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400', dot: 'bg-blue-500' },
  'TEKSHIRILMOQDA': { color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400', dot: 'bg-orange-500' },
  'QABUL QILINDI': { color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'YAKUNLANGAN': { color: 'bg-gray-100 text-gray-700 dark:bg-slate-500/10 dark:text-slate-400', dot: 'bg-gray-400' },
  'KECHIKKAN': { color: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400', dot: 'bg-red-500' },
};

const AssignmentStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig['FAOL'];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {status}
    </span>
  );
};

export default AssignmentStatusBadge;
