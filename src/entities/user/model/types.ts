export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
}

export interface NotificationSettings {
  scheduleApp: boolean;
  boardApp: boolean;
  noticeApp: boolean;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
