'use client';

import { Suspense } from 'react';
import { useMyPosts } from '@/entities/activities';
import { MessageSquare, Heart, Calendar } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

function MyPostListContent() {
  const { data: posts } = useMyPosts();

  if (posts.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-slate-50 text-slate-400">
        <p className="text-sm font-medium">작성한 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 px-2">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={
            ROUTES.GROUPS.DETAIL(String(post.groupId)) + `/posts/${post.id}`
          }
          className="group flex flex-col gap-3 transition-all"
        >
          {/* Top Meta: Group Name & Date */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-brand-500 text-[10px] font-black tracking-widest uppercase">
                {post.groupName}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-200" />
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300">
                <Calendar size={10} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-slate-300">
                <MessageSquare size={10} />
                <span className="text-[10px] font-black">
                  {post.commentCount}
                </span>
              </div>
              <div className="flex items-center gap-1 text-rose-500/80">
                <Heart size={10} fill="currentColor" />
                <span className="text-[10px] font-black">{post.likeCount}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-1.5 px-1">
            <h3 className="group-hover:text-brand-600 line-clamp-1 text-base font-black text-slate-900 transition-colors">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed font-medium text-slate-500">
              {post.content}
            </p>
          </div>

          <div className="mt-1 h-px w-full bg-slate-50 group-last:hidden" />
        </Link>
      ))}
    </div>
  );
}

function MyPostListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 px-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse space-y-4">
          <div className="flex justify-between">
            <div className="h-4 w-1/4 rounded-full bg-slate-50" />
            <div className="h-4 w-1/6 rounded-full bg-slate-50" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-2/3 rounded-full bg-slate-50" />
            <div className="h-4 w-full rounded-full bg-slate-50" />
            <div className="h-4 w-1/2 rounded-full bg-slate-50 md:hidden" />
          </div>
          <div className="h-px w-full bg-slate-50" />
        </div>
      ))}
    </div>
  );
}

export function MyPostList() {
  return (
    <Suspense fallback={<MyPostListSkeleton />}>
      <MyPostListContent />
    </Suspense>
  );
}
