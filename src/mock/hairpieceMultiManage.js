import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userid: '@increment',
    username: r.last(),
    password: r.natural(12323232, 72323232),
    xm: r.cname(),
    sjh: r.natural(13061003239, 18663795374),
    xb: [0, 1, 9],
    csrq: r.datetime(),
    sfzhm: r.natural(13061003239, 18663795374),
    jtzz: r.county(true),
    yxbz: [0, 1]
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    const { userName, xm, page = 1, limit = 10, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      // if (importance && item.importance !== +importance) return false
      if (userName && item.userName.indexOf(userName) < 0) return false
      if (xm && item.xm.indexOf(xm) < 0) return false
      return true
    })

    if (sort === '-id') {
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
    var result = {
      _success: true,
    }
    return result
  },


  delete: config => {
    var result = {
      _success: false,
      code: 406,//403表示认证失败；
      _message: '删除失败，请检查！',
    }
    return result
  },
  getDetail4QRCode: config => {
    var result = {
      _success: false,
      code: 406,//403表示认证失败；
      _message: '获取二维码信息失败，请检查！',
    }
    return result
  }
}
