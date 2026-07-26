import clsx from 'clsx';

const PAYMENT_META = {
  paid: { label: "To'langan", dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400' },
  debt: { label: 'Qarz', dot: 'bg-red-500', text: 'text-red-700 dark:text-red-400' },
  pending: { label: 'Kutilmoqda', dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400' },
};

export default function PaymentBadge({ status }) {
  const meta = PAYMENT_META[status] ?? PAYMENT_META.pending;

  return (
    <span className={clsx('inline-flex items-center gap-1.5 text-xs font-bold', meta.text)}>
      <span className={clsx('h-1.5 w-1.5 rounded-full', meta.dot)} aria-hidden="true" />
      {meta.label}
    </span>
  );
}
