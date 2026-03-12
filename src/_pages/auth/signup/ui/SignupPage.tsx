import { SignupForm } from '@/features/auth';

export function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        <SignupForm />
      </div>
    </div>
  );
}
