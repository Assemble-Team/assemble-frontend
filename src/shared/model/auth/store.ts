import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  setAccessToken: (token: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 때 사용될 키
      storage: createJSONStorage(() => localStorage),
    }
  )
);
