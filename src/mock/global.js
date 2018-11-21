
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
      ]
    }
    var result = {
      _success: true,
      code: code,
    }
    return result
  }

}
