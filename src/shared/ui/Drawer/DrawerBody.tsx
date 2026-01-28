import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';

export default function DrawerBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('h-[calc(100%-64px)] overflow-y-auto p-4', className)}>
      {children}
    </div>
  );
}
