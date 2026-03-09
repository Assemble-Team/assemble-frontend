import { PendingGroupList } from '@/widgets/mypage';

/**
 * [Page] 승인 대기중 모임 탭
 * - 데이터 페칭 및 렌더링 로직은 PendingGroupList 위젯에서 처리합니다.
 */
export default function PendingGroupsPage() {
  return (
    <div className="pt-4">
      <PendingGroupList />
    </div>
  );
}
