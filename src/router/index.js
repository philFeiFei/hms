import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

import crudTestrouter from './modules/crudTest'

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
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
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

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  crudTestrouter,

  // hms
  {
    path: '/hairpieceMultiManage',
    component: Layout,
    name: 'hairpieceMultiManage',
    redirect: 'noredirect',//表示访问/hairpieceMove时可自动跳转到'/hairpieceMove/index'
    meta: {
      title: 'hairpieceMultiManage',
      icon: 'list'
    },
    children: [
      {
        path: 'ordinaryMulti',
        component: () => import('@/views/hairpieceMultiManage/ordinaryMulti'),
        name: 'ordinaryHairMultiManage',
        meta: { title: 'ordinaryHairMultiManage' }
      },
      {
        path: 'specialMulti',
        component: () => import('@/views/hairpieceMultiManage/specialMulti'),
        name: 'specialHairMultiManage',
        meta: { title: 'specialHairMultiManage' }
      }
    ]
  },
  {
    path: '/hairpieceMoveManage',
    component: Layout,
    name: 'hairpieceMoveManage',
    redirect: 'noredirect',
    meta: {
      title: 'hairpieceMoveManage',
      icon: 'hair'
    },
    children: [
      {
        path: 'ordinaryHairMoveManage',
        component: () => import('@/views/hairpieceMoveManage/ordinaryHairMoveManage'),
        name: 'ordinaryHairMoveManage',
        meta: { title: 'ordinaryHairMoveManage' }
      },
      {
        path: 'specialHairMoveManage',
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
        path: 'userManage',
        component: () => import('@/views/userManage/userManage'),
        name: 'userManage',
        meta: { title: 'userManage', icon: 'user' }
      },
    ]
  },



  { path: '*', redirect: '/404', hidden: true }
]
