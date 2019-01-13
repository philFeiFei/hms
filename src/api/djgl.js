import request from '@/utils/request'
export function queryDjinfo(query) {
  return request({
    url: '/djgl/djcx',
    method: 'post',
    params: query
  })
}

export function addDjinfo(data) {
  return request({
    url: '/djgl/djxz',
    method: 'post',
    data: data
  })
}

export function deleteDjinfo(data) {
  return request({
    url: '/djgl/djsc',
    method: 'post',
    params: data
  })
}


