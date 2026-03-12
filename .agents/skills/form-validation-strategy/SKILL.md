# Form & Validation Strategy Skill

이 스킬은 프로젝트의 폼(Form) 관리 및 유효성 검사(Validation) 전략을 정의합니다. `React Hook Form`과 `Zod`를 사용하여 견고한 폼 경험을 제공하는 가이드라인입니다.

## 1. 스키마 정의 및 위치
- **위치**: 특정 기능에서만 사용하는 스키마는 해당 `features/[slice]/model/` 또는 컴포넌트 파일 내부에 배치합니다. 여러 곳에서 공유하는 엔티티 스키마는 `entities/[slice]/model/`에 배치합니다.
- **네이밍**: `[Name]Schema` 형식을 사용하며, `z.object({})`를 기본으로 합니다.
- **에러 메시지**: Zod 스키마 정의 시 사용자에게 보여줄 메시지를 직접 포함합니다. (예: `z.string().min(1, '필수 입력 항목입니다.')`)

## 2. React Hook Form (RHF) 사용 규칙
- **Hook 선언**: `useForm<[Name]Type>`와 `zodResolver`를 함께 사용하여 타입 안정성을 확보합니다.
- **모드 설정**: `mode: 'onTouched'` 또는 `mode: 'onChange'`를 사용하여 실시간 피드백을 제공합니다.
- **입력 컴포넌트**: `shared/ui`의 `Input`, `Select`, `Checkbox` 등을 RHF의 `register` 또는 `Controller`와 연동하여 사용합니다.

## 3. 공통 폼 필드 구성
- **FormField**: `src/shared/ui/FormField/` 컴포넌트를 사용하여 Label, Error Message, Input의 배치를 일관되게 유지합니다.
- **Server Error**: API 요청 실패 시 `setError`를 사용하여 서버에서 온 에러를 특정 필드에 바인딩합니다.

## 4. 에이전트 자가 검토 체크리스트
- [ ] 모든 입력 필드가 Zod 스키마와 1:1로 매핑되었는가?
- [ ] 유효하지 않은 입력 시 명확한 에러 메시지가 표시되는가?
- [ ] 전송 중(Submitting) 버튼 비활성화 처리가 되었는가?
