'use client';

import { useState } from 'react';
import { useGroupDetail, useBoardPosts } from '@/entities/groups';
import { MessageSquare, PenLine, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { GroupBoardWriteForm } from './GroupBoardWriteForm';

interface GroupBoardProps {
  groupId: string;
}

export const GroupBoard = ({ groupId }: GroupBoardProps) => {
  const [isWriting, setIsWriting] = useState(false);
  const { data: group } = useGroupDetail(groupId);
  const { data: posts, isLoading } = useBoardPosts(groupId);

  if (!group) return null;

  if (isWriting) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">새 글 작성하기</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 멤버들과 자유롭게 이야기를 나누세요.
            </p>
          </div>
        </div>
        <GroupBoardWriteForm
          groupId={groupId}
          onSuccess={() => {
            setIsWriting(false);
          }}
          onCancel={() => setIsWriting(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">자유 게시판</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 멤버들과 자유롭게 이야기를 나누세요.
            </p>
          </div>
        </div>

        <Button
          className="gap-2 rounded-full font-black px-6"
          onClick={() => setIsWriting(true)}
        >
          <PenLine size={18} />
          글쓰기
        </Button>
      </div>

      {/* 리스트 섹션 */}
      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="font-bold text-slate-400">로딩 중...</p>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer rounded-4xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-blue-100 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-slate-100" />
                <span className="text-sm font-bold text-slate-600">{post.authorName}</span>
                <span className="text-xs font-medium text-slate-300">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-black text-slate-900 group-hover:text-blue-600">
                {post.title}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm font-medium text-slate-500">
                {post.content}
              </p>
              <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Heart size={16} />
                  <span className="text-xs font-bold">{post.likeCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MessageCircle size={16} />
                  <span className="text-xs font-bold">{post.commentCount}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/30 p-8 text-center">
          <div className="rounded-full bg-white p-4 text-slate-200 shadow-sm">
            <MessageSquare size={32} />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-black text-slate-900">
              아직 게시글이 없습니다.
            </p>
            <p className="font-medium text-slate-400">
              첫 번째 이야기를 들려주세요!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
