'use client';

import { useSearchParams } from 'next/navigation';
import { useGroupList } from '@/entities/groups/api/useGroupList';

/**
 * 모임 목록 상단에 표시되는 검색 결과 헤더입니다.
 * 가독성이 높은 굵은 텍스트와 입체적인 개수 배지를 사용합니다.
 */
export const GroupSearchResultHeader = () => {
  const searchParams = useSearchParams();
  const { data: groups } = useGroupList();

  // 쿼리 파라미터 추출
  const searchQuery = searchParams.get('query');
  const category = searchParams.get('category');

  const getSearchLabel = () => {
    if (searchQuery) return `"${searchQuery}"`;
    if (category && category !== 'ALL') return `#${category}`;
    return '전체 모임';
  };

  return (
    <div className="flex items-center gap-4 px-2 py-6">
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          <span className="text-brand-600">{getSearchLabel()}</span>
          <span className="ml-2">결과</span>
        </h2>
      </div>
      
      <div className="flex items-center gap-1.5 rounded-2xl bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
        <span className="text-xl font-black leading-none text-slate-900">
          {groups?.length || 0}
        </span>
        <span className="text-sm font-black text-slate-900">
          개
        </span>
      </div>
    </div>
  );
};
