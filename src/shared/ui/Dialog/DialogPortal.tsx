import { createPortal } from 'react-dom';

export function DialogPortal({ children }: { children: React.ReactNode }) {
  // SSR 환경에서의 오류 방지
  if (typeof window === 'undefined') return null;

  return createPortal(
    // 다이얼로그 전체를 감싸는 포털 레이어
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>,
    document.body
  );
}
