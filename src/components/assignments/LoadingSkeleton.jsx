import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-6 p-4 border-b border-gray-100 dark:border-slate-700">
          <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0 dark:bg-slate-700"></div>

          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3 dark:bg-slate-700"></div>
            <div className="h-3 bg-gray-100 rounded w-1/4 dark:bg-slate-700"></div>
          </div>

          <div className="w-24 h-6 bg-gray-200 rounded-md dark:bg-slate-700"></div>
          <div className="w-32 h-4 bg-gray-200 rounded dark:bg-slate-700"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full dark:bg-slate-700"></div>
          <div className="w-12 h-4 bg-gray-200 rounded dark:bg-slate-700"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg dark:bg-slate-700"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
