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
      label: '🏆 명예의 전당 (Top 5)',
      href: `${ROUTES.GROUPS.LIST}/popular?type=hall-of-fame`,
      value: 'hall-of-fame',
    },
    {
      label: '🔥 주간 인기 (Top 5)',
      href: `${ROUTES.GROUPS.LIST}/popular?type=weekly`,
      value: 'weekly',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-16 z-20 -mx-4 bg-white/80 px-4 py-2 backdrop-blur-md md:top-20">
        <Tabs items={tabItems} searchParamKey="type" className="border-none" />
      </div>

      <section className="relative min-h-[400px] pt-4">
        <RankingList type={activeTab} />
      </section>

      <section className="mt-12 flex flex-col items-center gap-4 rounded-[2.5rem] bg-slate-50 p-8 text-center md:p-10">
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
