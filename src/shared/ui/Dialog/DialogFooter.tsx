import { cn } from '@/shared/lib/utils';

export function DialogFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mt-6 flex justify-end gap-2', className)}>{children}</div>
  );
}
