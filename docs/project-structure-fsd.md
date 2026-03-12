# FSD(FEATURE-SLICED DESIGN) 폴더 구조 가이드

이 문서는 본 프로젝트에서 사용하는 **FSD(Feature-Sliced Design)** 아키텍처의 목적과 폴더 구조, 그리고 각 레이어의 역할과 사용 규칙을 설명한다.

---

## 1. FSD를 사용하는 이유

FSD는 프론트엔드 애플리케이션을 **역할과 책임 단위로 분리**하여 다음을 목표로 한다.

- 규모가 커져도 구조가 무너지지 않음
- 기능 단위로 명확한 책임 분리
- 협업 시 충돌 최소화
- 재사용 가능한 코드 증가

공식 개념 문서:

- [https://feature-sliced.design/](https://feature-sliced.design/)

---

## 2. 전체 폴더 구조

```text
src/
├── app/                # Next.js App Router (Routing, Layout, Metadata)
├── _pages/             # 페이지 단위 컴포넌트 조합 (Business Logic Composition)
├── widgets/            # 페이지를 구성하는 독립적인 UI 블록
├── features/           # 사용자 행동 단위 기능
├── entities/           # 도메인 엔티티 (Data, Model, UI)
└── shared/             # 전역 공통 자원 (UI, Hooks, Lib, Constants)
```

---

## 3. 레이어별 상세 설명

### 3.1 shared

**가장 하위 레이어**로, 프로젝트 전반에서 재사용되는 자원만 포함한다.

#### 포함 대상

- 공통 UI 컴포넌트 (Button, Modal 등)
- 공통 훅 (useGeolocation, useLocalStorage 등)
- 유틸 함수
- 전역 타입
- 디자인 토큰

```text
shared/
├── ui/
├── hooks/
├── lib/
├── types/
└── config/
```

#### 규칙

- 비즈니스 로직 포함 금지
- 어떤 레이어에서도 import 가능

---

### 3.2 entities

**도메인 개념 단위**를 표현하는 레이어이다.

#### 예시 엔티티

- User
- Group
- Activity

```text
entities/
└── user/
    ├── model/
    ├── ui/
    └── api/
```

#### 역할

- 도메인 데이터 구조 정의
- 도메인 단위 UI 제공 (예: UserAvatar, GroupCard)
- 도메인 관련 로직 캡슐화

#### 규칙

- 다른 entities 참조 가능 (단, 순환 참조 주의)
- features, widgets, _pages에서 사용 가능

---

### 3.3 features

**사용자의 행동(행위)** 을 기준으로 구성되는 레이어이다.

#### 예시

- auth (Login, Signup)
- groups-join
- groups-like
- sidebar-toggle

```text
features/
└── groups-join/
    ├── ui/
    ├── model/
    └── api/
```

#### 역할

- 하나의 사용자 액션을 완성
- entities를 조합하여 비즈니스 가치가 있는 기능 구현

#### 규칙

- entities, shared만 참조 가능
- 다른 feature 직접 참조 금지

---

### 3.4 widgets

**페이지를 구성하는 독립적인 UI 블록** 단위 레이어이다.

#### 예시

- header
- sidebar
- popular-groups
- ranking-list

```text
widgets/
└── header/
    ├── ui/
    └── index.ts
```

#### 역할

- 여러 feature와 entity를 조합하여 완성된 UI 블록 제공
- 페이지 레벨에서 바로 사용 가능한 큰 단위의 컴포넌트

---

### 3.5 _pages

**페이지 단위의 컴포넌트 조합**을 담당하는 레이어이다. Next.js의 `app` 디렉토리와 충돌을 피하기 위해 `_pages`로 명명한다.

#### 역할

- 실제 서비스 페이지의 완성된 모습 정의
- 여러 widgets, features, entities를 조합하여 페이지 전체 비즈니스 로직 조율
- Next.js의 `app` 내 각 라우트 파일에서 이 레이어의 컴포넌트를 호출하여 사용

#### 규칙

- app 레이어를 제외한 모든 레이어 참조 가능
- 파일 구조는 대략적으로 `app` 디렉토리의 구조를 따라가되, 실제 라우팅 기능은 없음

---

### 3.6 app (Next.js)

Next.js App Router 전용 레이어이다.

#### 역할

- **Routing**: URL 구조 정의
- **Layout**: 페이지 레이아웃 및 Suspense/Error Boundary 설정
- **Metadata**: SEO 및 페이지 메타데이터 설정
- **Server Actions/Functions**: 서버 전용 로직 처리

#### 규칙

- 비즈니스 로직 최소화
- `_pages` 레이어의 컴포넌트를 import하여 렌더링하는 역할에 집중

---

## 4. 레이어 간 의존성 규칙

```text
shared ← entities ← features ← widgets ← _pages ← app
```

- 위 방향으로만 import 가능 (상위 레이어는 하위 레이어를 알 수 있음)
- 역방향 참조 금지 (하위 레이어는 상위 레이어를 참조할 수 없음)

---

## 5. 언제 어디에 코드를 둬야 할까?

| 상황                     | 위치                |
| ------------------------ | ------------------- |
| 단순 버튼 UI             | shared/ui           |
| 사용자 정보 표시         | entities/user       |
| 로그인 기능              | features/auth       |
| 헤더 전체 구성           | widgets/header      |
| 홈 페이지 전체 조합      | _pages/home         |
| URL 정의 (page.tsx)      | app/page.tsx        |

---

## 6. 팀 협업 규칙 요약

- 기능 추가 시 feature부터 고려
- 공용 가능성 있으면 shared로 이동
- 페이지 구성 시 `app`은 최소한의 래퍼 역할만 수행하고 `_pages`에서 실제 UI를 조합
- 레이어 위반(역참조)이 발생하지 않도록 주의

---

## 7. 참고 자료

- FSD 공식 문서: [https://feature-sliced.design/](https://feature-sliced.design/)
- FSD GitHub: [https://github.com/feature-sliced](https://github.com/feature-sliced)
