import axios from 'axios'
import { env } from './env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // sends the httpOnly cookie set by your server
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      window.location.assign('/login')
    }
    return Promise.reject(error)
  },
)
