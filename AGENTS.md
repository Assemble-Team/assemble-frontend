# AGENTS.md — AI 에이전트 통합 지침서

이 파일은 이 프로젝트에서 작업하는 AI 에이전트(Gemini CLI 등)가 항상 자동으로 읽는 **최상위 지침서**입니다. 상세한 기술적 구현 가이드는 각 섹션에 연결된 **전문가 Skill**을 반드시 참조하세요.

## 1. 표준 개발 워크플로우 (Issue-based Workflow)

기능 구현 또는 버그 수정 요청 시, 에이전트는 반드시 다음 단계를 자율적으로 순차 수행한다:

1.  **이슈 생성**: [GitHub 워크플로우 강화](.agents/skills/github-workflow/SKILL.md)에 따라 이슈를 생성하여 작업 단위를 명확히 한다.
2.  **병렬 개발 (선택)**: 사용자가 요청한 경우 [Git Worktree 병렬 개발](.agents/skills/git-worktree/SKILL.md)을 활용한다.
3.  **브랜치 생성**: `feat/#이슈번호-기능명` 또는 `fix/#이슈번호-버그명` 형식으로 브랜치를 생성한다.
4.  **단위 커밋**: [커밋 컨벤션](.agents/skills/commit-convention/SKILL.md)에 따라 논리적 단위로 커밋하며, 사전에 사용자 승인을 받는다.
5.  **검증**: [코드 수정 및 검증 절차](.agents/skills/testing-verification/SKILL.md)에 따라 타입 체크, 린트, 빌드를 수행한다.
6.  **PR 생성**: 작업 완료 후 PR 템플릿에 맞춰 풀 리퀘스트를 생성한다.

---

## 2. 필수 전문가 Skills (반드시 참조)

작업의 성격에 따라 아래 상세 가이드를 활성화하여 적용하세요.
### 아키텍처 및 도메인 설계
- **FSD 아키텍처 가이드** → [.agents/skills/fsd-architecture/SKILL.md](.agents/skills/fsd-architecture/SKILL.md)
- **고급 FSD & 클린 아키텍처** → [.agents/skills/advanced-fsd-clean/SKILL.md](.agents/skills/advanced-fsd-clean/SKILL.md)
- **API 설계 및 타입 관리** → [.agents/skills/api-strategy/SKILL.md](.agents/skills/api-strategy/SKILL.md)
- **코드 품질 & 응집도 관리** → [.agents/skills/code-quality/SKILL.md](.agents/skills/code-quality/SKILL.md)

### 기술 스택 및 컨벤션
- **Next.js 16 & React 19 마스터리** → [.agents/skills/next-react-mastery/SKILL.md](.agents/skills/next-react-mastery/SKILL.md)
- **코딩 컨벤션 & 네이밍** → [.agents/skills/coding-conventions/SKILL.md](.agents/skills/coding-conventions/SKILL.md)
- **렌더링 & 인증 전략** → [.agents/skills/rendering-auth/SKILL.md](.agents/skills/rendering-auth/SKILL.md)
- **UI/UX 일관성 & 스타일링** → [.agents/skills/ui-ux-consistency/SKILL.md](.agents/skills/ui-ux-consistency/SKILL.md)
- **성능 최적화 & Core Web Vitals** → [.agents/skills/performance-cwv/SKILL.md](.agents/skills/performance-cwv/SKILL.md)
- **보안 및 개인정보 보호 표준** → [.agents/skills/security-privacy/SKILL.md](.agents/skills/security-privacy/SKILL.md)
- **상태 관리 전략** → [.agents/skills/state-management/SKILL.md](.agents/skills/state-management/SKILL.md)
- **고급 TanStack Query 전략** → [.agents/skills/advanced-tanstack-query/SKILL.md](.agents/skills/advanced-tanstack-query/SKILL.md)
- **고급 Zustand 운영 전략** → [.agents/skills/advanced-zustand/SKILL.md](.agents/skills/advanced-zustand/SKILL.md)
...
- **에러 및 로딩 처리 전략** → [.agents/skills/error-loading-strategy/SKILL.md](.agents/skills/error-loading-strategy/SKILL.md)
- **폼 & 유효성 검사 전략** → [.agents/skills/form-validation-strategy/SKILL.md](.agents/skills/form-validation-strategy/SKILL.md)
- **API 모킹 전략 (MSW)** → [.agents/skills/api-mocking-strategy/SKILL.md](.agents/skills/api-mocking-strategy/SKILL.md)
- **SEO & 메타데이터 전략** → [.agents/skills/seo-metadata-strategy/SKILL.md](.agents/skills/seo-metadata-strategy/SKILL.md)
- **테스트 작성 전략 (Testing)** → [.agents/skills/testing-strategy/SKILL.md](.agents/skills/testing-strategy/SKILL.md)
- **문서화 표준 (Documentation)** → [.agents/skills/documentation-standard/SKILL.md](.agents/skills/documentation-standard/SKILL.md)
- **애니메이션 전략 (Animation)** → [.agents/skills/animation-strategy/SKILL.md](.agents/skills/animation-strategy/SKILL.md)
- **에셋 관리 전략 (Asset)** → [.agents/skills/asset-management/SKILL.md](.agents/skills/asset-management/SKILL.md)
- **GitHub 워크플로우 강화 (PR)** → [.agents/skills/github-workflow/SKILL.md](.agents/skills/github-workflow/SKILL.md)

### 외부 베스트 프랙티스
- **Next.js 모범 사례** → [.agents/skills/next-best-practices/SKILL.md](.agents/skills/next-best-practices/SKILL.md)
- **Vercel React 모범 사례** → [.agents/skills/vercel-react-best-practices/SKILL.md](.agents/skills/vercel-react-best-practices/SKILL.md)

---

## 3. 프로젝트 기술 스택 요약

| 항목 | 내용 |
| :--- | :--- |
| 프레임워크 | Next.js 16 (App Router) / React 19 |
| 패키지 매니저 | pnpm |
| 스타일링 | Tailwind CSS v4 |
| 상태 관리 | Zustand (Global) / TanStack Query (Server) |
| HTTP / API | ky / MSW v2 |
| 폼 / 검증 | React Hook Form / Zod |

---

## 4. 핵심 준수 사항

1.  **Contextual Precedence**: 이 파일과 연결된 Skills의 지침은 일반적인 워크플로우보다 우선한다.
2.  **Rationale Disclosure**: 코드 구현 시 선택한 구조나 로직의 근거(SRP 준수, 불변성 유지 등)를 설명한다.
3.  **Briefing First**: 코드를 수정하기 전, 변경될 구조를 요약하여 브리핑한 후 동의를 구한다.
4.  **No Revert**: 에러가 발생하지 않는 한 사용자 동의 없이 코드를 되돌리지 않는다.
