import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { Tabs } from '@/shared/ui/Tabs/Tabs';
import { RankingList } from '@/widgets/ranking-list/ui/RankingList.client';

interface PopularGroupsWidgetProps {
  activeTab: 'hall-of-fame' | 'weekly';
}

/**
 * 인기 그룹 페이지의 전체 레이아웃과 랭킹 리스트를 조합한 위젯입니다.
 */
export function PopularGroupsWidget({ activeTab }: PopularGroupsWidgetProps) {
  const tabItems = [
    {
      label: '🏆 명예의 전당',
      href: `${ROUTES.GROUPS.LIST}/popular?type=hall-of-fame`,
      value: 'hall-of-fame',
    },
    {
      label: '🔥 주간 인기',
      href: `${ROUTES.GROUPS.LIST}/popular?type=weekly`,
      value: 'weekly',
    },
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <section className="space-y-4 text-center md:text-left">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <span className="bg-brand-50 text-brand-600 ring-brand-100 rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase ring-1">
            Popular Groups
          </span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          가장 핫한 모임 <span className="text-brand-600">인사</span>
        </h1>
        <p className="max-w-2xl text-lg font-medium text-slate-400">
          {activeTab === 'hall-of-fame'
            ? '수많은 인원이 검증한 어셈블 최고의 명예의 전당 모임들입니다.'
            : '최근 7일간 가장 활발한 활동을 보여준 트렌디한 모임들입니다.'}
        </p>
      </section>

      <div className="sticky top-16 z-20 -mx-4 bg-white/80 px-4 backdrop-blur-md md:top-20">
        <Tabs items={tabItems} searchParamKey="type" className="border-none" />
      </div>

      <section className="relative min-h-[500px]">
        <div className="bg-brand-50/30 absolute -top-4 -left-4 -z-10 h-64 w-64 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-4 -z-10 h-64 w-64 rounded-full bg-slate-50 blur-3xl" />
        <RankingList type={activeTab} />
      </section>

      <section className="flex flex-col items-center gap-4 rounded-[2.5rem] bg-slate-50 p-8 text-center md:p-12">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">
          당신의 모임도 명예의 전당에 오를 수 있습니다
        </h2>
        <p className="text-sm font-medium text-slate-400">지금 꾸준히 소통하고 활동하여 최고의 모임을 만들어보세요.</p>
        <Link href={ROUTES.GROUPS.LIST} className="group text-brand-600 hover:text-brand-700 flex items-center gap-2 font-black transition-colors">
          더 많은 모임 보러가기
          <ChevronRight size={18} className="translate-y-0.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
