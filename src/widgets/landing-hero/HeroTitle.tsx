import { Logo } from '@/shared/ui/Logo';

export default function HeroTitle() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <Logo width={400} />
        <span className="rounded-full bg-brand-50 px-4 py-1 text-sm font-black text-brand-600">
          지역 기반 모임 서비스
        </span>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
          가까운 곳에서 찾은 <br />
          진짜 내 취향, <span className="text-brand-600">Assemble</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-bold leading-relaxed text-slate-400 md:text-xl">
          내가 사는 동네의 수많은 모임을 검색하고, <br className="hidden md:block" />
          새로운 영감을 줄 멤버들과 지금 바로 만나보세요.
        </p>
      </div>
    </div>
  );
}
