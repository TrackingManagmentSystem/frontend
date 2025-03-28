import { Repository } from '@/repositories/Base/Repository'

type AuthToken = {
  accessToken: string;
  expiresAt: string;
  platform: 'mercadolivre' | 'shopee';
  partnerUserId: string;
  refreshToken: string;
  userId: string;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  document: string;

  email: string;
  password: string;
  profileId: string;

  country: string;
  cityState: string;
  zipCode: string;

  profile: {
    id: string;
    name: string;
  };
  tokens: AuthToken[];
};

class AuthRepository extends Repository {
  endpoint = 'auth'

  me() {
    return this.$axios.useBearerToken().get<User>(`${this.endpoint}/me`)
  }

  login(params: { email: string; password: string; }) {
    return this.$axios.post<{ accessToken: string; }>(`${this.endpoint}/login`, params)
  }

  update(params: Partial<User>) {
    return this.$axios.useBearerToken().put<User>(`${this.endpoint}/me`, params)
  }

  logout() {
    return this.$axios.useBearerToken().post(`${this.endpoint}/logout`)
  }

  reset(params: any) {
    return this.$axios.post(`${this.endpoint}/reset`, params)
  }
}

export default new AuthRepository()
