'use client';

import { Suspense, useState, useEffect } from 'react';
import { useMyProfile, useUpdateProfile } from '@/entities/user';
import { Button } from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Textarea from '@/shared/ui/Textarea';
import { Camera, Loader2, CheckCircle2 } from 'lucide-react';

function ProfileEditFormContent() {
  const { data: profile } = useMyProfile();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio || '');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(
      { name, bio },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  };

  const isPending = updateProfile.isPending;
  const isChanged = name !== profile.name || bio !== (profile.bio || '');

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      {/* Profile Image Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="group relative h-28 w-28 rounded-4xl outline-4 outline-offset-4 outline-slate-50">
          <div className="h-full w-full overflow-hidden rounded-4xl bg-slate-100 italic transition-colors">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-300">
                <Camera size={32} strokeWidth={1.5} />
              </div>
            )}
          </div>
          <button
            type="button"
            className="absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
          >
            <Camera size={16} strokeWidth={2.5} />
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm font-black text-slate-900">{profile.email}</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400 italic">
            계정 이메일은 변경할 수 없습니다
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <label className="ml-1 text-sm font-black tracking-tight text-slate-900">
            닉네임
          </label>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="활동할 이름을 입력해주세요"
            className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-bold focus:bg-white"
          />
        </div>

        <div className="space-y-3">
          <label className="ml-1 flex justify-between text-sm font-black tracking-tight text-slate-900">
            <span>한줄 소개</span>
            <span
              className={cn(
                'text-[10px] font-bold italic transition-colors',
                bio.length > 50 ? 'text-rose-500' : 'text-slate-400'
              )}
            >
              {bio.length} / 50
            </span>
          </label>
          <Textarea
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setBio(e.target.value)
            }
            placeholder="회원님을 짧게 표현해주세요"
            className="min-h-[120px] resize-none rounded-2xl border-slate-100 bg-slate-50/50 font-bold focus:bg-white"
            maxLength={50}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={!isChanged || isPending}
            className={cn(
              'h-14 w-full rounded-2xl text-base font-black transition-all',
              isSuccess
                ? 'bg-emerald-500 hover:bg-emerald-500'
                : 'bg-slate-900 hover:bg-slate-800'
            )}
          >
            {isPending ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : isSuccess ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>저장 완료!</span>
              </div>
            ) : (
              '변경사항 저장하기'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

function ProfileEditFormSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="h-28 w-28 rounded-4xl bg-slate-100" />
        <div className="h-4 w-48 rounded-full bg-slate-50" />
      </div>
      <div className="h-[300px] rounded-[2.5rem] border border-slate-50 bg-white shadow-sm" />
    </div>
  );
}

import { cn } from '@/shared/lib/utils';

export function ProfileEditForm() {
  return (
    <Suspense fallback={<ProfileEditFormSkeleton />}>
      <ProfileEditFormContent />
    </Suspense>
  );
}
