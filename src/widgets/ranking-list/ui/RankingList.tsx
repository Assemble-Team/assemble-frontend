'use client';

import { useRanking } from '@/entities/groups/api/useRanking';
import { RankingCard } from '@/entities/groups/ui/RankingCard';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';

interface RankingListProps {
  type: 'hall-of-fame' | 'weekly';
}

const RankingListContent = ({ type }: RankingListProps) => {
  const { data: rankings } = useRanking(type);

  if (!rankings || rankings.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50">
        <p className="font-bold text-slate-400">데이터가 아직 없습니다.</p>
      </div>
    );
  }

  // 최대 5개까지만 렌더링
  const displayRankings = rankings.slice(0, 5);

  return (
    <div className="flex flex-col gap-4">
      {displayRankings.map((ranking) => (
        <RankingCard key={ranking.id} ranking={ranking} />
      ))}
    </div>
  );
};

export const RankingList = (props: RankingListProps) => {
  return (
    <AsyncBoundary
      loadingFallback={
        <div className="flex animate-pulse flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 w-full rounded-[2rem] bg-slate-100" />
          ))}
        </div>
      }
    >
      <RankingListContent {...props} />
    </AsyncBoundary>
  );
};
