import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List4Multi = []
const count = 100

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4Multi.push(Mock.mock({
    djid: '@increment',
    'czlx|1': ['TPRK', 'TPFX', 'TPFW', 'PR', 'LF', 'JT', 'HF', 'HBF', 'PP'],
    dj: r.natural(0, 5),
    bz: '',
    yxbz: 1
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    const { czlx } = param2Obj(config.url);

    let mockList = List4Multi.filter(item => {
      // if (importance && item.importance !== +importance) return false
      if (czlx && item.czlx != czlx) return false
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
      djinfoList: pageList
    }
    obj.result = result
    return obj
  },

  create: config => {
    var multiOrderObj = JSON.parse(config.body);
    multiOrderObj.djid = parseInt(Math.random() * 100) + 1024
    List4Multi.unshift(multiOrderObj)
    var result = {
      _success: true,
      code: null,
      _message: ''
    }
    return result
  },

  delete: config => {
    const { id } = param2Obj(config.url)
    for (const v of List4Multi) {
      if (v.djid == id) {
        v.yxbz = 0
        break
      }
    }
    var result = {
      _success: true,
      code: 406,
      _message: '删除单价登记信息失败，请检查！！！',
    }
    return result
  },

}
