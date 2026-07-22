import { ChevronDown } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../common/Card';
import { weeklyPerformance } from '../../services/dashboardService';

function TooltipContent({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg bg-[#191b23] px-3 py-2 text-xs font-semibold text-white shadow-lg">
      {label}: {payload[0].value}
    </div>
  );
}

export default function WeeklyPerformanceChart() {
  return (
    <Card className="min-h-[436px] p-5 sm:p-6 xl:col-span-1">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[20px] font-bold leading-7 tracking-[0] text-[#191b23]">
          Haftalik unumdorlik
        </h2>
        <label className="relative inline-flex w-full sm:w-auto">
          <span className="sr-only">Diagramma turi</span>
          <select
            className="h-10 w-full appearance-none rounded-lg border border-[#e1e2ed] bg-[#f7f8ff] pl-3 pr-10 text-sm font-semibold text-[#434655] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 sm:w-[210px]"
            defaultValue="activity"
          >
            <option value="activity">O'quvchilar faolligi</option>
          </select>
          <ChevronDown
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737686]"
          />
        </label>
      </div>

      <div className="h-[330px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyPerformance} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barSize={34}>
            <CartesianGrid vertical={false} stroke="#e1e2ed" strokeDasharray="0" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tick={{ fill: '#737686', fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: '#737686', fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip content={<TooltipContent />} cursor={{ fill: 'rgba(37, 99, 235, 0.06)' }} />
            <Bar dataKey="activity" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
