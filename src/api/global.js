import request from '@/utils/request'
export function getConfigFromServer() {
  return request({
    url: '/global/query',
    method: 'post',
  })
}


