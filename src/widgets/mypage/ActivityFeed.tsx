export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      time: '어제',
      content: (
        <>
          <span className="font-semibold text-slate-900">
            &apos;서울 프론트엔드 모임&apos;
          </span>{' '}
          일정에 참여 신청했습니다.
        </>
      ),
      isLatest: true,
    },
    {
      id: 2,
      time: '3일 전',
      content: (
        <>
          <span className="font-semibold text-slate-900">
            &apos;주말 러닝 크루&apos;
          </span>
          에 가입했습니다.
        </>
      ),
      isLatest: false,
    },
    {
      id: 3,
      time: '1주일 전',
      content: (
        <>
          <span className="font-semibold text-slate-900">
            &apos;사이드 프로젝트 빌더스&apos;
          </span>
          에 첫 게시글을 작성했습니다.
        </>
      ),
      isLatest: false,
    },
  ];

  return (
    <div className="flex flex-col gap-5 px-1 py-2">
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-base font-black tracking-tight text-slate-900">
          최근 활동 내역
        </h3>
      </div>

      <div className="relative pl-3">
        {/* Timeline Line */}
        <div className="absolute top-3 left-[20px] h-[calc(100%-24px)] w-[2px] bg-slate-100" />

        <div className="flex flex-col gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="relative flex gap-4 text-sm">
              {/* Timeline Dot */}
              <div className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-white">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    activity.isLatest
                      ? 'bg-brand-500 ring-brand-50 ring-4'
                      : 'bg-slate-300'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col pt-0.5">
                <p className="text-slate-600">{activity.content}</p>
                <span className="mt-1 text-xs font-medium text-slate-400">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
