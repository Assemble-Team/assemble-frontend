'use client';

import { useGroupDetail } from '@/entities/groups/api/useGroupDetail';
import { GroupDetailSidebar } from '@/widgets/group-detail-sidebar';
import { JoinGroupButton } from '@/features/groups-join/ui/JoinGroupButton';
import { LikeButton } from '@/features/groups-like/ui/LikeButton';
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
      <main className="min-w-0 flex-1 pt-8 pb-32">{children}</main>

      {/* 하단 고정 액션 바 */}
      <footer className="fixed right-0 bottom-0 left-0 z-20 border-t border-slate-100 bg-white/80 px-4 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-5xl items-center gap-6">
          <LikeButton
            groupId={group.id}
            initialLiked={group.like.isLiked}
            initialCount={group.like.count}
          />
          <JoinGroupButton
            groupId={group.id}
            isFull={group.participants.isFull}
            isRecruiting={group.isRecruiting}
          />
        </div>
      </footer>
    </div>
  );
}
