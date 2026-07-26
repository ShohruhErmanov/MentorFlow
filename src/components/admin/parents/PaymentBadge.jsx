import clsx from 'clsx';

const PAYMENT_META = {
  paid: { label: "To'langan", className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  overdue: { label: 'Kechikkan', className: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' },
  debt: { label: 'Qarz', className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
};

export default function PaymentBadge({ status, overdueDays }) {
  const meta = PAYMENT_META[status] ?? PAYMENT_META.debt;

  return (
    <span className={clsx('inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold', meta.className)}>
      {meta.label}
      {status === 'overdue' && overdueDays > 0 && ` (${overdueDays} kun)`}
    </span>
  );
}
