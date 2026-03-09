import { Tabs } from '@/shared/ui/Tabs';
import { ROUTES } from '@/shared/constants/routes';

export default function MyPageGroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { label: '좋아요 모임', href: ROUTES.MYPAGE.GROUPS.LIKED },
    { label: '승인 대기중', href: ROUTES.MYPAGE.GROUPS.PENDING },
    { label: '가입한 모임', href: ROUTES.MYPAGE.GROUPS.JOINED },
  ];

  return (
    <div className="space-y-6">
      <Tabs items={tabs} />
      <div>{children}</div>
    </div>
  );
}
