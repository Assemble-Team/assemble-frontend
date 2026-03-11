'use client';

import { useParams } from 'next/navigation';
import { NoticeCreateFeature } from '@/features/groups-notice/ui/NoticeCreateFeature';

/**
 * 모임 공지 작성 페이지입니다.
 * 비즈니스 로직과 로딩/에러 관리는 NoticeCreateFeature가 담당합니다.
 */
export default function NoticeCreatePage() {
  const { id: groupId } = useParams() as { id: string };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <NoticeCreateFeature groupId={groupId} />
    </div>
  );
}
