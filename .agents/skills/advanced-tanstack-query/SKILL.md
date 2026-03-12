# Advanced TanStack Query Skill

이 스킬은 TanStack Query(React Query v5+)를 고도화하여 캐시 효율을 극대화하고 복잡한 데이터 시나리오(무한 스크롤, 서버 하이드레이션)를 완벽하게 처리하기 위한 가이드라인을 정의합니다.

## 1. 정교한 캐시 수명 관리 (Stale vs GC)
- **staleTime (기본값 0)**: 데이터가 '신선하지 않음'으로 판단되는 시간입니다. 불필요한 네트워크 요청을 줄이기 위해 최소 `5 * 1000` (5초) 이상으로 설정하는 것을 권장하며, 자주 바뀌지 않는 데이터는 `1 * 60 * 1000` (1분) 이상으로 설정합니다.
- **gcTime (기본값 5분)**: 쿼리가 사용되지 않을 때 메모리에서 제거되는 시간입니다. `staleTime`보다 길게 설정하여 캐시 데이터를 보존합니다.

## 2. Next.js 서버 컴포넌트 & 하이드레이션
- **prefetchQuery (Server Side)**: 서버 컴포넌트(Page)에서 데이터를 미리 패칭할 때 `queryClient.prefetchQuery`를 사용하고, `HydrationBoundary`를 통해 클라이언트로 직렬화된 데이터를 전달합니다.
- **데이터 일관성**: 서버와 클라이언트의 `queryKey`가 100% 일치해야 하이드레이션이 정상 작동합니다. 반드시 `Query Key Factory`를 공유하여 사용합니다.

## 3. 무한 스크롤 (useInfiniteQuery)
- **표준 구조**: `getNextPageParam`과 `getPreviousPageParam`을 사용하여 커서 기반(Cursor-based) 또는 페이지 기반(Offset-based) 페이징을 구현합니다.
- **데이터 평탄화**: 컴포넌트에서 데이터를 사용할 때는 `data.pages.flatMap(page => page.items)`와 같이 평탄화하여 사용합니다.

## 4. 고급 Mutation & 낙관적 업데이트
- **onMutate**: 데이터 변경 요청 전, 캐시를 즉시 업데이트하여 사용자에게 즉각적인 피드백을 줍니다. (낙관적 업데이트)
- **onError & onSettled**: 에러 발생 시 캐시를 이전 상태로 롤백하고, 요청 완료 후 반드시 관련 쿼리를 무효화(`invalidateQueries`)합니다.

## 5. 에이전트 자가 검토 체크리스트
- [ ] 데이터의 성격에 맞는 `staleTime`이 적절히 설정되었는가?
- [ ] 서버 컴포넌트에서 패칭한 데이터가 클라이언트에서 정상적으로 하이드레이션되는가?
- [ ] 무한 스크롤 구현 시 이전/다음 페이지 파라미터 계산 로직이 정확한가?
- [ ] Mutation 실패 시 데이터 복구(Rollback) 로직이 포함되었는가?
