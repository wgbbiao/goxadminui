import Vue from 'vue'
import Router from 'vue-router'
import defaultSettings from '@/settings'
const { PolicyView, PolicyUpdate, PolicyCreate } = defaultSettings
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          roles: ['admin'],
          title: 'Dashboard',
          icon: 'dashboard'
        }
      }
    ]
  },

  {
    path: '/admin/auth',
    redirect: '/admin/auth/User',
    component: Layout,
    meta: {
      title: '用户与权限',
      roles: ['admin'],
      icon: 'user'
    },
    children: [
      {
        path: 'user',
        name: 'AuthUser',
        component: () => import('@/views/auth/userList'),
        meta: {
          title: '用户列表',
          icon: 'table',
          appLabel: 'goxadmin.User',
          permissions: [PolicyView]
        }
      },
      {
        path: 'user/create',
        hidden: true,
        name: 'CreateUser',
        component: () => import('@/views/auth/createUser'),
        meta: {
          title: '添加用户',
          icon: 'user',
          appLabel: 'goxadmin.User',
          permissions: [PolicyCreate]
        }
      },
      {
        path: 'user/:id/edit',
        hidden: true,
        name: 'EditorUser',
        component: () => import('@/views/auth/createUser'),
        meta: {
          title: '修改用户',
          icon: 'user',
          appLabel: 'goxadmin.User',
          permissions: [PolicyUpdate]
        }
      },
      {
        path: 'role',
        name: 'RoleList',
        component: () => import('@/views/auth/role/list'),
        meta: {
          title: '角色列表',
          icon: 'user',
          appLabel: 'goxadmin.Role',
          permissions: [PolicyView]
        }
      },
      {
        path: 'role/:id/edit',
        name: 'EditRole',
        hidden: true,
        component: () => import('@/views/auth/role/edit'),
        meta: {
          title: '修改角色',
          icon: 'user',
          appLabel: 'goxadmin.Role',
          permissions: [PolicyUpdate]
        }
      },
      {
        path: 'role/create',
        name: 'CreateRole',
        hidden: true,
        component: () => import('@/views/auth/role/edit'),
        meta: {
          title: '添加角色',
          icon: 'user',
          appLabel: 'goxadmin.Role',
          permissions: [PolicyUpdate]
        }
      },
      {
        path: 'permission',
        name: 'PermissionList',
        component: () => import('@/views/auth/permission/list'),
        meta: {
          title: '权限列表',
          icon: 'user',
          appLabel: 'models.Course',
          permissions: [PolicyView]
        }
      },
      {
        path: 'permission/:id/edit',
        name: 'EditPermission',
        hidden: true,
        component: () => import('@/views/auth/permission/edit'),
        meta: {
          title: '修改权限',
          icon: 'user',
          appLabel: 'models.Course',
          permissions: [PolicyUpdate]
        }
      },
      {
        path: 'permission/create',
        name: 'CreatePermission',
        hidden: true,
        component: () => import('@/views/auth/permission/edit'),
        meta: {
          title: '添加权限',
          icon: 'user',
          appLabel: 'models.Course',
          permissions: [PolicyUpdate]
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
const createRouter = () => {
  return new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
