import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '超级管理员'
  },
  editor: {
    roles: ['editor'],
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
  getUserInfo: config => {
    console.log("jinru getUserinfo mock")
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      var obj = {};
      var result = {};
      obj.result = result;
      result.roleinfo = userMap[token].roles
      result.userinfo = userMap[token]
      console.log("mock getuserinfo obj", obj);
      return obj
    } else {
      return false
    }
  },
  logout: () => 'success'
}
