'use client';

import { useEffect, useState } from 'react';
import { CreateGroupForm } from '@/features/groups-create';
import { useUserStore } from '@/entities/user';
import { LoginRequiredAlert } from '@/shared/ui/LoginRequiredAlert';

/**
 * [Page] 모임 생성 페이지
 * - 로그인된 사용자만 접근할 수 있도록 인증 가드를 적용합니다.
 */
export function GroupCreatePage() {
  const [isMounted, setIsMounted] = useState(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // 하이드레이션 이전(서버사이드 렌더링 포함)에는 아무것도 렌더링하지 않음
  if (!isMounted) {
    return null;
  }

  // 마운트된 후(클라이언트) 로그인 여부 확인
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
        <LoginRequiredAlert 
          title="모임을 만드시겠어요?" 
          description="모임 생성은 회원만 가능합니다. 로그인하고 나만의 모임을 시작해보세요!" 
        />
      </div>
    );
  }

  return <CreateGroupForm />;
}
