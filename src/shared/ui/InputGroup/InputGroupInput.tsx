import { cn } from '@/shared/lib/utils';

import { forwardRef } from 'react';

const InputGroupInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-full w-full border-none bg-transparent py-2 outline-none focus:ring-0', // 보더와 링 제거
      'text-base text-gray-900 placeholder:text-gray-300',
      className
    )}
    {...props}
  />
));
InputGroupInput.displayName = 'InputGroupInput';

export default InputGroupInput;
