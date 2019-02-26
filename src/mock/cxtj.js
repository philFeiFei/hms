import Mock from 'mockjs'

const List4Move = []
const List4Tqjf = []
const count = 1000

var r = Mock.Random
for (let i = 0; i < count; i++) {
  List4Move.push(Mock.mock({
    ddrq: r.datetime(),
    smrq: r.datetime(),
    ddbh: 'K' + r.natural(629001, 629003),
    wdks: r.natural(1, 6),
    wdcc: r.natural(1, 5),
    sh: r.natural(1, 5),
    fc: r.natural(1, 5),

    fhr: r.natural(0, 5),
    lhr: r.natural(0, 5),
    zjr: r.natural(0, 5),
    djr: r.natural(0, 5),
    djzcr: r.natural(0, 5),
    zxr: r.natural(0, 5),
    cpzjr: r.natural(0, 5),
    gzr: r.natural(0, 5),
    fhsj: r.datetime(),
    lhsj: r.datetime(),
    zjsj: r.datetime(),
    djsj: r.datetime(),
    djzcsj: r.datetime(),
    zxsj: r.datetime(),
    cpzjsj: r.datetime(),
    gzsj: r.datetime(),
    sl: r.natural(0, 500),
    querytype: r.natural(1, 7)
  }))
}
for (let i = 0; i < count; i++) {
  List4Tqjf.push(Mock.mock({
    jfid: '@increment',
    xh: '@increment',
    ddrq: r.datetime(),
    smrq: r.datetime(),
    ddbh: 'K' + r.natural(629001, 629003),
    wdks: r.natural(1, 6),
    wdcc: r.natural(1, 5),
    sh: r.natural(1, 5),
    fc: r.natural(1, 5),

    lhr: r.natural(0, 5),
    lhsj: r.datetime(),

    gzsj: r.datetime(),
    gzr: r.natural(0, 5),
    zjsj: r.datetime(),
    zjr: r.natural(0, 5),
    djsj: r.datetime(),
    djr: r.natural(0, 5),
    djzcsj: r.datetime(),
    djzcr: r.natural(0, 5),
    zxsj: r.datetime(),
    zxr: r.natural(0, 5),
    cpzjsj: r.datetime(),
    cpzjr: r.natural(0, 5),
    fhsj: r.datetime(),
    fhr: r.natural(0, 5),
    tqts: r.natural(1, 40),
    'sfzf|1': [0, 1],
    'sftd|1': [0, 1],
    'bz|1': ['我存在备注的，哈哈', ''],
    yxbz: 1
  }))
}
export default {
  // 查询complex table --phil
  getList: config => {
    var obj = JSON.parse(config.body);
    //const { ddqsrq, ddzzrq, fhr, ddbh, sftd, sh, sort } = param2Obj(config.url)
    var smqsrq = obj.smqsrq
    var smzzrq = obj.smzzrq
    var fhr = obj.fhr
    var ddbh = obj.ddbh
    var sh = obj.sh
    var wdcc = obj.wdcc
    var wdks = obj.wdks
    var lhr = obj.lhr
    var zjr = obj.zjr
    var querytype = obj.querytype
    let mockList = List4Move.filter(item => {
      if (smqsrq && item.smrq < smqsrq) return false
      if (smzzrq && item.smrq > smzzrq) return false
      if (fhr && item.fhr != fhr) return false
      if (ddbh && item.ddbh.indexOf(ddbh) < 0) return false
      if (sh && item.sh != sh) return false
      if (wdks && item.wdks != wdks) return false
      if (wdcc && item.wdcc != wdcc) return false
      if (lhr && item.lhr != lhr) return false
      if (zjr && item.zjr != zjr) return false
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
  },

  queryTqjf: config => {
    var obj = JSON.parse(config.body);
    //const { ddqsrq, ddzzrq, fhr, ddbh, sftd, sh, sort } = param2Obj(config.url)
    var ddqsrq = obj.ddqsrq
    var ddzzrq = obj.ddzzrq
    var ddbh = obj.ddbh
    var tqts = obj.tqts
    var sfzf = obj.sfzf

    var sort = obj.sort
    let mockList = List4Tqjf.filter(item => {
      if (ddqsrq && item.ddrq < ddqsrq) return false
      if (ddzzrq && item.ddrq > ddzzrq) return false
      if (ddbh && item.ddbh.indexOf(ddbh) < 0) return false
      if (item.yxbz != 1) return false
      return true
    })

    if (sort === '-jfid') {
      mockList = mockList.reverse()
    }
    //const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))//这种只把请求页返给前台
    const pageList = mockList //这种全部返回前台，前台处理分页请求

    var obj = {
      _success: true,
      code: '401',
      _message: 'token超时了,亲，我看看能否跳转至登录页面呢。'
    };
    var result = {
      total: mockList.length,
      tqjflist: pageList
    }
    obj.result = result
    return obj
  },
}
