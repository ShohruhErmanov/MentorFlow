import { useState } from 'react';
import { Link2, X } from 'lucide-react';
import clsx from 'clsx';
import FileUploader from './FileUploader';

const toneStyles = {
  red: 'bg-[#ffdad6] text-[#ba1a1a] dark:bg-red-500/10 dark:text-red-400',
  blue: 'bg-[#dbe1ff] text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400',
  slate: 'bg-[#f3f3fe] text-[#434655] dark:bg-slate-700/50 dark:text-slate-300',
  orange: 'bg-[#ffede6] text-[#bc4800] dark:bg-orange-500/10 dark:text-orange-400',
};

/**
 * Compact attach-a-resource card: click to pick a local file, or "yoki link"
 * to attach a URL instead (repos/design links can't be "uploaded"). Shows
 * the attached name once set, with a remove button to clear it.
 */
export default function UploadCard({ icon: Icon, tone = 'blue', label, sublabel, accept, value, onChange }) {
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [linkDraft, setLinkDraft] = useState('');

  const handleFileSelect = (file) => {
    onChange({ name: file.name, url: URL.createObjectURL(file) });
  };

  const confirmLink = () => {
    const trimmed = linkDraft.trim();
    if (!trimmed) return;
    onChange({ name: trimmed, url: trimmed });
    setLinkDraft('');
    setIsLinkMode(false);
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    onChange(null);
  };

  if (isLinkMode) {
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-[#2563eb] bg-[#f7f8ff] p-3 dark:border-blue-500 dark:bg-slate-900/60">
        <input
          autoFocus
          type="url"
          value={linkDraft}
          onChange={(e) => setLinkDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              confirmLink();
            }
          }}
          placeholder="https://..."
          aria-label={`${label} havolasi`}
          className="w-full rounded-lg border border-[#e1e2ed] bg-white px-2.5 py-1.5 text-xs text-[#191b23] outline-none focus:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={confirmLink}
            className="flex-1 rounded-lg bg-[#2563eb] py-1 text-[11px] font-bold text-white hover:bg-[#1d4ed8]"
          >
            Saqlash
          </button>
          <button
            type="button"
            onClick={() => setIsLinkMode(false)}
            className="flex-1 rounded-lg border border-[#e1e2ed] py-1 text-[11px] font-semibold text-[#434655] hover:bg-[#f3f3fe] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/40"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    );
  }

  return (
    <FileUploader accept={accept} onSelect={handleFileSelect}>
      {({ open }) => (
        <div
          role="button"
          tabIndex={0}
          onClick={value ? undefined : open}
          onKeyDown={(e) => {
            if (!value && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              open();
            }
          }}
          className={clsx(
            'relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors',
            value
              ? 'border-[#2563eb] bg-[#f7f8ff] dark:border-blue-500 dark:bg-slate-900/60'
              : 'cursor-pointer border-dashed border-[#e1e2ed] hover:border-[#2563eb] dark:border-slate-600',
          )}
        >
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              aria-label={`${label} faylini olib tashlash`}
              className="absolute right-1.5 top-1.5 rounded-full p-1 text-[#737686] hover:bg-white hover:text-red-500 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X size={12} />
            </button>
          )}

          <div className={clsx('flex h-9 w-9 items-center justify-center rounded-lg', toneStyles[tone])}>
            <Icon size={18} aria-hidden="true" />
          </div>

          <div className="min-w-0 w-full">
            <p className="text-xs font-bold text-[#191b23] dark:text-white">{label}</p>
            <p className="truncate text-[11px] font-medium text-[#737686] dark:text-slate-400">
              {value ? value.name : sublabel}
            </p>
          </div>

          {!value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLinkMode(true);
              }}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#2563eb] hover:underline dark:text-blue-400"
            >
              <Link2 size={10} />
              yoki link
            </button>
          )}
        </div>
      )}
    </FileUploader>
  );
}
