'use client';

import { useGroupDetail } from '@/entities/groups';
import { Settings, UserCog, Ban, LogOut, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface GroupManageProps {
  groupId: string;
}

export const GroupManage = ({ groupId }: GroupManageProps) => {
  const { data: group } = useGroupDetail(groupId);

  // 권한 체크
  if (group.myRole !== 'LEADING') {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <Ban size={48} className="text-rose-500" />
        <div className="space-y-1">
          <p className="text-xl font-black text-slate-900">
            접근 권한이 없습니다.
          </p>
          <p className="text-sm font-medium text-slate-400">
            모임장만 접근할 수 있는 페이지입니다.
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      icon: <Settings size={20} />,
      title: '모임 정보 수정',
      description: '이름, 설명, 카테고리 등 기본 정보를 변경합니다.',
      href: `/groups/${groupId}/manage/edit`,
    },
    {
      icon: <UserCog size={20} />,
      title: '멤버 관리',
      description: '멤버 등급을 관리하거나 강퇴 처리할 수 있습니다.',
      href: `/groups/${groupId}/manage/members`,
    },
    {
      icon: <LogOut size={20} />,
      title: '모임 폐쇄',
      description: '모임을 완전히 삭제하고 모든 데이터를 삭제합니다.',
      danger: true,
      href: `/groups/${groupId}/manage/close`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* 뒤로가기 (상세로) */}
      <Link
        href={`/groups/${groupId}`}
        className="flex items-center gap-1 text-sm font-bold text-slate-400 transition-colors hover:text-slate-900"
      >
        <ChevronLeft size={16} />
        모임 상세로 돌아가기
      </Link>

      {/* 헤더 섹션 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Settings size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">모임 관리</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 모임을 더욱 효율적으로 관리하세요.
            </p>
          </div>
        </div>
      </div>

      {/* 설정 리스트 */}
      <div className="divide-y divide-slate-100 overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-sm">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group flex cursor-pointer items-center justify-between p-6 transition-all hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-4">
              <div
                className={`rounded-2xl p-3 ${item.danger ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-600'}`}
              >
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-black ${item.danger ? 'text-rose-600' : 'text-slate-900'}`}
                >
                  {item.title}
                </span>
                <span className="text-sm font-medium text-slate-400">
                  {item.description}
                </span>
              </div>
            </div>
            <div className="text-sm font-bold text-slate-300 underline decoration-slate-200 group-hover:text-slate-900">
              이동하기
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
