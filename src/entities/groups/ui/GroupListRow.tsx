'use client';

import { MapPin, Users, Heart, ChartColumnIncreasing } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { Group } from '../model/types';

interface GroupListRowProps {
  group: Group;
  overlay?: React.ReactNode;
}

/**
 * 모임 정보를 가로 리스트 형태로 보여주는 컴포넌트입니다. (카드 디자인 대체)
 */
export const GroupListRow = ({ group, overlay }: GroupListRowProps) => {
  return (
    <Link
      href={ROUTES.GROUPS.DETAIL(String(group.id))}
      className="group flex items-center gap-4 border-b border-slate-100 bg-white p-4 transition-colors hover:bg-slate-50 last:border-none md:gap-6 md:p-6"
    >
      {/* 왼쪽: 썸네일 이미지 */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl md:h-24 md:w-24">
        <img
          src={group.image}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={group.title}
        />
        {overlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
            {overlay}
          </div>
        )}
      </div>

      {/* 중간: 정보 섹션 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 md:gap-2">
        <div className="flex items-center gap-2">
          <span className="text-brand-600 text-[10px] font-black tracking-widest uppercase">
            {group.categoryLabel}
          </span>
          <span className="h-2 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
            <MapPin size={10} />
            <span>{group.location}</span>
          </div>
        </div>

        <h3 className="truncate text-base font-black text-slate-900 md:text-lg">
          {group.title}
        </h3>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-slate-300" />
            <span className="text-[12px] font-bold text-slate-500">
              {group.participants.current}/{group.participants.max}명
            </span>
          </div>
          {group.levelLabel && (
            <div className="flex items-center gap-1.5">
              <ChartColumnIncreasing size={14} className="text-slate-300" />
              <span className="text-[12px] font-bold text-slate-500">
                {group.levelLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 액션/상태 섹션 */}
      <div className="flex flex-col items-end gap-2 md:gap-3">
        <div
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-1 transition-all',
            group.like.isLiked ? 'text-rose-500' : 'text-slate-300'
          )}
        >
          <Heart size={16} className={cn(group.like.isLiked && 'fill-rose-500')} />
          <span className="text-xs font-black">{group.like.count}</span>
        </div>
        
        {group.isRecruiting ? (
          <span className="bg-brand-50 text-brand-600 rounded-lg px-2 py-1 text-[10px] font-black uppercase">
            모집 중
          </span>
        ) : (
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-black text-slate-400 uppercase">
            모집 마감
          </span>
        )}
      </div>
    </Link>
  );
};
