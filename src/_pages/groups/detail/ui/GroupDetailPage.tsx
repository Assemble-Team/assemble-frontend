'use client';

import { GroupDetailInfo } from '@/entities/groups/ui/GroupDetailInfo';
import { GroupHomeHero } from '@/entities/groups/ui/GroupHomeHero';
import { useGroupDetail } from '@/entities/groups/api/useGroupDetail';
import { useParams } from 'next/navigation';

export function GroupDetailPage() {
  const { id } = useParams();
  const { data: group } = useGroupDetail(id as string);

  return (
    <div className="space-y-4">
      <GroupHomeHero group={group} />
      <GroupDetailInfo group={group} />
    </div>
  );
}
