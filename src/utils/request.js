import axios from 'axios'
import router from '@/router'
import JsonBig from 'json-bigint'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : process.env.VUE_APP_BASE_URL

// 请求拦截
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('user-token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.defaults.transformResponse = [
  function (data) {
    const res = data ? JsonBig.parse(data) : {}
    return res
  }
]
// 响应拦截
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : {}
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('user-token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default axios
