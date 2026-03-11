import { NoticeListWidget } from '@/widgets/group-notice/ui/NoticeListWidget';

export default async function GroupNoticePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: groupId } = await props.params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <NoticeListWidget groupId={groupId} />
    </div>
  );
}
