'use client';

import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

import { useUserStore } from '@/entities/user';
import { useLogoutMutation } from '@/features/auth/api/useLoginMutations';
import { ROUTES } from '@/shared/constants/routes';

export function UserAccountDropdownMenu() {
  const { user } = useUserStore();
  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className="rounded-full ring-offset-white focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:outline-none">
        <div className="relative size-10 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
          <img
            src={user?.avatarUrl || 'https://github.com/shadcn.png'}
            alt="Profile"
            className="object-cover"
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-gray-900">
            {user?.name || '사용자'}님
          </p>
          <p className="text-xs text-gray-500">{user?.email || ''}</p>
        </div>

        <div className="my-1 h-px bg-gray-100" />

        <Link href={ROUTES.MYPAGE.HOME}>
          <DropdownMenu.Item>
            <UserIcon className="mr-2 size-4" />
            마이페이지
          </DropdownMenu.Item>
        </Link>

        <Link href={ROUTES.MYPAGE.SETTINGS.PROFILE}>
          <DropdownMenu.Item>
            <SettingsIcon className="mr-2 size-4" />
            설정
          </DropdownMenu.Item>
        </Link>

        <div className="my-1 h-px bg-gray-100" />

        <DropdownMenu.Item
          onClick={() => logout()}
          disabled={isPending}
          className="text-red-600 hover:bg-red-50 hover:text-red-700 data-[disabled]:text-gray-400"
        >
          <LogOutIcon className="mr-2 size-4" />
          {isPending ? '로그아웃 중...' : '로그아웃'}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
