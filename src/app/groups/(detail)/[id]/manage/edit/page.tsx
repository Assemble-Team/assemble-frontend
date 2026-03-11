'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGroupDetail } from '@/entities/groups/api/useGroupDetail';
import { Settings, ChevronLeft, Save } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';

const EditGroupPageContent = ({ groupId }: { groupId: string }) => {
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-50 text-brand-600 flex h-12 w-12 items-center justify-center rounded-2xl">
            <Settings size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              모임 정보 수정
            </h2>
            <p className="text-sm font-medium text-slate-400">
              모임의 기본 정보를 최신 상태로 유지하세요.
            </p>
          </div>
        </div>
        <Button className="gap-2 rounded-full font-black">
          <Save size={18} />
          저장하기
        </Button>
      </div>

      {/* 수정 폼 (임시 레이아웃) */}
      <div className="space-y-6 rounded-4xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-900">모임 이름</label>
          <input
            type="text"
            defaultValue={group.title}
            className="focus:border-brand-500 w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 font-medium outline-hidden transition-all focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-black text-slate-900">모임 설명</label>
          <textarea
            defaultValue={group.description}
            rows={5}
            className="focus:border-brand-500 w-full resize-none rounded-3xl border border-slate-100 bg-slate-50 p-4 font-medium outline-hidden transition-all focus:bg-white"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-900">
              카테고리
            </label>
            <select className="focus:border-brand-500 w-full appearance-none rounded-2xl border border-slate-100 bg-slate-50 p-4 font-medium outline-hidden transition-all focus:bg-white">
              <option>{group.categoryLabel}</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-900">
              활동 지역
            </label>
            <input
              type="text"
              defaultValue={group.location}
              className="focus:border-brand-500 w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 font-medium outline-hidden transition-all focus:bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EditGroupPage() {
  const params = useParams();
  const groupId = params.id as string;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <Suspense
        fallback={
          <div className="h-96 w-full animate-pulse rounded-4xl bg-slate-100" />
        }
      >
        <EditGroupPageContent groupId={groupId} />
      </Suspense>
    </div>
  );
}
