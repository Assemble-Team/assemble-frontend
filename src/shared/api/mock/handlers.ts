import {
  groupHandlers,
  activityHandlers,
} from '@/entities/groups/api/msw/handlers';
import { authHandlers } from '@/features/auth/api/msw/handlers';
import { userHandlers } from '@/entities/user/api/msw/handlers';

/**
 * 모든 MSW 핸들러를 하나로 통합합니다.
 * FSD 아키텍처에 따라 각 슬라이스의 handlers를 가져와서 합칩니다.
 */
export const allHandlers = [
  ...groupHandlers,
  ...activityHandlers,
  ...authHandlers,
  ...userHandlers,
];
