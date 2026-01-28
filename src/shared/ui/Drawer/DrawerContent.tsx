import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';

export default function DrawerContent({
  children,
  side = 'left',
  className,
}: {
  children: ReactNode;
  side?: 'left' | 'right';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'animate-in absolute top-0 h-full bg-white shadow-2xl transition-transform duration-300',
        side === 'left'
          ? 'slide-in-from-left left-0'
          : 'slide-in-from-right right-0',
        'w-[300px]',
        className
      )}
    >
      {children}
    </div>
  );
}
