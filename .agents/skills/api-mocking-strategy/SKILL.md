# API Mocking Strategy (MSW) Skill

이 스킬은 프로젝트의 API 모킹(Mocking) 및 테스트 데이터를 관리하기 위한 가이드라인을 제공합니다. `MSW v2`를 사용하여 실제 서버 없이도 기능을 개발할 수 있도록 돕습니다.

## 1. MSW 핸들러 구성 및 위치
- **위치**: `src/shared/api/mock/handlers.ts`에 엔티티 또는 기능별로 핸들러를 구성합니다.
- **분리**: 핸들러가 많아지면 `handlers/` 폴더 내에 엔티티별로 파일을 나누어 임포트합니다. (예: `userHandlers.ts`, `groupHandlers.ts`)

## 2. 핸들러 작성 규칙
- **REST API**: `http.get`, `http.post` 등을 사용하여 실제 엔드포인트와 일치시킵니다.
- **응답 구성**: `HttpResponse.json()`을 사용하여 성공 응답을 구성하고, `delay()`를 추가하여 실제 네트워크 지연 시간을 모방합니다.
- **시나리오**: 에러 상황(401, 403, 500 등)을 테스트하기 위한 별도의 모킹 핸들러를 작성하거나, 요청 파라미터에 따라 다르게 응답하게 구성합니다.

## 3. Mock Data 관리
- **위치**: 재사용 가능한 모의 데이터는 `src/shared/api/mock/data.ts`에 보관합니다.
- **규칙**: 가능한 한 프론트엔드 모델(`Frontend Model`) 타입에 맞추어 데이터를 생성합니다.

## 4. 에이전트 자동 수행 규칙
- 새로운 API 기능을 추가할 때, 실제 백엔드가 준비되지 않았다면 반드시 MSW 핸들러를 먼저 작성하여 동작을 확인합니다.
- MSW가 정상적으로 활성화되어 있는지 확인하기 위해 `src/instrumentation.ts` 또는 `src/app/providers.tsx`의 설정을 참조합니다.
