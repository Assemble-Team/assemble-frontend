import { getQueryClient } from '@/shared/lib/tanstack-query/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getGroupList } from '@/entities/groups/api/getGroupList';
import { GroupListWidget } from '@/widgets/group-list/ui/GroupListWidget';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * 메인 모임 목록 페이지입니다.
 * 서버에서 초기 데이터를 프리페칭하고 위젯을 렌더링합니다.
 */
export default async function GroupListPage({ searchParams }: Props) {
  const queryClient = getQueryClient();
  const params = await searchParams;

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
