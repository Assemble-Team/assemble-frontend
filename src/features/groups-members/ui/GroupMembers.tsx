'use client';

import { useGroupDetail } from '@/entities/groups';
import { Users, ShieldCheck } from 'lucide-react';

interface GroupMembersProps {
  groupId: string;
}

export const GroupMembers = ({ groupId }: GroupMembersProps) => {
  const { data: group } = useGroupDetail(groupId);

  // 임시 멤버 목록 데이터
  const mockMembers = [
    { id: 1, name: '테니스장인', role: 'LEADING', avatar: null },
    { id: 2, name: '김코치', role: 'MEMBER', avatar: null },
    { id: 3, name: '초보탈출', role: 'MEMBER', avatar: null },
  ];

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-600">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">멤버 목록</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 모임에 함께하고 있는 멤버들입니다.
            </p>
          </div>
        </div>
      </div>

      {/* 멤버 리스트 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockMembers.map((member) => (
          <div
            key={member.id}
            className="hover:border-brand-100 flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-4 transition-all hover:shadow-sm"
          >
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-100" />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-black text-slate-900">
                  {member.name}
                </span>
                {member.role === 'LEADING' && (
                  <ShieldCheck size={14} className="text-brand-500" />
                )}
              </div>
              <span className="text-xs font-bold text-slate-300">
                {member.role === 'LEADING' ? '모임장' : '멤버'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
