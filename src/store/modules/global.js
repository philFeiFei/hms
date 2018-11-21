import { getConfigFromServer } from '@/api/global'
const global = {
  state: {
    code: {},

  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
  },
  actions: {
    GetConfigFromServer({ commit }) {
      return new Promise((resolve, reject) => {
        getConfigFromServer().then(response => {
          const data = response.data
          commit('SET_CODE', data.code)//暂时先获取后台的code配置
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default global
