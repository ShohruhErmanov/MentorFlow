import { useState } from 'react';
import { motion } from 'framer-motion';

const statusColor = {
  present: 'bg-blue-500',
  late: 'bg-orange-400',
  absent: 'bg-red-500',
};

export default function AttendanceCalendar({ weekDays, days }) {
  const [selectedDay, setSelectedDay] = useState(7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      {/* Title + Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="text-lg font-bold text-gray-900">Oylik Kalendar</h3>
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Kelgan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Yo'q
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-400" /> Kechikkan
          </span>
        </div>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((cell, i) => {
          if (cell.day === null) {
            return <div key={`empty-${i}`} className="aspect-square" />;
          }

          const isSelected = cell.day === selectedDay;
          const hasDot = !!cell.status;

          return (
            <motion.button
              key={cell.day}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(cell.day)}
              className={`
                relative flex flex-col items-center justify-center aspect-square rounded-xl text-sm font-semibold transition-colors
                ${isSelected
                  ? 'border-2 border-blue-500 bg-blue-50 text-blue-700'
                  : 'border border-transparent text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {cell.day}
              {hasDot && (
                <span className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${statusColor[cell.status]}`} />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
