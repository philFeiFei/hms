import request from '@/utils/request'
export function queryHairpiece(query) {
  return request({
    url: '/hairpieceMove/query',
    method: 'post',
    params: query //ordinary default sftd:0   ;  special default sftd:1
  })
}

export function updateHairpiece(data) {
  return request({
    url: '/hairpieceMove/update',
    method: 'post',
    data //default update ddbh
  })
}

export function querySpecialDetail(data) {
  return request({
    url: '/hairpieceMove/querySpecialDetail',
    method: 'post',
    data //default update ddbh
  })
}

