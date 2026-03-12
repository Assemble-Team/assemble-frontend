import { LoginForm } from '@/features/auth';

export function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        <LoginForm />
      </div>
    </div>
  );
}
