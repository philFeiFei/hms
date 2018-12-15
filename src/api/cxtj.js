import request from '@/utils/request'
export function hzcx(query) {
  return request({
    url: '/jfinfo/hzQuery',
    method: 'post',
    data: query
  })
}
export function queryTqjf(query) {
  return request({
    url: '/cxtj/tqcx',
    method: 'post',
    data: query
  })
}
