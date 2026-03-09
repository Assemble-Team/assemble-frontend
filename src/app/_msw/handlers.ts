import {
  groupHandlers,
  activityHandlers,
} from '@/entities/groups/api/msw/handlers';
import { authHandlers } from '@/features/auth/api/msw/handlers';
import { userHandlers } from '@/entities/user/api/msw/handlers';

export const allHandlers = [
  ...groupHandlers,
  ...activityHandlers,
  ...authHandlers,
  ...userHandlers,
];
