import { MainNavigationSidebar } from '@/widgets/sidebar';

interface GroupListLayoutProps {
  children: React.ReactNode;
}

export default function GroupListLayout({ children }: GroupListLayoutProps) {
  return (
    <div className="flex gap-x-4 px-4 lg:px-8">
      {/* 왼쪽 사이드바 */}
      <MainNavigationSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
