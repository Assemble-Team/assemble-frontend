import { JoinedGroupList } from '@/widgets/mypage';

/**
 * [Page] 가입한 모임 탭
 * - 데이터 페칭 및 렌더링 로직은 JoinedGroupList 위젯에서 처리합니다.
 */
export default function JoinedGroupsPage() {
  return (
    <div className="pt-4">
      <JoinedGroupList />
    </div>
  );
}
