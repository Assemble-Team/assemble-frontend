'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGroupDetail } from '@/entities/groups/api/useGroupDetail';
import { UserCog, ChevronLeft, MoreVertical, Shield } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';

const ManageMembersPageContent = ({ groupId }: { groupId: string }) => {
  const { data: group } = useGroupDetail(groupId);
  const router = useRouter();

  if (group.myRole !== 'LEADING') {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <p className="text-xl font-black text-slate-900">권한이 없습니다.</p>
        <Button onClick={() => router.back()}>뒤로가기</Button>
      </div>
    );
  }

  const mockMembers = [
    { id: 1, name: '테니스장인', role: 'LEADING', joinDate: '2024.01.10' },
    { id: 2, name: '김코치', role: 'MEMBER', joinDate: '2024.02.15' },
    { id: 3, name: '초보탈출', role: 'MEMBER', joinDate: '2024.03.20' },
  ];

  return (
    <div className="space-y-8">
      {/* 상단 네비게이션 */}
      <Link
        href={`/groups/${groupId}/manage`}
        className="flex items-center gap-1 text-sm font-bold text-slate-400 transition-colors hover:text-slate-900"
      >
        <ChevronLeft size={16} />
        관리 메인으로 돌아가기
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-50 text-brand-600 flex h-12 w-12 items-center justify-center rounded-2xl">
            <UserCog size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">멤버 관리</h2>
            <p className="text-sm font-medium text-slate-400">
              멤버의 권한을 변경하거나 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 멤버 리스트 카드 */}
      <div className="overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {mockMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-6"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-slate-100" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">
                      {member.name}
                    </span>
                    {member.role === 'LEADING' && (
                      <span className="bg-brand-500 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black text-white">
                        <Shield size={10} />
                        모임장
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-300">
                    가입일: {member.joinDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {member.role !== 'LEADING' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl py-2 font-bold"
                    >
                      등급 변경
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl py-2 font-bold text-rose-500 hover:bg-rose-50"
                    >
                      강퇴
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-slate-300"
                >
                  <MoreVertical size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ManageMembersPage() {
  const params = useParams();
  const groupId = params.id as string;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <Suspense
        fallback={
          <div className="h-96 w-full animate-pulse rounded-4xl bg-slate-100" />
        }
      >
        <ManageMembersPageContent groupId={groupId} />
      </Suspense>
    </div>
  );
}
