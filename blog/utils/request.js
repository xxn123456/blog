import axios from 'axios'

import { getToken } from '@/utils/auth'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// create an axios instance
const service = axios.create({
  baseURL: "http://shutiaogege.top:3000", // url = base url + request url
  // baseURL: "http://localhost:3000", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers.common.Authorization = "Bearer " + getToken();
    return config
  },
  error => {

    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.respCode == 99999) {

    } else {
      return res
    }
  },
  error => {

    return Promise.reject(error)
  }
)

export default service
