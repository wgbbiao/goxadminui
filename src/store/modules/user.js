import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setRole, getRole } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  is_super: false,
  role: '', // 顶级管理TopAdmin，场馆管理 VenueAdmin,
  permissions: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_IS_SUPER: (state, is_super) => {
    state.is_super = is_super
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(data => {
          // const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(data => {
          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { username, avatar, isSuper, permissions } = data
          commit('SET_PERMISSIONS', permissions)
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
          commit('SET_IS_SUPER', isSuper)
          var role = getRole()
          if (!role) {
            if (isSuper) {
              role = 'admin'
            } else {
              role = 'editor'
            }
          }
          commit('SET_ROLE', role)
          setRole(role)
          resolve({ roles: role, username, avatar, isSuper, permissions })
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      // const token = role + '-token'

      // commit('SET_TOKEN', token)
      commit('SET_ROLE', role)
      setRole(role)

      // setToken(token)

      // const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', role, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      // dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
