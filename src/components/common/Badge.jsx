import clsx from 'clsx';

const variants = {
  neutral: 'border-[#e1e2ed] bg-[#f3f3fe] text-[#434655]',
  blue: 'border-[#b4c5ff] bg-[#dbe1ff] text-[#003ea8]',
  orange: 'border-[#ffb596] bg-[#ffede6] text-[#7d2d00]',
  red: 'border-[#ffb4ab] bg-[#ffdad6] text-[#93000a]',
};

export default function Badge({ children, variant = 'neutral', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold leading-none',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
