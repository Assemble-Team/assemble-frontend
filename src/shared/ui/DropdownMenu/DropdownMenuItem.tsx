import { cn } from '@/shared/lib/utils';
import { useDropdownMenu } from './DropdownMenuRoot';
import { ComponentProps } from 'react';

interface DropdownMenuItemProps extends ComponentProps<'button'> {
  children: React.ReactNode;
}

export default function DropdownMenuItem({
  children,
  onClick,
  className,
  ...props
}: DropdownMenuItemProps) {
  const { closeDropdownMenu } = useDropdownMenu();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    closeDropdownMenu();
  };

  return (
    <button
      {...props}
      type="button"
      role="menuitem"
      onClick={handleClick}
      className={cn(
        'flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors outline-none',
        'hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900', // 포커스 스타일 추가
        'disabled:pointer-events-none disabled:opacity-50', // 비활성화 상태 스타일
        className
      )}
    >
      {children}
    </button>
  );
}
