import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // 1. clsx로 조건부 클래스들을 하나로 합치고
  // 2. twMerge로 중복된 테일윈드 클래스를 정리한다.
  return twMerge(clsx(inputs));
}
