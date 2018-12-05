import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  console.log("进入loginByUserName api");
  return request({
    //url: '/login/login',
    url: '/authen/getToken',
    method: 'post',
    //data
    params: data
  })
}
/* export function refreshToken() {
  const data = {
  }
  console.log("进入refreshToken() api");
  return request({
    //url: '/login/login',
    url: '/authen/refreshtoken',
    method: 'post',
    //data
    params: data
  })
} */



export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  console.log("getUserInfo api");
  return request({
    url: '/user/info',
    method: 'post',
    params: { token }
  })
}

