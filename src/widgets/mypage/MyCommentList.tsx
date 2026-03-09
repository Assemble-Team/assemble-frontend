'use client';

import { Suspense } from 'react';
import { useMyComments } from '@/entities/activities';
import { Heart, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

function MyCommentListContent() {
  const { data: comments } = useMyComments();

  if (comments.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-slate-50 text-slate-400">
        <p className="text-sm font-medium">작성한 댓글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 px-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="group flex flex-col gap-3 transition-all"
        >
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-brand-500 text-[10px] font-black tracking-widest uppercase">
                {comment.groupName}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-200" />
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300">
                <Calendar size={10} />
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-rose-500/80">
              <Heart size={11} fill="currentColor" />
              <span className="text-[10px] font-black">
                {comment.likeCount}
              </span>
            </div>
          </div>

          <div className="space-y-3 px-1">
            <p className="text-sm leading-relaxed font-black text-slate-800">
              {comment.content}
            </p>
            <Link
              href={
                ROUTES.GROUPS.DETAIL(String(comment.groupId)) +
                `/posts/${comment.postId}`
              }
              className="group/original flex items-center gap-3 rounded-2xl border border-slate-50 bg-slate-50/50 p-4 transition-all hover:bg-slate-100/50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover/original:scale-105">
                <MessageSquare
                  size={14}
                  className="text-slate-300"
                  strokeWidth={2.5}
                />
              </div>
              <span className="line-clamp-1 text-xs font-bold text-slate-400">
                원문: {comment.postTitle}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function MyCommentListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 px-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse space-y-4">
          <div className="h-4 w-1/4 rounded-full bg-slate-50" />
          <div className="h-12 w-full rounded-2xl bg-slate-50" />
          <div className="h-16 w-full rounded-2xl bg-slate-50/50" />
        </div>
      ))}
    </div>
  );
}

export function MyCommentList() {
  return (
    <Suspense fallback={<MyCommentListSkeleton />}>
      <MyCommentListContent />
    </Suspense>
  );
}
