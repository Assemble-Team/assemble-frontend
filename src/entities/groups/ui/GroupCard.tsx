import { MapPin, Users, Heart, ChartColumnIncreasing } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { Group } from '../model/types';

interface GroupCardProps {
  group: Group;
  overlay?: React.ReactNode;
}

export const GroupCard = ({ group, overlay }: GroupCardProps) => {
  return (
    <Link
      href={ROUTES.GROUPS.DETAIL(String(group.id))}
      className="group relative flex cursor-pointer flex-col gap-3 transition-all duration-300"
    >
      {/* 이미지 섹션: 둥근 모서리는 유지하되 테두리는 제거 */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-3xl">
        <img
          src={group.image}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={group.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-40" />
        
        {overlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            {overlay}
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="rounded-lg bg-white/90 px-2 py-1 text-[9px] font-black tracking-widest text-slate-900 uppercase backdrop-blur-md">
            {group.categoryLabel}
          </span>
        </div>
      </div>

      {/* 정보 섹션: 패딩 제거 및 텍스트 강조 */}
      <div className="flex flex-col gap-2 px-1">
        <h3 className="group-hover:text-brand-600 line-clamp-1 text-base font-black tracking-tight text-slate-900 transition-colors md:text-lg">
          {group.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <MapPin size={12} />
            <span>{group.location}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <Users size={12} />
            <span>{group.participants.current}/{group.participants.max}명</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <ChartColumnIncreasing size={12} />
            <span>{group.levelLabel}</span>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Heart
              size={14}
              className={cn(
                group.like.isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
              )}
            />
            <span className={cn(
              "text-[11px] font-black",
              group.like.isLiked ? "text-rose-500" : "text-slate-400"
            )}>
              {group.like.count}
            </span>
          </div>
          
          <span className={cn(
            "text-[10px] font-black tracking-tighter uppercase",
            group.isRecruiting ? "text-brand-600" : "text-slate-300"
          )}>
            {group.statusLabel}
          </span>
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
