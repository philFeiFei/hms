import request from '@/utils/request'
export function queryTpdjinfo(query) {
  return request({
    url: '/tpgl/tpcx',
    method: 'post',
    data: query
  })
}

export function addTpdjinfo(data) {
  return request({
    url: '/tpgl/tpxz',
    method: 'post',
    data: data
  })
}

export function deleteTpdjinfo(data) {
  return request({
    url: '/tpgl/tpsc',
    method: 'post',
    params: data
  })
}

export function kcQuery(data) {
  return request({
    url: '/cxtj/kccx',
    method: 'post',
    data: data
  })
}
