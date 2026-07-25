import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import Card from '../ui/Card';

const toneStyles = {
  blue: {
    card: 'border-[#dbe1ff] dark:border-blue-500/30',
    iconWrap: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400',
    status: 'text-[#2563eb]',
    indicator: 'bg-[#2563eb]',
    value: 'text-[#191b23] dark:text-white',
  },
  orange: {
    card: 'border-[#ffdbcd] dark:border-orange-500/30',
    iconWrap: 'bg-[#ffede6] text-[#bc4800] dark:bg-orange-500/10 dark:text-orange-400',
    status: 'text-[#bc4800] dark:text-orange-400',
    indicator: 'bg-[#bc4800]',
    value: 'text-[#191b23] dark:text-white',
  },
  red: {
    card: 'border-[#ffdad6] bg-[#fff8f7] dark:border-red-500/30 dark:bg-red-500/10',
    iconWrap: 'bg-[#ffdad6] text-[#ba1a1a] dark:bg-red-500/10 dark:text-red-400',
    status: 'text-[#ba1a1a] dark:text-red-400',
    indicator: 'bg-[#ba1a1a]',
    value: 'text-[#ba1a1a] dark:text-red-400',
  },
  green: {
    card: 'border-[#d7eadc] dark:border-emerald-500/30',
    iconWrap: 'bg-[#e8f6ed] text-[#20834a] dark:bg-emerald-500/10 dark:text-emerald-400',
    status: 'text-[#20834a] dark:text-emerald-400',
    indicator: 'bg-[#20834a]',
    value: 'text-[#191b23] dark:text-white',
  },
};

export default function StatCard({ label, value, status, icon: Icon, tone = 'blue' }) {
  const styles = toneStyles[tone];

  return (
    <Card
      className={clsx(
        'relative min-h-[152px] overflow-hidden p-5 transition-shadow hover:shadow-[0_16px_40px_rgba(46,48,57,0.08)]',
        styles.card,
      )}
    >
      <div className={clsx('absolute left-0 top-5 h-10 w-1 rounded-r-full', styles.indicator)} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold leading-5 text-[#737686] dark:text-slate-400">{label}</p>
          <div className="mt-5 flex items-end gap-2">
            <p className={clsx('text-[42px] font-bold leading-none tracking-[0]', styles.value)}>
              {value}
            </p>
            <p className={clsx('mb-1 inline-flex items-center gap-0.5 text-xs font-bold', styles.status)}>
              {tone === 'blue' && <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden="true" />}
              {status}
            </p>
          </div>
        </div>
        <div className={clsx('flex h-12 w-12 items-center justify-center rounded-xl', styles.iconWrap)}>
          <Icon size={24} strokeWidth={2.1} aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}
