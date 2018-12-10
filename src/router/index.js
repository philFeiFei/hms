import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  // hms
  {
    path: '/HairpieceMultiManage',
    component: Layout,
    redirect: 'noredirect',//表示访问/hairpieceMove时可自动跳转到'/hairpieceMove/index'
    meta: {
      title: 'hairpieceMultiManage',
      icon: 'list'
    },
    children: [
      {
        path: 'OrdinaryMulti',
        component: () => import('@/views/hairpieceMultiManage/ordinaryMulti'),
        name: 'ordinaryHairMultiManage',
        meta: { title: 'ordinaryHairMultiManage' }
      },
      {
        path: 'SpecialMulti',
        component: () => import('@/views/hairpieceMultiManage/specialMulti'),
        name: 'specialHairMultiManage',
        meta: { title: 'specialHairMultiManage' }
      }
    ]
  },
  {
    path: '/HairpieceMoveManage',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: 'hairpieceMoveManage',
      icon: 'hair'
    },
    children: [
      {
        path: 'OrdinaryHairMoveManage',
        component: () => import('@/views/hairpieceMoveManage/ordinaryHairMoveManage'),
        name: 'ordinaryHairMoveManage',
        meta: { title: 'ordinaryHairMoveManage' }
      },
      {
        path: 'SpecialHairMoveManage',
        component: () => import('@/views/hairpieceMoveManage/specialHairMoveManage'),
        name: 'specialHairMoveManage',
        meta: { title: 'specialHairMoveManage' }
      }
    ]
  },

  {
    path: '/userManage',
    component: Layout,
    children: [
      {
        path: 'UserManage',
        component: () => import('@/views/userManage/userManage'),
        name: 'userManage',
        meta: { title: 'userManage', icon: 'user' }
      },
    ]
  },



  { path: '*', redirect: '/404', hidden: true }
]
