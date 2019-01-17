import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List4Multi = []
const count = 52

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4Multi.push(Mock.mock({
    sfdjid: '@increment',
    sfdjrq: r.datetime(),
    sflx: r.natural(5, 9),
    sfzl: r.natural(1, 3),
    jgry: r.natural(1, 6),
    fc: r.natural(1, 5),
    sh: r.natural(1, 5),
    sfweight: 30.234,
    dj: 23.5,
    zje: 51,
    yxbz: 1,
    bz: '',
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    const { djqsrq, djzzrq, sflx, fc, sh, sfzl, jgry, sort } = JSON.parse(config.body);

    let mockList = List4Multi.filter(item => {
      // if (importance && item.importance !== +importance) return false
      if (djqsrq && item.sfdjrq < djqsrq) return false
      if (djzzrq && item.sfdjrq > djzzrq) return false
      if (jgry && item.jgry != jgry) return false
      if (sflx && item.sflx != sflx) return false
      if (sfzl && item.sfzl != sfzl) return false
      if (fc && item.fc != fc) return false
      if (sh && item.sh != sh) return false
      if (item.yxbz != 1) return false
      return true
    })

    //const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))//这种只把请求页返给前台
    const pageList = mockList //这种全部返回前台，前台处理分页请求

    var obj = {
      _success: true,
    };

    var result = {
      total: mockList.length,
      sfrkList: pageList
    }
    obj.result = result
    return obj
  },

  create: config => {
    var multiOrderObj = JSON.parse(config.body);
    multiOrderObj.sfdjid = parseInt(Math.random() * 100) + 1024
    List4Multi.unshift(multiOrderObj)
    var result = {
      _success: true,
      code: null,
      _message: ''
    }
    return result
  },

  delete: config => {
    const { sfdjid } = param2Obj(config.url)
    for (const v of List4Multi) {
      if (v.sfdjid == sfdjid) {
        v.yxbz = 0
        break
      }
    }
    var result = {
      _success: true,
      code: 406,
      _message: '删除色发入库登记信息失败，请检查！！！',
    }
    return result
  },


}
