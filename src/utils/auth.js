import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  const token = Cookies.get(TokenKey)
  if (token) {
    return 'Bearer ' + token
  } else {
    return token
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
const RoleKey = 'vue_admin_template_role'

export function setRole(role) {
  return Cookies.set(RoleKey, role)
}
export function getRole() {
  return Cookies.get(RoleKey)
}
