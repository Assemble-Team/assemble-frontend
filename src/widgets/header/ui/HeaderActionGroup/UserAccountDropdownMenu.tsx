'use client';

import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';

export function UserAccountDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className="rounded-full ring-offset-white focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:outline-none">
        <div className="relative size-10 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
          <img
            src="https://github.com/shadcn.png" // 테스트용 이미지
            alt="Profile"
            className="object-cover"
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-gray-900">강동욱님</p>
          <p className="text-xs text-gray-500">test@example.com</p>
        </div>

        <div className="my-1 h-px bg-gray-100" />

        <DropdownMenu.Item onClick={() => console.log('프로필 이동')}>
          <UserIcon className="mr-2 size-4" />
          마이페이지
        </DropdownMenu.Item>

        <DropdownMenu.Item onClick={() => console.log('설정 이동')}>
          <SettingsIcon className="mr-2 size-4" />
          설정
        </DropdownMenu.Item>

        <div className="my-1 h-px bg-gray-100" />

        <DropdownMenu.Item
          onClick={() => console.log('로그아웃')}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOutIcon className="mr-2 size-4" />
          로그아웃
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
