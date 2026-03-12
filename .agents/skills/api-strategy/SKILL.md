# API Strategy Skill

이 스킬은 프로젝트의 API 요청/응답 관리 및 타입 설계 전략을 정의하며, 에이전트가 서버와의 통신 로직을 작성할 때 반드시 준수해야 하는 가이드라인을 제공합니다.

## 1. API 타입 관리 (3-Tier Structure)
API 관련 타입은 성격에 따라 3단계로 분리하여 관리합니다.

1.  **공통 응답 래퍼 (`shared/api/types.ts`)**: 서버 공통 응답 규격 정의 (`ApiResponse<T>`).
2.  **DTO (Data Transfer Object)**: 백엔드 명세와 1:1 일치하는 타입. (`entities/[slice]/api/[name].dto.ts`)
3.  **Frontend Model**: UI에서 사용하는 가공된 데이터 타입. (`entities/[slice]/model/types.ts`)

### 매핑 규칙
- DTO를 Model로 변환하는 로직은 `useQuery`의 `select` 옵션에서 수행합니다.
- 서버 데이터는 `DTO` 접미사를 붙입니다. (예: `GroupDTO` → `Group`)

## 2. HTTP 클라이언트 (`ky`) 사용 규칙
- `shared/api/apiClient.ts`에 정의된 단일 인스턴스를 사용합니다. 직접 `ky` import 금지.
- **Before Request**: Zustand 메모리의 `access_token`을 Authorization 헤더에 자동 주입합니다.
- **After Request (Error Handling)**: 401 발생 시 silent refresh 후 재시도합니다.
- **Error 메시지**: `beforeError` 인터셉터에서 표준화된 에러를 처리합니다.

## 3. Query Key Factory 패턴
- 문자열이 아닌 중앙 관리되는 팩토리를 사용합니다.
- 팩토리는 해당 엔티티 슬라이스(`entities/[slice]/model/queryKeys.ts`)에 위치하며, `as const`를 통해 타입 안정성을 보장합니다.
