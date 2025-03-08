import type { AxiosRequestConfig } from 'axios'
import { axiosWithAuth, type AxiosWithAuth } from '../../providers/AxiosProvider'

export class Repository {
  endpoint: string | null = null
  $axios: AxiosWithAuth

  constructor ($axios: AxiosWithAuth = axiosWithAuth as AxiosWithAuth) {
    this.$axios = $axios
  }

  fetchAll (params?: AxiosRequestConfig<any>) {
    return this.$axios.get(`${this.endpoint}`, { params })
  }

  fetch (id: string) {
    return this.$axios.get(`${this.endpoint}/${id}`)
  }

  post (params?: AxiosRequestConfig<any>) {
    return this.$axios.post(`${this.endpoint}`, params)
  }

  put (id: string, params?: AxiosRequestConfig<any>) {
    return this.$axios.put(`${this.endpoint}/${id}`, params)
  }

  delete (id: string) {
    return this.$axios.delete(`${this.endpoint}/${id}`)
  }

}

export default new Repository()
