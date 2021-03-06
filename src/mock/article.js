import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 10

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    // timestamp: Mock.Random.datetime(),//这个前面就不需要加'+'
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: '我是测试数据',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

export default {
  // 查询complex table --phil
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      _success: true,
      code: null,
      _message: ''
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createArticle: config => {

    List.unshift(JSON.parse(config.body))// 真实的加入的List中，前台页面不用手工虚拟的象征性的加了。。
    var result = {
      _success: true,
      code: null,
      _message: ''
    }
    return result
  },
  updateArticle: config => {

    //处理修改逻辑，尽量模拟一下了。。。
    var temp = JSON.parse(config.body)

    for (const v of List) {
      if (v.id === temp.id) {
        const index = List.indexOf(v)
        List.splice(index, 1, temp)//从index位置，删除1个，并用temp代替。temp可选项
        break
      }
    }
    var result = {
      _success: true,
      code: 406,//403表示认证失败；
      _message: '订单日期传入格式不准确，请检查！！！',
    }
    return result
  }
}
