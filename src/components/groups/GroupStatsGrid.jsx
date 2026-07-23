import { motion } from 'framer-motion';
import { Users, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';

export default function GroupStatsGrid({ group }) {
  if (!group) return null;

  const stats = [
    {
      label: "Jami o'quvchilar",
      value: `${group.students?.count || 0} ta`,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Faol vazifalar",
      value: "3 ta", // Mocked for now as per requirement
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      label: "O'rtacha o'zlashtirish",
      value: `${group.progress || 0}%`,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      label: "Qarzdorlar",
      value: "2 ta", // Mocked for now as per requirement
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-100",
    }
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <Card className="flex items-center gap-4 p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 rounded-[24px]">
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${stat.bg}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#737686]">{stat.label}</p>
              <h3 className="text-xl font-bold text-[#191b23]">{stat.value}</h3>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
