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
  //默认每一个路由都要有children。
  // hms  在每一个路由d children中加入企业编号qybharr，做到企业用属于自己的功能，没有企业编号参数默认加载。
  //后期可考虑数据库配置企业路由表。
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
        meta: { title: 'ordinaryHairMultiManage' },
        qybharr: ['001']
      },
      {
        path: 'SpecialMulti',
        component: () => import('@/views/hairpieceMultiManage/specialMulti'),
        name: 'specialHairMultiManage',
        meta: { title: 'specialHairMultiManage' },
        qybharr: ['001']
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
        meta: { title: 'ordinaryHairMoveManage' },
        qybharr: ['001']
      },
      {
        path: 'SpecialHairMoveManage',
        component: () => import('@/views/hairpieceMoveManage/specialHairMoveManage'),
        name: 'specialHairMoveManage',
        meta: { title: 'specialHairMoveManage' },
        qybharr: ['001']
      }
    ]
  },

  {
    path: '/PrManage',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '漂染管理',
      icon: 'list'
    },
    children: [
      {
        path: 'prgl',
        component: () => import('@/views/prgl/prgl'),
        name: 'prglManage',
        meta: { title: '漂染管理' },
        qybharr: ['001']
      },
    ]
  },

  {
    path: '/SfManage',
    component: Layout,
    redirect: 'noredirect',//表示访问/hairpieceMove时可自动跳转到'/hairpieceMove/index'
    meta: {
      title: '色发管理',
      icon: 'list'
    },
    children: [
      {
        path: 'sfrkgl',
        component: () => import('@/views/sfgl/sfrkgl'),
        name: 'sfrkglManage',//这里的name需要与vue中的name一致，才会keeplive。。
        meta: { title: '色发入库管理' },
        qybharr: ['001']
      },
      {
        path: 'sfckgl',
        component: () => import('@/views/sfgl/sfckgl'),
        name: 'sfckglManage',
        meta: { title: '色发出库管理' },
        qybharr: ['001']
      },
    ]
  },

  {
    path: '/TpManage',
    component: Layout,
    redirect: 'noredirect',//表示访问/hairpieceMove时可自动跳转到'/hairpieceMove/index'
    meta: {
      title: '头皮管理',
      icon: 'list'
    },
    children: [
      {
        path: 'tpgl',
        component: () => import('@/views/tpgl/tpgl'),
        name: 'tpglManage',
        meta: { title: '头皮登记管理' },
        qybharr: ['001']
      },
      {
        path: 'tpkccx',
        component: () => import('@/views/tpgl/tpkccx'),
        name: 'tpkccx',
        meta: { title: '库存查询' },
        qybharr: ['001']
      },
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
        meta: { title: '领活汇总查询' },
        qybharr: ['001']
      },
      {
        path: 'gzhzcx',
        component: () => import('@/views/cxtj/gzhzcx'),
        name: 'gzhzcx',
        meta: { title: '钩针汇总查询' },
        qybharr: ['001']
      },
      {
        path: 'zjhzcx',
        component: () => import('@/views/cxtj/zjhzcx'),
        name: 'zjhzcx',
        meta: { title: '质检汇总查询' },
        qybharr: ['001']
      },
      {
        path: 'djhzcx',
        component: () => import('@/views/cxtj/djhzcx'),
        name: 'djhzcx',
        meta: { title: '底胶汇总查询' },
        qybharr: ['001']
      },
      {
        path: 'djzchzcx',
        component: () => import('@/views/cxtj/djzchzcx'),
        name: 'djzchzcx',
        meta: { title: '底胶转出汇总查询' },
        qybharr: ['001']
      },
      {
        path: 'zxhzcx',
        component: () => import('@/views/cxtj/zxhzcx'),
        name: 'zxhzcx',
        meta: { title: '整形汇总查询' },
        qybharr: ['001']
      },
      {
        path: 'cpzjhzcx',
        component: () => import('@/views/cxtj/cpzjhzcx'),
        name: 'cpzjhzcx',
        meta: { title: '成品质检汇总查询' },
        qybharr: ['001']
      },
      {
        path: 'fhhzcx',
        component: () => import('@/views/cxtj/fhhzcx'),
        name: 'fhhzcx',
        meta: { title: '发货汇总查询' },
        qybharr: ['001']
      },
      {
        path: 'tqcx',
        component: () => import('@/views/cxtj/tqcx'),
        name: 'tqcx',
        meta: { title: '拖期查询' },
        qybharr: ['001']
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
        path: 'djgl',
        component: () => import('@/views/djgl/djgl'),
        name: 'djgl',
        meta: { title: '单价管理' },
        qybharr: ['001']
      },
      {
        path: 'sh',
        component: () => import('@/views/csgl/sh'),
        name: 'shgl',
        meta: { title: '色号管理' },
        qybharr: ['001']
      },
      {
        path: 'wdcc',
        component: () => import('@/views/csgl/wdcc'),
        name: 'wdccgl',
        meta: { title: '网底尺寸' },
        qybharr: ['001']
      },
      {
        path: 'wdks',
        component: () => import('@/views/csgl/wdks'),
        name: 'wdksgl',
        meta: { title: '网底款式' },
        qybharr: ['001']
      },
      {
        path: 'fc',
        component: () => import('@/views/csgl/fc'),
        name: 'fcgl',
        meta: { title: '发长' },
        qybharr: ['001']
      },
      {
        path: 'tplx',
        component: () => import('@/views/csgl/tplx'),
        name: 'tplxgl',
        meta: { title: '头皮工序类型' },
        qybharr: ['001']
      },
      {
        path: 'sflx',
        component: () => import('@/views/csgl/sflx'),
        name: 'sflxgl',
        meta: { title: '色发工序类型' },
        qybharr: ['001']
      },
      {
        path: 'sfzl',
        component: () => import('@/views/csgl/sfzl'),
        name: 'sfzlgl',
        meta: { title: '色发种类' },
        qybharr: ['001']
      },
    ]
  },



  { path: '*', redirect: '/404', hidden: true }
]
