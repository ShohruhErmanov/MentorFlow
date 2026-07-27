import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../../ui/Card';
import AdminStatCard from '../AdminStatCard';
import { CalendarClock, CheckCircle2, Percent } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-[#191b23] px-3 py-2 text-xs font-semibold text-white shadow-lg dark:bg-slate-900">
      {label}: {payload[0].value}
    </div>
  );
}

export default function StatisticsCharts({ submissions, maxScore, stats }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const gridStroke = isDark ? '#334155' : '#e1e2ed';
  const tickColor = isDark ? '#94a3b8' : '#737686';

  const submissionChartData = useMemo(
    () => [
      { label: "O'z vaqtida", value: submissions.filter((s) => s.status === 'onTime').length, fill: '#20834a' },
      { label: 'Kechikib', value: submissions.filter((s) => s.status === 'late').length, fill: '#ba1a1a' },
      { label: 'Kutilmoqda', value: submissions.filter((s) => s.status === 'pending').length, fill: '#bc4800' },
    ],
    [submissions],
  );

  const gradeDistributionData = useMemo(() => {
    const buckets = [
      { label: '0-59%', min: 0, max: 0.59 },
      { label: '60-69%', min: 0.6, max: 0.69 },
      { label: '70-79%', min: 0.7, max: 0.79 },
      { label: '80-89%', min: 0.8, max: 0.89 },
      { label: '90-100%', min: 0.9, max: 1 },
    ];
    const graded = submissions.filter((s) => s.score !== null);

    return buckets.map((bucket) => ({
      label: bucket.label,
      value: graded.filter((s) => {
        const ratio = s.score / maxScore;
        return ratio >= bucket.min && ratio <= bucket.max;
      }).length,
    }));
  }, [submissions, maxScore]);

  return (
    <div className="space-y-6">
      <section aria-label="Umumiy ko'rsatkichlar" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard label="Bajarilish darajasi" value={`${Math.round((stats.submittedCount / stats.totalCount) * 100) || 0}%`} icon={CheckCircle2} tone="green" />
        <AdminStatCard label="Kechikkan topshiriqlar" value={String(stats.lateCount)} icon={CalendarClock} tone="orange" />
        <AdminStatCard label="O'rtacha ball" value={`${stats.avgScore.toFixed(1)} / ${maxScore}`} icon={Percent} tone="blue" />
      </section>

      <Card className="p-6">
        <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">Topshirish holati</h3>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={submissionChartData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barSize={48}>
              <CartesianGrid vertical={false} stroke={gridStroke} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={12} tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tickMargin={8} allowDecimals={false} tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.06)' }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {submissionChartData.map((entry) => (
                  <Cell key={entry.label} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">Baholar taqsimoti</h3>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeDistributionData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barSize={40}>
              <CartesianGrid vertical={false} stroke={gridStroke} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={12} tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tickMargin={8} allowDecimals={false} tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.06)' }} />
              <Bar dataKey="value" fill={isDark ? '#3b82f6' : '#2563eb'} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
