import { Users, GraduationCap, TrendingUp, CalendarCheck } from 'lucide-react';

export default function SummaryCards({ totalGroups, totalStudents, averageAttendance, averageProgress }) {
  const summaries = [
    {
      title: 'Umumiy guruhlar',
      value: totalGroups,
      icon: Users,
      color: 'bg-[#e0e7ff] text-[#4338ca] dark:bg-indigo-500/10 dark:text-indigo-400',
    },
    {
      title: "Umumiy o'quvchilar",
      value: totalStudents,
      icon: GraduationCap,
      color: 'bg-[#dbeafe] text-[#1d4ed8] dark:bg-blue-500/10 dark:text-blue-400',
    },
    {
      title: "O'rtacha davomat",
      value: `${averageAttendance}%`,
      icon: CalendarCheck,
      color: 'bg-[#dcfce7] text-[#15803d] dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
      title: "O'rtacha o'zlashtirish",
      value: `${averageProgress}%`,
      icon: TrendingUp,
      color: 'bg-[#fef3c7] text-[#b45309] dark:bg-amber-500/10 dark:text-amber-400',
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {summaries.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="flex items-center gap-4 rounded-[20px] bg-white p-5 shadow-[0_4px_12px_rgba(25,27,35,0.02)] border border-[#e1e2ed] dark:bg-slate-800 dark:border-slate-700">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#737686] dark:text-slate-400">{item.title}</div>
              <div className="text-xl font-bold text-[#191b23] dark:text-white">{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
