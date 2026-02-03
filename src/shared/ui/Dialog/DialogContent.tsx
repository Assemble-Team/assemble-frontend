import { useEffect, useRef } from 'react';

import { cn } from '@/shared/lib/utils';
import { DialogPortal } from './DialogPortal';
import DialogOverlay from './DialogOverlay';

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}
export default function DialogContent({
  children,
  className = '',
}: DialogContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * 다이얼로그가 마운트될 때 최초 포커스를 강제로 이동
   * 키보드 사용자와 스크린 리더 사용자가
   * 즉시 다이얼로그 내부로 진입하도록 보장하기 위함
   */
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <DialogPortal>
      <DialogOverlay />

      <div
        ref={ref}
        /**
         * tabIndex={-1}
         * 기본적으로 포커스를 받을 수 없는 div를
         * 프로그래밍적으로 focus() 가능하게 만듦
         * (Tab 키로는 이동되지 않음)
         */
        tabIndex={-1}
        /**
         * role="dialog"
         * 스크린 리더에 Dialog임을 명시
         */
        role="dialog"
        /**
         * aria-modal="true"
         * 이 다이얼로그가 열려 있는 동안
         * 배경 콘텐츠는 비활성화 상태임을 의미
         * 스크린 리더가 다이얼로그 외부를 읽지 않도록 제한
         */
        aria-modal="true"
        className={cn(
          'fixed top-1/2 left-1/2 z-[51] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl outline-none',
          className
        )}
      >
        {children}
      </div>
    </DialogPortal>
  );
}
