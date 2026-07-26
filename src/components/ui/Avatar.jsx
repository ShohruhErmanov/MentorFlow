import clsx from 'clsx';

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-11 w-11 text-sm',
};

export default function Avatar({
  initials = 'MF',
  src,
  alt = '',
  size = 'md',
  className,
  style,
}) {
  return (
    <span
      style={style}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c3c6d7] bg-[#d0e1fb] font-semibold text-[#38485d] dark:border-slate-600 dark:bg-blue-500/20 dark:text-blue-200',
        sizes[size],
        className,
      )}
    >
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : initials}
    </span>
  );
}
