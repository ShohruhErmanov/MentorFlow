import ValidationMessage from './ValidationMessage';

/**
 * Generic label + field-slot + error wrapper for ad-hoc field layouts
 * (e.g. a number input with a trailing unit, or a custom picker) that don't
 * fit InputField/Select/Textarea's built-in input element.
 */
export default function FormField({ id, label, error, children, className }) {
  return (
    <div className={className ?? 'flex flex-col gap-1.5'}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#191b23] dark:text-slate-200">
          {label}
        </label>
      )}
      {children}
      <ValidationMessage id={id ? `${id}-error` : undefined} message={error} />
    </div>
  );
}
