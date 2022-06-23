import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(req => {
  // const token = window.localStorage.getItem('token')
  // if (token) {
  //   const [tokenType, accessToken] = token.split('#')
  //   req.headers.Authorization = `${tokenType} ${accessToken}`
  // }
  return req
})

export default axiosInstance
