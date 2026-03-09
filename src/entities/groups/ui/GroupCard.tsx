import { MapPin, Users, Heart, ChartColumnIncreasing } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { Group } from '../model/types';

interface GroupCardProps {
  group: Group;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <Link
      href={ROUTES.GROUPS.DETAIL(String(group.id))}
      className="group hover:border-brand-200 relative flex cursor-pointer flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50"
    >
      {/* 이미지 섹션: 가로세로 비중 조정 및 크기 축소 */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden">
        <img
          src={group.image}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={group.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* 정보 섹션 */}
      <div className="flex flex-1 flex-col gap-5 p-6 pt-5">
        <div className="space-y-3">
          <h3 className="group-hover:text-brand-600 line-clamp-1 text-lg font-black tracking-tight text-slate-900 transition-colors md:text-xl">
            {group.title}
          </h3>

          {/* 뱃지 섹션: 스타일 통일 */}
          <div className="flex flex-wrap gap-2">
            <Badge
              icon={<span className="text-brand-500 font-bold">#</span>}
              label={group.categoryLabel}
            />
            <Badge
              icon={
                <ChartColumnIncreasing size={12} className="text-brand-500" />
              }
              label={group.levelLabel}
            />
            <Badge
              icon={<MapPin size={12} className="text-brand-500" />}
              label={group.location}
            />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-slate-300" />
            <span className="text-[11px] font-black tracking-tight text-slate-500">
              {group.participants.current}/{group.participants.max}명
            </span>
          </div>

          {/* 하단 좋아요 버튼 위치 */}
          <button
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all',
              group.like.isLiked
                ? 'bg-rose-50 text-rose-500'
                : 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500'
            )}
            onClick={(e) => {
              e.preventDefault();
              // 좋아요 로직 연동 예정
            }}
          >
            <Heart
              size={14}
              className={cn(group.like.isLiked && 'fill-rose-500')}
            />
            <span className="text-xs font-black">{group.like.count}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

// 내부 컴포넌트: 통일된 뱃지 스타일
const Badge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/50 px-2.5 py-1.5 text-[10px] font-black tracking-widest text-slate-500 uppercase">
    {icon}
    {label}
  </span>
);
