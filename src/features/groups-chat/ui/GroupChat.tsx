'use client';

import { MessageCircle } from 'lucide-react';

export const GroupChat = () => {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <div className="relative">
        <div className="bg-brand-500/10 absolute -inset-4 rounded-full blur-2xl" />
        <div className="bg-brand-50 text-brand-550 relative flex h-20 w-20 items-center justify-center rounded-3xl shadow-inner">
          <MessageCircle size={40} className="text-brand-600" />
        </div>
      </div>

      <div className="max-w-md space-y-3">
        <h2 className="text-3xl font-black tracking-tight text-slate-900">
          그룹 채팅 준비 중
        </h2>
        <p className="text-lg leading-relaxed font-medium text-slate-400">
          실시간으로 멤버들과 소통할 수 있는 채팅 서비스가{' '}
          <br className="hidden md:block" />곧 찾아옵니다. 조금만 기다려 주세요!
        </p>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-500">
          #실시간_소통
        </span>
        <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-500">
          #푸시_알림
        </span>
        <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-500">
          #파일_공유
        </span>
      </div>
    </div>
  );
};
