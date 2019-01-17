
export default {
  query: () => {
    const code = {
      XB: [
        { key: 0, value: '男' },
        { key: 1, value: '女' },
        { key: 9, value: '不正常' },
      ],
      SF: [
        { key: '0', value: '否' },
        { key: '1', value: '是' },
      ],
      role: [
        { key: '1', value: '超级管理员' },
        { key: '0', value: '领活' },
        { key: 2, value: '钩针' },
        { key: 3, value: '质检' },
        { key: 4, value: '底胶' },
        { key: 5, value: '整形' },
        { key: 6, value: '成品质检' },
        { key: 7, value: '发货' },
        { key: 8, value: '头皮缝线' },
        { key: 9, value: '头皮附网' },
        { key: 10, value: '漂染' },
        { key: 11, value: '头皮入库' },
        { key: 12, value: '拉发' },
        { key: 13, value: '合白发' },
        { key: 14, value: '枇杷' },
      ],
      WDKS: [
        { key: 1, value: 'SKIN' },
        { key: 2, value: 'THIN SKIN' },
        { key: 3, value: 'BOND' },
        { key: 4, value: 'HOLLYWOOD' },
        { key: 5, value: 'AUSTRALIA' },
        { key: 6, value: 'TP11' },
      ],
      WDCC: [
        { key: 1, value: '4"×4"' },
        { key: 2, value: '4"×6"' },
        { key: 3, value: '6"×8"' },
        { key: 4, value: '15×20cm' },
        { key: 5, value: '20×25cm' },
      ],
      SH: [
        { key: 1, value: '#1' },
        { key: 2, value: '#1B30' },
        { key: 3, value: '#1B65Y' },
        { key: 4, value: '#310' },
        { key: 5, value: '#365Y' },
      ],
      FC: [
        { key: 1, value: '4"' },
        { key: 2, value: '12"' },
        { key: 3, value: '14"' },
        { key: 4, value: '16"' },
        { key: 5, value: '18"' },
      ],
      user: [
        { key: 6, value: '刘飞鸿' },
        { key: 1, value: '张三丰' },
        { key: 2, value: '李逵' },
        { key: 3, value: '王飞虎' },
        { key: 4, value: '杜十娘' },
        { key: 5, value: '武大郎' },
      ],
      TPLX: [
        { key: 1, value: '头皮入库' },
        { key: 2, value: '头皮缝线' },
        { key: 3, value: '头皮附网' },
      ],
      PRLX: [
        { key: 4, value: '漂染' },
      ],
      SFLX: [
        { key: 5, value: '拉发' },
        { key: 6, value: '卷烫' },
        { key: 7, value: '合白发' },
        { key: 8, value: '合发' },
        { key: 9, value: '枇杷' },
      ],
      SFZL: [
        { key: 3, value: '印度发' },
        { key: 1, value: '阿富汗发' },
        { key: 2, value: '中国发' },
      ],
      CZLX: [
        { key: 1, value: '头皮入库' },
        { key: 2, value: '头皮缝线' },
        { key: 3, value: '头皮附网' },
        { key: 4, value: '漂染' },
        { key: 5, value: '拉发' },
        { key: 6, value: '卷烫' },
        { key: 7, value: '合白发' },
        { key: 8, value: '合发' },
        { key: 9, value: '枇杷' },
      ],
    }
    var result = {
      codelist: code,
    }
    var obj = {
      _success: true,
    }
    obj.result = result;
    return obj
  }

}
