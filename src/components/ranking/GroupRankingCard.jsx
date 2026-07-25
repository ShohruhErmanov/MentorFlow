import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const colorMap = {
  blue: {
    bar: 'bg-gradient-to-r from-blue-500 to-blue-400',
    xp: 'text-blue-600',
  },
  orange: {
    bar: 'bg-gradient-to-r from-orange-500 to-amber-400',
    xp: 'text-orange-600',
  },
  green: {
    bar: 'bg-gradient-to-r from-emerald-500 to-green-400',
    xp: 'text-emerald-600',
  },
};

function GroupBar({ group, index }) {
  const pct = Math.round((group.xp / group.maxXp) * 100);
  const cfg = colorMap[group.color] ?? colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-800 dark:text-white">{group.name}</span>
        <span className={['font-bold', cfg.xp].join(' ')}>
          {group.xp.toLocaleString()} XP
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-700">
        <motion.div
          className={['h-full rounded-full', cfg.bar].join(' ')}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function GroupRankingCard({ groups }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-2 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
          <Users size={18} className="text-blue-600" />
        </div>
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Guruhlar Kesimida</h2>
      </div>

      <div className="space-y-5">
        {groups.map((group, i) => (
          <GroupBar key={group.id} group={group} index={i} />
        ))}
      </div>
    </div>
  );
}
