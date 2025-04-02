import { Store } from '@/store'
import axios, { AxiosError, type AxiosInstance } from 'axios'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

// Error Treatment
const onReject = (
  error: AxiosError<{ message?: string; errors?: Record<string, unknown>[]; }>
) => {
  //const originalRequest = error.config

  if (typeof error.response === 'undefined') {
    // Notify.create({ type: 'negative', message: `Verifique sua conexão! Ocorreu um erro de rede, possível falha CORS.` })
  }

  // 400 Bad Request
  if (error.response) {
    if (error.response.status === 400 && error.response.data.message) {
      // Notify.create({ type: 'negative', message: error.response.data.message })
      return Promise.reject(error)
    }

    // 401 Unauthorized
    if (error.response.status === 401) {
      // Notify.create({ type: 'negative', message: 'Usuário não possui permissão para realizar essa transação na API!' })
      return Promise.reject(error)
    }

    // 404
    if (error.response.status === 404) {
      // Notify.create({ type: 'negative', message: 'Recurso não localizado na API!' })
      return Promise.reject(error)
    }

    // 422 Unprocessable Entity
    if (error.response.status === 422 && error.response.data.errors) {
      const errors = error.response.data.errors
      Object.keys(errors).map((field: string) => {
        if (Array.isArray(errors[field])) {
          errors[field].map(msg => {
            // Notify.create({ type: 'negative', message: msg })
          })
        } else {
          // Notify.create({ type: 'negative', message: errors[field] })
        }
      })

    }

    // 500 Internal Server Error
    if (error.response.status === 500 && error.response.data?.message) {
      // Notify.create({type: 'negative', message: 'Erro interno no servidor, confira o Console!'})
      // Notify.create({ type: 'negative', message: error.response.data.message })
      return Promise.reject(error)
    }
  }

  return Promise.reject(error)
}
// Attach Function Treatment
axios.interceptors.response.use((response) => response, onReject);

export type AxiosWithOptionalAuth =  AxiosInstance & { useBearerToken?: Function }
export type AxiosWithAuth =  AxiosInstance & { useBearerToken: () => AxiosWithAuth }

// API
const axiosWithAuth: AxiosWithOptionalAuth = axios.create({ baseURL: import.meta.env.BASE_URL });
axiosWithAuth.interceptors.response.use((response) => response, onReject);
axiosWithAuth.useBearerToken = (): AxiosWithAuth => {
  if (axiosWithAuth.interceptors.request.handlers.length === 0) {
    axiosWithAuth.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${Store.state.value.auth.token}`
        return config
      },
      error => Promise.reject(error)
    );
  }
  return axiosWithAuth as AxiosWithAuth
}

export {
  axios,
  axiosWithAuth
}
