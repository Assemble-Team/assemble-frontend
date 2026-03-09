import { MyPageSidebar } from '@/widgets/mypage-sidebar/ui/MyPageSidebar';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full flex-col px-4 md:flex-row md:gap-x-8 md:px-8">
      <MyPageSidebar />

      {/* 우측 컨텐츠 영역 */}
      <main className="min-w-0 flex-1">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
