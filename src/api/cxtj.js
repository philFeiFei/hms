import request from '@/utils/request'
export function hzcx(query) {
  return request({
    url: '/jfinfo/hzQuery',
    method: 'post',
    data: query //这样表示传递对象，后台接收通过json解析
  })
}
