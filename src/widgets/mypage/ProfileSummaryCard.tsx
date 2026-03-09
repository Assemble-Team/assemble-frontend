import { Settings } from 'lucide-react';
import Link from 'next/link';

export function ProfileSummaryCard() {
  // TODO: 실제 유저 데이터로 연동
  const user = {
    nickname: '강동욱',
    email: 'dongwook@example.com',
    profileImageUrl: null,
    summary: '이번 주 3번의 모임에 참여해요!',
  };

  return (
    <div className="flex flex-col items-center justify-between gap-6 px-2 py-4 md:flex-row md:py-6">
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
        {/* Avatar with Premium Border */}
        <div className="group relative">
          <div className="animate-tilt from-brand-500 absolute -inset-0.5 rounded-full bg-gradient-to-r to-rose-500 opacity-20 blur transition duration-1000 group-hover:opacity-40" />
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-3xl font-bold text-slate-300 shadow-xl ring-4 ring-white">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{user.nickname.charAt(0)}</span>
            )}
          </div>
        </div>

        {/* Hero Copy */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            안녕하세요, <span className="text-brand-500">{user.nickname}</span>
            님! 👋
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="bg-brand-50 text-brand-600 ring-brand-100/50 rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase ring-1">
              ACTIVELY GATHERING
            </span>
            <p className="flex items-center gap-1 text-sm font-bold text-slate-500">
              <span className="bg-brand-500 h-1.5 w-1.5 animate-pulse rounded-full" />
              {user.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Action Link */}
      <Link
        href="/mypage/settings/profile"
        className="group hover:text-brand-500 flex items-center gap-2 text-xs font-black tracking-widest text-slate-400 uppercase transition-colors"
      >
        <span className="group-hover:bg-brand-300 h-px w-8 bg-slate-200 transition-all group-hover:w-12" />
        프로필 관리
        <Settings className="h-3 w-3 transition-transform group-hover:rotate-45" />
      </Link>
    </div>
  );
}
