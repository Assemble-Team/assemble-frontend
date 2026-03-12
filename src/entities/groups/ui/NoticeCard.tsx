'use client';

import { GroupNotice } from '@/entities/groups/model/types';
import { cn } from '@/shared/lib/utils';
import { Calendar, ChevronRight, Pin } from 'lucide-react';
import { useState } from 'react';

interface NoticeCardProps {
  notice: GroupNotice;
}

export const NoticeCard = ({ notice }: NoticeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        'group cursor-pointer overflow-hidden rounded-[2rem] border transition-all duration-300',
        notice.isFixed
          ? 'border-brand-100 bg-brand-50/10 hover:border-brand-200'
          : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/20'
      )}
    >
      <div className="flex items-center gap-4 p-5 md:p-6">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {notice.isFixed && (
              <div className="bg-brand-500 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black text-white">
                <Pin size={10} />
                고정
              </div>
            )}
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
              <Calendar size={12} />
              {new Date(notice.createdAt).toLocaleDateString()}
            </div>
            <span className="text-[11px] font-bold text-slate-300">•</span>
            <span className="text-[11px] font-bold text-slate-400">
              {notice.authorName}
            </span>
          </div>
          <h3 className="line-clamp-1 text-lg font-black text-slate-900 md:text-xl">
            {notice.title}
          </h3>
        </div>
        <ChevronRight
          size={20}
          className={cn(
            'text-slate-300 transition-transform duration-300',
            isExpanded && 'text-brand-500 rotate-90'
          )}
        />
      </div>

      {isExpanded && (
        <div className="border-t border-slate-100/50 bg-slate-50/30 p-6 pt-5">
          <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap text-slate-600 md:text-base">
            {notice.content}
          </p>
        </div>
      )}
    </div>
  );
};
