# Rendering & Authentication Skill

이 스킬은 프로젝트의 렌더링 방식(SSG, ISR, SSR, CSR) 및 인증 토큰 저장/갱신 전략을 정의합니다.

## 1. 렌더링 전략 선택 가이드
- SEO 필요 여부가 1차 기준, 데이터 변경 주기가 2차 기준입니다.
- **SSG**: SEO 필요 + 데이터 거의 안 바뀜 (홈페이지, 마케팅 페이지)
- **ISR**: SEO 필요 + 주기적 갱신 필요 (모임 리스트 - `revalidate: 60`)
- **SSR**: SEO 필요 + 요청 시점 데이터 필요 (개인화 피드, 검색 결과)
- **CSR**: SEO 불필요 (마이페이지, 설정 등 인증 게이트 뒤)

### 원칙
- 기본적으로 Server Component를 지향합니다.
- 인증이 필요한 페이지는 CSR로 처리합니다.
- `useSuspenseQuery` 사용 시 반드시 `AsyncBoundary`를 배치합니다.

## 2. 인증 및 토큰 전략
- **refresh_token**: httpOnly 쿠키에 저장 (서버 전용 접근, XSS 방지).
- **access_token**: Zustand 메모리에 저장 (클라이언트 전용 접근, 구현 단순화).
- **Silent Refresh**: 앱 초기화 시 `/api/auth/refresh`를 호출하여 로그인 상태를 유지합니다.

### BFF Route Handler (필수 구현)
1.  `/api/auth/login`: 쿠키 발급 및 `access_token` 반환
2.  `/api/auth/refresh`: `access_token` 재발급
3.  `/api/auth/logout`: 쿠키 삭제
