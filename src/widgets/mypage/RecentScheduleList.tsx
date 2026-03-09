import { Calendar, Clock, MapPin } from 'lucide-react';

const DUMMY_SCHEDULES = [
  {
    id: 1,
    groupName: '서울 프론트엔드 모임',
    title: 'React 19 스터디 오프라인 밋업',
    date: '2026-03-12',
    time: '19:00',
    location: '강남구 테헤란로 123',
  },
  {
    id: 2,
    groupName: '주말 러닝 크루',
    title: '여의도 공원 5km 런',
    date: '2026-03-15',
    time: '08:00',
    location: '여의도 한강공원',
  },
  {
    id: 3,
    groupName: '강남 독서 토론',
    title: '현대 문학 깊이 읽기',
    date: '2026-03-18',
    time: '20:00',
    location: '교보타워 밋업룸',
  },
  {
    id: 4,
    groupName: '맛집 탐방대',
    title: '성수동 팝업 투어 및 정기 회식',
    date: '2026-03-21',
    time: '13:00',
    location: '성수역 3번 출구',
  },
];

export function RecentScheduleList() {
  return (
    <div className="flex flex-col gap-5 px-1 py-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase">
          최근 모임 일정
        </h3>
        <button className="text-brand-500 hover:text-brand-600 text-[11px] font-black tracking-tight uppercase transition-colors">
          전체보기
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {DUMMY_SCHEDULES.length > 0 ? (
          DUMMY_SCHEDULES.map((schedule) => (
            <div
              key={schedule.id}
              className="group flex cursor-pointer flex-col gap-2 transition-all hover:translate-x-1"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[9px] font-black tracking-wider text-slate-500 uppercase">
                  {schedule.groupName}
                </span>
                <span className="group-hover:text-brand-600 text-sm font-black text-slate-900 transition-colors">
                  {schedule.title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{schedule.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{schedule.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{schedule.location}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
            예정된 모임 일정이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
