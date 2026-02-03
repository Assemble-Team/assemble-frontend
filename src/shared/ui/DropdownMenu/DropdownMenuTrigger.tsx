import { ComponentProps, useImperativeHandle, useRef } from 'react';
import { useDropdownMenu } from './DropdownMenuRoot';
import { cn } from '@/shared/lib/utils';

export default function DropdownMenuTrigger({
  children,
  className,
  ref,
  ...props
}: ComponentProps<'button'>) {
  const { toggleDropdownMenu, updateTriggerRect } = useDropdownMenu();
  const internalRef = useRef<HTMLButtonElement>(null);

  // 외부에서 전달된 ref가 있을 경우, 내부의 internalRef.current와 연결합니다.
  useImperativeHandle(ref, () => internalRef.current!);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    /**
     * [중요] 이벤트 전파 중단
     * window(또는 document)에 등록된 '외부 클릭 감지(click)' 리스너가
     * 트리거 버튼 클릭을 '메뉴 외부 클릭'으로 오해하여 메뉴를 닫지 않도록 방지합니다.
     */
    e.stopPropagation();

    if (internalRef.current) {
      updateTriggerRect(internalRef.current.getBoundingClientRect());
    }
    toggleDropdownMenu();
    props.onClick?.(e);
  };

  return (
    <button
      type="button"
      {...props}
      ref={internalRef}
      onClick={handleToggle}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </button>
  );
}
