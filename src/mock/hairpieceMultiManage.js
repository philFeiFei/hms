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
    tdurl: 'http://47.104.29.255/hms/td1.jpg',

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

    var obj = {
      _success: true,
    };

    var result = {
      total: mockList.length,
      jfpclist: pageList
    }
    obj.result = result
    return obj
  },

  create: config => {
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
    const { pcid } = param2Obj(config.url)
    for (const v of List4Multi) {
      if (v.pcid == pcid) {
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
    var obj = {
      _success: true,
      code: 406,
      _message: '获取二维码信息失败，请检查！',

    }
    //随机构造二维码数量
    var itemsOfQR = [];
    for (let i = 0; i < 300; i++) {
      itemsOfQR.push(Mock.mock({
        jfid: 'K@increment',
        ddbh: `k${r.natural(12900, 62900)}`,
        'sh|1': ['#1B10', '#1B80Y', '#210', '#365Y', '#1765Y', '60RY', '#2020'],
        xh: r.natural(1, 100),
        'wdks|1': ['THIN SKIN', 'VERSALITE', 'HOLLYWOOD', 'GERMANLACE', 'TP11', 'Fully Lace', 'DEBORAHAIR'],
        'wdcc|1': ['15×20cm', '7"×10"', '8"×10"', '5"×7"'],
        'fc|1': ['6"', '24"', '30"'],
      }))
    }
    var result = {
      jfpcdetail: itemsOfQR
    }

    obj.result = result
    return obj
  },
  getDetail4QRCodeByDdbh: config => {
    var obj = {
      _success: true,
      code: 406,
      _message: '获取二维码信息失败，请检查！',

    }
    //随机构造二维码数量
    var itemsOfQR = [];
    for (let i = 0; i < 300; i++) {
      itemsOfQR.push(Mock.mock({
        jfid: 'K@increment',
        ddbh: `k${r.natural(12900, 62900)}`,
        'sh|1': ['#1B10', '#1B80Y', '#210', '#365Y', '#1765Y', '60RY', '#2020'],
        xh: r.natural(1, 100),
        'wdks|1': ['THIN SKIN', 'VERSALITE', 'HOLLYWOOD', 'GERMANLACE', 'TP11', 'Fully Lace', 'DEBORAHAIR'],
        'wdcc|1': ['15×20cm', '7"×10"', '8"×10"', '5"×7"'],
        'fc|1': ['6"', '24"', '30"'],
      }))
    }
    var result = {
      jfinfolist: itemsOfQR
    }

    obj.result = result
    return obj
  },
  uploadTdPic: config => {
    var tdurl = 'http://47.104.29.255/hms/td.jpg'
    var obj = {
    }
    var result = {
      tdurl: tdurl
    }
    obj.result = result
    return obj
  }
}
