import { ROUTES } from '@/shared/constants/routes';
import { NavButton } from '@/shared/ui/Button';

export default function LoginPage() {
  return (
    <>
      LoginPage
      <NavButton href={ROUTES.AUTH.FIND_PASSWORD}>비밀번호 찾기</NavButton>
      <NavButton href={ROUTES.AUTH.SIGNUP}>회원가입</NavButton>
    </>
  );
}
