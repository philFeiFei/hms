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
  //---查询统计
  {
    path: '/cxtj',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '查询统计',
      icon: 'tree'
    },
    children: [
      {
        path: 'lhhzcx',
        component: () => import('@/views/cxtj/lhhzcx'),
        name: 'lhhzcx',
        meta: { title: '领活汇总查询' }
      },
      {
        path: 'gzhzcx',
        component: () => import('@/views/cxtj/gzhzcx'),
        name: 'gzhzcx',
        meta: { title: '钩针汇总查询' }
      },
      {
        path: 'zjhzcx',
        component: () => import('@/views/cxtj/zjhzcx'),
        name: 'zjhzcx',
        meta: { title: '质检汇总查询' }
      },
      {
        path: 'djhzcx',
        component: () => import('@/views/cxtj/djhzcx'),
        name: 'djhzcx',
        meta: { title: '底胶汇总查询' }
      },
      {
        path: 'zxhzcx',
        component: () => import('@/views/cxtj/zxhzcx'),
        name: 'zxhzcx',
        meta: { title: '整形汇总查询' }
      },
      {
        path: 'cpzjhzcx',
        component: () => import('@/views/cxtj/cpzjhzcx'),
        name: 'cpzjhzcx',
        meta: { title: '成品质检汇总查询' }
      },
      {
        path: 'fhhzcx',
        component: () => import('@/views/cxtj/fhhzcx'),
        name: 'fhhzcx',
        meta: { title: '发货汇总查询' }
      },
      {
        path: 'tqcx',
        component: () => import('@/views/cxtj/tqcx'),
        name: 'tqcx',
        meta: { title: '拖期查询' }
      },
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
  {
    path: '/csgl',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '参数管理',
      icon: 'xtcs'
    },
    children: [
      {
        path: 'sh',
        component: () => import('@/views/csgl/sh'),
        name: 'sh',
        meta: { title: '色号管理' }
      },
      {
        path: 'wdcc',
        component: () => import('@/views/csgl/wdcc'),
        name: 'wdcc',
        meta: { title: '网底尺寸' }
      },
      {
        path: 'wdks',
        component: () => import('@/views/csgl/wdks'),
        name: 'wdks',
        meta: { title: '网底款式' }
      },
      {
        path: 'fc',
        component: () => import('@/views/csgl/fc'),
        name: 'fc',
        meta: { title: '发长' }
      },
    ]
  },



  { path: '*', redirect: '/404', hidden: true }
]
