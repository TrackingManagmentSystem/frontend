import type { User } from "@/repositories/Auth/AuthRepository";

export type StateType = {
  loading: boolean;
  token: string | null;
  user: User | null;
};

export type GettersType = {
  isLogged(): boolean
  getUser(state: StateType): StateType['user']
};

export type ActionsType = {
  login: (payload: { email: string; password: string; }) => Promise<void>;
  updateUser: (payload: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  getMercadoLivreAuthorizationLink: () => Promise<{ authorization_url: string; }>;
  getShopeeAuthorizationLink: () => Promise<{ authorization_url: string; }>;
};
