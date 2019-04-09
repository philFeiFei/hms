import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import hairpieceMoveManageAPI from './hairpieceMoveManage'
import cxtjAPI from './cxtj'
import hairpieceMultiManageAPI from './hairpieceMultiManage'
import userManageAPI from './userManage'
import globalAPI from './global'
import csglAPI from './csgl'
import tpglAPI from './tpgl'
import djglAPI from './djgl'
import prglAPI from './prgl'
import sfrkglAPI from './sfrkgl'
import sfckglAPI from './sfckgl'

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
Mock.mock(/\/hairpieceMove\/update/, 'post', hairpieceMoveManageAPI.update)// 假发流转修改
Mock.mock(/\/hairpieceMove\/multiUpdate/, 'post', hairpieceMoveManageAPI.multiUpdate)// 假发流转修改
Mock.mock(/\/hairpieceMove\/delete/, 'post', hairpieceMoveManageAPI.delete)// 假发流转修改
//Mock.mock(/\/hairpieceMove\/querySpecialDetail/, 'post', hairpieceMoveManageAPI.querySpecialDetail)//查询特单详细信息

// hairpieceMultiManage相关
Mock.mock(/\/hairpieceMultiManage\/query/, 'post', hairpieceMultiManageAPI.getList)// 假发批次查询
Mock.mock(/\/hairpieceMultiManage\/create/, 'post', hairpieceMultiManageAPI.create)// 假发批次增加
Mock.mock(/\/hairpieceMultiManage\/delete/, 'post', hairpieceMultiManageAPI.delete)// 假发批次删除
Mock.mock(/\/hairpieceMultiManage\/getDetail4QRCode/, 'post', hairpieceMultiManageAPI.getDetail4QRCode)// 假发批次产生二维码
Mock.mock(/\/jfinfo\/queryJfInfoByDdbh/, 'post', hairpieceMultiManageAPI.getDetail4QRCodeByDdbh)// 假发批次产生二维码g根据订单编号，节省纸张
Mock.mock(/\/hairpieceMultiManage\/UploadInVue/, 'post', hairpieceMultiManageAPI.uploadTdPic)// 截取上传特单请求

Mock.mock(/\/userManage\/query/, 'post', userManageAPI.getList)
Mock.mock(/\/userManage\/create/, 'post', userManageAPI.create)
Mock.mock(/\/userManage\/update/, 'post', userManageAPI.update)
Mock.mock(/\/userManage\/delete/, 'post', userManageAPI.delete)

Mock.mock(/\/tpgl\/tpcx/, 'post', tpglAPI.getList)
Mock.mock(/\/tpgl\/tpxz/, 'post', tpglAPI.create)
Mock.mock(/\/tpgl\/tpsc/, 'post', tpglAPI.delete)
Mock.mock(/\/cxtj\/kccx/, 'post', tpglAPI.kcQuery)

Mock.mock(/\/djgl\/djcx/, 'post', djglAPI.getList)
Mock.mock(/\/djgl\/djxz/, 'post', djglAPI.create)
Mock.mock(/\/djgl\/djsc/, 'post', djglAPI.delete)

Mock.mock(/\/prgl\/prcx/, 'post', prglAPI.getList)
Mock.mock(/\/prgl\/prxz/, 'post', prglAPI.create)
Mock.mock(/\/prgl\/prsc/, 'post', prglAPI.delete)

Mock.mock(/\/sfrkgl\/sfrkcx/, 'post', sfrkglAPI.getList)
Mock.mock(/\/sfrkgl\/sfrkxz/, 'post', sfrkglAPI.create)
Mock.mock(/\/sfrkgl\/sfrksc/, 'post', sfrkglAPI.delete)

Mock.mock(/\/sfckgl\/sfckcx/, 'post', sfckglAPI.getList)
Mock.mock(/\/sfckgl\/sfckxz/, 'post', sfckglAPI.create)
Mock.mock(/\/sfckgl\/sfcksc/, 'post', sfckglAPI.delete)

Mock.mock(/\/jfinfo\/hzQuery/, 'post', cxtjAPI.getList)// 汇总查询
Mock.mock(/\/cxtj\/tqcx/, 'post', cxtjAPI.queryTqjf)// 汇总查询

//_global configiration获取
Mock.mock(/\/global\/query/, 'post', globalAPI.query)
Mock.mock(/\/configurations\/getConfigurations/, 'post', globalAPI.getConfigurations)
Mock.mock(/\/syscode\/add/, 'post', csglAPI.addParams)

export default Mock
