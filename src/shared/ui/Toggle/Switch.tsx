'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const Switch = ({
  checked,
  onCheckedChange,
  className,
  disabled = false,
}: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'focus-visible:ring-brand-500 relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-brand-500' : 'bg-slate-200',
        className
      )}
    >
      <motion.span
        initial={false}
        animate={{
          x: checked ? 20 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform'
        )}
      />
    </button>
  );
};
