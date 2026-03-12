import { getQueryClient } from '@/shared/lib/tanstack-query/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getGroupList } from '@/entities/groups/api/getGroupList';
import { GroupListWidget } from '@/widgets/group-list/ui/GroupListWidget';

interface GroupListPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function GroupListPage({ searchParams }: GroupListPageProps) {
  const queryClient = getQueryClient();
  const params = searchParams;

  // 서버사이드 데이터 프리페칭
  await queryClient.prefetchQuery({
    queryKey: ['groups', params],
    queryFn: () => getGroupList(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupListWidget />
    </HydrationBoundary>
  );
}
