import request from '@/utils/request'
export function queryHairpiece(query) {
  return request({
    url: '/hairpieceMove/query',
    method: 'post',
    data: query //这样表示传递对象，后台接收通过json解析
  })
}

export function updateHairpiece(data) {
  return request({
    url: '/hairpieceMove/update',
    method: 'post',
    params: data //这样表示在url后放增加参数，后台解析url
  })
}

/* export function querySpecialDetail(data) {
  return request({
    url: '/hairpieceMove/querySpecialDetail',
    method: 'post',
    data //default update ddbh
  })
} */

export function deleteJf(data) {
  return request({
    url: '/hairpieceMove/delete',
    method: 'post',
    params: data
  })
}

