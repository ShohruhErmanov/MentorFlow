import { motion } from 'framer-motion';
import { TrendingUp, Users, UserX, Clock } from 'lucide-react';

const iconMap = {
  blue: Users,
  red: UserX,
  orange: Clock,
};

const toneStyles = {
  blue: {
    card: 'bg-gradient-to-br from-blue-600 to-blue-500 text-white',
    icon: 'bg-white/20 text-white',
  },
  red: {
    card: 'bg-white border border-gray-100',
    icon: 'bg-red-50 text-red-500',
  },
  orange: {
    card: 'bg-white border border-gray-100',
    icon: 'bg-orange-50 text-orange-500',
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function AttendanceStats({ stats }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {stats.map((stat) => {
        const isBlue = stat.tone === 'blue' && stat.id === 'overall';
        const Icon = stat.id === 'overall' ? TrendingUp : iconMap[stat.tone] || Users;
        const styles = isBlue ? toneStyles.blue : (toneStyles[stat.tone] || toneStyles.blue);

        return (
          <motion.div
            key={stat.id}
            variants={item}
            whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
            className={`relative rounded-2xl p-5 shadow-sm transition-shadow ${styles.card}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-semibold tracking-wide uppercase ${isBlue ? 'text-blue-100' : 'text-gray-400'}`}>
                  {stat.label}
                </p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className={`text-3xl font-extrabold leading-none ${isBlue ? '' : 'text-gray-900'}`}>
                    {stat.value}
                  </span>
                  {stat.extra && (
                    <span className={`text-sm font-medium ${isBlue ? 'text-blue-200' : 'text-gray-400'}`}>
                      {stat.extra}
                    </span>
                  )}
                </div>
                {stat.trend && (
                  <span className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${isBlue ? 'text-blue-100' : 'text-emerald-600'}`}>
                    <TrendingUp size={12} />
                    {stat.trend}
                  </span>
                )}
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}>
                <Icon size={20} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
