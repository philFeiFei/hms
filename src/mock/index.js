import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import hairpieceMoveManageAPI from './hairpieceMoveManage'
import hairpieceMultiManageAPI from './hairpieceMultiManage'
import userManageAPI from './userManage'
import globalAPI from './global'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关//
Mock.mock(/\/authen\/getToken/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/authen\/refreshtoken/, 'post', loginAPI.refreshtoken)
//Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'post', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// hairpieceMove相关
Mock.mock(/\/hairpieceMove\/query/, 'post', hairpieceMoveManageAPI.getList)// 假发流转查询
Mock.mock(/\/hairpieceMove\/update/, 'post', hairpieceMoveManageAPI.update)// 假发流转查询
Mock.mock(/\/hairpieceMove\/querySpecialDetail/, 'post', hairpieceMoveManageAPI.querySpecialDetail)//查询特单详细信息

// hairpieceMultiManage相关
Mock.mock(/\/hairpieceMultiManage\/query/, 'post', hairpieceMultiManageAPI.getList)// 假发批次查询
Mock.mock(/\/hairpieceMultiManage\/create/, 'post', hairpieceMultiManageAPI.create)// 假发批次增加
Mock.mock(/\/hairpieceMultiManage\/delete/, 'post', hairpieceMultiManageAPI.delete)// 假发批次删除
Mock.mock(/\/hairpieceMultiManage\/getDetail4QRCode/, 'post', hairpieceMultiManageAPI.getDetail4QRCode)// 假发批次产生二维码
Mock.mock(/\/hairpieceMultiManage\/UploadInVue/, 'post', hairpieceMultiManageAPI.uploadTdPic)// 截取上传特单请求

Mock.mock(/\/userManage\/query/, 'post', userManageAPI.getList)
Mock.mock(/\/userManage\/create/, 'post', userManageAPI.create)
Mock.mock(/\/userManage\/update/, 'post', userManageAPI.update)
Mock.mock(/\/userManage\/delete/, 'post', userManageAPI.delete)

//_global configiration获取
Mock.mock(/\/global\/query/, 'post', globalAPI.query)

export default Mock
