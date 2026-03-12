import { GroupListPage } from '@/_pages/groups/list';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  return <GroupListPage searchParams={resolvedParams} />;
}
