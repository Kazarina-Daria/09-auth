import { create } from "zustand";
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),
  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
     isLoading: false,
  setLoading: (loading: boolean) =>
    set({
      isLoading: loading,
    }),
}));