import Logo from '@/shared/ui/Logo/Logo';

export default function HeroTitle() {
  return (
    <div className="max-w-5xl text-center">
      <Logo width={600} />
      <p className="mx-auto max-w-3xl text-2xl leading-relaxed font-bold tracking-tight text-gray-400 md:text-4xl">
        나와 닮은 에너지가 모이는 곳, <br />
        당신의 새로운 모임을 검색해보세요.
      </p>
    </div>
  );
}
