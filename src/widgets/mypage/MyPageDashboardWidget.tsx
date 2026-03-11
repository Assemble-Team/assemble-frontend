import { JoinedGroupList } from './JoinedGroupList.client';
import { RecentScheduleList } from './RecentScheduleList.client';
import { ActivityFeed } from './ActivityFeed.client';

/**
 * 마이페이지 메인 대시보드를 구성하는 위젯입니다.
 */
export function MyPageDashboardWidget() {
  return (
    <div className="flex flex-col gap-10 pb-10 lg:mt-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-black tracking-tight text-slate-900">나의 모임</h3>
        <JoinedGroupList />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <RecentScheduleList />
        </div>
        <div className="flex flex-col gap-6">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
