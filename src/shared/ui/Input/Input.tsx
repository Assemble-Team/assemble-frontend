import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

type InputVariant = 'default' | 'outline';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full text-gray-900 transition-colors outline-none',
          variant === 'default' && [
            'h-full bg-transparent placeholder:text-gray-200',
            'text-[12px] font-black md:text-[13px]',
          ],
          variant === 'outline' && [
            'rounded-xl border border-gray-200 bg-white px-4 py-3',
            'text-sm placeholder:text-gray-400',
            'focus:border-brand-500/50 focus:ring-brand-500/20 focus:ring-1',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
          ],
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
