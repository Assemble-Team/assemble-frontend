import { Tabs } from '@/shared/ui/Tabs';
import { ROUTES } from '@/shared/constants/routes';

export default function MyPageSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { label: '프로필 설정', href: ROUTES.MYPAGE.SETTINGS.PROFILE },
    { label: '알림 설정', href: ROUTES.MYPAGE.SETTINGS.NOTIFICATIONS },
  ];

  return (
    <div className="space-y-6">
      <Tabs items={tabs} />
      <div>{children}</div>
    </div>
  );
}
