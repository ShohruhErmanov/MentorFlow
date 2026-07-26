import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../../hooks/useTheme';

/**
 * Compact 7-bar sparkline used inside a MentorCard to show the week's
 * activity trend, with a small colored badge summarizing the delta.
 */
export default function WeeklyActivityChart({ data, trend }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isPositive = trend >= 0;

  const barFill = isPositive ? (isDark ? '#34d399' : '#20834a') : isDark ? '#f87171' : '#ba1a1a';
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <div className="relative">
      <div className="h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barSize={6}>
            <Bar dataKey="value" fill={barFill} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <span
        className={clsx(
          'absolute right-0 top-0 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold',
          isPositive
            ? 'bg-[#e8f6ed] text-[#20834a] dark:bg-emerald-500/10 dark:text-emerald-400'
            : 'bg-[#ffdad6] text-[#ba1a1a] dark:bg-red-500/10 dark:text-red-400',
        )}
      >
        {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {isPositive ? '+' : ''}
        {trend}%
      </span>
    </div>
  );
}
