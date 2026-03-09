import { Tabs } from '@/shared/ui/Tabs';
import { ROUTES } from '@/shared/constants/routes';

export default function MyPageActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { label: '나의 게시글', href: ROUTES.MYPAGE.ACTIVITIES.POSTS },
    { label: '나의 댓글', href: ROUTES.MYPAGE.ACTIVITIES.COMMENTS },
  ];

  return (
    <div className="space-y-6">
      <Tabs items={tabs} />
      <div>{children}</div>
    </div>
  );
}
