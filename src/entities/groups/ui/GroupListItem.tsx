import {
  MapPin,
  Users,
  Heart,
  ChartColumnIncreasing,
  MessageSquare,
  CalendarClock,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { Group, JoinedGroup } from '../model/types';
import { useToggleLike } from '@/features/groups-like/api/useToggleLike';

interface GroupListItemProps {
  group: Group | JoinedGroup;
  overlay?: React.ReactNode;
  variant?: 'default' | 'compact';
}

export const GroupListItem = ({
  group,
  overlay,
  variant = 'default',
}: GroupListItemProps) => {
  const isJoined = 'myRole' in group;
  const { mutate: toggleLike } = useToggleLike();

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(group.id);
  };

  if (variant === 'compact') {
    return (
      <div className="group relative flex items-center gap-4 transition-all">
        {/* 카드 전체 클릭 */}
        <Link
          href={ROUTES.GROUPS.DETAIL(String(group.id))}
          className="absolute inset-0 z-0"
        />

        {/* Thumbnail Section - Compact */}
        <div className="relative z-10 h-16 w-16 shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105">
          <img
            src={group.image}
            className="h-full w-full object-cover"
            alt={group.title}
          />
          {overlay && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              {overlay}
            </div>
          )}
        </div>

        {/* Content Section - Compact */}
        <div className="relative z-10 flex flex-1 flex-col justify-center gap-1 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <h3 className="group-hover:text-brand-600 truncate text-sm font-black text-slate-900 transition-colors">
              {group.title}
            </h3>
            {!isJoined && 'like' in group && (
              <button
                onClick={handleToggleLike}
                className="relative z-20 flex items-center gap-1 transition-transform active:scale-90"
              >
                <Heart
                  size={10}
                  fill={(group as Group).like.isLiked ? '#ef4444' : 'none'}
                  className={cn(
                    (group as Group).like.isLiked
                      ? 'text-red-500'
                      : 'text-slate-300'
                  )}
                />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
              <MapPin size={9} />
              <span className="truncate">{group.location}</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
              <Users size={9} />
              <span>{group.participants.current}명</span>
            </div>
          </div>

          {/* Compact Activity Info */}
          {isJoined && (
            <div className="mt-0.5 flex items-center gap-2">
              <div className="flex h-5 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 text-[8px] font-black text-slate-500 ring-1 ring-slate-100 ring-inset">
                <CalendarClock size={9} className="text-slate-300" />
                <span className="truncate">
                  {(group as JoinedGroup).nextSchedule?.title || '일정 없음'}
                </span>
              </div>
              <div className="flex h-5 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 text-[8px] font-black text-slate-500 ring-1 ring-slate-100 ring-inset">
                <MessageSquare size={9} className="text-slate-300" />
                <span className="truncate">
                  {(group as JoinedGroup).lastMessage?.content || '대화 없음'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default Variant (Existing)
  return (
    <div className="group relative flex flex-col gap-3 transition-all">
      {/* 카드 전체 클릭 (기본 상세 홈으로 이동) */}
      <Link
        href={ROUTES.GROUPS.DETAIL(String(group.id))}
        className="absolute inset-0 z-0"
      />

      {/* Thumbnail Section - 배경 및 그림자 제거 */}
      <div className="pointer-events-none relative z-10 aspect-video w-full overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-1">
        <img
          src={group.image}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={group.title}
        />
        {overlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            {overlay}
          </div>
        )}

        <div className="absolute top-2 left-2">
          <span className="rounded-md bg-slate-900/80 px-1.5 py-0.5 text-[8px] font-black tracking-widest text-white uppercase backdrop-blur-sm">
            {group.categoryLabel}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col px-0.5">
        <h3 className="group-hover:text-brand-600 line-clamp-1 text-sm font-black text-slate-900 transition-colors">
          {group.title}
        </h3>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
            <MapPin size={9} />
            <span className="truncate">{group.location}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users size={9} className="text-slate-300" />
            <span className="text-[9px] font-bold text-slate-500">
              {group.participants.current}/{group.participants.max}명
            </span>
          </div>

          {group.levelLabel && (
            <div className="flex items-center gap-1">
              <ChartColumnIncreasing size={9} className="text-slate-300" />
              <span className="text-[9px] font-bold text-slate-500">
                {group.levelLabel}
              </span>
            </div>
          )}
        </div>

        {/* 가입한 모임 전용: 활동 정보 (일정 & 채팅) */}
        {isJoined && (
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            {/* 다음 일정 바로가기 */}
            <Link
              href={`${ROUTES.GROUPS.DETAIL(String(group.id))}/schedules`}
              className="relative z-20 flex"
              onClick={(e) => e.stopPropagation()}
            >
              {(group as JoinedGroup).nextSchedule ? (
                <div className="hover:border-brand-300 hover:bg-brand-100/50 border-brand-100 bg-brand-50 text-brand-600 flex flex-1 items-center gap-1 rounded-xl border px-1.5 py-1.5 transition-all hover:shadow-xs active:scale-[0.98]">
                  <CalendarClock size={9} className="shrink-0" />
                  <span className="truncate text-[8px] font-black">
                    {(group as JoinedGroup).nextSchedule?.title}
                  </span>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-50/50 px-1 py-1.5 text-[8px] font-bold text-slate-300 ring-1 ring-slate-100 ring-inset">
                  일정 없음
                </div>
              )}
            </Link>

            {/* 마지막 채팅 + 안 읽은 개수 바로가기 */}
            <Link
              href={`${ROUTES.GROUPS.DETAIL(String(group.id))}/chat`}
              className="relative z-20 flex"
              onClick={(e) => e.stopPropagation()}
            >
              {(group as JoinedGroup).lastMessage ? (
                <div className="flex flex-1 items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 px-1.5 py-1.5 transition-all hover:border-slate-300 hover:bg-slate-100/80 hover:shadow-xs active:scale-[0.98]">
                  <MessageSquare size={9} className="shrink-0 text-slate-300" />
                  <p className="line-clamp-1 flex-1 text-[8px] font-bold text-slate-500">
                    {(group as JoinedGroup).lastMessage?.content}
                  </p>
                  {(group as JoinedGroup).unreadChatCount > 0 && (
                    <div className="bg-brand-500 flex h-2.5 min-w-[10px] items-center justify-center rounded-full px-0.5 font-black shadow-xs">
                      <span className="text-[5px] text-white">
                        {(group as JoinedGroup).unreadChatCount}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-50/50 px-1 py-1.5 text-[8px] font-bold text-slate-300 ring-1 ring-slate-100 ring-inset">
                  대화 없음
                </div>
              )}
            </Link>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between">
          {/* 일반 모임: 좋아요 정보 (가입한 모임에서는 제거) */}
          {!isJoined && 'like' in group && (
            <button
              onClick={handleToggleLike}
              className="relative z-20 ml-auto flex items-center gap-1.5 transition-transform active:scale-90"
            >
              <Heart
                size={14}
                fill={(group as Group).like.isLiked ? '#ef4444' : 'none'}
                className={cn(
                  'transition-colors',
                  (group as Group).like.isLiked
                    ? 'text-red-500'
                    : 'text-slate-300'
                )}
              />
              <span
                className={cn(
                  'text-[11px] font-black transition-colors',
                  (group as Group).like.isLiked
                    ? 'text-red-500'
                    : 'text-slate-400'
                )}
              >
                {(group as Group).like.count}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
