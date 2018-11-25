
export default {
  query: () => {
    const code = {
      xb: [
        { key: 0, value: '男' },
        { key: 1, value: '女' },
        { key: 9, value: '不正常' },
      ],
      role: [
        { key: 0, value: '超级管理员' },
        { key: 1, value: '领活' },
        { key: 2, value: '钩针' },
        { key: 3, value: '质检' },
        { key: 4, value: '底胶' },
        { key: 5, value: '整形' },
        { key: 6, value: '成品质检' },
        { key: 7, value: '发货' },
      ],
      wdks: [
        { key: 1, value: 'SKIN' },
        { key: 2, value: 'THIN SKIN' },
        { key: 3, value: 'BOND' },
        { key: 4, value: 'HOLLYWOOD' },
        { key: 5, value: 'AUSTRALIA' },
        { key: 6, value: 'TP11' },
      ],
      wdcc: [
        { key: 1, value: '4"×4"' },
        { key: 2, value: '4"×6"' },
        { key: 3, value: '6"×8"' },
        { key: 4, value: '15×20cm' },
        { key: 5, value: '20×25cm' },
      ],
      sh: [
        { key: 1, value: '#1' },
        { key: 2, value: '#1B30' },
        { key: 3, value: '#1B65Y' },
        { key: 4, value: '#310' },
        { key: 5, value: '#365Y' },
      ],
      fc: [
        { key: 1, value: '4"' },
        { key: 2, value: '12"' },
        { key: 3, value: '14"' },
        { key: 4, value: '16"' },
        { key: 5, value: '18"' },
      ],
      user: [
        { key: 0, value: '刘飞鸿' },
        { key: 1, value: '张三丰' },
        { key: 2, value: '李逵' },
        { key: 3, value: '王飞虎' },
        { key: 4, value: '杜十娘' },
        { key: 5, value: '武大郎' },
      ]
    }
    var result = {
      _success: true,
      code: code,
    }
    return result
  }

}
