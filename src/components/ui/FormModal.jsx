import Modal from './Modal';
import Button from './Button';
import LoadingButton from './LoadingButton';

/**
 * Standardized form shell reused by every "create X" modal: a responsive
 * field grid plus a Bekor qilish / Saqlash footer, wrapped around the
 * shared Modal (portal, ESC-close, outside-click-close, focus trap).
 */
export default function FormModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Saqlash',
  submitIcon: SubmitIcon,
  submittingLabel = 'Saqlanmoqda...',
  cancelLabel = 'Bekor qilish',
  children,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} subtitle={subtitle} icon={icon}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid max-h-[60vh] grid-cols-1 gap-4 overflow-y-auto px-1 py-1 sm:grid-cols-2">{children}</div>

        <div className="flex shrink-0 justify-end gap-3 border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            {cancelLabel}
          </Button>
          <LoadingButton type="submit" variant="primary" isLoading={isSubmitting} loadingText={submittingLabel}>
            {SubmitIcon && <SubmitIcon size={16} aria-hidden="true" />}
            {submitLabel}
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
