import Mock from 'mockjs'

const List4Move = []
const count = 1000

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4Move.push(Mock.mock({
    ddrq: r.datetime(),
    ddbh: 'K' + r.natural(629001, 629003),
    wdks: r.natural(1, 6),
    wdcc: r.natural(1, 5),
    sh: r.natural(1, 5),
    fc: r.natural(1, 5),

    fhr: r.natural(0, 5),
    lhr: r.natural(0, 5),
    fhsj: r.datetime(),
    lhsj: r.datetime(),
    sl: r.natural(0, 500),
    querytype: r.natural(1, 7)
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    var obj = JSON.parse(config.body);
    //const { ddqsrq, ddzzrq, fhr, ddbh, sftd, sh, sort } = param2Obj(config.url)
    var ddqsrq = obj.ddqsrq
    var ddzzrq = obj.ddzzrq
    var fhr = obj.fhr
    var ddbh = obj.ddbh
    var sh = obj.sh
    var wdcc = obj.wdcc
    var wdks = obj.wdks
    var lhr = obj.lhr
    var querytype = obj.querytype
    let mockList = List4Move.filter(item => {
      if (ddqsrq && item.ddrq < ddqsrq) return false
      if (ddzzrq && item.ddrq > ddzzrq) return false
      if (fhr && item.fhr != fhr) return false
      if (ddbh && item.ddbh.indexOf(ddbh) < 0) return false
      if (sh && item.sh != sh) return false
      if (wdks && item.wdks != wdks) return false
      if (wdcc && item.wdcc != wdcc) return false
      if (lhr && item.lhr != lhr) return false
      if (querytype && item.querytype != querytype) return false
      return true
    })

    //const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))//这种只把请求页返给前台
    const pageList = mockList //这种全部返回前台，前台处理分页请求

    var obj = {
      _success: true,
      code: '403',
      _message: ''
    };
    var result = {
      total: mockList.length,
      jfhzlist: pageList
    }
    obj.result = result
    return obj
  }
}
