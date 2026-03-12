# Git Worktree Best Practices for Parallel Development

`git worktree`를 사용하여 하나의 로컬 저장소에서 여러 브랜치를 동시에 체크아웃하고 별도의 디렉토리에서 작업을 병렬로 진행하는 가이드입니다.

## 1. 개요
AI 에이전트와 협업할 때, 사용자는 메인 디렉토리에서 작업을 계속하고 에이전트에게는 별도의 Worktree를 할당하여 특정 기능을 구현하게 함으로써 개발 속도를 극대화할 수 있습니다.

## 2. 주요 명령어

### Worktree 추가
```bash
# 새로운 경로에 특정 브랜치를 체크아웃하여 추가
git worktree add <path> <branch>

# 새로운 브랜치를 생성하며 추가
git worktree add -b <new-branch> <path> <origin/base-branch>
```

### Worktree 목록 확인
```bash
git worktree list
```

### Worktree 제거
```bash
# 작업 완료 후 디렉토리 및 설정 제거
git worktree remove <path>
```

## 3. 에이전트 작업 가이드

### 환경 설정 (Prerequisites)
Worktree를 새로 만든 후에는 해당 디렉토리에서 의존성 설치가 필요할 수 있습니다.
- `pnpm install`: `pnpm`은 스토어를 공유하므로 매우 빠르게 설치됩니다.
- 환경 변수(`.env` 등) 복사: 보안 상 Git에 관리되지 않는 파일은 수동으로 복사해야 합니다.

### 에이전트 실행 위치
- 에이전트는 항상 자신이 작업해야 할 **Worktree 디렉토리 내부**에서 실행되어야 합니다.
- 만약 메인 디렉토리에서 실행 중이라면, 에이전트에게 작업할 Worktree의 경로를 명확히 인지시켜야 합니다.

### 작업 흐름 예시
1. **사용자**: `git worktree add ../feature-branch feat/new-feature` 실행
2. **사용자**: `cp .env ../feature-branch/` (필요 시 환경 변수 복사)
3. **에이전트**: `cd ../feature-branch && pnpm install` 실행 후 기능 구현 시작
4. **에이전트**: 구현 완료 후 해당 브랜치에서 커밋 및 푸시
5. **사용자**: 메인 디렉토리에서 PR 검토 및 병합
6. **사용자**: `git worktree remove ../feature-branch` 로 정리

## 4. 주의 사항
- **node_modules**: Worktree 간에는 `node_modules`를 공유하지 않습니다. 각 Worktree에서 별도로 설치해야 합니다.
- **포트 충돌**: 로컬 개발 서버를 실행할 경우, 여러 Worktree에서 동시에 서버를 띄우려면 서로 다른 포트를 사용해야 합니다.
- **Git 상태**: 각 Worktree는 독립적인 HEAD를 가집니다. 한 Worktree에서 체크아웃된 브랜치는 다른 Worktree에서 동시에 체크아웃할 수 없습니다.
