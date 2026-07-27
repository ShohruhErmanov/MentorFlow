import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import Card from '../ui/Card';

const toneStyles = {
  blue: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400',
  orange: 'bg-[#ffede6] text-[#bc4800] dark:bg-orange-500/10 dark:text-orange-400',
  rose: 'bg-[#ffe1ec] text-[#c11d5e] dark:bg-pink-500/10 dark:text-pink-400',
  red: 'bg-[#ffdad6] text-[#ba1a1a] dark:bg-red-500/10 dark:text-red-400',
  green: 'bg-[#e8f6ed] text-[#20834a] dark:bg-emerald-500/10 dark:text-emerald-400',
};

const trendStyles = {
  positive: 'bg-[#e8f6ed] text-[#20834a] dark:bg-emerald-500/10 dark:text-emerald-400',
  success: 'bg-[#e8f6ed] text-[#20834a] dark:bg-emerald-500/10 dark:text-emerald-400',
  info: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400',
  danger: 'bg-[#ffdad6] text-[#ba1a1a] dark:bg-red-500/10 dark:text-red-400',
  negative: 'bg-[#ffdad6] text-[#ba1a1a] dark:bg-red-500/10 dark:text-red-400',
  neutral: 'bg-[#f3f3fe] text-[#737686] dark:bg-slate-700/50 dark:text-slate-400',
};

const highlightStyles = {
  red: 'border-[#ffdad6] bg-[#fff8f7] dark:border-red-500/30 dark:bg-red-500/10',
  blue: 'border-[#c7d2ff] bg-[#f5f7ff] dark:border-blue-500/30 dark:bg-blue-500/10',
};

const highlightTextStyles = {
  red: 'text-[#ba1a1a] dark:text-red-400',
  blue: 'text-[#2563eb] dark:text-blue-400',
};

export default function AdminStatCard({
  label,
  value,
  trend,
  trendTone = 'positive',
  icon: Icon,
  tone = 'blue',
  highlight = false,
}) {
  return (
    <Card className={clsx('min-h-[152px] p-5', highlight && highlightStyles[tone])}>
      <div className="flex items-start justify-between">
        <div className={clsx('flex h-11 w-11 items-center justify-center rounded-xl', toneStyles[tone])}>
          <Icon size={22} strokeWidth={2.1} aria-hidden="true" />
        </div>
        {trend && (
          <span
            className={clsx(
              'inline-flex items-center gap-0.5 rounded-full px-2.5 py-1 text-xs font-bold leading-none',
              trendStyles[trendTone],
            )}
          >
            {trendTone === 'positive' && <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" />}
            {trendTone === 'negative' && <ArrowDownRight size={13} strokeWidth={2.4} aria-hidden="true" />}
            {trend}
          </span>
        )}
      </div>

      <p
        className={clsx(
          'mt-5 text-[28px] font-bold leading-none tracking-[0]',
          highlight ? highlightTextStyles[tone] : 'text-[#191b23] dark:text-white',
        )}
      >
        {value}
      </p>
      <p className="mt-2 text-[13px] font-semibold leading-5 text-[#737686] dark:text-slate-400">{label}</p>
    </Card>
  );
}
