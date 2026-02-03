import { useEffect, useRef } from 'react';
import { useDropdownMenu } from './DropdownMenuRoot';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/utils';
import { calculateFloatingPosition } from '@/shared/lib/dom';

const LAYOUT = {
  OFFSET: 8, // 트리거와 메뉴 사이 간격
  SAFE_MARGIN: 8, // 화면 끝 최소 여백
  MIN_WIDTH: 160, // 메뉴 최소 너비 (좌측 가출 판단 기준)
  EDGE_THRESHOLD: 10, // 우측 끝 판단 임계치
};

export default function DropdownMenuContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, closeDropdownMenu, triggerRect } = useDropdownMenu();
  const contentRef = useRef<HTMLDivElement>(null);

  // 외부 클릭/ESC 닫기 로직 (상태 변경 없는 사이드 이펙트)
  useEffect(() => {
    if (!isOpen) return;

    const handleClose = () => closeDropdownMenu();

    const handleEvents = (e: MouseEvent | KeyboardEvent) => {
      // ESC 키 처리
      if (e instanceof KeyboardEvent && e.key === 'Escape') handleClose();

      // 외부 클릭 처리: Trigger의 stopPropagation 덕분에 버튼 클릭 시에는 이 로직이 실행되지 않음
      if (
        e instanceof MouseEvent &&
        contentRef.current &&
        !contentRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('click', handleEvents);
    document.addEventListener('keydown', handleEvents);
    window.addEventListener('resize', handleClose);
    window.addEventListener('scroll', handleClose, { passive: true });

    return () => {
      document.removeEventListener('click', handleEvents);
      document.removeEventListener('keydown', handleEvents);
      window.removeEventListener('resize', handleClose);
      window.removeEventListener('scroll', handleClose);
    };
  }, [isOpen, closeDropdownMenu]);

  // 열려있지 않거나 좌표가 없으면 아무것도 안 함
  if (!isOpen || !triggerRect) return null;

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const { xPos, yPos, xTranslation } = calculateFloatingPosition(
    triggerRect,
    viewportWidth
  );

  return createPortal(
    <div
      ref={contentRef}
      style={{
        position: 'fixed',
        top: `${yPos}px`,
        left: `${xPos}px`,
        transform: `translateX(${xTranslation})`,
      }}
      className={cn(
        'z-[110] min-w-[160px] overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-xl outline-none',
        'animate-in fade-in zoom-in-95 duration-200',
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
}
