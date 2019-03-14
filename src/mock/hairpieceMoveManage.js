import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List4Move = []
const count = 5000

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4Move.push(Mock.mock({
    jfid: '@increment',
    pcid: r.natural(10, 50),
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
    djzcsj: r.datetime(),
    djzcr: r.natural(0, 5),
    zxsj: r.datetime(),
    zxr: r.natural(0, 5),
    cpzjsj: r.datetime(),
    cpzjr: r.natural(0, 5),
    fhsj: r.datetime(),
    fhr: r.natural(0, 5),
    fhbh: r.natural(3, 335),
    'sfzf|1': [0, 1],
    'sftd|1': [0, 1],
    bz: '订单编号为K3434的变为K2222，作废了这条信息，发货人某某某作废',
    yxbz: 1
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    var obj = JSON.parse(config.body);
    //const { ddqsrq, ddzzrq, fhr, ddbh, sftd, sh, sort } = param2Obj(config.url)
    var ddqsrq = obj.ddqsrq
    var ddzzrq = obj.ddzzrq
    var fhr = obj.fhr
    var ddbh = obj.ddbh
    var sftd = obj.sftd
    var sh = obj.sh
    var sort = obj.sort
    let mockList = List4Move.filter(item => {
      if (ddqsrq && item.ddrq < ddqsrq) return false
      if (ddzzrq && item.ddrq > ddzzrq) return false
      if (fhr && item.fhr != fhr) return false
      if (ddbh && item.ddbh.indexOf(ddbh) < 0) return false
      if (sh && item.sh != sh) return false
      if (sftd != null && item.sftd != sftd) {//js中数字0会转换为false
        return false
      }
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
    var temp = JSON.parse(config.body)
    for (const v of List4Move) {
      if (v.jfid === temp.jfid) {
        const index = List4Move.indexOf(v)
        List4Move.splice(index, 1, temp)
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
  multiUpdate: config => {
    var temp = JSON.parse(config.body)
    console.log("multiTemp in mock:", temp)
    for (const v of List4Move) {
      for (const jfinfo of temp.jfList) {
        var jfid1 = jfinfo.jfid
        if (v.jfid == jfid1) {
          v.ddbh = temp.newDdbh
          v.fhr = temp.fhr
          v.fhsj = temp.fhsj
          v.bz = temp.bz
          break
        }
      }
    }

    var result = {
      _success: true,
      code: 406,
      _message: '修改假发信息传入不准确，请检查！！！',
    }
    return result
  },
  /* querySpecialDetail: config => {
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
  } */
  delete: config => {
    const obj = param2Obj(config.url)
    var jfid = obj.jfid
    for (const v of List4Move) {
      if (v.jfid == jfid) {
        v.yxbz = 0
        break
      }
    }
    var result = {
      _success: true,
      code: 406,
      _message: '删除假发信息失败，请检查！！！',
    }
    return result
  }
}
