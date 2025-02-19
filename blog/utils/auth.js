import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaHNoIiwicGFzc1dvcmQiOiJ5amgxMjM0NTYiLCJpYXQiOjE2NTUxOTI5MjQsImV4cCI6MTY1NTIwMDEyNH0.4XxXK40Phfk-mNRT1XckUvcr1a-227q_8mCsm47LAq0"
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
