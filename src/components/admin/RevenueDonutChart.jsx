import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../ui/Card';
import { revenueBreakdown, revenueTotalLabel } from '../../data/adminDashboardData';

function TooltipContent({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }
  const { label, percent } = payload[0].payload;

  return (
    <div className="rounded-lg bg-[#191b23] px-3 py-2 text-xs font-semibold text-white shadow-lg dark:bg-slate-900">
      {label}: {percent}%
    </div>
  );
}

export default function RevenueDonutChart() {
  return (
    <Card className="min-h-[436px] p-5 sm:p-6">
      <h2 className="mb-6 text-[20px] font-bold leading-7 tracking-[0] text-[#191b23] dark:text-white">
        Tushumlar tahlili
      </h2>

      <div className="relative h-[190px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenueBreakdown}
              dataKey="percent"
              nameKey="label"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              stroke="none"
            >
              {revenueBreakdown.map((segment) => (
                <Cell key={segment.label} fill={segment.color} />
              ))}
            </Pie>
            <Tooltip content={<TooltipContent />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-[#737686] dark:text-slate-400">Jami</span>
          <span className="text-2xl font-bold text-[#191b23] dark:text-white">{revenueTotalLabel}</span>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {revenueBreakdown.map((segment) => (
          <li key={segment.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium text-[#434655] dark:text-slate-300">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: segment.color }}
                aria-hidden="true"
              />
              {segment.label}
            </span>
            <span className="font-bold text-[#191b23] dark:text-white">{segment.percent}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
