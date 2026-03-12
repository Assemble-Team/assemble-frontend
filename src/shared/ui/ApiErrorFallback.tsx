'use client';

import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/shared/ui/Button';

interface ApiErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * 백엔드 서버 연결 실패 또는 API 에러 시 보여주는 공통 폴백 컴포넌트입니다.
 */
export function ApiErrorFallback({ error, resetErrorBoundary }: ApiErrorFallbackProps) {
  const isNetworkError = error.message.includes('연결할 수 없습니다');

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 rounded-[3rem] border border-slate-100 bg-white p-12 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
        <AlertCircle size={32} />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-black tracking-tight text-slate-900">
          {isNetworkError ? '시스템 점검 중' : '서비스 이용에 불편을 드려 죄송합니다'}
        </h2>
        <p className="max-w-[280px] text-sm font-bold leading-relaxed text-slate-400">
          {isNetworkError 
            ? '현재 백엔드 서버가 준비 중이거나 점검 중입니다. 잠시 후 다시 이용해 주세요.'
            : error.message}
        </p>
      </div>

      <Button
        variant="outline"
        onClick={resetErrorBoundary}
        className="gap-2 rounded-2xl px-6 py-6 font-black"
      >
        <RefreshCcw size={16} />
        다시 시도
      </Button>
    </div>
  );
}
