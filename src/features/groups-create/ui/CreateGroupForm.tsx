'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateGroupFormValues,
  createGroupSchema,
  LEVELS,
} from '../model/schema';
import { createGroup } from '../api/createGroup';
import { ApiError } from '@/shared/api/ApiError';
import { RegionSelectButton } from '@/shared/ui/RegionSelect';
import { Check } from 'lucide-react';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/ui/Select';
import { Textarea } from '@/shared/ui/Textarea';
import { ButtonRadioGroup } from '@/shared/ui/ButtonRadioGroup';

const LEVEL_LABEL: Record<string, string> = {
  LOW: '초급',
  MID: '중급',
  HIGH: '고급',
};

const LEVEL_OPTIONS = LEVELS.map((l) => ({
  value: l,
  label: LEVEL_LABEL[l],
}));

const CATEGORY_LABEL: Record<string, string> = {
  EXERCISE: '운동',
  STUDY: '스터디',
  PROJECT: '프로젝트',
  HOBBY: '취미',
  CULTURE_ART: '문화/예술',
};

const STEP_FIELDS: Record<number, (keyof CreateGroupFormValues)[]> = {
  1: ['name', 'category', 'level'],
  2: ['region', 'maxNumber'],
  3: ['description'],
};

const STEP_META = [
  {
    step: 1,
    label: '기본 정보',
    fields: '이름 · 카테고리 · 난이도',
  },
  {
    step: 2,
    label: '모집 정보',
    fields: '지역 · 최대 인원',
  },
  {
    step: 3,
    label: '소개',
    fields: '모임 소개',
  },
];

export const CreateGroupForm = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateGroupFormValues>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: { region: '서울 전체', imageUrl: 'default_url' },
  });

  const handleNext = async () => {
    const isValid = await trigger(STEP_FIELDS[step]);
    if (isValid) setStep((prev) => prev + 1);
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep);
    }
  };

  const onSubmit = async (data: CreateGroupFormValues) => {
    try {
      const res = await createGroup(data);
      alert(`모임이 개설되었습니다! (ID: ${res.clubId})`);
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('모임 개설에 실패했습니다.');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 pt-12 md:pt-20 pb-40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-5xl space-y-12 px-6 lg:px-12"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            새로운 모임 만들기
          </h1>
          <p className="text-lg font-medium text-slate-400">
            당신의 열정을 함께 나눌 멤버들을 찾아보세요.
          </p>
        </div>

        {/* 스테퍼 */}
        <div className="flex items-start justify-between">
          {STEP_META.map(({ step: s, label, fields }, index) => {
            const isCompleted = step > s;
            const isCurrent = step === s;
            const isClickable = isCompleted;

            return (
              <div key={s} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  {index !== 0 && (
                    <div
                      className={`h-[2px] flex-1 transition-colors ${
                        isCompleted ? 'bg-brand-500' : 'bg-gray-200'
                      }`}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => handleStepClick(s)}
                    disabled={!isClickable}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-bold transition-all ${
                      isCompleted
                        ? 'border-brand-500 bg-brand-500 cursor-pointer text-white hover:opacity-80'
                        : isCurrent
                          ? 'border-brand-500 text-brand-500 cursor-default bg-white'
                          : 'cursor-default border-gray-200 bg-white text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <span className="text-sm">{s}</span>
                    )}
                  </button>

                  {index !== STEP_META.length - 1 && (
                    <div
                      className={`h-[2px] flex-1 transition-colors ${
                        step > s + 1
                          ? 'bg-brand-500'
                          : step > s
                            ? 'bg-brand-500'
                            : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>

                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-semibold transition-colors ${
                      isCurrent
                        ? 'text-brand-500'
                        : isCompleted
                          ? 'text-gray-700'
                          : 'text-gray-400'
                    }`}
                  >
                    {label}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">{fields}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-4">
            <h2 className="text-2xl font-black">어떤 모임인가요?</h2>

            <FormField label="모임 이름" required error={errors.name?.message}>
              <Input
                variant="outline"
                {...register('name')}
                placeholder="모임 이름을 입력해주세요"
              />
            </FormField>

            <FormField label="카테고리" required error={errors.category?.message}>
              <Select
                value={watch('category')}
                onChange={(val: string) =>
                  setValue('category', val as any, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  placeholder="카테고리를 선택해주세요"
                  displayValue={CATEGORY_LABEL[watch('category')]}
                />
                <SelectContent>
                  {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="난이도" required error={errors.level?.message}>
              <ButtonRadioGroup
                value={watch('level')}
                onChange={(val) =>
                  setValue('level', val, { shouldValidate: true })
                }
                options={LEVEL_OPTIONS}
              />
            </FormField>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-4">
            <h2 className="text-2xl font-black">어디서 몇 명이 모이나요?</h2>

            <FormField label="지역" required error={errors.region?.message}>
              <RegionSelectButton
                value={watch('region')}
                onSelect={(region) =>
                  setValue('region', region, { shouldValidate: true })
                }
              />
            </FormField>

            <FormField
              label="최대 인원"
              required
              error={errors.maxNumber?.message}
            >
              <Input
                variant="outline"
                type="number"
                {...register('maxNumber', { valueAsNumber: true })}
                placeholder="최대 인원을 입력해주세요"
              />
            </FormField>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-4">
            <h2 className="text-2xl font-black">모임을 소개해 주세요</h2>

            <FormField
              label="모임 소개"
              required
              error={errors.description?.message}
            >
              <Textarea
                {...register('description')}
                rows={5}
                placeholder="활동 내용, 진행 방식 등을 자유롭게 작성해주세요"
              />
            </FormField>
          </div>
        )}

        {/* 하단 고정 버튼 바 */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/80 p-6 backdrop-blur-lg">
          <div className="mx-auto flex max-w-5xl gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 rounded-2xl bg-white border border-slate-200 p-5 font-black text-slate-600 shadow-sm transition-all hover:bg-slate-50"
              >
                이전 단계
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-brand-500 flex-1 rounded-2xl p-5 font-black text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 hover:scale-[1.01] active:scale-[0.99]"
              >
                다음 단계로
              </button>
            ) : (
              <button
                type="submit"
                className="bg-brand-600 flex-1 rounded-2xl p-5 font-black text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 hover:scale-[1.01] active:scale-[0.99]"
              >
                모임 개설하기
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
