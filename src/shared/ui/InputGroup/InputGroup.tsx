import { cn } from '@/shared/lib/utils';

import * as React from 'react';

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex w-full items-center overflow-hidden transition-all',
      'rounded-full border border-gray-200 bg-white pl-4', // 기본 보더 & 라운드
      'focus-within:border-brand-500/50 focus-within:ring-brand-500/20 focus-within:ring-1', // 포커스 시 효과
      className
    )}
    {...props}
  />
));
InputGroup.displayName = 'InputGroup';

export default InputGroup;
