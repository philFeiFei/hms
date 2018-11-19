import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 20

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userId: '@increment',
    userName: r.last(),
    password: r.natural(12323232, 72323232),
    xm: r.cname(),
    sjh: r.natural(13061003239, 18663795374),
    'xb|1': [0, 1, 9],
    csrq: r.datetime(),
    sfzhm: r.natural(13061003239, 18663795374),
    jtzz: r.county(true),
    'roleId|1': [1, 2, 3, 4, 5, 6, 7, 8],
    'yxbz|1': [0, 1]
  }))
}
export default {
  getList: config => {
    const { userName, xm, page = 1, limit = 10, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (userName && item.userName.indexOf(userName) < 0) return false
      if (xm && item.xm.indexOf(xm) < 0) return false
      return true
    })

    if (sort === '-userId') {
      mockList = mockList.reverse()
    }

    const pageList = mockList

    var result = {
      _success: true,
      total: mockList.length,
      items: pageList
    }
    return result
  },

  create: config => {
    List.unshift(JSON.parse(config.body))
    var result = {
      _success: true,
      code: null,
      _message: ''
    }
    return result
  },

  update: config => {
    var temp = JSON.parse(config.body)
    for (const v of List) {
      if (v.userId === temp.userId) {
        const index = List.indexOf(v)
        List.splice(index, 1, temp)
        break
      }
    }
    var result = {
      _success: true,
      code: 406,
      _message: '修改用户信息传入不准确，请检查！！！',
    }
    return result
  },
  delete: config => {
    var temp = JSON.parse(config.body)
    for (const v of List) {
      if (v.userId === temp.userId) {
        v.yxbz = 0
        break
      }
    }
    var result = {
      _success: true,
      code: 406,
      _message: '删除用户信息失败，请检查！！！',
    }
    return result
  }
}
