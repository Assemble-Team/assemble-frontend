import { LikedGroupList } from '@/widgets/mypage';

/**
 * [Page] 좋아요 한 모임 탭
 * - 데이터 페칭 및 렌더링 로직은 LikedGroupList 위젯에서 처리합니다.
 */
export default function LikedGroupsPage() {
  return (
    <div className="pt-4">
      <LikedGroupList />
    </div>
  );
}
