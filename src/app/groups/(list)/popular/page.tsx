import { PopularGroupsWidget } from '@/widgets/popular-groups/ui/PopularGroupsWidget';

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function RankingPage({ searchParams }: PageProps) {
  const { type } = await searchParams;
  const activeTab = (type === 'weekly' ? 'weekly' : 'hall-of-fame') as 'hall-of-fame' | 'weekly';

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 md:py-16">
      <PopularGroupsWidget activeTab={activeTab} />
    </main>
  );
}
