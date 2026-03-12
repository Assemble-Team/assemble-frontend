# FSD Architecture Skill

이 스킬은 프로젝트의 FSD(Feature-Sliced Design) 아키텍처 규칙을 정의하며, 에이전트가 새로운 파일을 생성하거나 기존 코드를 수정할 때 반드시 준수해야 하는 가이드라인을 제공합니다.

## 1. 폴더 구조
```text
src/
├── app/                # Next.js App Router (Routing, Layout, Metadata)
├── _pages/             # 페이지 단위 컴포넌트 조합 (Business Logic Composition)
├── widgets/            # 페이지를 구성하는 독립적인 UI 블록
├── features/           # 사용자 행동 단위 기능
├── entities/           # 도메인 엔티티 (Data, Model, UI)
└── shared/             # 전역 공통 자원 (UI, Hooks, Lib, Constants)
```

## 2. 레이어별 역할 및 규칙

### 2.1 shared
- 재사용 가능한 자원 (UI 컴포넌트, 훅, 유틸 함수, 전역 타입).
- **규칙**: 비즈니스 로직 포함 금지. 어떤 레이어에서도 import 가능.

### 2.2 entities
- 도메인 엔티티 (User, Group, Activity 등).
- **규칙**: 도메인 데이터 구조 및 UI(예: Avatar, Card) 정의. 순환 참조 주의.

### 2.3 features
- 사용자의 행동(로그인, 가입, 좋아요 등).
- **규칙**: entities, shared만 참조 가능. 다른 feature 직접 참조 금지.

### 2.4 widgets
- 페이지의 완성된 UI 블록 (Header, Sidebar, RankingList 등).
- **규칙**: 여러 feature와 entity를 조합하여 구성.

### 2.5 _pages
- 페이지 단위 컴포넌트 조합. Next.js `app` 디렉토리와 충돌 방지를 위해 `_pages`로 명명.
- **규칙**: `app` 레이어를 제외한 모든 레이어 참조 가능.

### 2.6 app (Next.js)
- 라우팅, 레이아웃, 메타데이터, 서버 전용 로직.
- **규칙**: 비즈니스 로직 최소화. `_pages` 컴포넌트를 래핑하여 렌더링하는 역할에 집중.

## 3. 레이어 간 의존성 규칙
```text
shared ← entities ← features ← widgets ← _pages ← app
```
- 상위 레이어는 하위 레이어를 참조할 수 있지만, 역방향 참조는 엄격히 금지됩니다.

## 4. 에이전트 자동 수행 규칙
1. 새로운 기능을 추가할 때 가장 먼저 어느 레이어(Slice)에 위치할지 판단합니다.
2. 레이어 위반(역참조)이 발생하지 않도록 코드를 분석합니다.
3. 각 슬라이스는 반드시 `index.ts`를 통해 Public API를 제공하며, 내부 구조를 직접 노출하지 않습니다.
