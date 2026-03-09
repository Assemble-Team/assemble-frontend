import { Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const DUMMY_GROUPS = [
  {
    id: 1,
    name: '서울 프론트엔드 모임',
    category: '스터디',
    memberCount: 120,
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=250&auto=format&fit=crop', // 더미 이미지
  },
  {
    id: 2,
    name: '주말 러닝 크루',
    category: '스포츠',
    memberCount: 85,
    imageUrl:
      'https://images.unsplash.com/photo-1552674605-db6aea4bc09c?q=80&w=250&auto=format&fit=crop',
  },
  {
    id: 3,
    name: '사이드 프로젝트 빌더스',
    category: '개발/네트워킹',
    memberCount: 42,
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=250&auto=format&fit=crop',
  },
];

export function FavoriteGroupsSlider() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">나의 소모임</h3>
        <Link
          href="/mypage/groups"
          className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
        >
          전체보기
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto px-1 pb-4">
        {DUMMY_GROUPS.map((group) => (
          <div
            key={group.id}
            className="group relative flex w-[200px] shrink-0 cursor-pointer snap-start flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
              <img
                src={group.imageUrl}
                alt={group.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 left-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur-sm">
                {group.category}
              </div>
            </div>

            <div className="flex flex-col gap-1 px-1">
              <h4 className="group-hover:text-brand-600 truncate text-sm font-bold text-slate-900 transition-colors">
                {group.name}
              </h4>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Users className="h-3 w-3" />
                <span>멤버 {group.memberCount}명</span>
              </div>
            </div>
          </div>
        ))}

        {/* 더 보기 카드 */}
        <div className="flex w-[120px] shrink-0 cursor-pointer snap-start flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:border-slate-300 hover:bg-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </div>
          <span className="text-sm font-medium text-slate-500">더 보기</span>
        </div>
      </div>
    </div>
  );
}
