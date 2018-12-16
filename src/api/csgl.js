import request from '@/utils/request'
export function addParams(data) {
  return request({
    url: '/syscode/add',
    method: 'post',
    data: data
  })
}
