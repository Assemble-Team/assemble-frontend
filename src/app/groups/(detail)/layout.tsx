'use client';

import { useGroupDetail } from '@/entities/groups/api/useGroupDetail';
import { GroupDetailSidebar } from '@/widgets/group-detail-sidebar';
import { GroupFixedActionBar } from '@/widgets/group-fixed-actions';
import { useParams } from 'next/navigation';

export default function GroupDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const { data: group } = useGroupDetail(id as string);

  return (
    <div className="mx-auto flex w-full flex-col px-4 md:flex-row md:gap-x-8 md:px-8">
      {/* 좌측 사이드바 */}
      <GroupDetailSidebar />

      {/* 메인 컨텐츠 영역 */}
      <main className="min-w-0 flex-1 pb-32">{children}</main>

      {/* 하단 고정 액션 바 */}
      <GroupFixedActionBar group={group} />
    </div>
  );
}
