import { Repository } from '@/repositories/Base/Repository'

class AuthorizationRepository extends Repository {
  endpoint = ''

  getAuthorizationUrl(platform: string) {
    return this.$axios.useBearerToken().get<{ authorization_url: string }>(`${platform}/getAuthorizationUrl`)
  }

  parseCodeToAccessToken({ platform, params }: { platform: string; params: Record<string, any> }) {
    return this.$axios.useBearerToken().get<{ accessToken: string; }>(`${platform}/callback`, { params })
  }
}

export default new AuthorizationRepository()
