import { PopularGroupsWidget } from '@/widgets/popular-groups/ui/PopularGroupsWidget';

interface PopularGroupListPageProps {
  searchParams: { type?: string };
}

export async function PopularGroupListPage({ searchParams }: PopularGroupListPageProps) {
  const { type } = searchParams;
  const activeTab = (type === 'weekly' ? 'weekly' : 'hall-of-fame') as 'hall-of-fame' | 'weekly';

  return (
    <main className="flex flex-col gap-4 px-4 pb-20">
      <PopularGroupsWidget activeTab={activeTab} />
    </main>
  );
}
