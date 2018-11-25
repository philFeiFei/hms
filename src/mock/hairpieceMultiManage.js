import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List4Multi = []
const count = 38

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4Multi.push(Mock.mock({
    pcid: '@increment',
    pcsj: r.datetime(),
    ddrq: r.datetime(),
    ddbh: 'K' + r.natural(629001, 629003),
    wdks: r.natural(1, 6),
    wdcc: r.natural(1, 5),
    sh: r.natural(1, 5),
    fc: r.natural(1, 5),
    sl: 0,
    yxbz: 1,
    'sftd|1': [0, 1],
    tdurl: 'c:/aaa/bbb/ccc.jpg',

  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    const { ddqsrq, ddzzrq, ddbh, sftd, sort } = param2Obj(config.url)

    let mockList = List4Multi.filter(item => {
      // if (importance && item.importance !== +importance) return false
      if (ddqsrq && item.ddrq < ddqsrq) return false
      if (ddzzrq && item.ddrq > ddzzrq) return false
      if (ddbh && item.ddbh.indexOf(ddbh) < 0) return false
      if (sftd && item.sftd != sftd) return false
      if (item.yxbz != 1) return false
      return true
    })

    if (sort === '-pcid') {
      mockList = mockList.reverse()
    }

    //const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))//这种只把请求页返给前台
    const pageList = mockList //这种全部返回前台，前台处理分页请求

    var result = {
      _success: true,
      total: mockList.length,
      items: pageList
    }
    return result
  },

  create: config => {
    console.log("config-multi-mock", config);
    var multiOrderObj = JSON.parse(config.body);
    multiOrderObj.pcid = parseInt(Math.random() * 100) + 1024
    List4Multi.unshift(multiOrderObj)
    var result = {
      _success: true,
      code: null,
      _message: ''
    }
    return result
  },

  delete: config => {
    var pcid = JSON.parse(config.body)
    console.log("pcid", pcid);
    for (const v of List4Multi) {
      if (v.pcid === pcid) {
        v.yxbz = 0
        break
      }
    }
    var result = {
      _success: true,
      code: 406,
      _message: '删除批量订单信息失败，请检查！！！',
    }
    return result
  },
  getDetail4QRCode: config => {
    var result = {
      _success: false,
      code: 406,
      _message: '获取二维码信息失败，请检查！',
    }
    return result
  }
}
