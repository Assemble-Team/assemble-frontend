'use client';

import { GroupRanking } from '@/entities/groups/model/types';
import { cn } from '@/shared/lib/utils';
import { Crown, Medal, Minus, MoveDown, MoveUp } from 'lucide-react';

interface RankingCardProps {
  ranking: GroupRanking;
}

export const RankingCard = ({ ranking }: RankingCardProps) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <Crown className="text-yellow-400" size={24} fill="currentColor" />
        );
      case 2:
        return (
          <Medal className="text-slate-300" size={24} fill="currentColor" />
        );
      case 3:
        return (
          <Medal className="text-amber-600" size={24} fill="currentColor" />
        );
      default:
        return (
          <span className="text-lg font-black text-slate-400">{rank}</span>
        );
    }
  };

  const getRankChangeUI = (change: string) => {
    if (change === 'NEW') {
      return (
        <span className="rounded-lg bg-amber-50 px-2 py-0.5 text-[9px] font-black tracking-widest text-amber-600 uppercase">
          NEW
        </span>
      );
    }

    const value = parseInt(change);
    if (value > 0) {
      return (
        <span className="flex items-center gap-0.5 text-[11px] font-bold text-red-500">
          <MoveUp size={10} strokeWidth={3} /> {value}
        </span>
      );
    }
    if (value < 0) {
      return (
        <span className="flex items-center gap-0.5 text-[11px] font-bold text-blue-500">
          <MoveDown size={10} strokeWidth={3} /> {Math.abs(value)}
        </span>
      );
    }
    return <Minus className="text-slate-300" size={12} strokeWidth={3} />;
  };

  return (
    <div
      className={cn(
        'group relative flex items-center gap-4 border-b border-slate-50 py-4 transition-all duration-300 md:gap-6 md:py-6',
        ranking.rank <= 3 && 'bg-brand-50/5'
      )}
    >
      {/* 순위 표시 */}
      <div className="flex w-10 shrink-0 flex-col items-center justify-center gap-1">
        {getRankBadge(ranking.rank)}
        {ranking.rank > 3 && getRankChangeUI(ranking.rankChange)}
      </div>

      {/* 이미지 */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 md:h-20 md:w-20">
        {ranking.imageUrl ? (
          <img
            src={ranking.imageUrl}
            alt={ranking.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            {ranking.title[0]}
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <div className="flex items-center gap-2">
          {ranking.category && (
            <span className="text-[10px] font-black tracking-tight text-slate-400 uppercase">
              {ranking.category}
            </span>
          )}
          {ranking.rank <= 3 && (
            <div className="hidden md:block">
              {getRankChangeUI(ranking.rankChange)}
            </div>
          )}
        </div>
        <h3 className="truncate text-lg font-black text-slate-900 md:text-xl">
          {ranking.title}
        </h3>
      </div>

      {/* 점수 */}
      <div className="flex shrink-0 flex-col items-end gap-1 pr-2">
        <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
          Score
        </span>
        <span className="text-brand-600 text-xl font-black tabular-nums md:text-2xl">
          {ranking.rankingScore.toFixed(1)}
        </span>
      </div>
    </div>
  );
};
