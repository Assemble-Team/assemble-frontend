'use client';

import { Suspense } from 'react';
import {
  useNotificationSettings,
  useUpdateNotificationSettings,
} from '@/entities/user';
import { Switch } from '@/shared/ui/Toggle';
import {
  Bell,
  Mail,
  Megaphone,
  Activity,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

function NotificationSettingsContent() {
  const { data: settings } = useNotificationSettings();
  const updateSettings = useUpdateNotificationSettings();

  const handleToggle = (key: keyof typeof settings) => {
    updateSettings.mutate({ [key]: !settings[key] });
  };

  const isAllEnabled = Object.values(settings).every(Boolean);

  const handleToggleAll = () => {
    const newValue = !isAllEnabled;
    updateSettings.mutate({
      scheduleApp: newValue,
      boardApp: newValue,
      noticeApp: newValue,
    });
  };

  const sections = [
    {
      title: '앱 푸시 알림',
      description: '모임의 새로운 소식을 앱 푸시로 수신합니다.',
      items: [
        {
          key: 'scheduleApp',
          label: '모임 일정 알림',
          icon: <Activity size={18} />,
          status: settings.scheduleApp,
        },
        {
          key: 'boardApp',
          label: '모임 게시판 알림',
          icon: <MessageSquare size={18} />,
          status: settings.boardApp,
        },
        {
          key: 'noticeApp',
          label: '모임 공지 알림',
          icon: <Megaphone size={18} />,
          status: settings.noticeApp,
        },
      ],
    },
  ];

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 text-slate-600">
        <div className="text-brand-500 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Bell size={24} />
        </div>
        <div>
          <h3 className="text-sm font-black tracking-tight text-slate-900 italic">
            알림 설정 안내
          </h3>
          <p className="text-xs leading-relaxed font-bold opacity-70">
            필수 서비스 알림(공지사항, 결제 등)은 설정 여부와 관계없이 발송될 수
            있습니다.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-end justify-between px-1">
              <div className="space-y-0.5">
                <h2 className="text-lg font-black text-slate-900">
                  {section.title}
                </h2>
                <p className="text-xs font-bold text-slate-400 italic">
                  {section.description}
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2">
                <span className="text-[11px] font-black tracking-tight text-slate-500">
                  전체 알림 허용
                </span>
                <Switch
                  checked={isAllEnabled}
                  onCheckedChange={handleToggleAll}
                  className="scale-90"
                />
              </div>
            </div>
            <div className="divide-y divide-slate-50 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm">
              {section.items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-7 transition-colors hover:bg-slate-50/50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-2xl transition-all',
                        item.status
                          ? 'bg-brand-50 text-brand-500'
                          : 'bg-slate-100 text-slate-300'
                      )}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm font-black text-slate-800">
                      {item.label}
                    </span>
                  </div>
                  <Switch
                    checked={item.status}
                    onCheckedChange={() => handleToggle(item.key as any)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-center gap-2 text-[11px] font-bold text-emerald-500 opacity-0 transition-opacity aria-selected:opacity-100"
        aria-selected={updateSettings.isSuccess}
      >
        <CheckCircle2 size={12} />
        <span>설정이 저장되었습니다</span>
      </div>
    </div>
  );
}

function NotificationSettingsSkeleton() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse space-y-12 py-6">
      <div className="h-24 rounded-3xl bg-slate-50" />
      <div className="space-y-10">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-6">
            <div className="ml-1 h-6 w-32 rounded-full bg-slate-50" />
            <div className="h-48 rounded-[2.5rem] border border-slate-50 bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotificationSettings() {
  return (
    <Suspense fallback={<NotificationSettingsSkeleton />}>
      <NotificationSettingsContent />
    </Suspense>
  );
}
