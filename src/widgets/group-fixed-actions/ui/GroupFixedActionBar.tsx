'use client';

import { LikeButton } from '@/features/groups-like/ui/LikeButton';
import { JoinGroupButton } from '@/features/groups-join/ui/JoinGroupButton';
import { GroupDetail } from '@/entities/groups/model/types';

interface GroupFixedActionBarProps {
  group: GroupDetail;
}

/**
 * 모임 상세 페이지 하단에 고정되는 액션 바 위젯입니다.
 * 좋아요 버튼과 가입 신청 버튼을 포함합니다.
 */
export function GroupFixedActionBar({ group }: GroupFixedActionBarProps) {
  return (
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
          isPending={group.isPending}
        />
      </div>
    </footer>
  );
}
