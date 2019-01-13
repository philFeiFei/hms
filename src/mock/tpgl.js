import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List4Multi = []
const count = 52

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4Multi.push(Mock.mock({
    tpdjid: '@increment',
    djrq: r.datetime(),
    tplx: r.natural(1, 3),
    jgry: r.natural(0, 5),
    wdcc: r.natural(1, 5),
    wdks: r.natural(1, 5),
    sl: 3,
    dj: 35.26,
    zje: 234.223,
    yxbz: 1,
    bz: '',
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    const { djqsrq, djzzrq, wdks, wdcc, jgry, sort } = JSON.parse(config.body);

    let mockList = List4Multi.filter(item => {
      // if (importance && item.importance !== +importance) return false
      if (djqsrq && item.djrq < djqsrq) return false
      if (djzzrq && item.djrq > djzzrq) return false
      if (jgry && item.jgry != jgry) return false
      if (wdcc && item.wdcc != wdcc) return false
      if (wdks && item.wdks != wdks) return false
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
      tpdjinfoList: pageList
    }
    obj.result = result
    return obj
  },

  create: config => {
    var multiOrderObj = JSON.parse(config.body);
    multiOrderObj.tpdjid = parseInt(Math.random() * 100) + 1024
    List4Multi.unshift(multiOrderObj)
    var result = {
      _success: true,
      code: null,
      _message: ''
    }
    return result
  },

  delete: config => {
    const { tpdjid } = param2Obj(config.url)
    for (const v of List4Multi) {
      if (v.tpdjid == tpdjid) {
        v.yxbz = 0
        break
      }
    }
    var result = {
      _success: true,
      code: 406,
      _message: '删除头皮登记信息失败，请检查！！！',
    }
    return result
  },

  //库存查询
  kcQuery: config => {
    const { wdks, wdcc } = JSON.parse(config.body);

    let mockList = List4Multi.filter(item => {
      // if (importance && item.importance !== +importance) return false
      if (wdcc && item.wdcc != wdcc) return false
      if (wdks && item.wdks != wdks) return false
      return true
    })

    //const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))//这种只把请求页返给前台
    const pageList = mockList //这种全部返回前台，前台处理分页请求

    var obj = {
      _success: true,
    };

    var result = {
      total: mockList.length,
      kcList: pageList
    }
    obj.result = result
    return obj
  },

}
