import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import Button from './Button';

export default function LoadingButton({ 
  isLoading, 
  children, 
  className, 
  variant = 'primary', 
  loadingText = 'Yuklanmoqda...',
  ...props 
}) {
  return (
    <Button
      variant={variant}
      disabled={isLoading || props.disabled}
      className={clsx('relative overflow-hidden transition-all', className)}
      {...props}
    >
      <motion.div
        initial={false}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 10 : 0 }}
        transition={{ duration: 0.2 }}
        className={clsx('flex items-center gap-2', isLoading && 'invisible')}
      >
        {children}
      </motion.div>
      
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center gap-2"
        >
          <Loader2 size={18} className="animate-spin" />
          <span>{loadingText}</span>
        </motion.div>
      )}
    </Button>
  );
}
