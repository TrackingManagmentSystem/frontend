import { Repository } from '@/repositories/Base/Repository'

class AuthorizationRepository extends Repository {
  endpoint = 'getAuthorizationUrl'

  getMercadoLivreLink() {
    return this.$axios.useBearerToken().get<{ authorization_url: string }>(`mercado-livre/${this.endpoint}`)
  }

  getShopeeLink() {
    return this.$axios.useBearerToken().get<{ authorization_url: string }>(`shopee/${this.endpoint}`)
  }
}

export default new AuthorizationRepository()
