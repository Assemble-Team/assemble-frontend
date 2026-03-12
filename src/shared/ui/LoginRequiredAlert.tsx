'use client';

import { Lock, LogIn } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';

interface LoginRequiredAlertProps {
  title?: string;
  description?: string;
}

/**
 * [Component] 로그인되지 않은 사용자에게 보여주는 안내 UI
 * - 세련된 알림창 형태이며 로그인 페이지로의 이동을 유도합니다.
 */
export function LoginRequiredAlert({
  title = '로그인이 필요한 서비스입니다.',
  description = '모임을 만드시려면 먼저 로그인해주세요.',
}: LoginRequiredAlertProps) {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-[400px] w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-[3rem] border border-slate-100 bg-white p-12 text-center shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
        <Lock size={40} />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="text-lg font-bold leading-relaxed text-slate-400">
          {description}
        </p>
      </div>

      <div className="flex w-full max-w-[320px] gap-3 pt-2">
        <Button
          variant="outline"
          className="flex-1 rounded-2xl py-6 font-black"
          onClick={() => router.back()}
        >
          뒤로가기
        </Button>
        <Button
          className="flex-1 gap-2 rounded-2xl py-6 font-black"
          onClick={() => router.push(ROUTES.AUTH.LOGIN)}
        >
          <LogIn size={18} />
          로그인하러 가기
        </Button>
      </div>
    </div>
  );
}
