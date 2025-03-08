import { Repository } from '@/repositories/Base/Repository'

export type User = {
  email: string;
  id: string;
  name: string;
  password: string;
  profile: {
    id: string;
    name: string;
  }
  profileId: string;
  tokens: {
    accessToken: string;
    expiresAt: string;
    meliUserId: string;
    refreshToken: string;
    userId: string;
  }
};

class AuthRepository extends Repository {
  endpoint = 'auth'

  me() {
    return this.$axios.useBearerToken().get<User>(`${this.endpoint}/me`)
  }

  login(params: { email: string; password: string; }) {
    return this.$axios.post<{ access_token: string; }>(`${this.endpoint}/login`, params)
  }

  logout() {
    return this.$axios.post(`${this.endpoint}/logout`)
  }

  reset(params: any) {
    return this.$axios.post(`${this.endpoint}/reset`, params)
  }
}

export default new AuthRepository()
