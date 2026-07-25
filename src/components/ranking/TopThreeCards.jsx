import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const medalConfig = {
  gold: {
    border: 'border-yellow-400 dark:border-yellow-500',
    shadow: 'shadow-yellow-200 dark:shadow-yellow-900/30',
    badge: 'bg-yellow-400 text-white dark:bg-yellow-500',
    xpColor: 'text-blue-600',
    avatarRing: 'ring-4 ring-yellow-400 dark:ring-yellow-500',
    trophyColor: 'text-yellow-500 dark:text-yellow-400',
    bg: 'bg-white dark:bg-slate-800',
    scale: true,
  },
  silver: {
    border: 'border-gray-300 dark:border-slate-600',
    shadow: 'shadow-gray-200 dark:shadow-slate-900/30',
    badge: 'bg-gray-400 text-white dark:bg-slate-500',
    xpColor: 'text-blue-600',
    avatarRing: 'ring-4 ring-gray-300 dark:ring-slate-500',
    trophyColor: 'text-gray-400 dark:text-slate-400',
    bg: 'bg-white dark:bg-slate-800',
    scale: false,
  },
  bronze: {
    border: 'border-orange-400 dark:border-orange-500',
    shadow: 'shadow-orange-100 dark:shadow-orange-900/20',
    badge: 'bg-orange-400 text-white dark:bg-orange-500',
    xpColor: 'text-blue-600',
    avatarRing: 'ring-4 ring-orange-300 dark:ring-orange-500',
    trophyColor: 'text-orange-500 dark:text-orange-400',
    bg: 'bg-white dark:bg-slate-800',
    scale: false,
  },
};

function PodiumCard({ student, delay = 0 }) {
  const cfg = medalConfig[student.medal];
  const isFirst = student.medal === 'gold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      className={[
        'relative flex flex-col items-center rounded-3xl border-2 bg-white px-6 py-8 text-center transition-all duration-300 dark:bg-slate-800',
        cfg.border,
        isFirst
          ? 'shadow-xl shadow-blue-100/60 z-10'
          : 'shadow-md shadow-gray-100 dark:shadow-slate-900/30',
        isFirst ? 'pt-14' : 'pt-10',
      ].join(' ')}
    >
      {/* Rank badge */}
      <div
        className={[
          'absolute -top-4 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold shadow-md',
          cfg.badge,
        ].join(' ')}
      >
        {student.rank}
      </div>

      {/* Trophy for 1st place */}
      {isFirst && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50 shadow-lg shadow-yellow-200/60 dark:bg-yellow-900/30 dark:shadow-yellow-900/20">
            <Trophy size={28} className={cfg.trophyColor} fill="currentColor" />
          </div>
        </div>
      )}

      {/* Avatar */}
      <div
        className={[
          'flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white',
          cfg.avatarRing,
          isFirst ? 'h-24 w-24 text-2xl' : '',
        ].join(' ')}
        style={{ backgroundColor: student.avatarColor }}
      >
        {student.initials}
      </div>

      {/* Info */}
      <p className={['mt-4 font-bold text-gray-900 dark:text-white', isFirst ? 'text-lg' : 'text-base'].join(' ')}>
        {student.name}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{student.group}</p>

      {/* XP */}
      <div
        className={[
          'mt-4 rounded-xl px-4 py-2',
          isFirst ? 'bg-blue-50' : 'bg-gray-50 dark:bg-slate-700',
        ].join(' ')}
      >
        <span className={['text-lg font-extrabold', cfg.xpColor].join(' ')}>
          {student.xp.toLocaleString()}{' '}
          <span className="text-xs font-semibold text-gray-400 dark:text-slate-400">XP</span>
        </span>
      </div>
    </motion.div>
  );
}

export default function TopThreeCards({ topThree }) {
  // Order: 2nd | 1st | 3rd
  const ordered = [topThree[1], topThree[0], topThree[2]];
  const delays = [0.15, 0, 0.3];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:items-end">
      {ordered.map((student, i) => (
        <PodiumCard key={student.id} student={student} delay={delays[i]} />
      ))}
    </div>
  );
}
