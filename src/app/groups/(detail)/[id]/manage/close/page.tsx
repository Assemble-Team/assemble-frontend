'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGroupDetail } from '@/entities/groups/api/useGroupDetail';
import { AlertTriangle, ChevronLeft, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';

const CloseGroupPageContent = ({ groupId }: { groupId: string }) => {
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

      <div className="flex flex-col items-center justify-center gap-12 py-12 text-center">
        <div className="relative">
          <div className="absolute -inset-8 animate-pulse rounded-full bg-rose-500/10 blur-3xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-rose-50 text-rose-500 shadow-inner">
            <AlertTriangle size={48} />
          </div>
        </div>

        <div className="max-w-md space-y-4">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            모임을 정말 폐쇄할까요?
          </h2>
          <div className="space-y-2 rounded-2xl bg-slate-50 p-6 text-left text-sm leading-relaxed font-medium text-slate-500">
            <p className="mb-2 font-black text-slate-700">
              폐쇄 시 다음과 같은 일이 발생합니다:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>모든 멤버가 자동으로 탈퇴 처리됩니다.</li>
              <li>그동안 쌓인 모든 게시글과 공지가 삭제됩니다.</li>
              <li>채팅방 및 공유된 모든 파일이 파기됩니다.</li>
              <li className="font-bold text-rose-500">
                이 작업은 절대 되돌릴 수 없습니다.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3">
          <Button
            variant="ghost"
            className="w-full rounded-2xl border border-rose-100 bg-rose-50 py-4 font-black text-rose-600 hover:bg-rose-100"
            onClick={() => alert('모임 폐쇄 처리가 시작되었습니다.')}
          >
            <Trash2 size={18} className="mr-2" />
            네, 모임을 폐쇄합니다
          </Button>
          <Button
            variant="ghost"
            className="w-full py-4 font-black text-slate-400 transition-colors hover:text-slate-900"
            onClick={() => router.back()}
          >
            아니오, 유지하겠습니다
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CloseGroupPage() {
  const params = useParams();
  const groupId = params.id as string;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <Suspense
        fallback={
          <div className="h-96 w-full animate-pulse rounded-4xl bg-slate-100" />
        }
      >
        <CloseGroupPageContent groupId={groupId} />
      </Suspense>
    </div>
  );
}
