import request from '@/utils/request'

export function queryUser(query) {
  console.log("user api query", query)
  return request({// 查询complex table，如果配置mock，则跳入mock对应的url。--phil
    url: '/userManage/query',
    method: 'post',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/userManage/create',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  console.log("user update api", data)
  return request({
    url: '/userManage/update',
    method: 'post',
    data
  })
}
export function deleteUser(data) {
  return request({
    url: '/userManage/delete',
    method: 'post',
    params: data
  })
}
