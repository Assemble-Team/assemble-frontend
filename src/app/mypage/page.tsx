import {
  JoinedGroupList,
  RecentScheduleList,
  ActivityFeed,
} from '@/widgets/mypage';

export default function MyPageHome() {
  return (
    <div className="flex flex-col gap-10 pb-10 lg:mt-6">
      {/* 나의 모임 섹션 (Default Card Style) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase">
          나의 모임
        </h3>
        <JoinedGroupList />
      </div>

      {/* 중앙/하단 대시보드 (Grid) */}
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
