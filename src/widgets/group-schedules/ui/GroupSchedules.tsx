'use client';

import { useState } from 'react';
import { useGroupDetail, useGroupSchedules, useJoinSchedule, useCancelSchedule } from '@/entities/groups';
import { Calendar, Plus, Clock, MapPin, Users, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Dialog, DialogContent, DialogHeader } from '@/shared/ui/Dialog';
import { GroupScheduleRegisterForm } from './GroupScheduleRegisterForm';
import { Map } from '@/shared/ui/Map/NaverMap';
import { cn } from '@/shared/lib/utils';

interface GroupSchedulesProps {
  groupId: string;
}

export const GroupSchedules = ({ groupId }: GroupSchedulesProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  const { data: group } = useGroupDetail(groupId);
  const { data: schedules, isLoading } = useGroupSchedules(groupId);
  const { mutate: joinSchedule } = useJoinSchedule(groupId);
  const { mutate: cancelSchedule } = useCancelSchedule(groupId);

  if (!group) return null;

  const handleToggleJoin = (scheduleId: number, isJoined: boolean) => {
    if (isJoined) {
      if (confirm('일정 참여를 취소하시겠습니까?')) {
        cancelSchedule(scheduleId);
      }
    } else {
      joinSchedule(scheduleId);
    }
  };

  const getMapUrl = (location: string) => {
    return `https://map.naver.com/v5/search/${encodeURIComponent(location)}`;
  };

  if (isRegistering) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-brand-50 text-brand-600 flex h-12 w-12 items-center justify-center rounded-2xl">
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">새 일정 등록</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 모임의 새로운 일정을 등록하세요.
            </p>
          </div>
        </div>
        <GroupScheduleRegisterForm
          groupId={groupId}
          onSuccess={() => setIsRegistering(false)}
          onCancel={() => setIsRegistering(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-50 text-brand-600 flex h-12 w-12 items-center justify-center rounded-2xl">
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">모임 일정</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 모임의 일정을 확인하고 참여하세요.
            </p>
          </div>
        </div>

        <Button
          className="gap-2 rounded-full font-black px-6"
          onClick={() => setIsRegistering(true)}
        >
          <Plus size={18} />
          일정 등록하기
        </Button>
      </div>

      {/* 리스트 섹션 */}
      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="font-bold text-slate-400">로딩 중...</p>
        </div>
      ) : schedules && schedules.length > 0 ? (
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={cn(
                "group flex flex-col gap-6 rounded-4xl border p-6 shadow-sm transition-all sm:flex-row sm:items-center sm:justify-between",
                schedule.isJoined 
                  ? "border-brand-200 bg-brand-50/10 shadow-brand-100/20" 
                  : "border-slate-100 bg-white hover:border-brand-100 hover:shadow-md"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 flex-col items-center justify-center rounded-xl text-slate-500",
                    schedule.isJoined ? "bg-brand-100 text-brand-600" : "bg-slate-50"
                  )}>
                    <span className="text-[10px] font-bold uppercase">
                      {new Date(schedule.date).toLocaleString('ko-KR', { month: 'short' })}
                    </span>
                    <span className="text-sm font-black">
                      {new Date(schedule.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-600">
                        {schedule.title}
                      </h3>
                      {schedule.isJoined && (
                        <span className="flex items-center gap-0.5 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-black text-white">
                          <Check size={10} /> 참여 중
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-400">
                      {schedule.content}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-xs font-bold">{schedule.time}</span>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(schedule.location)}
                    className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-brand-600 group/map"
                  >
                    <MapPin size={16} className="text-brand-400 group-hover/map:animate-bounce" />
                    <span className="text-xs font-bold underline underline-offset-2 decoration-brand-200 decoration-dotted">
                      {schedule.location}
                    </span>
                  </button>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Users size={16} className="text-slate-400" />
                    <span className="text-xs font-bold">
                      {schedule.currentParticipants} / {schedule.maxParticipants}명
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant={schedule.isJoined ? "outline" : "primary"}
                onClick={() => handleToggleJoin(schedule.id, schedule.isJoined)}
                disabled={!schedule.isJoined && schedule.currentParticipants >= schedule.maxParticipants}
                className={cn(
                  "rounded-full font-black px-8 min-w-[120px]",
                  schedule.isJoined 
                    ? "border-brand-200 text-brand-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200" 
                    : (!schedule.isJoined && schedule.currentParticipants >= schedule.maxParticipants)
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : ""
                )}
              >
                {schedule.isJoined 
                  ? "참여 취소" 
                  : schedule.currentParticipants >= schedule.maxParticipants 
                  ? "모집 마감" 
                  : "참여하기"}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/30 p-8 text-center">
          <div className="rounded-full bg-white p-4 text-slate-200 shadow-sm">
            <Calendar size={32} />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-black text-slate-900">
              예정된 일정이 없습니다.
            </p>
            <p className="font-medium text-slate-400">
              새로운 일정을 등록하여 활발하게 활동해보세요!
            </p>
          </div>
        </div>
      )}

      {/* 지도 모달 */}
      <Dialog open={!!selectedLocation} onClose={() => setSelectedLocation(null)}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-4xl border-none">
          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center justify-between text-xl font-black text-slate-900">
              <div className="flex items-center gap-2">
                <MapPin size={24} className="text-brand-500" />
                장소 확인하기
              </div>
              <a 
                href={selectedLocation ? getMapUrl(selectedLocation) : '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600 transition-colors"
              >
                네이버 지도로 보기 <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-1">{selectedLocation}</p>
          </DialogHeader>
          <div className="h-[400px] w-full bg-slate-50">
            {selectedLocation && <Map location={selectedLocation} />}
          </div>
          <div className="p-4 bg-white flex justify-end">
            <Button 
              variant="outline" 
              className="rounded-full font-black px-6"
              onClick={() => setSelectedLocation(null)}
            >
              닫기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
