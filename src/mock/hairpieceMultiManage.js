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

    var obj = {
      _success: true,
    };

    var result = {
      total: mockList.length,
      items: pageList
    }
    obj.result = result
    return obj
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
    var obj = {
      _success: true,
      code: 406,
      _message: '获取二维码信息失败，请检查！',

    }
    //随机构造二维码数量
    var itemsOfQR = [];
    for (let i = 0; i < 110; i++) {
      itemsOfQR.push(Mock.mock({
        id: '@increment',
        text: 'K68686#1B20-' + r.natural(1, 100),
        desc: r.word(3, 5) + r.natural(129001, 629003)

      }))
    }
    var result = {
      itemsOfQR
    }

    /*  var result = {
       itemsOfQR: [
         {
           id: 'canvas1',
           text: '234234',
           desc: 'Hob99-23-33*-aa'
         },
         {
           id: 'canvas2',
           text: '22222222',
           desc: 'Hobaa-23-33*-dd'
         },
         {
           id: 'canvas3',
           text: '44444444444',
           desc: 'Hob2-23-33*-cc'
         },
         {
           id: 'canvas4',
           text: '7777ghgfhfg',
           desc: 'Hobrr-23-33*-bb'
         },
         {
           id: 'canvas5',
           text: '234234',
           desc: 'Hobggg-2-33*-aa'
         },
         {
           id: 'canvas6',
           text: '44444444444',
           desc: 'Hob2-23-33*-cc'
         },
         {
           id: 'canvas7',
           text: '7777ghgfhfg',
           desc: 'Hobrr-23-33*-bb'
         },
         {
           id: 'canvas8',
           text: '234234',
           desc: 'Hobggg-2-33*-aa'
         },
       ]
     } */
    obj.result = result
    return obj
  }
}
