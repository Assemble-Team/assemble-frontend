import { cn } from '@/shared/lib/utils';

export function DialogHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('mb-4 space-y-1', className)}>{children}</div>;
}
