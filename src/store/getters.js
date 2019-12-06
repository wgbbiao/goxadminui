const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  isSuper: state => state.user.is_super,
  role: state => state.user.role,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes
  // errorLogs: state => state.errorLog.logs
}
export default getters
