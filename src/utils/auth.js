import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenStartTime = 'TokenStartTime'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getTokenStartTime() {
  return Cookies.get(TokenStartTime)
}

export function setTokenStartTime(StartTime) {
  return Cookies.set(TokenStartTime, StartTime)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
