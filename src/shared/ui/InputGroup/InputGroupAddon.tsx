import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

interface InputGroupAddonProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'inline-start' | 'inline-end';
}

const InputGroupAddon = forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align = 'inline-start', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // flex-shrink-0: 아이콘이나 버튼이 압축되지 않도록 보호
        'flex h-full shrink-0 items-center justify-center transition-colors',
        align === 'inline-start' ? 'm-1' : 'm-1',
        className
      )}
      {...props}
    />
  )
);
InputGroupAddon.displayName = 'InputGroupAddon';

export default InputGroupAddon;
