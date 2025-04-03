import type { User } from "@/repositories/Auth/AuthRepository";

export type StateType = {
  loading: boolean;
  token: string | null;
  user: User | null;
};

export type GettersType = {
  avatar(): string;
  isLogged(): boolean;
  getUser(state: StateType): StateType['user'];
};

export type ActionsType = {
  login: (payload: { email: string; password: string; }) => Promise<void>;
  register: (payload: { email: string; password: string; firstName: string; lastName: string; }) => Promise<void>;
  updateUser: (payload: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  getAuthorizationLink: (platform: string) => Promise<{ authorization_url: string; }>;
  parseCodeToAccessToken: (payload: { platform: string; params: Record<string, any> }) => Promise<string>;
};
