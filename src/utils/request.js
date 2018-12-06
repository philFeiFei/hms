import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
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
  refreshSubscribers.push(cb)
}
/*刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）*/
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token))
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
    console.log("config", config)
    console.log("store.getters.token", store.getters.token)
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
            console.log("newToken", data);
            store.commit('SET_TOKEN', data.result.token)
            store.commit('SET_TOKENStartTime', new Date())
            console.log("更新完了token旧与新token", oldToken, data.result.token)
            setToken(data.result.token)
            setTokenStartTime(new Date())
            onRrefreshed(getToken())
            /*执行onRefreshed函数后清空数组中保存的请求*/
            refreshSubscribers = []
          }).catch(() => {
            Message({
              message: "由于长时间未操作未获取服务器认证，请重新登录系统！",
              duration: 20 * 1000
            })
          })
        }
        console.log("跳过再次refreshtoken");
        /*把请求(token)=>{....}都push到一个数组中*/
        let retry = new Promise((resolve, reject) => {
          /*(token) => {...}这个函数就是回调函数*/
          subscribeTokenRefresh((token) => {
            config.headers['X-Token'] = getToken()
            /*将请求挂起*/
            console.log("挂起config")
            resolve(config)
          })
        })
        return retry
      }
      console.log("最后的return config")
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
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
    console.log("response.data", response.data)
    //------与后端统一定制接口 phil 2018年11月19日-----------------
    var _success = response.data._success
    if (_success === false) {
      var code = response.data.code
      if (code == 403) {
        MessageBox.confirm('用户认证失败，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(() => {
          Message({
            message: "系统超时并继续留在了页面",
            duration: 5 * 1000
          })
        })
      } else if (code == 401) {
        MessageBox.confirm('系统超时，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(() => {
          Message({
            message: "用户选择继续留在了页面",
            duration: 5 * 1000
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
      //return response
    } else {

      return response
    }

  },
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
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
