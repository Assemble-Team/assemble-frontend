'use client';

import {
  GroupCategoryFilter,
  GroupLevelFilter,
  GroupStatusFilter,
  FilterResetButton,
  GroupSortOrder,
} from '@/features/groups-filter';
import { GroupList } from '@/entities/groups/ui/GroupList';
import { GroupSearchResultHeader } from './GroupSearchResultHeader';
import { useSearchParams } from 'next/navigation';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';

/**
 * 모임 목록 페이지의 핵심 컨텐츠를 담당하는 위젯입니다.
 * 필터 시스템과 모임 리스트 결과를 조합합니다.
 */
export function GroupListWidget() {
  const searchParams = useSearchParams();
  const hasQuery = !!searchParams.get('query');

  return (
    <div className="flex flex-col gap-4 px-4 pb-20">
      {/* 카테고리 탭 섹션 (최상단) */}
      <section className="-mx-4 px-4">
        <GroupCategoryFilter />
      </section>

      {/* 세부 필터 섹션 */}
      <section className="mt-4 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <GroupStatusFilter />
          <div className="hidden h-5 w-[1px] bg-slate-200 sm:block" />
          <GroupLevelFilter />
        </div>

        <div className="flex items-center justify-between">
          <FilterResetButton />
          <GroupSortOrder />
        </div>
      </section>

      {/* 검색 결과 헤더 (검색어 있을 때만) */}
      {hasQuery && <GroupSearchResultHeader />}

      {/* 리스트 결과 섹션 - AsyncBoundary 적용 */}
      <AsyncBoundary
        loadingFallback={
          <div className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] animate-pulse rounded-[2.5rem] bg-slate-100"
              />
            ))}
          </div>
        }
      >
        <GroupList />
      </AsyncBoundary>
    </div>
  );
}
