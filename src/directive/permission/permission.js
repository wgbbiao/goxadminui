import store from '@/store'

function PasePermission(appLabel, perms) {
  const permissions = []
  perms.forEach(perm => {
    permissions.push(perm + '_' + appLabel.split('.')[1].toLowerCase())
  })
  return permissions
}
export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const { appLabel, perms } = value
    const user_ermissions = PasePermission(appLabel, perms)
    const permissions = store.getters && store.getters.permissions
    const isSuper = store.getters && store.getters.isSuper

    if (perms && perms instanceof Array && perms.length > 0) {
      const permissionRoles = user_ermissions
      var hasPermission = false
      if (isSuper) {
        hasPermission = true
      } else {
        if (permissions[appLabel]) {
          hasPermission = permissions[appLabel].some(role => {
            return permissionRoles.includes(role)
          })
        }
      }
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
