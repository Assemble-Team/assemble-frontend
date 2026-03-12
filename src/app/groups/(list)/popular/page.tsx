import { PopularGroupListPage } from '@/_pages/groups/list';

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  return <PopularGroupListPage searchParams={resolvedParams} />;
}
