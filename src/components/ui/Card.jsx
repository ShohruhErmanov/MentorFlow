import clsx from 'clsx';

export default function Card({ as: Component = 'section', className, children, ...props }) {
  return (
    <Component
      className={clsx(
        'rounded-xl border border-[#e1e2ed] bg-white shadow-[0_12px_34px_rgba(46,48,57,0.06)] dark:border-slate-700 dark:bg-slate-800 dark:shadow-none',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
