import request from '@/utils/request'
export function queryDjinfo(query) {
  return request({
    url: '/prgl/prcx',
    method: 'post',
    data: query
  })
}

export function addDjinfo(data) {
  return request({
    url: '/prgl/prxz',
    method: 'post',
    data: data
  })
}

export function deleteDjinfo(data) {
  return request({
    url: '/prgl/prsc',
    method: 'post',
    params: data
  })
}
