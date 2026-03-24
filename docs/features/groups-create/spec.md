# 그룹 생성 (Group Create) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**:
    *   `ui/Input`, `ui/Select`, `ui/ImageUpload`: 폼 입력을 위한 공통 UI.
*   **Features**:
    *   `groups-create/ui/CreateGroupForm`: 전체 생성 폼 컴포넌트.
    *   `groups-create/model/schema`: Zod 기반 폼 검증 스키마.
    *   `groups-create/api/createGroup`: 모임 생성 API 호출 함수.
*   **Pages**:
    *   `groups/create/ui/GroupCreatePage`: 생성 페이지 컨테이너.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// src/features/groups-create/model/schema.ts
export const groupCreateSchema = z.object({
  title: z.string().min(2, '제목은 2자 이상이어야 합니다.'),
  category: z.string().min(1, '카테고리를 선택해주세요.'),
  description: z.string().min(10, '소개글은 10자 이상 작성해주세요.'),
  type: z.enum(['online', 'offline']),
  location: z.string().optional(),
  maxMembers: z.number().min(2, '최소 2명 이상이어야 합니다.'),
  imageUrl: z.string().optional(),
});

export type GroupCreateFormValues = z.infer<typeof groupCreateSchema>;
```

## 3. 핵심 로직 & 흐름 (Flow)
*   **Form State Management**: `react-hook-form`을 사용하여 복잡한 폼 상태를 효율적으로 관리.
*   **Navigation Control**: 생성 성공 시 `router.push(ROUTES.GROUPS.DETAIL(newId))`를 통해 부드러운 페이지 전환 처리.
*   **Image Handling**: 이미지는 사전에 업로드하여 URL을 받거나, 폼 제출 시 Multipart로 처리하는 방식 적용.

## 4. 컴포넌트 설계 (Component Design)
*   **CreateGroupForm**: 여러 섹션(기본정보, 활동방식, 상세소개)으로 나누어 가독성 확보.
*   **Validation**: 실시간 에러 메시지 노출을 통해 사용자 입력 가이드 제공.

## 5. API 명세 (API Specification)
*   **Endpoint**: `POST /api/groups`
*   **Request**: `GroupCreateFormValues`
*   **Response**: `GroupDetail` (성공 시 생성된 그룹 정보 반환)
