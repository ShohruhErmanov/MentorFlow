import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { studentGrowthData } from '../../data/adminDashboardData';
import { useTheme } from '../../hooks/useTheme';

function TooltipContent({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg bg-[#191b23] px-3 py-2 text-xs font-semibold text-white shadow-lg dark:bg-slate-900">
      {label}: {payload[0].value}
    </div>
  );
}

export default function StudentGrowthChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const barFill = isDark ? '#3b82f6' : '#2563eb';
  const gridStroke = isDark ? '#334155' : '#e1e2ed';
  const tickColor = isDark ? '#94a3b8' : '#737686';
  const cursorFill = isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(37, 99, 235, 0.06)';

  return (
    <Card className="min-h-[436px] p-5 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[20px] font-bold leading-7 tracking-[0] text-[#191b23] dark:text-white">
          O'sish dinamikasi (O'quvchilar)
        </h2>
        <Badge variant="neutral" className="h-9 self-start rounded-full px-4 text-[13px] sm:self-auto">
          Oxirgi 6 oy
        </Badge>
      </div>

      <div className="h-[330px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={studentGrowthData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barSize={38}>
            <CartesianGrid vertical={false} stroke={gridStroke} strokeDasharray="0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip content={<TooltipContent />} cursor={{ fill: cursorFill }} />
            <Bar dataKey="students" fill={barFill} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
