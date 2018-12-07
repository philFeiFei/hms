import axios from 'axios'
import { Message, MessageBox, Notification } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken, setToken, getTokenStartTime, setTokenStartTime } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  //timeout: 5000 // request timeout
  timeout: 50000 // request timeout
})

/*被挂起的请求数组*/
let refreshSubscribers = []
/*push所有请求到数组中*/
function subscribeTokenRefresh(cb) {
  console.log("1、先把请求放到数组 cb is config:", cb)
  refreshSubscribers.push(cb)
}
/*刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）*/
function onRrefreshed(token) {
  console.log("2，onRefresh中token,cb得不到？", token)
  refreshSubscribers.map(cb => cb(token))//这个表示执行cb的时候，token作为cb的参数。
}
function refreshToken() {
  return axios({
    url: '/api/authen/refreshtoken', //这里是原生的axios请求，加上工程名 api。//或者改为service.post方法，后期。。
    method: 'post',
    data: {
      token: getToken(),
    },
    headers: { 'X-Token': getToken() }
  }).then(res => {
    return Promise.resolve(res.data)
  })

}
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
      //phil 2018年12月5日 加入token校验，未超时的话就刷新，但是是一定时间之后刷新。例如20-30分钟之间请求一次。
      //判断起始时间为 tokenstartToCheck 20分钟   超时时间为 tokenOverTime 30分钟  存在store global中
      //每次刷新获取token之后，更新token的起始时间戳  tokenStartTime  存在global中
      var tokenstartToCheck = store.getters.tokenstartToCheck
      var tokenOverTime = store.getters.tokenOverTime
      console.log("开始计算")
      var oData = new Date(getTokenStartTime()) //token起始时间,也是存在cookie中的，防止用户跳过登录直接进来的情况。
      let nDta = new Date();
      let stamp = nDta - oData;
      let minutes = parseInt(stamp / 1000 / 60);
      console.log(nDta, oData, minutes);
      if (minutes > tokenstartToCheck && minutes < tokenOverTime) {
        var oldToken = store.getters.token
        if (!store.getters.isRefreshingToken) {
          console.log("enter refresh token 在request中")
          store.commit('SET_RefreshingToken', true);
          console.log("store commit了SET_RefreshingToken")

          refreshToken().then(response => {//refreshToken方法用传统的axios调用。
            store.commit('SET_RefreshingToken', false);
            const data = response
            store.commit('SET_TOKEN', data.result.token)
            store.commit('SET_TOKENStartTime', new Date())
            setToken(data.result.token)
            setTokenStartTime(new Date())
            onRrefreshed(getToken())
            /*执行onRefreshed函数后清空数组中保存的请求*/
            refreshSubscribers = []
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message({
                message: '长时间未操作，请重新登录',
                type: 'error',
                duration: 5 * 1000
              })
              router.push({
                path: "/login"
              })
            })
          })
        }
        /*把请求(token)=>{....}都push到一个数组中*/
        let retry = new Promise((resolve, reject) => {
          /*(token) => {...}这个函数就是回调函数*/
          //执行此回调的时候，refreshtoken已经完成了。其实。
          subscribeTokenRefresh((token) => {
            console.log("3,最后执行这里 回调执行请求 用新得到的token:")
            config.headers['X-Token'] = token
            /*将请求挂起*/
            resolve(config)
          })
        })
        return retry
      }
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    //------与后端统一定制接口 phil 2018年11月19日-----------------
    var _success = response.data._success
    if (_success === false) {
      var code = response.data.code
      if (code == 403 || code == 401) {
        store.dispatch('FedLogOut').then(() => {
          //location.reload() // 这玩意是刷新的，慎用啊。。加载js太慢咯
          Message({
            message: response.data._message,
            type: 'error',
            duration: 5 * 1000
          })
          router.push({
            path: "/login"
          })
        })

      } else {//其它code类型错误。
        var _message = response.data._message
        Message({
          message: _message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject('error')//这个能截断前台的请求，终止操作。
    } else {
      return response
    }

  },

  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = (process.env.NODE_ENV === 'production' ? `请求地址出错` : `请求地址出错: ${error.response.config.url}`)
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          error.message = `{error.response.status}端口错误`
      }

      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })

    } else {
      Message({
        message: '未知错误，请联系开发人员处理！',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return new Promise(() => null)
  }
)

export default service
