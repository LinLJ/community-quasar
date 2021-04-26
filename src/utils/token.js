import Cookies from 'js-cookie'
const TokenKey = 'access_token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }
//
// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

export function getToken() {
  var token = Cookies.get(TokenKey)
  if (token) {
    var value = JSON.parse(token)
    return value
  }
  return null
}

export function setToken(token) {
  if (token) {
    token = JSON.stringify(token)
  }
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

