import { loginByUsername, logout, getUserInfo, refreshToken } from '@/api/login'
import { getToken, setToken, removeToken, getTokenStartTime, setTokenStartTime } from '@/utils/auth'
import axios from 'axios'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    tokenStartTime: getTokenStartTime(),
    isRefreshingToken: false,
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TOKENStartTime: (state, tokenStartTime) => {
      state.tokenStartTime = tokenStartTime
    },
    SET_RefreshingToken: (state, refreshingToken) => {
      state.isRefreshingToken = refreshingToken
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.result.token)
          commit('SET_TOKENStartTime', new Date())
          setToken(data.result.token)
          setTokenStartTime(new Date())
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          //const data = response.data// response.data是接口返回的左右
          const data = response.data.result//是除了code、_success等其他信息都放在了result中。

          if (data.roleinfo && data.roleinfo.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roleinfo)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.userinfo.username)
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_TOKENStartTime', new Date())
        commit('SET_ROLES', [])
        removeToken()
        setTokenStartTime(new Date())
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_TOKENStartTime', new Date())
        commit('SET_ROLES', [])
        removeToken()
        setTokenStartTime(new Date())
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
