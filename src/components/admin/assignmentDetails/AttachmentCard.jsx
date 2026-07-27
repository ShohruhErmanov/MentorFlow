import clsx from 'clsx';

const toneStyles = {
  red: 'bg-[#ffdad6] text-[#ba1a1a] dark:bg-red-500/10 dark:text-red-400',
  blue: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400',
  slate: 'bg-[#f3f3fe] text-[#434655] dark:bg-slate-700/50 dark:text-slate-300',
  orange: 'bg-[#ffede6] text-[#bc4800] dark:bg-orange-500/10 dark:text-orange-400',
};

/**
 * Single reusable file/link row: icon + name + size + open-or-download
 * action. Used for every attachment across the assignment details page.
 */
export default function AttachmentCard({ icon: Icon, actionIcon: ActionIcon, tone = 'blue', name, meta, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl border border-[#e1e2ed] p-3 transition-colors hover:border-[#2563eb] dark:border-slate-700"
    >
      <div className={clsx('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', toneStyles[tone])}>
        <Icon size={18} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#191b23] dark:text-white">{name}</p>
        <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{meta}</p>
      </div>
      <ActionIcon size={16} className="shrink-0 text-[#737686] dark:text-slate-400" aria-hidden="true" />
    </a>
  );
}
