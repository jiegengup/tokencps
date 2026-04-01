import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username?: string;
  nickname?: string;
  email: string;
  phone?: string;
  role?: string;
  inviteCode?: string;
  balance?: number;
  totalEarnings?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    user: null,
    token: null,
    isLoggedIn: false,
    login: (token, user) => {
      set({ token, user, isLoggedIn: true });
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
    },
    logout: () => {
      set({ token: null, user: null, isLoggedIn: false });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    updateUser: (data) => {
      set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      }));
    },
  }),
  {
    name: 'auth-storage',
  }
));
