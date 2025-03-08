import type { User } from "@/repositories/Auth/AuthRepository";

export type AuthState = {
  loading: boolean;
  token: string | null;
  user: User | null;
}

export default () => ({
  loading: false,
  token: null,
  user: null,
})
