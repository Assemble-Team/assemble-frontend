import { GroupOfflineRegionFilter } from '@/features/groups-filter/ui/GroupOfflineRegionFilter';
import { GroupSearchBar } from '@/features/groups-search';
import HeroTitle from './HeroTitle';

export default function Hero() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center gap-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* 서비스 소개 섹션 */}
      <HeroTitle />

      {/* 지역 설정 + 검색창 인터랙션 섹션 */}
      <div className="w-full max-w-3xl rounded-[3rem] bg-white p-2 shadow-2xl shadow-slate-100 ring-1 ring-slate-100 md:p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex-none px-4 md:border-r md:border-slate-100">
            <GroupOfflineRegionFilter />
          </div>
          <div className="flex-1">
            <GroupSearchBar />
          </div>
        </div>
      </div>

      {/* 간단한 가이드 텍스트 (옵션) */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-black text-slate-300">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-200" />
          지역별 필터링
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-200" />
          관심사 기반 매칭
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-200" />
          실시간 채팅 & 일정 관리
        </div>
      </div>
    </div>
  );
}
