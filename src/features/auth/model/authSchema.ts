import { z } from 'zod';

export const CATEGORIES = [
  'STUDY',
  'EXERCISE',
  'PROJECT',
  'HOBBY',
  'CULTURE_ART',
] as const;

export const signupSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
    email: z.string().email('유효한 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
        '비밀번호는 영문과 숫자를 포함해야 합니다.'
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    categories: z
      .array(z.enum(CATEGORIES))
      .min(1, '최소 1개의 관심 카테고리를 선택해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email('유효한 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export const findPasswordSchema = z.object({
  email: z.string().email('유효한 이메일 형식이 아닙니다.'),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
export type SignupRequest = Omit<SignupFormValues, 'confirmPassword'>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type FindPasswordFormValues = z.infer<typeof findPasswordSchema>;
