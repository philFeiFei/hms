import { getConfigFromServer } from '@/api/global'
const global = {
  state: {
    code: {},
    jzrq: '2019-11-27',    //阿里云截止日期
    lastDaysToAlert: 30,   //还剩多少天提示用户阿里云到期
    tokenstartToCheck: 25,  //判断token请求起始时间为
    tokenOverTime: 30,//token超时时间
    systemName: '禹城市睿绣发制品',

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
          const codelist = response.data.result.codelist
          commit('SET_CODE', codelist)//暂时先获取后台的code配置
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default global
