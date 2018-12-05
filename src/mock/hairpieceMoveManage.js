import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List4Move = []
const count = 11461

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4Move.push(Mock.mock({
    jfid: '@increment',
    xh: '@increment',
    ddrq: r.datetime(),
    ddbh: 'K' + r.natural(629001, 629003),
    wdks: r.natural(1, 6),
    wdcc: r.natural(1, 5),
    sh: r.natural(1, 5),
    fc: r.natural(1, 5),

    lhr: r.natural(0, 5),
    lhsj: r.datetime(),

    gzsj: r.datetime(),
    gzr: r.natural(0, 5),
    zjsj: r.datetime(),
    zjr: r.natural(0, 5),
    djsj: r.datetime(),
    djr: r.natural(0, 5),
    zxsj: r.datetime(),
    zxr: r.natural(0, 5),
    cpzjsj: r.datetime(),
    cpzjr: r.natural(0, 5),
    fhsj: r.datetime(),
    fhr: r.natural(0, 5),

    'sftd|1': [0, 1],
    yxbz: 1
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    const { ddqsrq, ddzzrq, fhr, ddbh, sftd, sh, sort } = param2Obj(config.url)

    let mockList = List4Move.filter(item => {
      if (ddqsrq && item.ddrq < ddqsrq) return false
      if (ddzzrq && item.ddrq > ddzzrq) return false
      if (fhr && item.fhr != fhr) return false
      if (ddbh && item.ddbh.indexOf(ddbh) < 0) return false
      if (sh && item.sh != sh) return false
      if (sftd && item.sftd != sftd) return false
      if (item.yxbz != 1) return false
      return true
    })

    if (sort === '-jfid') {
      mockList = mockList.reverse()
    }

    //const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))//这种只把请求页返给前台
    const pageList = mockList //这种全部返回前台，前台处理分页请求

    var obj = {
      _success: true,
      code: '401',
      _message: 'token超时了,亲，我看看能否跳转至登录页面呢。'
    };
    var result = {
      total: mockList.length,
      jfinfolist: pageList
    }
    obj.result = result
    return obj
  },

  update: config => {
    console.log("config", config);
    const { jfid, ddbh } = param2Obj(config.url)
    for (const v of List4Move) {
      if (v.jfid == jfid) {
        v.ddbh = ddbh
        break
      }
    }
    var result = {
      _success: true,
      code: 406,
      _message: '修改假发信息传入不准确，请检查！！！',
    }
    return result
  },
  querySpecialDetail: config => {
    let success = true;
    var jfid = JSON.parse(config.body)
    if (jfid == null || jfid == undefined) {
      success = false
    }
    var result = {
      _success: success,
      _message: '没有查询到特单详细信息的图片信息，请检查！',
      src: 'F:\外面项目\德州禹城假发管理系统\QQ图片20181112101901.jpg',
      code: 406,
    }
    return result
  }
}
