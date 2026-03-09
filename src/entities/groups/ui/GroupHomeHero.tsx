import { MapPin, Users, ChartColumnIncreasing, Calendar } from 'lucide-react';
import { GroupDetail } from '../model/types';
import { cn } from '@/shared/lib/utils';

interface GroupHomeHeroProps {
  group: GroupDetail;
}

export const GroupHomeHero = ({ group }: GroupHomeHeroProps) => {
  return (
    <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-start md:gap-12">
      {/* 이미지 섹션: 좌측에 고정된 크기로 배치 (데스크탑) */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[2.5rem] shadow-xl shadow-slate-200/40 md:w-80 lg:w-96">
        <img
          src={group.image}
          alt={group.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* 모집 상태 뱃지 */}
        <div className="absolute bottom-4 left-4">
          <span
            className={cn(
              'rounded-xl px-4 py-2 text-[10px] font-black tracking-widest uppercase shadow-lg backdrop-blur-md',
              group.isRecruiting
                ? 'bg-brand-500/90 text-white'
                : 'bg-slate-800/90 text-slate-300'
            )}
          >
            {group.isRecruiting ? '모집 중' : '모집 완료'}
          </span>
        </div>
      </div>

      {/* 텍스트 정보 섹션: 우측 영역 차지 */}
      <div className="flex flex-1 flex-col justify-center gap-6 py-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-brand-50 text-brand-600 rounded-xl px-4 py-1.5 text-xs font-black tracking-widest uppercase">
              {group.categoryLabel}
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            {group.title}
          </h1>
        </div>

        {/* 핵심 정보 그리드: 가로 레이아웃에 맞춰 그리드 조정 */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <InfoItem
            icon={<MapPin size={18} />}
            label="지역"
            value={group.location}
          />
          <InfoItem
            icon={<ChartColumnIncreasing size={18} />}
            label="난이도"
            value={group.levelLabel}
          />
          <InfoItem
            icon={<Users size={18} />}
            label="정원"
            value={`${group.participants.current}/${group.participants.max}명`}
          />
          <InfoItem
            icon={<Calendar size={18} />}
            label="등록일"
            value="2024.05.20"
          />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
        {label}
      </span>
      <span className="text-sm font-bold text-slate-600">{value}</span>
    </div>
  </div>
);
