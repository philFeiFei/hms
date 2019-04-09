import request from '@/utils/request'
export function getConfigFromServer() {
  return request({
    url: '/global/query',
    method: 'post',
  })
}
export function getConfiguration() {
  return request({
    url: '/configurations/getConfigurations',
    method: 'post',
  })
}


