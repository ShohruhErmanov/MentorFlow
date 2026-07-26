import clsx from 'clsx';
import Modal from './Modal';
import Button from './Button';

const toneStyles = {
  danger: 'bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-400',
  success: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400',
};

const confirmButtonToneStyles = {
  danger: 'bg-red-600 hover:bg-red-700',
  success: 'bg-emerald-600 hover:bg-emerald-700',
};

/**
 * Generic confirm/cancel dialog reused for destructive or state-changing
 * actions (delete, block/unblock, etc.) so those flows don't each hand-roll
 * their own modal markup.
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Tasdiqlash',
  cancelLabel = 'Bekor qilish',
  tone = 'danger',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="max-w-md">
      <div className="space-y-4">
        <div className={clsx('rounded-xl p-4 text-sm', toneStyles[tone])}>
          <p>{message}</p>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant="primary" className={confirmButtonToneStyles[tone]} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
