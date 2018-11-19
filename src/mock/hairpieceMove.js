import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    ddrq: +r.date('T'),
    ddbh: 'K' + r.natural(629001, 629003),
    'sh': r.natural(1, 9) + r.character('upper') + '-' + r.natural(1, 9),
    sl: 1,
    fhrq: r.datetime(),
    fhr: '丹东' + '-' + r.cname(),
    ks: 'Q66*8',
    gz: r.datetime(),
    gzr: r.cname(),
    zj: r.datetime(),
    zjr: r.cname(),
    dj: r.datetime(),
    djr: r.cname(),
    zx: r.datetime(),
    zxr: r.cname(),
    zxyz: r.datetime(),
    zxyzr: r.cname(),
    fh: r.cname(),
    lhsj: r.datetime()
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    const { fhr, ddbh, sh, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      // if (importance && item.importance !== +importance) return false
      if (fhr && item.fhr.indexOf(fhr) < 0) return false
      if (ddbh && item.ddbh.indexOf(ddbh) < 0) return false
      if (sh && item.sh.indexOf(sh) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    //const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))//这种只把请求页返给前台
    const pageList = mockList //这种全部返回前台，前台处理分页请求

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
