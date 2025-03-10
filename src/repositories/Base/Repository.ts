import type { AxiosRequestConfig } from 'axios'
import { axiosWithAuth, type AxiosWithAuth } from '../../providers/AxiosProvider'

export class Repository<T = unknown> {
  endpoint: string | null = null
  $axios: AxiosWithAuth

  constructor ($axios: AxiosWithAuth = axiosWithAuth as AxiosWithAuth) {
    this.$axios = $axios
  }

  fetchAll (params?: AxiosRequestConfig['params']) {
    return this.$axios.useBearerToken().get<T[]>(`${this.endpoint}s`, { params })
  }

  fetch (id: string) {
    return this.$axios.useBearerToken().get<T>(`${this.endpoint}/${id}`)
  }

  post (data?: AxiosRequestConfig['data']) {
    return this.$axios.useBearerToken().post<T>(`${this.endpoint}`, { data })
  }

  put (id: string, data?: AxiosRequestConfig['data']) {
    return this.$axios.useBearerToken().put<T>(`${this.endpoint}/${id}`, { data })
  }

  delete (id: string) {
    return this.$axios.useBearerToken().delete<T>(`${this.endpoint}/${id}`)
  }

}

export default new Repository()
