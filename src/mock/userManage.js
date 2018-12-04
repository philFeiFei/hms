import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List4User = []
const count = 20

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4User.push(Mock.mock({
    userId: '@increment',
    username: r.last(),
    //password: r.natural(12323232, 72323232),
    xm: r.cname(),
    sjh: r.natural(13061003239, 18663795374),
    'xb|1': [0, 1, 9],
    csrq: r.datetime(),
    sfzhm: r.natural(13061003239, 18663795374),
    jtzz: r.county(true),
    roleId: [1, 2],
    yxbz: 1
  }))
}
export default {
  getList: config => {
    const { username, xm, xb, page = 1, limit = 10, sort } = param2Obj(config.url)//如果以对象传入的话，就用config.body接收即可。

    let mockList = List4User.filter(item => {
      if (username && item.username.indexOf(username) < 0) return false
      if (xm && item.xm.indexOf(xm) < 0) return false
      if (xb && item.xb != xb) return false
      if (item.yxbz != 1) return false
      return true
    })

    if (sort === '-userId') {
      mockList = mockList.reverse()
    }

    const pageList = mockList
    var obj = {
      _success: true,
      code: '401',
      _message: 'token超时了,亲，我看看能否跳转至登录页面呢。'
    };
    var result = {
      total: mockList.length,
      userlist: pageList
    }
    obj.result = result
    return obj
  },

  create: config => {
    console.log("config-user-mock", config);
    var obj = JSON.parse(config.body);
    obj.userId = parseInt(Math.random() * 100) + 1024
    List4User.unshift(obj)
    var result = {
      _success: true,
      code: null,
      _message: ''
    }
    return result
  },

  update: config => {
    var temp = JSON.parse(config.body)
    for (const v of List4User) {
      if (v.userId === temp.userId) {
        const index = List4User.indexOf(v)
        List4User.splice(index, 1, temp)
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
    console.log(" param2Obj(config.url)", param2Obj(config.url))
    console.log("List4User", List4User)
    const obj = param2Obj(config.url)
    var userid = obj.userId
    for (const v of List4User) {
      if (v.userId == userid) {
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
