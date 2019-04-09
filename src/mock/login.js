import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: [1],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '超级管理员'
  },
  editor: {
    roles: [0, 3],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '普通用户'
  }
}

export default {
  loginByUsername: config => {
    //const { username } = JSON.parse(config.body)
    const { username } = param2Obj(config.url)
    var obj = {
      result: {
        token: ''
      }
    };
    obj.result.token = userMap[username].token
    return obj;
  },
  refreshtoken: config => {
    //const { username } = JSON.parse(config.body)
    var obj = {
      result: {
        token: ''
      }
    };
    obj.result.token = 'admin_newer'
    return obj;
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      var obj = {
        _success: true,
        _message: "认证身份过期!",
        code: "401"
      };
      var result = {
      };
      obj.result = result;
      result.roleinfo = userMap[token].roles
      result.userinfo = userMap[token]
      return obj
    } else {
      return false
    }
  },
  logout: () => 'success'
}
