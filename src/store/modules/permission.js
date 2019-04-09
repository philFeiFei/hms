import { asyncRouterMap, constantRouterMap } from '@/router'
import { getConfiguration } from '@/api/global'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 过滤企业编号
 * @param {*} globalQybh
 * @param {*} route
 */
function hasRouterByQybh(qybh, route) {
  var storeQybh = qybh;
  if (route.qybharr) {//children中校验qybharr，上一级直接返回true
    if (storeQybh) {
      return route.qybharr.some(qybh => storeQybh == qybh)
    } else {
      return false;
    }
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles, qybh) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp) && hasRouterByQybh(qybh, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles, qybh)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    qybh: '',
    jzrq: '',
    serverInfo: '',
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers   //这个是获取的不是constant的路由。
      state.routers = constantRouterMap.concat(routers)
    },
    SET_QYBH: (state, value) => {
      state.qybh = value
    },
    SET_JZRQ: (state, value) => {
      state.jzrq = value
    },
    SET_SERVERINFO: (state, value) => {
      state.serverInfo = value
    },
  },
  actions: {
    GenerateRoutes({ commit }, { roles, configuration }) {
      return new Promise(resolve => {
        let accessedRouters

        //遍历configuration
        var qybh = null;
        if (configuration) {
          configuration.forEach(obj => {
            var code = obj.config_code;
            if ("QYBH" == code) {
              qybh = obj.config_value
              commit('SET_QYBH', qybh);

            } else if ("JZRQ" == code) {
              commit('SET_JZRQ', obj.config_value);
              commit('SET_SERVERINFO', obj.config_desc);
            }
          })
        }

        accessedRouters = filterAsyncRouter(asyncRouterMap, roles, qybh)

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },

    GetConfigurations({ commit, state }) {
      return new Promise((resolve, reject) => {
        getConfiguration(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default permission
