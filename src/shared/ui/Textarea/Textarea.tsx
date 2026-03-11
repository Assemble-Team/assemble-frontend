import clsx from 'clsx';
import { TextareaHTMLAttributes, forwardRef } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'focus:border-brand-500/50 focus:ring-brand-500/20 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition-all outline-none placeholder:text-gray-400 focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
