
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
        { key: 1, value: '超级管理员' },
        { key: 0, value: '领活' },
        { key: 2, value: '钩针' },
        { key: 3, value: '质检' },
        { key: 4, value: '底胶' },
        { key: 15, value: '底胶转出' },
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
        { key: 'TPRK', value: '头皮入库' },
        { key: 'TPFX', value: '头皮缝线' },
        { key: 'TPFW', value: '头皮附网' },
      ],
      PRLX: [
        { key: 'PR', value: '漂染' },
      ],
      SFLX: [
        { key: 'LF', value: '拉发' },
        { key: 'JT', value: '卷烫' },
        { key: 'HBF', value: '合白发' },
        { key: 'HF', value: '合发' },
        { key: 'PP', value: '枇杷' },
      ],
      SFZL: [
        { key: 3, value: '印度发' },
        { key: 1, value: '阿富汗发' },
        { key: 2, value: '中国发' },
      ],
      //由非扫码的工序对应的code组合起来的。
      CZLX: [
        { key: 'TPRK', value: '头皮入库' },
        { key: 'TPFX', value: '头皮缝线' },
        { key: 'TPFW', value: '头皮附网' },
        { key: 'PR', value: '漂染' },
        { key: 'LF', value: '拉发' },
        { key: 'JT', value: '卷烫' },
        { key: 'HBF', value: '合白发' },
        { key: 'HF', value: '合发' },
        { key: 'PP', value: '枇杷' },
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
  },

  getConfigurations: () => {
    const paraObj = [
      {
        config_code: 'QYBH',
        config_value: '001', //企业编号，这里配置多少，前台展示的功能就是哪个企业的。
        config_desc: '禹城睿绣企业编号'
      },
      {
        config_code: 'showA',
        config_value: true,
        config_desc: '测试参数是否显示A'
      },
      {
        config_code: 'JZRQ',
        config_value: '2019-11-27',
        config_desc: '阿里云服务器:2vCPU 4GB 计算网络增强型'
      },
    ]

    var result = {
      configuration: paraObj,
    }
    var obj = {
      _success: true,
    }
    obj.result = result;
    return obj

  }

}
