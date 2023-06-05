import axios from 'axios'
import { DEFAULT_API } from '@env'
import { AuthService } from '@app/services/auth'

const privateInstance = axios.create({
  baseURL: DEFAULT_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Request interceptor for API calls
privateInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await AuthService.getAccessToken()

    if (accessToken && config.headers) {
      config.headers.Authorization = 'Bearer ' + accessToken
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// Response interceptor for API calls
privateInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const accessToken = await AuthService.refreshToken()

      if (!accessToken) {
        return Promise.reject(error)
      }

      originalRequest.headers.Authorization = 'Bearer ' + accessToken

      return privateInstance(originalRequest)
    } else if (originalRequest._retry) {
      await AuthService.logout()
    }

    return Promise.reject(error)
  },
)

export const apiPrivate = privateInstance
export const apiPublic = axios.create({ baseURL: DEFAULT_API })
