'use client';

import dynamic from 'next/dynamic';

/**
 * 채팅 컴포넌트는 WebSocket이나 Window 객체 접근이 필요하므로
 * 클라이언트 사이드에서만 렌더링하도록 ssr: false 설정을 적용합니다.
 */
const GroupChat = dynamic(
  () => import('./GroupChat').then((mod) => mod.GroupChat),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] w-full animate-pulse items-center justify-center bg-slate-50">
        <p className="text-sm font-bold text-slate-400">채팅방을 불러오는 중...</p>
      </div>
    ),
  }
);

export { GroupChat };
