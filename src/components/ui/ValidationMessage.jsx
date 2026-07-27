import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/**
 * Shared inline field-error message used by every form field component
 * (InputField, Select, Textarea, DatePicker, DateTimeField, ...) so the
 * markup only lives in one place.
 */
export default function ValidationMessage({ id, message }) {
  if (!message) return null;

  return (
    <motion.p
      id={id}
      role="alert"
      aria-live="polite"
      className="flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </motion.p>
  );
}
